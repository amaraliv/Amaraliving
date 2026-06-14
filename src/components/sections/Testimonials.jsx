import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/content';
import { fadeUpCompact, headerContainerCompact } from '../../constants/animations';
import Stars from '../ui/Stars';
import VerifiedBadge from '../ui/VerifiedBadge';
import ClientInitials from '../ui/ClientInitials';

const headerVariants = headerContainerCompact;
const fadeUp = fadeUpCompact;

function TestimonialCard({ testimonial }) {
  const { name, location, projectType, category, quote, rating } = testimonial;

  return (
    <article className="testimonial-card group h-full">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="h-px w-10 bg-gold/80 transition-all duration-500 group-hover:w-14" />
        <span className="font-display text-3xl leading-none text-gold/20" aria-hidden="true">&ldquo;</span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-sm border border-stone/80 bg-stone/30 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
          {category}
        </span>
        <VerifiedBadge />
      </div>

      <p className="mb-4 font-body text-[10px] font-semibold uppercase tracking-[0.26em] text-gold">
        {projectType}
      </p>

      <blockquote className="testimonial-quote font-display text-base font-light leading-relaxed text-dark md:text-lg md:leading-relaxed">
        {quote}
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-stone/60 pt-5">
        <ClientInitials name={name} />
        <div className="min-w-0 flex-1">
          <Stars count={rating} />
          <p className="mt-2 font-body text-sm font-semibold text-dark">{name}</p>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-ink/45">{location}</p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = TESTIMONIALS.length;

  const updateActiveFromScroll = useCallback(() => {
    const container = scrollerRef.current;
    if (!container) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, []);

  const scrollToIndex = useCallback((index) => {
    const container = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    scrollToIndex((activeIndex + 1) % total);
  }, [activeIndex, scrollToIndex, total]);

  const goPrev = useCallback(() => {
    scrollToIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, scrollToIndex, total]);

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return undefined;

    container.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll);

    return () => {
      container.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
    };
  }, [updateActiveFromScroll]);

  return (
    <section id="testimonials" className="border-t border-stone/50 bg-cream py-8 md:py-10 lg:py-12">
      <div className="wrap grid gap-7 lg:grid-cols-12 lg:items-start lg:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
          className="lg:col-span-4 xl:col-span-3"
        >
          <motion.p variants={fadeUp} className="eyebrow mb-3">
            Client Voices
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,3.1vw,3.9rem)] font-medium leading-[1.04] text-dark"
          >
            Trusted By<br />
            <span className="italic text-gold">Clients</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 line-gold max-w-xs opacity-60" />
          <motion.p variants={fadeUp} className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink/55">
            Real feedback from homeowners, designers, and businesses who chose Amara for complete interior finishes.
          </motion.p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink/60 transition-all hover:border-gold hover:text-gold"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink/60 transition-all hover:border-gold hover:text-gold"
            >
              &rarr;
            </button>
            <span className="ml-2 font-body text-xs text-ink/40">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        <div className="relative min-w-0 lg:col-span-8 xl:col-span-9">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream to-transparent" />

          <div
            ref={scrollerRef}
            className="testimonial-track scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-0 pb-2 md:gap-5"
            aria-label="Client testimonials"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="w-[min(86vw,390px)] shrink-0 snap-start md:w-[360px] xl:w-[390px] 2xl:w-[420px]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`View review from ${item.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-1 transition-all duration-500 ${
                  index === activeIndex ? 'w-9 bg-gold' : 'w-5 bg-ink/15 hover:bg-ink/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
