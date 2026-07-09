import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, MoveRight, Gem, Shield, Flame, Droplets, Mountain, Zap } from 'lucide-react';

/* ─── data ─── */
const PRODUCTS = [
  {
    id: 'g1',
    name: 'Absolute Black Granite',
    category: 'GRANITE',
    desc: 'Mirror-polished deep obsidian surface with exceptionally uniform tone.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=90',
    specs: 'Thickness: 20mm, 30mm | Finish: High Polish',
  },
  {
    id: 'g2',
    name: 'Taj Mahal Quartzite',
    category: 'QUARTZITE',
    desc: 'Soft ivory quartzite with subtle warm amber waves. Exceptionally hard.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=90',
    specs: 'Thickness: 20mm | Finish: Honed, Satin',
  },
  {
    id: 'g3',
    name: 'Statuario White Marble',
    category: 'MARBLE',
    desc: 'Prestigious Italian white marble with signature bold charcoal grey veins.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=90',
    specs: 'Thickness: 18mm | Finish: Mirror Polished',
  },
  {
    id: 'g4',
    name: 'Viscon White Granite',
    category: 'GRANITE',
    desc: 'Indian white granite with sweeping waves of ash grey and black crystal deposits.',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=90',
    specs: 'Thickness: 20mm | Finish: Leathered, Polished',
  },
  {
    id: 'g5',
    name: 'Blue Bahia Exotic',
    category: 'QUARTZITE',
    desc: 'Exotic Brazilian stone featuring rich sodalite blue crystals and gold flecks.',
    image: 'https://images.unsplash.com/photo-1600607688229-472a15b69d2c?auto=format&fit=crop&w=800&q=90',
    specs: 'Thickness: 20mm | Finish: High Polish',
  },
  {
    id: 'g6',
    name: 'Kashmir Gold Granite',
    category: 'GRANITE',
    desc: 'Warm sandy-gold background with delicate garnet red spots and grey veining.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=90',
    specs: 'Thickness: 20mm | Finish: Polished, Honed',
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
  { id: '01', label: 'Granite', title: 'Absolute Black & Exotic Granites', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=90', href: '#/granite' },
  { id: '02', label: 'Quartzite', title: 'Crystal Quartzite & Metallic Veins', image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=1400&q=90', href: '#/granite' },
  { id: '03', label: 'Marble', title: 'Carrara & Italian Marble Slabs', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=90', href: '#/granite' },
];

const FEATURED = [
  {
    title: 'Absolute Black Granite',
    eyebrow: 'Premium Collection',
    desc: 'Sourced from deep subterranean quarries in South India, Absolute Black granite carries a near-zero porosity that makes it the ultimate surface for kitchen counters and bathroom vanities. Every slab is mirror-polished to a depth of reflection that reveals dimension rather than just surface.',
    details: ['Mirror Polished Finish', 'Near-Zero Porosity', 'Ideal for Countertops & Floors', 'Available: 180 × 280 cm'],
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=90',
    dark: true,
  },
  {
    title: 'Calacatta Marble',
    eyebrow: 'Italian Heritage',
    desc: 'Honed from the legendary quarries of Carrara, each Calacatta slab is a singular geological event — no two veins are identical. We hand-select every block for figure, movement, and tonal balance before it is precision-cut for your project.',
    details: ['Book-Matched Slabs Available', 'Honed & Polished Finishes', 'Feature Walls & Flooring', 'Slab Size: 150 × 280 cm'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90',
    dark: false,
  },
  {
    title: 'Brazilian Quartzite',
    eyebrow: 'Exotic Origins',
    desc: 'Formed under immense geological pressure, Brazilian quartzite contains metallic crystal veins of iron and mica that catch light differently at every hour of the day. Harder than granite, it is equally suited to exterior cladding and interior statement pieces.',
    details: ['Crystal & Metallic Veining', 'Harder Than Granite', 'Interior & Exterior Use', 'Custom Slab Cutting Available'],
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=1600&q=90',
    dark: true,
  },
];

const WHY = [
  { icon: Shield, label: 'Scratch & Heat Resistant', desc: 'Natural granite withstands temperatures up to 300°C and resists everyday scratching better than any synthetic surface.' },
  { icon: Droplets, label: 'Near-Zero Porosity', desc: 'Premium granite absorbs almost no moisture, making it naturally hygienic and the ideal surface for kitchens and bathrooms.' },
  { icon: Mountain, label: 'Geologically Unique', desc: 'Every slab is a 50–100 million year geological event. No two surfaces are identical — your space becomes truly one of a kind.' },
  { icon: Gem, label: 'Appreciates Over Time', desc: 'Unlike synthetic alternatives, natural stone increases in perceived value over time. A well-maintained granite surface lasts generations.' },
  { icon: Flame, label: 'Extreme Durability', desc: 'Granite is one of the hardest natural materials on earth, rated 6–7 on Mohs scale, built to outlast the structures it adorns.' },
  { icon: Zap, label: 'Versatile Applications', desc: 'From kitchen countertops to feature walls, bathroom vanities to exterior cladding — granite performs beautifully in every context.' },
];

const ORIGINS = [
  { region: 'South India', stones: 'Absolute Black, Tan Brown, Steel Grey', desc: "India's Deccan Plateau is one of the world's richest granite deposits — quarried by multi-generational stone families we have partnered with since 2010." },
  { region: 'Carrara, Italy', stones: 'Calacatta, Statuario, Bianco Carrara', desc: "The Apuan Alps have yielded the world's finest marble for over two thousand years. We select directly from the quarry floor — not from warehouse stock." },
  { region: 'Minas Gerais, Brazil', stones: 'Blue Bahia, Fantasy Brown, Golden Gate', desc: "Brazil's mineral-rich interior produces quartzites of unmatched crystalline beauty — stones that change character as daylight moves across their surface." },
  { region: 'Rajasthan, India', stones: 'Makrana White, Jaisalmer Yellow, Indian Sandstone', desc: "The desert quarries of Rajasthan produce stones with warm amber and honey tones — perfect for traditional and transitional interiors." },
];

const PROCESS = ['Quarry Selection', 'Block Extraction', 'Precision Cutting', 'Surface Finishing', 'Quality Inspection', 'On-Site Installation'];

const GALLERY = [
  { tag: 'Kitchen Counter', title: 'Absolute Black Kitchen, Chennai', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=90', tall: true },
  { tag: 'Bathroom', title: 'Calacatta Vanity, Coimbatore', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=90', tall: false },
  { tag: 'Feature Wall', title: 'Quartzite Statement Wall', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=90', tall: false },
  { tag: 'Flooring', title: 'Italian Marble Foyer', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=90', tall: true },
  { tag: 'Exterior', title: 'Cladding, Corporate Lobby', image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=900&q=90', tall: false },
  { tag: 'Countertop', title: 'Travertine Kitchen Island', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=90', tall: true },
];

/* ─── sub-components ─── */
function FeaturedSlab({ piece, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const imageLeft = index % 2 === 0;
  const bg = piece.dark ? '#0B0B0B' : '#F8F6F2';
  const textPrimary = piece.dark ? '#F8F6F2' : '#0B0B0B';
  const textSub = piece.dark ? '#A0A0A0' : '#555555';
  const border = piece.dark ? 'border-[#F8F6F2]/8' : 'border-[#0B0B0B]/8';

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden flex items-center border-t border-[#F8F6F2]/5" style={{ backgroundColor: bg }}>
      <motion.div style={{ y: imgY }} className={`absolute ${imageLeft ? 'right-0' : 'left-0'} top-0 bottom-0 w-full lg:w-1/2 h-[115%] -top-[7.5%]`}>
        <img src={piece.image} alt={piece.title} className="w-full h-full object-cover opacity-80" />
        <div className={`absolute inset-0`} style={{ background: imageLeft ? `linear-gradient(to left, transparent 30%, ${bg} 75%)` : `linear-gradient(to right, transparent 30%, ${bg} 75%)` }} />
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
            <ul className={`space-y-2 mb-10`}>
              {piece.details.map(d => (
                <li key={d} className="flex items-center gap-3 text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: textSub }}>
                  <span className="w-4 h-px bg-[#D4AF37]" />
                  {d}
                </li>
              ))}
            </ul>
            <GoldBtn href="#/consultation">Request a Sample</GoldBtn>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export default function GranitePage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.07]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const categories = ['ALL', 'GRANITE', 'MARBLE', 'QUARTZITE'];
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
          <img src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=2400&q=90" alt="Natural stone luxury surfaces" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/55 to-[#0B0B0B]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/70 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28">
          <div className="wrap">
            <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
              <Eyebrow>Amara Living — Natural Stone</Eyebrow>
              <h1 className="font-display text-[clamp(2.8rem,6.5vw,7.5rem)] font-medium leading-[0.93] tracking-[-0.02em] text-[#F8F6F2] mb-6 max-w-5xl" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Natural Stone.<br />
                <em className="text-[#D4AF37]" style={{ fontStyle: 'italic' }}>Timeless Presence.</em>
              </h1>
              <p className="text-[#A0A0A0] text-sm font-light leading-[1.9] max-w-md mb-10" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Hand-selected granite, marble and quartzite sourced from the world's finest quarries — cut, finished, and installed with uncompromising precision.
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

      {/* ══ 2. STONE COLLECTIONS — EASTERN EDITION STYLE ══ */}
      <section id="collections" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap mb-16">
          <Reveal>
            <Eyebrow>Stone Collections</Eyebrow>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2 className="font-display text-[clamp(2rem,4.5vw,5rem)] font-medium leading-[0.95] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Curated from<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Nature's Archive</em>
              </h2>
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Three distinct stone families — each with its own geological character and design language.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            {COLLECTIONS.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.1}>
                <a href={col.href} className="group block cursor-pointer">
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
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. FEATURED SLABS ══ */}
      {FEATURED.map((piece, i) => <FeaturedSlab key={piece.title} piece={piece} index={i} />)}

      {/* ══ 4. STONE ORIGINS ══ */}
      <section className="bg-[#111111] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Global Sourcing</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Stones From the World's<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Finest Origins</em>
            </h2>
            <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xl mb-16" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              We travel to quarries directly — not to warehouses. Every origin is visited, every supplier vetted, every block examined before it arrives at our facility.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[#F8F6F2]/8">
            {ORIGINS.map((origin, i) => (
              <Reveal key={origin.region} delay={i * 0.08}>
                <div className="border-b border-r border-[#F8F6F2]/8 p-10 hover:bg-[#F8F6F2]/[0.02] transition-colors duration-500">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{origin.region}</span>
                  <h3 className="font-display text-xl font-medium text-[#F8F6F2] mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{origin.stones}</h3>
                  <GoldRule className="my-4 max-w-[80px]" />
                  <p className="text-sm text-[#A0A0A0] font-light leading-[1.85]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{origin.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. WHY NATURAL STONE ══ */}
      <section className="bg-[#0B0B0B] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal>
            <div className="text-center mb-14">
              <Eyebrow>The Case for Natural Stone</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] max-w-3xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Why Natural Stone<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Outlasts Everything Else</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#F8F6F2]/8">
            {WHY.map((item, i) => {
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

      {/* ══ 6. PROCESS ══ */}
      <section className="bg-[#111111] py-20 md:py-28 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal className="mb-14">
            <Eyebrow>From Quarry to Installation</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2] max-w-2xl" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Our End-to-End<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Stone Process</em>
            </h2>
          </Reveal>
          <div className="space-y-0">
            {PROCESS.map((step, i) => (
              <Reveal key={step} delay={i * 0.06}>
                <div className="flex items-center gap-6 py-5 border-t border-[#F8F6F2]/8 first:border-t-0">
                  <span className="text-[10px] font-medium tracking-[0.38em] text-[#D4AF37]/50 shrink-0 w-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>0{i + 1}</span>
                  <div className="h-px flex-1 bg-[#F8F6F2]/8" />
                  <span className="font-display text-xl font-medium text-[#F8F6F2]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{step}</span>
                </div>
              </Reveal>
            ))}
            <div className="h-px bg-[#F8F6F2]/8" />
          </div>
        </div>
      </section>

      {/* ══ 6.5 PRODUCT CATALOG — EASTERN EDITION STYLE ══ */}
      <section id="catalog" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap">
          <Reveal>
            <Eyebrow>Stone Atelier</Eyebrow>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.0] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Browse our <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Stone Catalog</em>
              </h2>
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Hand-selected natural slabs from prestigious global origins, cut and polished with architectural precision.
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

      {/* ══ 7. GALLERY ══ */}
      <section className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8">
        <div className="wrap mb-16">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Installed Projects</span>
                <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Stone Surfaces<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>In the Real World</em>
                </h2>
              </div>
              <GoldBtn href="#/consultation">Get a Quote</GoldBtn>
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
                    {/* Subtle dark veil on hover */}
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

      {/* ══ 8. CTA ══ */}
      <section className="relative bg-[#0B0B0B] py-28 md:py-40 overflow-hidden border-t border-[#F8F6F2]/5">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=2400&q=80" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]" />
        </div>
        <div className="wrap relative z-10 text-center">
          <Reveal><Eyebrow>Begin Your Stone Journey</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-[clamp(2.2rem,5vw,6rem)] font-medium leading-[0.93] tracking-tight text-[#F8F6F2] mb-6 max-w-4xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Let's Find Your<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Perfect Stone</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[#A0A0A0] text-sm font-light leading-[1.9] max-w-md mx-auto mb-12" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Our stone specialists guide you from first slab selection through final installation. Book a no-obligation consultation at our Chennai showroom or request samples delivered to your door.
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