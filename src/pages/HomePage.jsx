import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from '../utils/gsap';
import {
  Gem, Hammer, Ruler, ArrowUpRight, Sparkles, Users,
  MoveRight
} from 'lucide-react';
import { HERO_SLIDES, SPACES, MATERIALS, TIMELINE, IMG } from '../data/content';
import CurvedSectionTransition from '../components/common/CurvedSectionTransition';
import Testimonials from '../components/sections/Testimonials';

/* ────────── THEME COLOURS ────────── */
const C = {
  black: '#0B0B0B',
  white: '#F8F6F2',
  gold: '#D4AF37',
  gray: '#A0A0A0',
  darkPanel: '#111111',
};

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
  { id: '01', label: 'Stone', title: 'Granite & Marble', href: '#/granite', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=90' },
  { id: '02', label: 'Furniture', title: 'Bespoke Furniture', href: '#/furniture', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=90' },
  { id: '03', label: 'Tiles', title: 'Designer Tiles', href: '#/tiles', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90' },
];

const WHY_ITEMS = [
  { icon: Gem, label: 'Premium Quality', desc: 'Only the finest hardwoods, natural stones & fabrics.' },
  { icon: Hammer, label: 'Handcrafted Finish', desc: 'Each joint and surface finished by hand.' },
  { icon: Ruler, label: 'Custom Furniture', desc: 'Built to your dimensions and aesthetic vision.' },
  { icon: ArrowUpRight, label: 'End-to-End Solutions', desc: 'From concept to complete installation.' },
  { icon: Sparkles, label: 'Luxury Materials', desc: 'Belgian velvet, solid oak, natural granite.' },
  { icon: Users, label: 'Expert Consultation', desc: 'Dedicated interior design advisory.' },
];

const STATS = [
  { number: '16+', label: 'Years of Legacy' },
  { number: '500+', label: 'Projects Completed' },
  { number: '300+', label: 'Happy Families' },
  { number: 'Pan India', label: 'Delivery Support' },
];

const TESTIMONIALS = [
  { quote: 'The oak dining table is the heart of our home. The craftsmanship is immaculate and we receive compliments every time we host.', author: 'Aravind Swamy', role: 'Chennai Duplex' },
  { quote: 'The granite kitchen surfaces from Amara are exceptional. The quality is outstanding and the installation was flawless.', author: 'Priya Raghunathan', role: 'Coimbatore Residence' },
  { quote: 'Our velvet sofa looks better in our living room than it did in any photograph. The fabric quality is in a league of its own.', author: 'Meera & Raghavan', role: 'Coimbatore Villa' },
];

const INTERIOR_SECTIONS = [
  {
    dark: true,
    eyebrow: 'The Living Collection',
    title: 'Spaces That Speak Without Words',
    desc: 'We compose rooms as an architect composes buildings — every material, proportion, and surface in deliberate service of the whole.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90',
  },
  {
    dark: false,
    eyebrow: 'Stone & Surface',
    title: 'Where Natural Stone Meets Precision',
    desc: 'Hand-selected from the world\'s finest quarries. Each slab unique in character — veined, layered, and alive with geological history.',
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
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-[#0B0B0B]/10 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/70 via-transparent to-transparent z-10" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="wrap">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="block text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D4AF37] mb-8"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Premium Interiors — Since 2010
            </motion.p>
            <h1 className="mb-8 space-y-2">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  className="block font-display text-[clamp(2.4rem,5.5vw,6rem)] font-medium leading-[0.92] tracking-[-0.02em] text-[#F8F6F2]"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Crafting Luxury
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="block font-display text-[clamp(2.4rem,5.5vw,6rem)] font-medium leading-[0.92] tracking-[-0.02em] text-[#D4AF37]"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}
                >
                  Spaces
                </motion.span>
              </div>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="max-w-md text-[#FAF6F0]/80 text-base font-light leading-[1.9] mb-12"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Luxury granite, premium furniture, and timeless interiors — designed for sophisticated living.
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

      {/* ══ 3. FEATURED COLLECTIONS — EDGE TO EDGE CARDS ══ */}
      <section id="spaces" className="bg-[#0B0B0B] py-4 px-4 md:px-6">
        <Reveal className="wrap py-20 md:py-24 px-0">
          <Eyebrow>Our Collections</Eyebrow>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <h2
              className="font-display text-[clamp(1.9rem,4vw,4.5rem)] font-medium leading-[0.95] tracking-tight text-[#F8F6F2]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Curated for<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Sophisticated Living</em>
            </h2>
            <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Three pillars of luxury — stone, timber, and tile — each sourced from the finest ateliers.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {FEATURED_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.1}>
              <a href={cat.href} className="group block relative h-[75vh] overflow-hidden cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/15 to-transparent" />

                <span className="absolute top-8 left-8 text-[11px] font-medium tracking-[0.35em] text-[#D4AF37]/70" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {cat.id}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <span
                    className="block text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37] mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {cat.label}
                  </span>
                  <h3
                    className="font-display text-3xl md:text-4xl font-medium text-[#F8F6F2] leading-tight"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {cat.title}
                  </h3>
                  <div className="mt-5 flex items-center gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75">
                    <div className="h-px w-8 bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Explore
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 4. INTERIOR SHOWCASE — ALTERNATING ══ */}
      {INTERIOR_SECTIONS.map((sc, i) => (
        <InteriorSection key={sc.title} sc={sc} index={i} />
      ))}

      {/* ══ 5. WHY CHOOSE AMARA LIVING ══ */}
      <section id="why" className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <Eyebrow>The Amara Standard</Eyebrow>
              <h2
                className="font-display text-[clamp(1.9rem,3.8vw,4.2rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] max-w-3xl mx-auto"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Why Choose<br />
                <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Amara Living</em>
              </h2>
              <GoldRule className="max-w-xs mx-auto mt-10" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#F8F6F2]/8">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.08}>
                  <div className="group border-b border-r border-[#F8F6F2]/8 p-10 md:p-14 hover:bg-[#F8F6F2]/[0.025] transition-colors duration-700">
                    <div className="mb-10 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/70 transition-all duration-500 group-hover:bg-[#D4AF37]/5">
                      <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.2} />
                    </div>
                    <h3
                      className="font-display text-2xl font-medium text-[#F8F6F2] mb-4"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {item.label}
                    </h3>
                    <p className="text-sm text-[#A0A0A0] font-light leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 6. CRAFTSMANSHIP — EDITORIAL ══ */}
      <section id="story" className="bg-[#111111] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            {/* Left */}
            <div>
              <Reveal>
                <Eyebrow>Our Legacy</Eyebrow>
                <h2
                  className="font-display text-[clamp(2rem,3.8vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-[#F8F6F2] mb-10"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  16 Years of<br />
                  <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Craftsmanship</em>
                </h2>
                <GoldRule className="mb-10 max-w-xs" />
                <p className="text-base text-[#A0A0A0] font-light leading-[1.9] mb-12 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  From the finest raw materials to impeccable finishing, we craft timeless spaces that reflect elegance, quality, and a legacy you can trust.
                </p>
                <GoldBtn href="#/company">About Amara Living</GoldBtn>
              </Reveal>

              {/* Process steps */}
              <div className="mt-16 space-y-0">
                {['Raw Material', 'Design', 'Manufacturing', 'Installation', 'Luxury Living'].map((step, i) => (
                  <Reveal key={step} delay={i * 0.08}>
                    <div className="flex items-center gap-6 py-5 border-t border-[#F8F6F2]/8 first:border-t-0">
                      <span className="text-[10px] font-medium tracking-[0.38em] text-[#D4AF37]/50 shrink-0 w-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        0{i + 1}
                      </span>
                      <div className="h-px flex-1 bg-[#F8F6F2]/8" />
                      <span className="font-display text-lg font-medium text-[#F8F6F2]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {step}
                      </span>
                    </div>
                  </Reveal>
                ))}
                <div className="h-px bg-[#F8F6F2]/8" />
              </div>
            </div>

            {/* Right — Image */}
            <Reveal delay={0.2} className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
                  alt="Amara Living craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/50 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <GoldRule className="mb-5" />
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Built on trust. Crafted for life.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/15 pointer-events-none" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 7. COMPANY INTRO ══ */}
      <section id="company-intro" className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#F8F6F2]/5 overflow-hidden">
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
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#D4AF37]/10 pointer-events-none" />
            </Reveal>

            {/* Right — Text */}
            <div className="lg:col-span-7 lg:py-8">
              <Reveal>
                <Eyebrow>Our Philosophy</Eyebrow>
                <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] mb-8" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Bespoke Interiors Built For<br />
                  <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Permanence</em>
                </h2>
                <GoldRule className="mb-10 max-w-xs" />
              </Reveal>
              <Reveal delay={0.1}>
                <blockquote className="font-display text-xl md:text-2xl font-medium leading-[1.5] text-[#F8F6F2]/90 mb-10 pl-6 border-l-2 border-[#D4AF37]/50" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}>
                  "Amara Living bridges architectural intent and material honesty. From locally selected quarries to our integrated Chennai workshop, our work is defined by precision and permanence."
                </blockquote>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Since 2010, Amara Living has operated with a singular focus: aligning raw natural materials with structural integrity. We believe that true luxury lies in the durability of joinery, the precise grain matching of stone slabs, and layouts tailored to organic living routines.
                </p>
                <p className="text-sm text-[#A0A0A0] font-light leading-[1.9]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Our custom fabrication suite handles processing under one roof. Each slab of black granite or plank of walnut timber undergoes extensive kiln drying, surface sealing, and dry-matching before reaching installation. This keeps the execution flawless and the quality pristine.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#F8F6F2]/8">
                  {[
                    { num: '2010', label: 'Established Studio' },
                    { num: '1,200+', label: 'Projects Delivered' },
                    { num: '40+', label: 'Master Artisans' }
                  ].map(s => (
                    <div key={s.label}>
                      <p className="font-display text-2xl font-medium text-[#D4AF37] mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{s.num}</p>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.25} className="mt-10">
                <GoldBtn href="#/company">Full Company Story</GoldBtn>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. INSPIRATION GALLERY ══ */}
      <section id="surfaces" className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap mb-20">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <Eyebrow>Project Gallery</Eyebrow>
                <h2
                  className="font-display text-[clamp(1.9rem,3.8vw,4.2rem)] font-medium leading-[0.98] tracking-tight text-[#F8F6F2]"
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
            { tag: 'Living Room', title: 'Alibaug Penthouse', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=90', tall: true },
            { tag: 'Dining', title: 'Coimbatore Residence', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=90', tall: false },
            { tag: 'Bedroom', title: 'Nungambakkam Duplex', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=90', tall: false },
            { tag: 'Stone', title: 'Grand Lobby, Chennai', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=90', tall: true },
            { tag: 'Kitchen', title: 'OMR Corporate Suite', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=90', tall: false },
            { tag: 'Living', title: 'Besant Nagar Villa', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=90', tall: true },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="group relative overflow-hidden break-inside-avoid">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                />
                <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/60 transition-all duration-700 flex flex-col justify-end p-8">
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

/* ────────── INTERIOR SECTION ────────── */
function InteriorSection({ sc }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const bg = sc.dark ? '#0B0B0B' : '#111111';
  const textPrimary = '#F8F6F2';
  const textSub = '#A0A0A0';

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden flex items-center border-t border-[#F8F6F2]/5" style={{ backgroundColor: bg }}>
      <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
        <img src={sc.image} alt={sc.title} className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${bg} 45%, transparent 85%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg} 8%, transparent 50%)` }} />
      </motion.div>

      <div className="wrap relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {sc.eyebrow}
          </span>
          <h2
            className="font-display text-[clamp(1.9rem,4vw,4.5rem)] font-medium leading-[0.98] tracking-tight mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: textPrimary }}
          >
            {sc.title}
          </h2>
          <div className="h-px w-24 mb-8" style={{ background: 'linear-gradient(90deg, #D4AF37 0%, transparent 100%)' }} />
          <p className="text-base font-light leading-[1.9] mb-12 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: textSub }}>
            {sc.desc}
          </p>
          <GoldBtn href="#/consultation">Explore More</GoldBtn>
        </motion.div>
      </div>
    </section>
  );
}
