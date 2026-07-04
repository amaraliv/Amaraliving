import { useState, useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { MATERIALS } from '../../data/content';

const THUMBNAILS = [
  {
    id: 'granite',
    title: 'Exotic Granite Collection',
    subtitle: 'Exotic Granite',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'furniture',
    title: 'Luxury Furniture Collection',
    subtitle: 'Bespoke Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tiles',
    title: 'Designer Tile Collection',
    subtitle: 'Designer Tiles',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
  },
];

export default function MaterialsShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const material = MATERIALS[active];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mat-intro', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.mat-panel', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: '.mat-panel', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="materials" 
      className="relative lg:h-screen lg:min-h-[700px] lg:max-h-[900px] flex flex-col justify-center bg-dark text-cream py-16 lg:py-0 overflow-hidden"
    >
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            background: active === 0 
              ? 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.15) 0%, transparent 60%)'
              : active === 1
              ? 'radial-gradient(circle at 80% 20%, rgba(245,158,11,0.12) 0%, transparent 60%)'
              : 'radial-gradient(circle at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 60%)'
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full opacity-80"
        />
      </div>

      {/* Header section */}
      <div className="wrap mat-intro mb-8 lg:mb-12 relative z-10">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-2">Materials</p>
            <h2 className="font-display text-[clamp(2.2rem,3.2vw,3.8rem)] font-medium leading-[1.08] text-cream mb-4">
              Surfaces, Form<br /><span className="italic text-gold">&amp; Finish</span>
            </h2>
            <p className="font-body text-xs md:text-sm leading-relaxed text-cream/45 max-w-xl">
              An editorial curation of architectural materials sourced from historical quarries and hand-finished ateliers. From Calacatta veining to structured solid timber and raw clay tiles, each medium is selected for its tactile resonance, physical permanence, and ability to command architectural scale.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end relative mt-6 lg:mt-0">
            {/* Subtle Granite Texture and Radial Glow Behind Thumbnails */}
            <div className="absolute -inset-4 pointer-events-none rounded-[24px] overflow-hidden" aria-hidden="true">
              <div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=5')] bg-cover opacity-[0.05] mix-blend-overlay"
              />
              <div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_75%)]"
              />
            </div>

            {/* Luxury Label */}
            <span className="relative z-10 font-body text-[9px] font-bold tracking-[0.4em] text-[#B8941F] mb-3">
              CURATED COLLECTIONS
            </span>

            {/* Thumbnail Row/Stack */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 lg:gap-4 w-full">
              {THUMBNAILS.map((thumb, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        if (thumb.id === 'furniture') window.location.hash = '#/furniture';
                        else if (thumb.id === 'tiles') window.location.hash = '#/tiles';
                      } else {
                        setActive(index);
                      }
                    }}
                    title={isActive ? (thumb.id === 'furniture' || thumb.id === 'tiles' ? 'Open Collection' : thumb.title) : "View Collection"}
                    className={`group relative flex-1 h-[140px] sm:h-[160px] lg:h-[180px] xl:h-[210px] rounded-[20px] overflow-hidden border transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'border-[#B8941F] shadow-[0_0_20px_rgba(184,148,31,0.28)] opacity-100 scale-[1.02]' 
                        : 'border-white/5 opacity-60 hover:opacity-100 hover:border-[#B8941F]/50 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Image inside thumbnail */}
                    <div className="absolute inset-0 overflow-hidden w-full h-full rounded-[20px]">
                      <motion.img
                        src={thumb.image}
                        alt={thumb.title}
                        animate={{
                          scale: isActive ? 1.08 : 1.0,
                        }}
                        transition={{ duration: 0.6 }}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Dark Charcoal Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#22262A]/90 via-[#22262A]/35 to-transparent transition-opacity duration-500 group-hover:opacity-90 rounded-[20px]" />
                    
                    {/* Custom hover pointer badge */}
                    <div className="absolute top-2.5 right-2.5 bg-[#B8941F] text-[#F4F2EC] text-[7px] font-black tracking-widest px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm leading-none z-20">
                      {isActive && (thumb.id === 'furniture' || thumb.id === 'tiles') ? 'OPEN' : 'VIEW'}
                    </div>

                    {/* Text block */}
                    <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col items-start text-left z-10">
                      <span className="font-body text-[7px] uppercase tracking-[0.2em] text-[#B8941F] font-semibold mb-0.5 leading-none">
                        {thumb.subtitle}
                      </span>
                      <h4 className="font-display text-xs font-semibold text-[#F8F5F0] leading-tight">
                        {thumb.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Panel grid */}
      <div className="wrap mat-panel grid gap-8 lg:grid-cols-12 items-stretch relative z-10">
        
        {/* Left Side: Image Panel */}
        <div className="lg:col-span-7 xl:col-span-8 relative rounded-2xl overflow-hidden border border-cream/10 h-[320px] md:h-[400px] lg:h-[430px] xl:h-[470px] shadow-2xl">
          <div className="absolute inset-0 border border-cream/5 z-20 pointer-events-none rounded-2xl" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={material.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={material.image}
                alt={material.title}
                className="h-full w-full object-cover img-grade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/25 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Subtitle / Title overlays */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={material.id}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="eyebrow mb-1.5 text-gold">{material.subtitle}</p>
                <h3 className="font-display text-2xl md:text-3xl text-cream">{material.title}</h3>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Accordion Buttons */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-4">
          {MATERIALS.map((item, i) => {
            const isActive = active === i;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-expanded={isActive}
                className={`group relative w-full text-left rounded-xl border p-5 md:p-6 transition-all duration-500 overflow-hidden cursor-pointer ${
                  isActive
                    ? 'border-gold/30 bg-cream/[0.04] shadow-[0_15px_30px_-10px_rgba(212,175,55,0.08)]'
                    : 'border-cream/5 bg-transparent hover:border-gold/15 hover:bg-cream/[0.01]'
                }`}
              >
                {/* Active background indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-mat-bg"
                    className="absolute inset-0 bg-gradient-to-r from-gold/5 via-cream/[0.02] to-transparent pointer-events-none"
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  />
                )}
                {/* Glowing Indicator bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500 ${
                    isActive ? 'bg-gold shadow-[0_0_8px_#d4af37]' : 'bg-transparent'
                  }`}
                />

                <div className="relative z-10 flex items-center gap-4">
                  <span className={`font-body text-[10px] tracking-[0.3em] font-bold ${isActive ? 'text-gold' : 'text-cream/30 group-hover:text-cream/50'}`}>
                    0{i + 1}
                  </span>
                  <span className={`h-px flex-1 transition-all duration-500 ${isActive ? 'bg-gold/40' : 'bg-cream/10'}`} />
                </div>

                <h4 className={`relative z-10 mt-3 font-display text-lg md:text-xl transition-colors duration-300 ${isActive ? 'text-gold font-medium' : 'text-cream/70 group-hover:text-cream'}`}>
                  {item.title}
                </h4>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden relative z-10"
                    >
                      <p className="font-body text-xs md:text-sm leading-relaxed text-cream/50">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}