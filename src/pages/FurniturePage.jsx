import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Gem, Hammer, Ruler, Sparkles, Star, Users } from 'lucide-react';
import f1 from '../assets/furniture/p007_01.jpg';
import f2 from '../assets/furniture/p007_02.jpg';
import f3 from '../assets/furniture/p007_03.jpg';
import f4 from '../assets/furniture/p007_04.jpg';
import f5 from '../assets/furniture/p007_05.jpg';
import f6 from '../assets/furniture/p007_06.jpg';
import sig1 from '../assets/furniture/p009_01.jpg';
import sig2 from '../assets/furniture/p009_02.jpg';
import sig3 from '../assets/furniture/p009_03.jpg';
import gal1 from '../assets/furniture/p008_01.jpg';
import gal2 from '../assets/furniture/p008_02.jpg';
import gal3 from '../assets/furniture/p008_03.jpg';
import gal4 from '../assets/furniture/p008_04.jpg';
import gal5 from '../assets/furniture/p008_05.jpg';
import gal6 from '../assets/furniture/p008_06.jpg';
import show1 from '../assets/furniture/p010_01.jpg';
import show2 from '../assets/furniture/p010_02.jpg';

/* ─────────────────── DATA ─────────────────── */

const PRODUCTS = [
  {
    id: 'f1',
    name: 'Atelier Bouclé Sofa',
    category: 'SOFAS',
    desc: 'Deep bouclé upholstery with sculpted low lines and solid oak plinth.',
    image: f1,
    specs: 'W: 240cm x D: 105cm x H: 72cm | Bouclé, White Oak',
  },
  {
    id: 'f2',
    name: 'Pierre Teak Lounge Chair',
    category: 'CHAIRS',
    desc: 'Mid-century lounge chair with hand-woven cane and dark leather upholstery.',
    image: f2,
    specs: 'W: 75cm x D: 82cm x H: 78cm | Solid Teak, Full-Grain Leather',
  },
  {
    id: 'f3',
    name: 'Monolith Oak Dining Table',
    category: 'TABLES',
    desc: 'Minimalist dining table crafted from solid French oak and stone bases.',
    image: f3,
    specs: 'L: 280cm x W: 110cm x H: 75cm | French Oak, Black Granite',
  },
  {
    id: 'f4',
    name: 'Linea Walnut Platform Bed',
    category: 'BEDS & STORAGE',
    desc: 'American walnut floating bedstead with natural linen headboard.',
    image: f4,
    specs: 'King Size | American Walnut, Belgian Linen',
  },
  {
    id: 'f5',
    name: 'Basalt Credenza',
    category: 'BEDS & STORAGE',
    desc: 'Smoked oak storage console topped with leather-finished granite.',
    image: f5,
    specs: 'W: 180cm x D: 45cm x H: 75cm | Smoked Oak, Granite',
  },
  {
    id: 'f6',
    name: 'Travertine Slab Coffee Table',
    category: 'TABLES',
    desc: 'Minimal organic-shaped travertine top table with column base.',
    image: f6,
    specs: 'W: 120cm x D: 120cm x H: 38cm | Honed Classico Travertine',
  },
];


const COLLECTIONS = [
  {
    id: '01',
    label: 'Living',
    title: 'Sofas & Lounges',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: '02',
    label: 'Dining',
    title: 'Dining Spaces',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=90',
  },
  {
    id: '03',
    label: 'Bedroom',
    title: 'Master Suites',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=90',
  },
];

const SIGNATURE = [
  {
    eyebrow: 'The Living Collection',
    title: 'Velvet Lounge Sofa',
    description:
      'Sculpted from sustainable solid beech frames and dressed in hand-selected Belgian velvet. Every curve is engineered for repose — deep enough to disappear into, elegant enough to anchor any room.',
    image: sig1,
  },
  {
    eyebrow: 'The Dining Collection',
    title: 'Solid Oak Dining Table',
    description:
      'Hand-oiled white oak, cut in a single continuous slab and finished without centre joints. The grain tells the story of decades — a table that improves with every gathering held around it.',
    image: sig2,
  },
  {
    eyebrow: 'The Bedroom Collection',
    title: 'Tufted King Bedstead',
    description:
      'Upholstered in linen-velvet with hand-placed diamond tufting. The recessed granite plinth base grounds the bed in architectural weight, while the headboard rises to command the room with quiet authority.',
    image: sig3,
  },
];

const PHILOSOPHY_HIGHLIGHTS = [
  { label: 'Premium Materials', desc: 'Sustainably sourced hardwoods and natural stones.' },
  { label: 'Expert Craftsmanship', desc: 'Master artisans with generations of experience.' },
  { label: 'Bespoke Designs', desc: 'Every piece crafted to your exact specification.' },
  { label: 'Timeless Elegance', desc: 'Designs that transcend trends and seasons.' },
];

const GALLERY = [
  {
    tag: 'Living Room',
    title: 'Alibaug Penthouse',
    image: gal1,
    tall: true,
  },
  {
    tag: 'Dining',
    title: 'Coimbatore Residence',
    image: gal2,
    tall: false,
  },
  {
    tag: 'Bedroom',
    title: 'Nungambakkam Duplex',
    image: gal3,
    tall: false,
  },
  {
    tag: 'Study',
    title: 'Corporate Suite, OMR',
    image: gal4,
    tall: true,
  },
  {
    tag: 'Foyer',
    title: 'Grand Lobby, Chennai',
    image: gal5,
    tall: false,
  },
  {
    tag: 'Living',
    title: 'Besant Nagar Villa',
    image: gal6,
    tall: true,
  },
];

const SHOWCASE = [
  {
    dark: true,
    eyebrow: 'Interior Showcase',
    title: 'The Art of Considered Living',
    desc: 'A space is not merely furnished — it is composed. Each piece we place is chosen for its relationship to light, proportion, and the people who inhabit it.',
    image: show1,
  },
  {
    dark: false,
    eyebrow: 'Spatial Harmony',
    title: 'Where Architecture Meets Craft',
    desc: 'We believe furniture should feel inevitable — as if the room could not exist in any other form. Our bespoke process ensures every dimension serves the whole.',
    image: show2,
  },
];

const WHY = [
  { icon: Gem, label: 'Premium Quality', desc: 'Only the finest hardwoods, stones & fabrics.' },
  { icon: Hammer, label: 'Handcrafted Finish', desc: 'Each joint and surface finished by hand.' },
  { icon: Ruler, label: 'Custom Furniture', desc: 'Built to your dimensions and aesthetic.' },
  { icon: ArrowUpRight, label: 'End-to-End Solutions', desc: 'From concept to complete installation.' },
  { icon: Sparkles, label: 'Luxury Materials', desc: 'Belgian velvet, solid oak, natural granite.' },
  { icon: Users, label: 'Expert Consultation', desc: 'Dedicated interior design advisory.' },
];


/* ─────────────────── ANIMATION VARIANTS ─────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
};

/* ─────────────────── SECTION REVEAL WRAPPER ─────────────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── GOLD BUTTON ─────────────────── */
function GoldButton({ children, href = '#/consultation', light = false }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-700 ${
        light
          ? 'border border-[#D4AF37] text-[#D4AF37] hover:text-[#0B0B0B]'
          : 'border border-[#D4AF37] text-[#D4AF37] hover:text-[#0B0B0B]'
      }`}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <span
        className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

/* ─────────────────── EYEBROW LABEL ─────────────────── */
function Eyebrow({ children }) {
  return (
    <span
      className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-5"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {children}
    </span>
  );
}

/* ─────────────────── GOLD RULE ─────────────────── */
function GoldRule({ className = '' }) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent ${className}`}
    />
  );
}
export default function FurniturePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '22%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'SOFAS', 'CHAIRS', 'TABLES', 'BEDS & STORAGE'];
  const filteredProducts = activeCategory === 'ALL' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8F6F2] text-[#0B0B0B] overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <section ref={heroRef} className="relative h-[100dvh] flex items-end overflow-hidden bg-[#0B0B0B]">
        {/* Parallax image */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=95"
            alt="Ultra-luxury living room with bespoke sofa"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-[#0B0B0B]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full pb-24 md:pb-32"
        >
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <Eyebrow>Amara Living — Bespoke Furniture</Eyebrow>
              <h1
                className="font-display text-[clamp(2.4rem,5.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-[#F8F6F2] mb-8 max-w-5xl"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Crafted for<br />
                <em className="font-normal text-[#D4AF37] not-italic" style={{ fontStyle: 'italic' }}>
                  Timeless Living
                </em>
              </h1>
              <p
                className="text-[#A0A0A0] text-base font-light leading-[1.9] max-w-md mb-12"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Luxury furniture that transforms spaces into experiences.
              </p>
              <GoldButton>Explore Collections</GoldButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 right-14 hidden md:flex flex-col items-center gap-3"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#D4AF37]/60" />
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#A0A0A0] rotate-90 origin-center translate-y-8">
                Scroll
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══ 2. FEATURED COLLECTION — EASTERN EDITION STYLE ══ */}
      <section className="bg-[#FAF6F0] py-16 md:py-20">
        <div className="wrap mb-12">
          <Reveal>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Shop Our Collections</span>
            <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Heritage craftsmanship, locally sourced materials, and timeless design — the grounding vision for Amara Living.
            </p>
          </Reveal>
        </div>
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {COLLECTIONS.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  {/* Clean image box on neutral bg */}
                  <div className="relative overflow-hidden bg-[#F0EDE8] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 aspect-[3/4]">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/15 transition-all duration-500" />
                    {/* Number tag */}
                    <span className="absolute top-4 left-4 text-[9px] font-medium tracking-[0.35em] text-[#D4AF37]/60" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{col.id}</span>
                  </div>
                  {/* Label below */}
                  <div className="flex items-center justify-between mt-4 px-1">
                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{col.label}</span>
                      <h3 className="font-display text-base md:text-lg font-medium text-[#0B0B0B] mt-1 leading-snug" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{col.title}</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-400 shrink-0 ml-3">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. SIGNATURE FURNITURE — ALTERNATING ══ */}
      <section className="bg-[#F8F6F2] py-20 md:py-28">
        <div className="wrap mb-12 md:mb-16">
          <Reveal>
            <Eyebrow>Signature Pieces</Eyebrow>
            <h2
              className="font-display text-[clamp(1.9rem,3.8vw,4.2rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B] max-w-2xl"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Made to Last.<br />
              <em className="not-italic text-[#A0A0A0]">Made to Matter.</em>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-0">
          {SIGNATURE.map((piece, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <SignaturePiece key={piece.title} piece={piece} imageLeft={imageLeft} index={i} />
            );
          })}
        </div>
      </section>

      {/* ══ 4. DESIGN PHILOSOPHY ══ */}
      <section className="bg-[#0B0B0B] py-20 md:py-28 overflow-hidden">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Large Typography */}
            <div>
              <Reveal>
                <Eyebrow>Our Philosophy</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2
                  className="font-display text-[clamp(2rem,3.8vw,4rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] mb-12"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Design is not decoration.<br />
                  <em
                    className="not-italic"
                    style={{ color: '#D4AF37', fontStyle: 'italic' }}
                  >
                    It is intention.
                  </em>
                </h2>
              </Reveal>

              <div className="space-y-0 mt-10">
                {PHILOSOPHY_HIGHLIGHTS.map((h, i) => (
                  <Reveal key={h.label} delay={i * 0.1}>
                    <div className="py-6 border-t border-[#F8F6F2]/8 first:border-t-0">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h3
                            className="font-display text-xl font-medium text-[#F8F6F2] mb-1.5"
                            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                          >
                            {h.label}
                          </h3>
                          <p
                            className="text-sm text-[#A0A0A0] font-light leading-relaxed"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          >
                            {h.desc}
                          </p>
                        </div>
                        <span
                          className="text-[10px] font-medium tracking-[0.35em] text-[#D4AF37]/60 shrink-0 mt-1"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          0{i + 1}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
                <div className="h-px bg-[#F8F6F2]/8" />
              </div>
            </div>

            {/* Right — Luxury Image */}
            <Reveal delay={0.2} className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=90"
                  alt="Luxury interior philosophy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 to-transparent" />
                {/* Floating caption */}
                <div className="absolute bottom-8 left-8 right-8">
                  <GoldRule className="mb-4" />
                  <p
                    className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Amara Living — Atelier 2026
                  </p>
                </div>
              </div>
              {/* Decorative offset border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/20 pointer-events-none" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 4.5 PRODUCT CATALOG — EASTERN EDITION STYLE ══ */}
      <section id="catalog" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Studio Pieces</Eyebrow>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Browse our <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Collections</em>
              </h2>
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Handcrafted bespoke pieces, proportioned with architectural intent and raw material honesty.
              </p>
            </div>
          </Reveal>

          {/* Filters - Eastern Edition style */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-16 border-b border-[#0B0B0B]/10 pb-8">
              {categories.map(cat => {
                const count = cat === 'ALL' 
                  ? PRODUCTS.length 
                  : PRODUCTS.filter(p => p.category === cat).length;
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] border transition-all duration-300 ${
                      active 
                        ? 'bg-[#0B0B0B] text-[#FAF6F0] border-[#0B0B0B]' 
                        : 'border-[#0B0B0B]/15 text-[#0B0B0B] hover:border-[#0B0B0B]'
                    }`}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {cat} <span className="ml-1 text-[8px] opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredProducts.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  {/* Image container on neutral background */}
                  <div className="relative overflow-hidden bg-[#F0EDE8] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 aspect-[4/3] flex items-center justify-center p-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/10 transition-all duration-500" />
                  </div>
                  {/* Specifications below */}
                  <div className="mt-5 px-1">
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {prod.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-medium text-[#0B0B0B] mt-1 leading-snug" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#777777] font-light mt-2 leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {prod.desc}
                    </p>
                    <GoldRule className="my-4 opacity-30" />
                    <p className="text-[10px] text-[#A0A0A0] font-light uppercase tracking-[0.15em]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {prod.specs}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. INSPIRATION GALLERY — EASTERN EDITION STYLE ══ */}
      <section className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap mb-16">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <Eyebrow>Atmosphere Curation</Eyebrow>
                <h2
                  className="font-display text-[clamp(1.9rem,3.8vw,4.2rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B]"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Inspiration<br />
                  <em style={{ color: '#A0A0A0', fontStyle: 'italic' }}>Gallery</em>
                </h2>
              </div>
              <p
                className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Luxury interiors from our portfolio — each space a study in restraint, proportion, and material honesty.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Eastern Edition style: clean cards on neutral background */}
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  {/* Image box */}
                  <div className="relative overflow-hidden bg-[#F0EDE8] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/15 transition-all duration-500" />
                  </div>
                  {/* Label row below image */}
                  <div className="flex items-center justify-between mt-4 px-1">
                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{item.tag}</span>
                      <h3 className="font-display text-base md:text-lg font-medium text-[#0B0B0B] mt-1 leading-snug" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.title}</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-400 shrink-0 ml-3">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. INTERIOR SHOWCASE — FULL-WIDTH IMMERSIVE ══ */}
      {SHOWCASE.map((sc, i) => (
        <ShowcaseSection key={sc.title} sc={sc} index={i} />
      ))}




      {/* ══ CUSTOM DESIGN SERVICE ══ */}
      <section className="bg-[#111111] py-20 md:py-28 border-t border-[#F8F6F2]/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.03),transparent_50%)]" aria-hidden="true" />
        <div className="wrap relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Image */}
            <Reveal className="relative lg:order-1 order-2">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#D4AF37]/25">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90"
                  alt="Furniture custom drafting process"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0B0B0B]/30" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-[#D4AF37]/10 pointer-events-none -z-10" />
            </Reveal>

            {/* Right Text */}
            <div className="lg:order-2 order-1">
              <Reveal>
                <Eyebrow>Bespoke Customization</Eyebrow>
                <h2
                  className="font-display text-[clamp(2rem,3.8vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-[#F8F6F2] mb-8"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Customize Your<br />
                  <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Own Design</em>
                </h2>
                <GoldRule className="mb-8 max-w-xs" />
                <p className="text-base text-[#A0A0A0] font-light leading-[1.9] mb-8 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  If our catalog doesn't match the exact volume, fabric texture, or timber species your room demands, we can engineer custom dimensions and specifications.
                </p>
                <p className="text-sm text-[#A0A0A0]/70 font-light leading-[1.9] mb-12 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Work directly with our Chennai workshop to specify custom oak plinths, choose from curated Belgian velvet swatches, or adapt dimensions to your space's exact columns and entryways.
                </p>
                <GoldButton href="#/consultation">Start Customizing</GoldButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. CONTACT CTA ══ */}
      <section className="relative bg-[#0B0B0B] py-20 md:py-28 overflow-hidden">
        {/* Background texture image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2400&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-[#0B0B0B]" />
        </div>

        <div className="wrap relative z-10 text-center">
          <Reveal>
            <Eyebrow>Begin Your Journey</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display text-[clamp(2.2rem,5vw,6rem)] font-medium leading-[0.95] tracking-tight text-[#F8F6F2] mb-8 max-w-5xl mx-auto"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Let's Create Your<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Space</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="text-[#A0A0A0] text-base font-light leading-[1.9] max-w-md mx-auto mb-14"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Our design consultants work with you from concept to completion — every piece, every surface, every detail considered.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <GoldButton href="#/consultation">Book Consultation</GoldButton>
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
    </div>
  );
}

/* ─────────────────── SIGNATURE PIECE SECTION ─────────────────── */
function SignaturePiece({ piece, imageLeft, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]"
    >
      {/* Image side */}
      <div className={`relative overflow-hidden ${imageLeft ? 'lg:order-1' : 'lg:order-2'} h-[60vw] lg:h-auto min-h-[500px]`}>
        <motion.div style={{ y: imgY }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
          <img
            src={piece.image}
            alt={piece.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F2]/10 to-transparent" />
        </motion.div>
      </div>

      {/* Text side */}
      <div
        className={`flex items-center bg-[#F8F6F2] ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <motion.div
          initial={{ opacity: 0, x: imageLeft ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="px-12 md:px-20 lg:px-24 py-20"
        >
          <Eyebrow>{piece.eyebrow}</Eyebrow>
          <h2
            className="font-display text-[clamp(1.9rem,3vw,3.8rem)] font-medium leading-[1.05] tracking-tight text-[#0B0B0B] mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            {piece.title}
          </h2>
          <GoldRule className="mb-8 max-w-xs" />
          <p
            className="text-[#A0A0A0] text-base font-light leading-[1.9] mb-12 max-w-md"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {piece.description}
          </p>
          <GoldButton href="#/consultation">View Collection</GoldButton>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────── INTERIOR SHOWCASE SECTION ─────────────────── */
function ShowcaseSection({ sc, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const bg = sc.dark ? '#0B0B0B' : '#F8F6F2';
  const textPrimary = sc.dark ? '#F8F6F2' : '#0B0B0B';
  const textSecondary = '#A0A0A0';
  const borderColor = sc.dark ? 'rgba(248,246,242,0.08)' : 'rgba(11,11,11,0.08)';

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] overflow-hidden flex items-center"
      style={{ backgroundColor: bg }}
    >
      {/* Parallax image — full width behind */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        <img
          src={sc.image}
          alt={sc.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: sc.dark
              ? 'linear-gradient(to right, #0B0B0B 40%, transparent 80%)'
              : 'linear-gradient(to right, #F8F6F2 40%, transparent 80%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: sc.dark
              ? 'linear-gradient(to top, #0B0B0B 10%, transparent 50%)'
              : 'linear-gradient(to top, #F8F6F2 10%, transparent 50%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="wrap relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span
            className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-6"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {sc.eyebrow}
          </span>
          <h2
            className="font-display text-[clamp(1.9rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: textPrimary }}
          >
            {sc.title}
          </h2>
          <div className="h-px w-24 mb-8" style={{ background: 'linear-gradient(90deg, #D4AF37 0%, transparent 100%)' }} />
          <p
            className="text-base font-light leading-[1.9] mb-12 max-w-md"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', color: textSecondary }}
          >
            {sc.desc}
          </p>
          <GoldButton href="#/consultation">Explore More</GoldButton>
        </motion.div>
      </div>
    </section>
  );
}
