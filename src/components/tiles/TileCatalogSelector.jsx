import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ─────────── APPLICATION DATA ─────────── */
const APPLICATIONS = [
  { id: 'bathroom',     name: 'Bathroom',          label: 'Wet Areas',       highlight: false, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80' },
  { id: 'living-room',  name: 'Living Room',        label: 'Common Spaces',   highlight: false, image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=600&q=80' },
  { id: 'kitchen',      name: 'Kitchen',            label: 'Culinary Spaces', highlight: false, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80' },
  { id: 'bedroom',      name: 'Bedroom',            label: 'Private Retreat', highlight: false, image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80' },
  { id: 'staircase',    name: 'Staircase',          label: 'Vertical Surfaces', highlight: true, image: 'https://images.unsplash.com/photo-1580216643062-cf460548a66a?auto=format&fit=crop&w=600&q=80' },
  { id: 'kitchen-top',  name: 'Kitchen Top',        label: 'Counter Top',     highlight: true,  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80' },
  { id: 'balcony',      name: 'Balcony',            label: 'Sitout Area',     highlight: false, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'parking',      name: 'Parking',            label: 'Heavy Load',      highlight: false, image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80' },
  { id: 'commercial',   name: 'Commercial',         label: 'Budget Friendly', highlight: true,  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  { id: 'wooden-plank', name: 'Wooden Plank',       label: 'Wood Look',       highlight: false, image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80' },
  { id: 'hotel',        name: 'Hotel / Restaurant', label: 'Hospitality',     highlight: false, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80' },
  { id: 'slab',         name: 'Slab',               label: 'Large Format',    highlight: true,  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
  { id: 'elevation',    name: 'Elevation',          label: 'Exterior',        highlight: false, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80' },
  { id: 'terrace',      name: 'Terrace',            label: 'Cool Roof',       highlight: false, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80' },
];

/* ─────────── SIZE DATA (ASCENDING ORDER: SMALLEST TO LARGEST) ─────────── */
const SIZES = [
  { id: 'sz-300x300-wall', dims: '300×300',   unit: '1×1 FT',       tag: 'WALL',       highlight: false },
  { id: 'sz-300x300-cool', dims: '300×300',   unit: '1×1 FT',       tag: 'COOL ROOF',  highlight: false },
  { id: 'sz-300x300-park', dims: '300×300',   unit: '1×1 FT',       tag: 'PARKING',    highlight: false },
  { id: 'sz-300x450',      dims: '300×450',   unit: '18×12 IN',     tag: null,         highlight: false },
  { id: 'sz-400x400',      dims: '400×400',   unit: '16×16 IN',     tag: null,         highlight: false },
  { id: 'sz-300x600',      dims: '300×600',   unit: '2×1 FT',       tag: null,         highlight: true  },
  { id: 'sz-200x1200',     dims: '200×1200',  unit: 'WOODEN PLANK', tag: null,         highlight: false },
  { id: 'sz-300x900',      dims: '300×900',   unit: '3 FT',         tag: 'STAIRCASE',  highlight: false },
  { id: 'sz-300x1000',     dims: '300×1000',  unit: '3.25 FT',      tag: 'STAIRCASE',  highlight: false },
  { id: 'sz-600x600-floor',dims: '600×600',   unit: '2×2 FT',       tag: 'FLOOR',      highlight: false },
  { id: 'sz-600x600-full', dims: '600×600',   unit: '2×2 FT',       tag: 'FULL BODY',  highlight: true  },
  { id: 'sz-300x1200',     dims: '300×1200',  unit: '4 FT',         tag: 'STAIRCASE',  highlight: false },
  { id: 'sz-600x1200',     dims: '600×1200',  unit: '4×2 FT',       tag: null,         highlight: false },
  { id: 'sz-800x2400',     dims: '800×2400',  unit: '8×2.5 FT',     tag: 'HEAVY DUTY', highlight: true  },
  { id: 'sz-1200x1800',    dims: '1200×1800', unit: '6×4 FT',       tag: null,         highlight: true  },
  { id: 'sz-1200x2400',    dims: '1200×2400', unit: '8×4 FT',       tag: null,         highlight: true  },
];

/* ─────────── SHARED: premium light-sweep on hover ─────────── */
function Sheen() {
  return (
    <span className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[inherit]">
      <span className="absolute top-0 -left-[60%] h-full w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-[900ms] ease-out group-hover:left-[130%] group-hover:opacity-100" />
    </span>
  );
}

/* ─────────── APPLICATION CARD ─────────── */
function AppCard({ item, index }) {
  const ref = `AC-${String(index + 1).padStart(2, '0')}`;

  const handleClick = () => {
    setTimeout(() => {
      const el = document.getElementById('collection-view');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <motion.a
      href={`#/tiles?application=${item.id}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col transition-transform duration-500 ease-out"
    >
      {/* ── Image area (Editorial) ── */}
      <div className={`relative h-[110px] w-full shrink-0 overflow-hidden rounded-xl transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]
        ${item.highlight 
          ? 'ring-1 ring-[#C8102E]/30 shadow-[0_8px_30px_-6px_rgba(200,16,46,0.25)]' 
          : 'ring-1 ring-black/5 shadow-sm group-hover:shadow-md group-hover:ring-[#C8102E]/20'}
      `}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: 'saturate(0.96) contrast(1.04)' }}
        />
        
        {/* Subtle interior shadows */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20 pointer-events-none" />

        {/* Featured ribbon - Glassmorphism */}
        {item.highlight && (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-[#C8102E]/90 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
            <span className="text-[10px] leading-none">★</span> Featured
          </span>
        )}

        {/* Hover arrow chip */}
        <span className="absolute right-3 top-3 z-20 flex h-[30px] w-[30px] translate-y-[-4px] items-center justify-center rounded-full bg-white/95 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-[#C8102E] transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>

      {/* ── Label plate (Editorial Typography) ── */}
      <div className="relative flex flex-1 items-start gap-4 px-2 py-4 transition-colors duration-300">
        {/* Index number */}
        <span
          className={`shrink-0 text-lg font-bold leading-none tabular-nums transition-colors duration-300 pt-0.5
            ${item.highlight ? 'text-[#C8102E]' : 'text-[#A09A8F] group-hover:text-[#C8102E]'}`}
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Name + meta */}
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-lg font-bold leading-tight tracking-tight transition-colors duration-300
              ${item.highlight ? 'text-[#C8102E]' : 'text-[#1A1A1A] group-hover:text-[#C8102E]'}`}
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {item.name}
          </p>
          <p className={`mt-1.5 truncate text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300
            ${item.highlight ? 'text-[#C8102E]/80' : 'text-neutral-400 group-hover:text-[#C8102E]/80'}`}>
            {item.label} <span className="opacity-50">· {ref}</span>
          </p>
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────── SIZE: proportional tile glyph ─────────── */
function getRatio(dims) {
  const parts = dims.split('×').map((s) => parseInt(s.replace(/[^0-9]/g, ''), 10));
  if (parts.length === 2 && parts[0] > 0 && parts[1] > 0) return parts[0] / parts[1];
  return null; // bespoke / mosaic
}

function TileGlyph({ dims, highlight, comingSoon, isWide }) {
  const parts = dims.split('×').map((s) => parseInt(s.replace(/[^0-9]/g, ''), 10));
  const ratio = (parts.length === 2 && parts[0] > 0 && parts[1] > 0) ? parts[0] / parts[1] : null;
  
  let MAX = 52; // Default for small sizes (300, 400, 450)
  if (isWide) {
    MAX = 150;
  } else if (parts.length === 2) {
    const h = parts[1];
    if (h >= 2400) MAX = 110;
    else if (h >= 1800) MAX = 94;
    else if (h >= 1200) MAX = 82;
    else if (h >= 900)  MAX = 70;
    else if (h >= 600)  MAX = 60;
  }

  // Mosaic / bespoke → 3×3 grid mark
  if (ratio == null) {
    return (
      <div className={`flex items-center justify-center mb-3`} style={{ height: MAX }}>
        <div className="grid grid-cols-3 gap-[3.5px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-[12px] w-[12px] rounded-[1.5px] border border-[#C8102E]/40 bg-[#C8102E]/10 transition-transform duration-500 group-hover:scale-110"
              style={{ transitionDelay: `${i * 20}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  const height = MAX;
  const width = Math.max(12, Math.round(MAX * ratio));

  const borderColor = comingSoon
    ? 'rgba(200,16,46,0.4)'
    : highlight
    ? '#C8102E'
    : '#C8102E'; // Red border for all shapes as requested

  return (
    <div className={`flex items-end justify-center mb-3`} style={{ height: isWide ? 150 : 110 }}>
      <div
        className="relative rounded-[4px] border-[1.5px] transition-all duration-400 ease-out group-hover:-translate-y-2 group-hover:scale-[1.05] group-hover:shadow-[0_16px_32px_-8px_rgba(200,16,46,0.4)]"
        style={{
          width,
          height,
          borderColor,
          background: highlight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #FFE4E8 40%, #FFC7D0 100%)'
            : comingSoon
            ? 'repeating-linear-gradient(45deg,rgba(200,16,46,0.03) 0 4px,transparent 4px 8px)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F5F2EB 45%, #DED9CC 100%)',
          boxShadow: highlight 
            ? '0 6px 16px -4px rgba(200,16,46,0.35), inset 0 2px 4px rgba(255,255,255,0.9)' 
            : '0 5px 14px -3px rgba(20,10,6,0.18), inset 0 2px 4px rgba(255,255,255,1)',
        }}
      >
        {/* strong glossy highlight on top edge */}
        <span className="absolute inset-x-[1px] top-[1px] h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
        {/* subtle inner shadow for depth */}
        <span className="absolute inset-0 rounded-[2.5px] shadow-[inset_0_0_8px_rgba(0,0,0,0.04)]" />
      </div>
    </div>
  );
}

/* ─────────── SIZE CARD ─────────── */
function SizeCard({ item, index }) {
  const isWide = item.id === 'sz-1200x2400';

  const handleClick = () => {
    setTimeout(() => {
      const el = document.getElementById('collection-view');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <motion.a
      href={item.comingSoon ? '#collection-view' : `#/tiles?size=${item.id}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col items-center justify-end text-center transition-transform duration-300
        ${isWide ? 'col-span-2 sm:col-span-3 mt-2 sm:mt-4 mb-2' : 'h-[200px]'}
      `}
    >
      {isWide ? (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-8 sm:gap-12 w-full px-4 sm:px-12">
          <TileGlyph dims={item.dims} highlight={item.highlight} isWide={true} />
          <div className="text-center sm:text-left">
            <p
              className="font-black text-[#C8102E] leading-none tracking-tight transition-transform duration-300 group-hover:-translate-y-[2px]"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}
            >
              {item.dims}
            </p>
            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.26em] text-[#C8102E]">
              {item.unit} — GRAND JUMBO FORMAT SLAB
            </p>
            <div className="mt-3 hidden sm:flex items-center gap-3">
              <span className="rounded-[3px] bg-[#C8102E] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-md">
                ★ JUMBO SLAB
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Proportional tile glyph */}
          <TileGlyph dims={item.dims} highlight={item.highlight} comingSoon={item.comingSoon} />

          {/* Dimensions */}
          <p
            className={`mt-2 leading-none tracking-tight transition-transform duration-300 group-hover:-translate-y-[2px] ${item.highlight ? 'font-black text-[#C8102E]' : 'font-black text-[#141414]'}`}
            style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.2rem,1.9vw,1.6rem)' }}
          >
            {item.dims}
          </p>

          {/* Unit */}
          <p className={`mt-2 text-[10.5px] font-black uppercase tracking-[0.2em]
            ${item.comingSoon ? 'text-[#C8102E]/70' : item.highlight ? 'text-[#C8102E]' : 'text-[#777777]'}`}>
            {item.unit}
          </p>

          {/* Tag / Coming soon */}
          {item.comingSoon ? (
            <span className="mt-2.5 inline-flex items-center gap-1 rounded-[3px] border border-[#C8102E]/30 bg-[#C8102E]/10 px-2 py-[3px] text-[8px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[#C8102E]" />
              Coming Soon
            </span>
          ) : item.tag ? (
            <span className={`mt-2 inline-block rounded-[3px] px-2.5 py-[3.5px] text-[9px] font-black uppercase tracking-[0.16em] transition-colors duration-300
              ${item.highlight
                ? 'bg-[#C8102E] text-white shadow-[0_2px_8px_rgba(200,16,46,0.35)]'
                : 'bg-[#E5E0D8] text-[#555555] group-hover:bg-[#C8102E]/10 group-hover:text-[#C8102E]'}`}>
              {item.tag}
            </span>
          ) : null}
        </>
      )}
    </motion.a>
  );
}

/* ─────────── SECTION HEADING ─────────── */
function SectionHead({ label, title, accent, sub, side, count }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -16 : 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 flex h-[115px] flex-col justify-between"
    >
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span
            className="text-[11px] font-black uppercase tracking-[0.42em] text-[#C8102E] md:text-[12px]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {label}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#E0DCD5] to-transparent" />
          {count && (
            <span className="rounded-full border border-[#E0DCD5] bg-white px-2 py-[2px] text-[9px] font-bold tracking-[0.12em] text-[#A39D92]">
              {count}
            </span>
          )}
        </div>
        <h3
          className="mb-1.5 text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold leading-[1.04] tracking-tight text-[#111111]"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {title}{' '}
          <span className="italic text-[#C8102E]">{accent}</span>
        </h3>
      </div>
      <p
        className="min-h-[36px] max-w-[320px] text-[12px] font-medium leading-relaxed text-[#777]"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {sub}
      </p>
    </motion.div>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function TileCatalogSelector() {
  return (
    <section id="catalog-selector" className="relative bg-[#F4F1EA] pb-14 pt-6 md:pb-16 md:pt-8">
      {/* Soft ambient wash */}
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: 'radial-gradient(1200px 500px at 15% 0%, rgba(200,16,46,0.05), transparent 60%), radial-gradient(1000px 500px at 90% 20%, rgba(200,16,46,0.04), transparent 55%)' }} />

      {/* Page eyebrow */}
      <div className="wrap relative mb-5 md:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span
              className="mb-1 block text-[10px] font-black uppercase tracking-[0.44em] text-[#C8102E] md:text-[11px]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Amara Ceramics — Catalogue Navigator
            </span>
            <h2
              className="text-[clamp(2.2rem,4.2vw,3.8rem)] font-bold leading-[1.05] tracking-tight text-[#111111]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Browse the Collection
            </h2>
          </div>
          <p
            className="max-w-[220px] text-[11px] font-medium leading-relaxed text-[#888]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Navigate by space or select your exact tile format.
          </p>
        </motion.div>
      </div>

      {/* Two-column wrapper */}
      <div className="wrap relative">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* ══════ COLUMN A — SHOP BY APPLICATION ══════ */}
          <div>
            <SectionHead
              label="Section A"
              title="Shop by"
              accent="Application"
              sub="Explore surfaces by space, function and architectural application."
              side="left"
              count="14 SPACES"
            />

            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {APPLICATIONS.map((item, i) => (
                <AppCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* ══════ COLUMN B — SHOP BY SIZE ══════ */}
          <div>
            <SectionHead
              label="Section B"
              title="Shop by"
              accent="Size"
              sub="Find the right tile format and finish for your project."
              side="right"
              count="16 FORMATS"
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
              {SIZES.map((item, i) => (
                <SizeCard key={item.id} item={item} index={i} />
              ))}
            </div>

            {/* Bottom editorial divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-[#E0DCD5] to-transparent" />
              <span
                className="text-[8px] font-bold uppercase tracking-[0.36em] text-[#C8C8C0]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Explore Formats
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-[#E0DCD5] to-transparent" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
