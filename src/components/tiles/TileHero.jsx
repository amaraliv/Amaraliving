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
    const el = document.getElementById('collection-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative h-[90dvh] md:h-[100dvh] w-full overflow-hidden bg-[#0B0B0B]">
      {/* Parallax Background Layer - Full Clarity High Resolution Architecture */}
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%] origin-center pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Luxury Architectural Tile Surface"
          className="w-full h-full object-cover"
        />
        {/* Sleek Dark Scrim for High Contrast Legibility - No White Haze */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/85 via-[#0B0B0B]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111]/90 text-[#C8102E] border border-white/20 backdrop-blur-md text-[10px] font-semibold tracking-[0.35em] uppercase shadow-md">
            <Sparkles className="w-3 h-3 text-[#C8102E]" />
            Amara Living • Craftsmanship
          </span>
        </motion.div>

        {/* Hero Heading & Subtitle */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-[clamp(2.8rem,7vw,7.2rem)] font-light tracking-tight leading-[0.92] text-[#FAF6F0] font-display mb-6 drop-shadow-md"
            style={{ fontFamily: 'Cormorant Garamond, Playfair Display, Georgia, serif' }}
          >
            TILES <br />
            <span className="font-normal italic text-[#C8102E]">
              COLLECTION
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="text-base md:text-xl font-light text-[#D8D8D8] max-w-xl leading-relaxed mb-10 drop-shadow-sm"
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
              className="group relative inline-flex items-center justify-center px-9 py-4 rounded-full bg-[#111111] text-white font-semibold text-xs tracking-[0.25em] uppercase overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_45px_rgba(200,16,46,0.35)] transition-all duration-500 hover:scale-105 border border-white/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Collection
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 text-[#C8102E]" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C8102E] to-[#E32B40] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
