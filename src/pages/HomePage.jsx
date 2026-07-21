import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Gem, Hammer, Ruler, ArrowUpRight, Sparkles, Users
} from 'lucide-react';
import { HERO_SLIDES, SPACES, MATERIALS, IMG } from '../data/content';
import Testimonials from '../components/sections/Testimonials';
import furnitureCategoryImg from '../assets/furniture/00_hero.jpg';
import tilesCategoryImg from '../assets/tiles/AMARA_Image_01.jpg';
import graniteCategoryImg from '../assets/granite/Hawk_Image_04.jpg';
import homeGal1 from '../assets/granite/Hawk_Image_04.jpg';
import homeGal2 from '../assets/furniture/p020_02.jpg';
import homeGal3 from '../assets/furniture/p019_03.jpg';
import homeGal4 from '../assets/granite/Hawk_Image_25.jpg';
import homeGal5 from '../assets/tiles/tiles 1.jpg';
import homeGal6 from '../assets/furniture/p019_04.jpg';

/* ────────── ANIMATION HELPERS ────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`block text-[10px] font-semibold uppercase tracking-[0.42em] mb-5 ${light ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}`}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {children}
    </span>
  );
}

function GoldBtn({ children, href = '#/consultation', dark = false }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] border border-[#D4AF37] transition-all duration-700 ${dark ? 'text-[#D4AF37] hover:text-[#0B0B0B]' : 'text-[#D4AF37] hover:text-[#0B0B0B]'}`}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

function GoldRule({ className = '' }) {
  return <div className={`h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent ${className}`} />;
}

/* ────────── DATA ────────── */
const FEATURED_CATEGORIES = [
  { id: '01', label: 'Tiles', title: 'Premium Tiles', href: '#/tiles', image: tilesCategoryImg },
  { id: '02', label: 'Stone', title: 'Natural Granites', href: '#/granite', image: graniteCategoryImg },
  { id: '03', label: 'Furniture', title: 'Custom Handcrafted Furniture', href: '#/furniture', image: furnitureCategoryImg },

];

const WHY_ITEMS = [
  { icon: Gem, label: 'Premium Quality' },
  { icon: Hammer, label: 'Handcrafted Finish' },
  { icon: Ruler, label: 'Custom Furniture' },
  { icon: ArrowUpRight, label: 'End-to-End Solutions' },
  { icon: Sparkles, label: 'Luxury Materials' },
  { icon: Users, label: 'Expert Consultation' },
];

const STATS = [
  { number: '16+', label: 'Years of Legacy' },
  { number: '500+', label: 'Projects Completed' },
  { number: '300+', label: 'Happy Families' },
  { number: 'Serving Clients Worldwide', label: '' },
];

const TESTIMONIALS = [
  { quote: 'The oak dining table is the heart of our home. The craftsmanship is immaculate and we receive compliments every time we host.', author: 'Aravind Swamy', role: 'Chennai Duplex' },
  { quote: 'The granite kitchen surfaces from Amara are exceptional. The quality is outstanding and the installation was flawless.', author: 'Priya Raghunathan', role: 'Coimbatore Residence' },
  { quote: 'Our velvet sofa looks better in our living room than it did in any photograph. The fabric quality is in a league of its own.', author: 'Meera & Raghavan', role: 'Coimbatore Villa' },
];

const INTERIOR_SECTIONS = [
  {
    dark: true,
    eyebrow: 'The Furniture Collection',
    title: 'Custom Handcrafted Furniture',
    desc: 'Designed to your exact dimensions and aesthetic vision. We craft solid timber tables, premium seating, and signature casework detailed by hand and built to endure generations.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90',
  },
  {
    dark: false,
    eyebrow: 'The Material Collection',
    title: 'Premium Tiles & Natural Granite',
    desc: 'An exceptional library of imported porcelain tiles and hand-selected granite slabs. Sourced from the world\'s finest quarries and finished to perfection for sophisticated spaces.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=90',
  },
];

/* ══════════════════════════════════════════ */
export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.07]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-rotate hero slides every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Window scroll setup
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="bg-[#0B0B0B]">

      {/* ══ 1. HERO ══ */}
      <section ref={heroRef} id="hero" className="relative h-[100dvh] overflow-hidden bg-[#0B0B0B]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 w-full h-[115%] -top-[7.5%] origin-center">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentSlideIndex}
              src={HERO_SLIDES[currentSlideIndex]}
              alt="Amara Living luxury interior"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(1.25) contrast(1.02)' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/85 via-[#0B0B0B]/15 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/35 via-transparent to-transparent z-10" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="wrap">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="block text-[15px] font-semibold uppercase tracking-[0.45em] text-[#D4AF37] mb-8"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Est.2010
            </motion.p>
            <h1 className="mb-8 space-y-2">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="block font-display text-[clamp(2.4rem,5.5vw,6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#F8F6F2] pb-3 pr-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Crafting Spaces
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="block font-display text-[clamp(2.4rem,5.5vw,6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#D4AF37] pb-3 pr-4"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}
                >
                  That Matter
                </motion.span>
              </div>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="max-w-md text-[#FAF6F0]/80 text-base font-light leading-[1.9] mb-18"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Transforming Spaces with Premium Tiles, Granites,
              Furniture & End-to-End Space Solutions.


            </motion.p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="h-14 w-px bg-gradient-to-b from-[#D4AF37]/60 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Scroll</span>
        </motion.div>
      </section>

      {/* ══ 2. STATS BAR ══ */}
      <section className="bg-[#111111] border-y border-[#F8F6F2]/5">
        <div className="wrap py-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#F8F6F2]/5">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="px-8 py-10 text-center">
                <p
                  className="font-display text-3xl md:text-4xl font-medium text-[#D4AF37] mb-2 leading-none"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  {s.number}
                </p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. FEATURED COLLECTIONS — LIGHT PREMIUM EDITORIAL GRID ══ */}
      <section id="spaces" className="bg-[#FAF6F0] py-12 md:py-16 border-t border-[#0B0B0B]/5">
        <div className="wrap">
          <Reveal className="px-0 mb-10 md:mb-12">
            <Eyebrow>Our Collections</Eyebrow>
            <div className="flex items-end justify-between flex-wrap gap-8">
              <h2
                className="font-display text-[clamp(2rem,4.5vw,4.8rem)] font-medium leading-[0.95] tracking-tight text-[#0B0B0B]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Curated for<br />
                <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Sophisticated Living</em>
              </h2>
              <p className="text-lg md:text-xl text-[#555555] font-light leading-[1.8] max-w-md md:text-right pb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Three foundations of exceptional living — premium tiles, natural granites, and custom handcrafted furniture.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {FEATURED_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 0.1}>
                <a href={cat.href} className="group block relative cursor-pointer">
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF6F0] border border-[#D4AF37]/10 rounded-sm mb-4">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/5 transition-colors duration-700" />
                  </div>

                  {/* Text Details below the image */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#0B0B0B]/10 pb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {cat.label}
                      </span>
                      <span className="text-[11px] font-medium tracking-[0.35em] text-[#0B0B0B]/40" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {cat.id}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-4 pt-1">
                      <h3
                        className="font-display text-2xl md:text-3xl font-medium text-[#0B0B0B] leading-tight group-hover:text-[#D4AF37] transition-colors duration-500"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {cat.title}
                      </h3>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#0B0B0B]/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] text-[#0B0B0B] group-hover:text-[#FAF6F0] transition-all duration-500 shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. INTERIOR SHOWCASE — ALTERNATING ══ */}
      {INTERIOR_SECTIONS.map((sc, i) => (
        <InteriorSection key={sc.title} sc={sc} index={i} />
      ))}

      {/* ══ 5. PROJECT GALLERY — LIGHT THEME ══ */}
      <section id="surfaces" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/5">
        <div className="wrap mb-14">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <span
                  className="block text-[15px] md:text-[17px] font-bold uppercase tracking-[0.42em] mb-6"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9A7B1E' }}
                >
                  Project Gallery
                </span>
                <h2
                  className="font-display text-[clamp(2.4rem,5.5vw,6rem)] font-medium leading-[0.98] tracking-tight text-[#0B0B0B]"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Spaces We've<br />
                  <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Transformed</em>
                </h2>
              </div>
              <GoldBtn href="#/company">View All Projects</GoldBtn>
            </div>
          </Reveal>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 px-4 md:px-6 space-y-3">
          {[
            { tag: 'Stone', title: 'Absolute Black Granite', image: homeGal1, tall: true },
            { tag: 'Dining', title: 'Coimbatore Residence', image: homeGal2, tall: false },
            { tag: 'Bedroom', title: 'Nungambakkam Duplex', image: homeGal3, tall: false },
            { tag: 'Stone', title: 'Grand Lobby, Chennai', image: homeGal4, tall: true },
            { tag: 'Kitchen', title: 'OMR Corporate Suite', image: homeGal5, tall: false },
            { tag: 'Furniture', title: 'Bespoke Lounge Seating', image: homeGal6, tall: true },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="group relative overflow-hidden break-inside-avoid rounded-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                />
                <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/55 transition-all duration-700 flex flex-col justify-end p-8">
                  <div className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37] mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {item.tag}
                    </span>
                    <h3 className="font-display text-xl font-medium text-[#F8F6F2]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 6. WHY CHOOSE AMARA LIVING ══ */}
      <section id="why" className="relative bg-[#FAF6F0] pt-16 pb-24 md:pt-20 md:pb-28 border-t border-[#0B0B0B]/8 overflow-hidden">
        {/* Ambient gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.10) 0%, transparent 65%)' }}
        />
        {/* Watermark */}
        <span
          className="absolute -top-6 right-0 text-[16vw] leading-none font-medium select-none pointer-events-none whitespace-nowrap"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            background: 'linear-gradient(180deg, rgba(184, 145, 42, 0.16) 0%, rgba(184, 145, 42, 0.04) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
          aria-hidden="true"
        >
          Amara
        </span>

        <div className="wrap relative z-10">
          <Reveal>
            <div className="text-left mb-12 md:mb-16">
              <span
                className="block text-[15px] md:text-[17px] font-bold uppercase tracking-[0.42em] mb-6"
                style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9A7B1E' }}
              >
                The Amara Standard
              </span>
              <h2
                className="font-display text-[clamp(2.2rem,4.5vw,5rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Why Choose <em style={{ color: '#A8821F', fontStyle: 'italic', textShadow: '0 2px 12px rgba(184, 145, 42, 0.25)' }}>Amara Living</em>
              </h2>
              <div className="h-[2px] w-32 mt-8" style={{ background: 'linear-gradient(90deg, #B8912A 0%, transparent 100%)' }} />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {WHY_ITEMS.map((item, i) => (
              <WhyCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. OUR LEGACY & PHILOSOPHY ══ */}
      <section id="story" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8 overflow-hidden">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left — Design Studio Image */}
            <Reveal className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=90"
                  alt="Amara Living Creative Drafting Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <GoldRule className="mb-4" />
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Amara Living Design Studio</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#B8912A]/25 pointer-events-none" />
            </Reveal>

            {/* Right — Combined Text */}
            <div className="lg:col-span-7 lg:py-8">
              <Reveal>
                <span
                  className="block text-[15px] md:text-[17px] font-bold uppercase tracking-[0.42em] mb-6"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9A7B1E' }}
                >
                  Our Legacy
                </span>
                <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B] mb-8" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  16 Years of<br />
                  <em style={{ color: '#B8912A', fontStyle: 'italic' }}>Craftsmanship</em>
                </h2>
                <GoldRule className="mb-10 max-w-xs" />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-base text-[#2A2A2A] font-light leading-[1.9] mb-8 max-w-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  From the finest raw materials to impeccable finishing, we craft timeless spaces that reflect elegance, quality, and a legacy you can trust.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <blockquote className="font-display text-xl md:text-2xl font-medium leading-[1.5] text-[#3A3A3A] mb-10 pl-6 border-l-2 border-[#B8912A]/60" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}>
                  "Amara Living bridges architectural intent and material honesty. From locally selected quarries to our integrated Chennai workshop, our work is defined by precision and permanence."
                </blockquote>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-sm text-[#555555] font-light leading-[1.9] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Since 2010, Amara Living has operated with a singular focus: aligning raw natural materials with structural integrity. We believe that true luxury lies in the durability of joinery, the precise grain matching of stone slabs, and layouts tailored to organic living routines.
                </p>
                <p className="text-sm text-[#555555] font-light leading-[1.9]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Our custom fabrication suite handles processing under one roof. Each slab of black granite or plank of walnut timber undergoes extensive kiln drying, surface sealing, and dry-matching before reaching installation. This keeps the execution flawless and the quality pristine.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#0B0B0B]/10">
                  {[
                    { num: '2010', label: 'Established Studio' },
                    { num: '1,200+', label: 'Projects Delivered' },
                    { num: '40+', label: 'Master Artisans' }
                  ].map(s => (
                    <div key={s.label}>
                      <p className="font-display text-2xl font-medium text-[#9A7B1E] mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{s.num}</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.24} className="mt-10">
                <GoldBtn href="#/company">About Amara Living</GoldBtn>
              </Reveal>
            </div>
          </div>
        </div>
      </section>



      {/* ══ Where to Buy / Experience Centers Intro ══ */}
      <section id="where-to-buy-intro" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.08),transparent_50%)]" aria-hidden="true" />
        <div className="wrap relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column: Text Content */}
            <div>
              <Reveal>
                <span
                  className="block text-[15px] md:text-[17px] font-bold uppercase tracking-[0.42em] mb-6"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9A7B1E' }}
                >
                  Experience Centers &amp; Contacts
                </span>
                <h2
                  className="font-display text-[clamp(2rem,3.8vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-[#0B0B0B] mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Where to Experience<br />
                  <em style={{ color: '#B8912A', fontStyle: 'italic' }}>Amara Living</em>
                </h2>
                <GoldRule className="mb-10 max-w-xs" />
                <p className="text-base text-[#2A2A2A] font-light leading-[1.9] mb-8 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Touch the cold veining of our natural granite blocks, run your fingers over our handcrafted timber joints, and select the perfect bespoke details with our in-house consultants.
                </p>
                <p className="text-sm text-[#555555] font-light leading-[1.9] mb-12 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Visit our flagship Chennai Atelier or Madurai Experience Center. For national shipments and international projects in the Gulf and Southeast Asia, connect directly with our global liaison representatives.
                </p>
                <GoldBtn href="#/where-to-buy">Explore Experience Centers &amp; Contacts</GoldBtn>
              </Reveal>
            </div>

            {/* Right Column: Visual Showcase */}
            <Reveal delay={0.2} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#B8912A]/30">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
                  alt="Amara Living experience center showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block mb-2 font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Flagship Studio</span>
                  <h3 className="font-display text-xl font-medium text-white" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Chennai Atelier &amp; Stone Yard</h3>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#B8912A]/25 pointer-events-none -z-10" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS ══ */}
      <Testimonials />

      {/* ══ 9. CTA ══ */}
      <section className="relative bg-[#0B0B0B] py-20 md:py-28 overflow-hidden border-t border-[#F8F6F2]/5">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=80" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]" />
        </div>
        <div className="wrap relative z-10 text-center">
          <Reveal>
            <Eyebrow>Begin Your Journey</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display text-[clamp(2.2rem,5vw,6rem)] font-medium leading-[0.93] tracking-tight text-[#F8F6F2] mb-8 max-w-5xl mx-auto"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Let's Create Your<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Space</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#A0A0A0] text-base font-light leading-[1.9] max-w-md mx-auto mb-14" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Our design consultants work with you from concept to completion — every piece, every surface, every detail considered.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <GoldBtn href="#/consultation">Book Consultation</GoldBtn>
              <a
                href="tel:7397623509"
                className="inline-flex items-center gap-3 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#A0A0A0] hover:text-[#F8F6F2] transition-colors duration-500 border border-[#F8F6F2]/10 hover:border-[#F8F6F2]/30"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                +91 7397623509
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}

/* ────────── WHY CHOOSE CARD ────────── */
function WhyCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative p-8 md:p-10 rounded-sm overflow-hidden border border-[#0B0B0B]/[0.10] hover:border-[#D4AF37]/70 transition-all duration-700 hover:shadow-[0_24px_48px_-16px_rgba(11,11,11,0.18),0_8px_20px_-8px_rgba(184,145,42,0.12)]"
      style={{
        background: 'linear-gradient(160deg, #FFFDF9 0%, #F5EFE5 100%)',
        boxShadow: '0 12px 28px -14px rgba(11, 11, 11, 0.12), 0 2px 6px rgba(11, 11, 11, 0.05)',
      }}
    >
      {/* Hover glow sweep */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 55%)' }}
      />
      {/* Ghost number */}
      <span
        className="absolute top-5 right-7 text-6xl md:text-7xl font-medium leading-none select-none transition-colors duration-700"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'rgba(11, 11, 11, 0.14)' }}
        aria-hidden="true"
      >
        <span className="group-hover:text-[#B8912A]/60 transition-colors duration-700">{number}</span>
      </span>

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="relative w-14 h-14 mb-6 flex items-center justify-center border border-[#B8912A]/60 group-hover:border-[#B8912A] transition-all duration-500 overflow-hidden"
          style={{ boxShadow: '0 4px 10px -4px rgba(184, 145, 42, 0.35)' }}
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#D4AF37] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden="true" />
          <Icon className="relative z-10 w-5 h-5 text-[#9A7B1E] group-hover:text-[#0B0B0B] transition-colors duration-500" strokeWidth={1.6} />
        </div>

        <h3
          className="font-display text-2xl md:text-[1.8rem] font-semibold text-[#141414] group-hover:text-[#9A7B1E] transition-colors duration-500"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {item.label}
        </h3>
      </div>

      {/* Animated bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden" aria-hidden="true">
        <span className="block h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/60 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ────────── INTERIOR SECTION ────────── */
function InteriorSection({ sc }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden flex items-center border-t border-[#0B0B0B]/8" style={{ backgroundColor: '#FAF6F0' }}>
      <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
        {/* Image dimmed with brightness filter for better text readability */}
        <img
          src={sc.image}
          alt={sc.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.9)' }}
        />
        {/* Strong cream gradient covering text zone, fading to transparent on right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(240, 234, 224, 0.93) 0%, rgba(240, 234, 224, 0.82) 38%, rgba(240, 234, 224, 0.42) 62%, rgba(240, 234, 224, 0.06) 100%)'
          }}
        />
        {/* Subtle bottom fade to anchor the section */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(240, 234, 224, 0.60) 0%, transparent 45%)' }}
        />
      </motion.div>

      <div className="wrap relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Eyebrow — gold, bold, clearly visible */}
          <span
            className="block text-[15px] md:text-[17px] font-bold uppercase tracking-[0.42em] mb-6"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#9A7B1E', textShadow: '0 1px 2px rgba(250, 246, 240, 0.8)' }}
          >
            {sc.eyebrow}
          </span>
          {/* Main heading — deep dark charcoal */}
          <h2
            className="font-display text-[clamp(1.9rem,4vw,4.5rem)] font-medium leading-[0.98] tracking-tight mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#0B0B0B' }}
          >
            {sc.title}
          </h2>
          <div className="h-px w-24 mb-8" style={{ background: 'linear-gradient(90deg, #D4AF37 0%, transparent 100%)' }} />
          {/* Description — dark, readable */}
          <p className="text-base font-normal leading-[1.9] mb-12 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#2A2A2A' }}>
            {sc.desc}
          </p>
          <GoldBtn href="#/consultation">Explore More</GoldBtn>
        </motion.div>
      </div>
    </section>
  );
}
