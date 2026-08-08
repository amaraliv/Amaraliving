import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function TileHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollToSize = () => {
    const el = document.getElementById('choose-size');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative h-[90dvh] md:h-[100dvh] w-full overflow-hidden bg-[#F4F1EA]">
      {/* Parallax Background Layer - Dimmed Whiteness for Rich Architectural Depth */}
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%] origin-center pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury Architectural Tile Surface"
          className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] saturate-[0.95]"
        />
        {/* Soft Dimmed Vignette & Gradient Overlays - Prevents Overexposure */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F1EA] via-[#F4F1EA]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA]/85 via-[#F4F1EA]/50 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 h-full wrap flex flex-col justify-center pt-28 pb-16 md:pb-20"
      >
        {/* Top Tagline Badge with High Contrast */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111]/90 text-[#D4AF37] border border-white/20 backdrop-blur-md text-[10px] font-semibold tracking-[0.35em] uppercase shadow-md">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            Amara Living • Craftsmanship
          </span>
        </motion.div>

        {/* Hero Heading & Subtitle */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-[clamp(2.8rem,7vw,7.2rem)] font-light tracking-tight leading-[0.92] text-[#111111] font-display mb-6 drop-shadow-xs"
            style={{ fontFamily: 'Cormorant Garamond, Playfair Display, Georgia, serif' }}
          >
            TILES <br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#9E7B1A] to-[#C59B27]">
              COLLECTION
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="text-base md:text-xl font-normal text-neutral-900 max-w-xl leading-relaxed mb-10 drop-shadow-xs"
          >
            Explore premium vitrified tiles crafted for modern living. Architecturally calibrated formats with uncompromised precision and texture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="flex flex-wrap items-center gap-5"
          >
            <button
              onClick={scrollToSize}
              className="group relative inline-flex items-center justify-center px-9 py-4 rounded-full bg-[#111111] text-white font-semibold text-xs tracking-[0.25em] uppercase overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_45px_rgba(184,148,31,0.35)] transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Collection
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#B8941F] to-[#DEC06A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
