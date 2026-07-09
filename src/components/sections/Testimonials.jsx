import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/content';
import { fadeUpCompact, headerContainerCompact } from '../../constants/animations';
import Stars from '../ui/Stars';
import VerifiedBadge from '../ui/VerifiedBadge';
import ClientInitials from '../ui/ClientInitials';

const headerVariants = headerContainerCompact;
const fadeUp = fadeUpCompact;

function TestimonialCard({ testimonial }) {
  const { name, location, projectType, category, quote, rating, image } = testimonial;

  return (
    <article className="testimonial-card-3d group h-full flex flex-col overflow-hidden">
      {/* Top Image block */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
        {image ? (
          <img
            src={image}
            alt={projectType}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-slate-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Top Expert Badge in Top-Left */}
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded bg-[#7c3aed] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
          <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Top Expert
        </div>

        {/* Rating Badge in Bottom-Right */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold text-slate-800 shadow-sm border border-slate-100/50">
          <div className="flex gap-0.5 text-amber-500">
            <span className="text-amber-500 leading-none">★</span>
            <span className="text-amber-500 leading-none">★</span>
            <span className="text-amber-500 leading-none">★</span>
            <span className="text-amber-500 leading-none">★</span>
            <span className="text-slate-300 leading-none">★</span>
          </div>
          <span className="font-semibold text-slate-700 leading-none">4.9 (128)</span>
        </div>
      </div>

      {/* Card Content block */}
      <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
        <div>
          <div className="mb-3.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
              {category}
            </span>
            <VerifiedBadge />
          </div>

          <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            {projectType}
          </p>

          <blockquote className="testimonial-quote-3d font-display text-xs font-light leading-relaxed text-dark md:text-sm md:leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-3">
          <ClientInitials name={name} />
          <div className="min-w-0 flex-1">
            <Stars count={rating} />
            <p className="mt-1.5 font-body text-xs font-semibold text-dark leading-none">{name}</p>
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-ink/45 mt-1 leading-none">{location}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const scrollToIndex = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const getOffset = (index) => {
    let offset = index - activeIndex;
    const half = Math.floor(total / 2);
    if (offset > half) offset -= total;
    if (offset < -half) offset += total;
    return offset;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goNext();
    }, 1000);
    return () => clearInterval(interval);
  }, [goNext, isPaused]);

  return (
    <section id="testimonials" className="bg-testimonials-gradient border-t border-slate-100 py-16 md:py-24 overflow-hidden relative">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
        
        {/* Left Column: Header & Controls (Image 1 style) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
          className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-3">
            Client Voices
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-medium leading-tight text-dark"
          >
            Trusted By<br />
            <span className="italic text-gold">Clients</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 line-gold max-w-xs mx-auto lg:mx-0 opacity-60" />
          <motion.p variants={fadeUp} className="mt-4 max-w-sm font-body text-sm leading-relaxed text-slate-500 mx-auto lg:mx-0">
            Real feedback from homeowners, designers, and businesses who chose Amara for complete interior finishes.
          </motion.p>

          {/* Navigation Controls (Image 1 style) */}
          <motion.div variants={fadeUp} className="mt-6 lg:mt-8 flex items-center gap-3 justify-center lg:justify-start">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center border border-slate-200 rounded bg-white text-slate-600 shadow-sm transition-all hover:border-gold hover:text-gold hover:scale-105"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center border border-slate-200 rounded bg-white text-slate-600 shadow-sm transition-all hover:border-gold hover:text-gold hover:scale-105"
            >
              &rarr;
            </button>
            <span className="ml-2 font-body text-xs font-semibold text-slate-400">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Slider */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="lg:col-span-8 relative w-full flex flex-col items-center overflow-visible"
        >
          <div className="relative w-full h-[420px] md:h-[450px] flex items-center justify-center overflow-visible">
            
            {/* Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center overflow-visible">
              {TESTIMONIALS.map((testimonial, index) => {
                const offset = getOffset(index);
                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <motion.div
                    key={testimonial.id}
                    style={{
                      zIndex: 20 - Math.abs(offset),
                      transformOrigin: 'center center',
                    }}
                    animate={{
                      x: `${offset * 58}%`,
                      scale: isActive ? 1.0 : 0.83,
                      opacity: isVisible ? (isActive ? 1.0 : 0.45) : 0,
                      filter: isActive ? 'blur(0px)' : 'blur(3.5px)',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 28,
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -60) goNext();
                      else if (info.offset.x > 60) goPrev();
                    }}
                    className="absolute w-[80vw] max-w-[320px] h-[380px] md:h-[410px] flex shrink-0 cursor-grab active:cursor-grabbing select-none"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Dot Indicators */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {TESTIMONIALS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  aria-label={`View review from ${item.name}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`h-2 transition-all duration-500 rounded-full focus:outline-none focus:ring-1 focus:ring-gold ${
                    isActive
                      ? 'w-10 bg-gradient-to-r from-violet-600 to-cyan-400'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
