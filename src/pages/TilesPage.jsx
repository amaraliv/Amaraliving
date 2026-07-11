import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, MoveRight, Square, Layers, Droplets, Sun, Home, Wind } from 'lucide-react';
import t1 from '../assets/tiles/tiles 1.jpg';
import t2 from '../assets/tiles/2.jpg';
import t3 from '../assets/tiles/3.jpg';
import t4 from '../assets/tiles/4.jpg';
import t5 from '../assets/tiles/5.jpg';
import t6 from '../assets/tiles/6.jpg';
import col1 from '../assets/tiles/AMARA_Image_01.jpg';
import col2 from '../assets/tiles/AMARA_Image_07.png';
import col3 from '../assets/tiles/tiles 1.jpg';
import feat1 from '../assets/tiles/2.jpg';
import feat2 from '../assets/tiles/3.jpg';
import feat3 from '../assets/tiles/4.jpg';
import gal1 from '../assets/tiles/5.jpg';
import gal2 from '../assets/tiles/6.jpg';
import gal3 from '../assets/tiles/AMARA_Image_01.jpg';
import gal4 from '../assets/tiles/AMARA_Image_07.png';
import gal5 from '../assets/tiles/tiles 1.jpg';
import gal6 from '../assets/tiles/2.jpg';

/* ─── data ─── */
const PRODUCTS = [
  {
    id: 't1',
    name: 'Grand Format Porcelain Slab',
    category: 'PORCELAIN',
    desc: 'Seamless sintered porcelain panels mimicking natural Statuario veins.',
    image: t1,
    specs: 'Sizes up to 160×320cm | Thickness: 6mm, 12mm',
  },
  {
    id: 't2',
    name: 'Satin Venetian Terrazzo',
    category: 'TERRAZZO',
    desc: 'Venetian honed terrazzo tiles with small marble chips and satin texture.',
    image: t2,
    specs: 'Size: 60×60cm | Thickness: 20mm',
  },
  {
    id: 't3',
    name: 'Moroccan Glazed Zellige',
    category: 'ZELLIGE',
    desc: 'Handmade, double-fired glazed terracotta tiles with natural organic imperfections.',
    image: t3,
    specs: 'Size: 10×10cm | 100% Handcrafted in Morocco',
  },
  {
    id: 't4',
    name: 'Hexagonal Marble Mosaic',
    category: 'MOSAICS',
    desc: 'Premium Carrara and Nero Marquina marble chips mesh-mounted in hex rhythm.',
    image: t4,
    specs: 'Sheet Size: 30×30cm | Polished & Honed finishes',
  },
  {
    id: 't5',
    name: 'Slate Grey Textured Tile',
    category: 'PORCELAIN',
    desc: 'Matte-finish structured porcelain slate tiles for high-traffic wet areas.',
    image: t5,
    specs: 'Size: 80×160cm | R11 Slip-Rating',
  },
  {
    id: 't6',
    name: 'Unglazed Terracotta Tile',
    category: 'ZELLIGE',
    desc: 'Natural unglazed terracotta tile panels displaying rich earthy shades.',
    image: t6,
    specs: 'Size: 15×15cm | Warm Terracotta Clay',
  },
];

/* ─── helpers ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  );
}
function Eyebrow({ children }) {
  return <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{children}</span>;
}
function GoldBtn({ children, href = '#/consultation' }) {
  return (
    <a href={href} className="group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] border border-[#D4AF37] text-[#D4AF37] hover:text-[#0B0B0B] transition-all duration-700" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      <span className="relative z-10 flex items-center gap-3">{children}<ArrowUpRight className="w-3.5 h-3.5" /></span>
    </a>
  );
}
function GoldRule({ className = '' }) {
  return <div className={`h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent ${className}`} />;
}

/* ─── data ─── */
const COLLECTIONS = [
  { id: '01', label: 'Porcelain', title: 'Grand Format Porcelain Tiles', image: col1 },
  { id: '02', label: 'Mosaic', title: 'Artisanal Mosaic & Glass', image: col2 },
  { id: '03', label: 'Terrazzo', title: 'Satin Honed Terrazzo', image: col3 },
];

const FEATURED = [
  {
    title: 'Grand Format Porcelain',
    eyebrow: 'Architectural Scale',
    desc: 'Sintered at extreme temperatures, grand format porcelain tiles achieve a density and dimensional stability that no natural material can match. Available in 120×240cm panels, they create seamless, joint-minimal surfaces that define contemporary luxury interiors.',
    details: ['Sizes up to 160×320 cm', 'Polished, Matte & Satin Finishes', 'Near-Zero Water Absorption', 'Ideal for Floors, Walls & Facades'],
    image: feat1,
    dark: true,
  },
  {
    title: 'Zellige & Handmade Ceramics',
    eyebrow: 'Artisanal Craftsmanship',
    desc: 'Each Zellige tile is individually formed by hand from Moroccan clay, fired in traditional kilns, and glazed with colour variations that make every installation unique. No two tiles are identical — and that imperfection is precisely what gives them their extraordinary beauty.',
    details: ['100% Handmade in Morocco', 'Colour Variation in Every Tile', 'Kitchen Splashbacks & Feature Walls', 'Bespoke Pattern Design Service'],
    image: feat2,
    dark: false,
  },
  {
    title: 'Venetian Terrazzo',
    eyebrow: 'Italian Heritage',
    desc: "Sourced from Verona's historic terrazzo ateliers, our honed terrazzo tiles carry centuries of craft. Marble, granite and glass chips are set in a cementitious matrix, then ground and polished to a silken smoothness that only improves with age and foot traffic.",
    details: ['Marble, Glass & Granite Chips', 'Custom Chip Blend Available', 'Floors, Countertops & Walls', 'Polished & Honed Finishes'],
    image: feat3,
    dark: true,
  },
];

const APPLICATIONS = [
  { icon: Home, label: 'Living Spaces', desc: 'Grand format porcelain and honed limestone create seamless floor-to-ceiling continuity in open-plan living areas.' },
  { icon: Droplets, label: 'Bathrooms & Wet Areas', desc: 'Slip-resistant textured tiles in bookmatched slabs — safe, hygienic, and architecturally refined.' },
  { icon: Sun, label: 'Kitchens', desc: 'Heat-resistant porcelain splashbacks and counter-height cladding that perform under daily cooking demands.' },
  { icon: Wind, label: 'Outdoor & Pool Areas', desc: 'Frost-proof, UV-stable exterior tiles engineered for Indian climate extremes — patios, pool decks, and driveways.' },
  { icon: Square, label: 'Feature Walls', desc: 'Textured 3D tiles, metallic mosaics, and large slab cladding transform any wall into an architectural statement.' },
  { icon: Layers, label: 'Commercial Lobbies', desc: 'High-traffic rated porcelain in grand lobby formats — the preferred choice of five-star hotels and corporate campuses.' },
];

const DESIGN_PRINCIPLES = [
  { num: '01', title: 'Pattern First', body: "Before material selection, we understand the visual rhythm the space demands — herringbone, running bond, chevron, or large-format plain. Pattern defines the room's energy." },
  { num: '02', title: 'Scale to Space', body: 'A 60×60cm tile that looks perfect in a showroom can overwhelm a 10m² bathroom. We match tile scale to room proportion with architectural precision.' },
  { num: '03', title: 'Grout as Design', body: 'Grout colour and joint width are design decisions, not afterthoughts. We specify grout that complements or contrasts — never just fills.' },
  { num: '04', title: 'Long-Term Livability', body: 'Our tile recommendations account for maintenance, wear patterns, and 10-year aesthetics — not just how they look on installation day.' },
];

const GALLERY = [
  { tag: 'Bathroom', title: 'Bookmatched Marble Bathroom, Chennai', image: gal1, tall: true },
  { tag: 'Kitchen', title: 'Zellige Splashback Kitchen, Coimbatore', image: gal2, tall: false },
  { tag: 'Living Room', title: 'Grand Format Floor, Bangalore Villa', image: gal3, tall: false },
  { tag: 'Feature Wall', title: 'Geometric Mosaic, Luxury Hotel Lobby', image: gal4, tall: true },
  { tag: 'Outdoor', title: 'Pool Deck, Kotagiri Estate', image: gal5, tall: false },
  { tag: 'Terrazzo', title: 'Terrazzo Foyer, Nungambakkam', image: gal6, tall: true },
];

/* ─── sub-components ─── */
function FeaturedTile({ piece, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const imageLeft = index % 2 === 0;
  const bg = piece.dark ? '#0B0B0B' : '#F8F6F2';
  const textPrimary = piece.dark ? '#F8F6F2' : '#0B0B0B';
  const textSub = piece.dark ? '#A0A0A0' : '#555555';

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden flex items-center border-t border-[#F8F6F2]/5" style={{ backgroundColor: bg }}>
      <motion.div style={{ y: imgY }} className={`absolute ${imageLeft ? 'right-0' : 'left-0'} top-0 bottom-0 w-full lg:w-1/2 h-[115%] -top-[7.5%]`}>
        <img src={piece.image} alt={piece.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0" style={{ background: imageLeft ? `linear-gradient(to left, transparent 30%, ${bg} 75%)` : `linear-gradient(to right, transparent 30%, ${bg} 75%)` }} />
      </motion.div>

      <div className="wrap relative z-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className={imageLeft ? 'lg:col-start-1' : 'lg:col-start-2 lg:row-start-1'}>
          <Reveal>
            <Eyebrow>{piece.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: textPrimary }}>
              {piece.title}
            </h2>
            <GoldRule className="mb-6 max-w-xs" />
            <p className="text-sm font-light leading-[1.9] mb-8 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: textSub }}>
              {piece.desc}
            </p>
            <ul className="space-y-2 mb-10">
              {piece.details.map(d => (
                <li key={d} className="flex items-center gap-3 text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: textSub }}>
                  <span className="w-4 h-px bg-[#D4AF37]" />{d}
                </li>
              ))}
            </ul>
            <GoldBtn href="#/consultation">Request Samples</GoldBtn>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export default function TilesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.07]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'PORCELAIN', 'TERRAZZO', 'ZELLIGE', 'MOSAICS'];
  const filteredProducts = activeCategory === 'ALL' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" className="bg-[#0B0B0B]">
      <section ref={heroRef} id="hero" className="relative h-[100dvh] overflow-hidden bg-[#0B0B0B]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 w-full h-[115%] -top-[7.5%] origin-center">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90" alt="Luxury tile surfaces" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/55 to-[#0B0B0B]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/70 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28">
          <div className="wrap">
            <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
              <Eyebrow>Amara Living — Designer Tiles</Eyebrow>
              <h1 className="font-display text-[clamp(2.8rem,6.5vw,7.5rem)] font-medium leading-[0.93] tracking-[-0.02em] text-[#F8F6F2] mb-6 max-w-5xl" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Surface as<br />
                <em className="text-[#D4AF37]" style={{ fontStyle: 'italic' }}>Architecture.</em>
              </h1>
              <p className="text-[#A0A0A0] text-sm font-light leading-[1.9] max-w-md mb-10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                From grand-format porcelain to hand-glazed Zellige and satin terrazzo — tiles that transform floors, walls, and facades into defining architectural moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <GoldBtn href="#/consultation">Book Consultation</GoldBtn>
                <a href="#collections" className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#A0A0A0] hover:text-[#F8F6F2] transition-colors duration-500" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  View Collections <MoveRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="h-14 w-px bg-gradient-to-b from-[#D4AF37]/60 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Scroll</span>
        </motion.div>
      </section>

      {/* ══ 2. COLLECTIONS — EASTERN EDITION STYLE ══ */}
      <section id="collections" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap mb-16">
          <Reveal>
            <Eyebrow>Tile Collections</Eyebrow>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2 className="font-display text-[clamp(2rem,4.5vw,5rem)] font-medium leading-[0.95] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Three Distinct<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Surface Languages</em>
              </h2>
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Porcelain precision, artisanal ceramics, and honed terrazzo — each a different conversation with space.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            {COLLECTIONS.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.1}>
                <div className="group block cursor-pointer">
                  {/* Clean image box */}
                  <div className="relative overflow-hidden bg-[#F0EDE8] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 aspect-[4/3]">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/15 transition-all duration-500" />
                    <span className="absolute top-4 left-4 text-[9px] font-medium tracking-[0.35em] text-[#D4AF37]/60" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{col.id}</span>
                  </div>
                  {/* Label below */}
                  <div className="flex items-center justify-between mt-4 px-1">
                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{col.label}</span>
                      <h3 className="font-display text-lg md:text-xl font-medium text-[#0B0B0B] mt-1 leading-snug" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{col.title}</h3>
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

      {/* ══ 3. FEATURED TILES ══ */}
      {FEATURED.map((piece, i) => <FeaturedTile key={piece.title} piece={piece} index={i} />)}

      {/* ══ 4. DESIGN PHILOSOPHY ══ */}
      <section className="bg-[#111111] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <Eyebrow>Our Design Philosophy</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Tile is Not<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Background. It's Architecture.</em>
              </h2>
              <GoldRule className="mb-8 max-w-xs" />
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Most designers select tiles after the room is designed. We believe surface selection should happen at the beginning — because pattern, texture, and scale define the spatial experience just as much as walls and furniture. Our tile consultants work alongside architects and interior designers from first sketch to final grout line.
              </p>
            </Reveal>
            <div className="space-y-0">
              {DESIGN_PRINCIPLES.map((p, i) => (
                <Reveal key={p.num} delay={i * 0.07}>
                  <div className="py-7 border-t border-[#F8F6F2]/8 first:border-t-0">
                    <div className="flex items-center gap-5 mb-3">
                      <span className="text-[10px] font-medium tracking-[0.38em] text-[#D4AF37]/50" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{p.num}</span>
                      <h3 className="font-display text-xl font-medium text-[#F8F6F2]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{p.title}</h3>
                    </div>
                    <p className="text-sm text-[#A0A0A0] font-light leading-[1.85] pl-9" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{p.body}</p>
                  </div>
                </Reveal>
              ))}
              <div className="h-px bg-[#F8F6F2]/8" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. APPLICATIONS ══ */}
      <section className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal className="mb-14 text-center">
            <Eyebrow>Where We Install</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Every Surface.<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Every Application.</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#F8F6F2]/8">
            {APPLICATIONS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.07}>
                  <div className="group border-b border-r border-[#F8F6F2]/8 p-10 hover:bg-[#F8F6F2]/[0.025] transition-colors duration-700">
                    <div className="mb-8 w-10 h-10 flex items-center justify-center border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/60 transition-all duration-500">
                      <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.2} />
                    </div>
                    <h3 className="font-display text-xl font-medium text-[#F8F6F2] mb-3" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.label}</h3>
                    <p className="text-sm text-[#A0A0A0] font-light leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 5.5 PRODUCT CATALOG — EASTERN EDITION STYLE ══ */}
      <section id="catalog" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Tile Atelier</Eyebrow>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Browse our <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Tile Catalog</em>
              </h2>
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Precision-engineered porcelain and artisan handmade tiles, selected for unmatched texture and architectural rhythm.
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

      {/* ══ 6. GALLERY ══ */}
      <section className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap mb-16">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Installed Projects</span>
                <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Tiles in<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Real Spaces</em>
                </h2>
              </div>
              <GoldBtn href="#/consultation">Request a Quote</GoldBtn>
            </div>
          </Reveal>
        </div>

        {/* Eastern Edition style: clean cards on neutral background */}
        <div className="px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {GALLERY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="group cursor-pointer">
                  {/* Image box */}
                  <div className="relative overflow-hidden bg-[#F0EDE8] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/20 transition-all duration-500" />
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

      {/* ══ CUSTOM DESIGN SERVICE ══ */}
      <section className="bg-[#111111] py-20 md:py-28 border-t border-[#F8F6F2]/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.03),transparent_50%)]" aria-hidden="true" />
        <div className="wrap relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column: Text Content */}
            <div>
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
                  Need a custom layout, unique mosaic shapes, or glazed zellige in a specific Pantone shade? Our tile designers can manufacture bespoke commissions to match your project's architectural intent.
                </p>
                <p className="text-sm text-[#A0A0A0]/70 font-light leading-[1.9] mb-12 max-w-md" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  We collaborate with architects and interior designers to define customized joints, specify grout parameters, and fabricate unique terrazzo proportions for large-scale flooring and feature walls.
                </p>
                <GoldBtn href="#/consultation">Start Customizing</GoldBtn>
              </Reveal>
            </div>

            {/* Right Column: Visual Showcase */}
            <Reveal delay={0.2} className="relative bg-[#111111]">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#D4AF37]/25">
                <img
                  src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=90"
                  alt="Custom glazed tile assembly"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0B0B0B]/30" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#D4AF37]/10 pointer-events-none -z-10" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 7. CTA ══ */}
      <section className="relative bg-[#0B0B0B] py-28 md:py-40 overflow-hidden border-t border-[#F8F6F2]/5">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]" />
        </div>
        <div className="wrap relative z-10 text-center">
          <Reveal><Eyebrow>Begin Your Tile Journey</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2.2rem,5vw,6rem)] font-medium leading-[0.93] tracking-tight text-[#F8F6F2] mb-6 max-w-4xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Let's Design Your<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Perfect Surface</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#A0A0A0] text-sm font-light leading-[1.9] max-w-md mx-auto mb-12" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Our tile specialists help you navigate thousands of options to find the perfect combination of material, scale, pattern, and finish for your space.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <GoldBtn href="#/consultation">Book Consultation</GoldBtn>
              <a href="tel:7397623509" className="inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#A0A0A0] hover:text-[#F8F6F2] transition-colors duration-500 border border-[#F8F6F2]/10 hover:border-[#F8F6F2]/30" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                +91 7397623509
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}