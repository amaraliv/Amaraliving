import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronDown, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Droplets, 
  Compass, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/format';

const CATEGORIES = [
  {
    title: 'Premium Granite',
    description: 'Quarry-sourced slabs with near-zero porosity and intense patterns.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Exotic Quartzites',
    description: 'Metallic crystal veins formed through deep subterranean pressure.',
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Italian Marble',
    description: 'Honed travertine and block-cut marbles from Carrara ateliers.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Travertine Blocks',
    description: 'Rustic sand-filled travertine for warm neutral features.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Flamed Basalts',
    description: 'Slip-resistant basalt surfaces for exterior driveways and patios.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Feature Cladding Slabs',
    description: 'Bespoke large format cladding elements for high-end lobbies.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
  },
];

const PRODUCTS = [
  {
    name: 'Absolute Black',
    material: 'Granite',
    finish: 'Mirror Polished',
    color: 'Black',
    size: '180cm x 280cm',
    price: 220,
    outdoor: true,
    badge: 'Obsidian Pure',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Imperial Gold',
    material: 'Exotic Quartzites',
    finish: 'Flame Brushed',
    color: 'Gold',
    size: '160cm x 310cm',
    price: 310,
    outdoor: false,
    badge: 'Limited Yield',
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Kashmir White',
    material: 'Premium Granite',
    finish: 'Satin Honed',
    color: 'White',
    size: '150cm x 290cm',
    price: 185,
    outdoor: false,
    badge: 'Tamil Nadu Sourced',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Viscon Wave Grey',
    material: 'Premium Granite',
    finish: 'Polished',
    color: 'Grey',
    size: '170cm x 300cm',
    price: 260,
    outdoor: true,
    badge: 'Wave Pattern',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Black Galaxy Spark',
    material: 'Premium Granite',
    finish: 'High Polish',
    color: 'Black',
    size: '180cm x 280cm',
    price: 420,
    outdoor: false,
    badge: 'Rare Constellation',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Pietra Grey Velvet',
    material: 'Italian Marble',
    finish: 'Matte Honed',
    color: 'Grey',
    size: '160cm x 320cm',
    price: 490,
    outdoor: false,
    badge: 'Exotic Marble',
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=800&q=85',
  },
];

const INSPIRATION = [
  { tag: 'Kitchen Counter', title: 'Absolute Black monolithic workspace, Alibaug', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Feature Wall', title: 'Imperial Gold fireplace surround, Chennai Penthouse', image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Atrium Floor', title: 'Viscon Wave bookmatched flooring, Corporate HQ', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Lobby Cladding', title: 'Black Galaxy elevator portals, Luxury Hotel', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Pool Surrounds', title: 'Flamed slip-resistant basalt steps, Beach Villa', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85' },
];

const PROJECTS = [
  {
    name: 'The Oberoi Atrium Lobby',
    material: 'Viscon Wave & Absolute Black Slabs',
    location: 'Chennai Central',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Coimbatore Villa Fireplace',
    material: 'Imperial Gold Custom Quartzite Cladding',
    location: 'Race Course Road, Coimbatore',
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=1200&q=85',
  },
];

const BENEFITS = [
  { title: 'Quarry Direct Selection', desc: 'Direct sourcing ensures structural block grading and vein consistency.', icon: Sparkles },
  { title: 'Unique Formations', desc: 'No two slabs carry the same mineral crystallizations or wave movements.', icon: Compass },
  { title: 'Extreme Hardness', desc: 'Mohs rating of 6–7 ensures resistance to blade cuts and high impacts.', icon: Layers },
  { title: 'Heat Integrity', desc: 'Capable of handling hot pans up to 300°C without crack damage.', icon: Droplets },
  { title: 'Acid & Stain Seal', desc: 'Sealed with deep penetration oleophobic layers for easy food prep.', icon: Flame },
  { title: 'Lifetime Warranties', desc: 'Protected by our lifetime structural replacement certificates.', icon: ShieldCheck },
];

const ACCORDIONS = [
  { title: 'Granite Quarrying Methods', content: 'Our granite slabs are block-cut directly from deep subterranean rock faces in Tamil Nadu and Rajasthan using diamond wire saws. Slabs are immediately calibrated and polished at our Chennai studio.' },
  { title: 'Edge Profile Machining', content: 'We offer straight edge bevel, half-bullnose, full radius bullnose, and ogee profiles. Edges are machined on state-of-the-art Italian CNC machines and finished by hand polishing.' },
  { title: 'Oleophobic Sealing Systems', content: 'Natural stones possess minor micro-pores. We seal all countertops with dual-coat nanotechnology impregnating sealers to prevent staining from red wine, lemon juice, or culinary oils.' },
  { title: 'Countertop Thicknesses', content: 'Standard residential countertops use 18mm or 20mm solid slab materials. For a heavier monolithic aesthetic, we build custom mitred apron edge profiles from 40mm to 100mm.' },
];

const TESTIMONIALS = [
  { quote: 'The Absolute Black island top is the centerpiece of our home. Cooking directly on stone that handles hot iron pans is incredible.', author: 'Siddharth & Meenakshi', role: 'Kitchen Island, Chennai', rating: 5 },
  { quote: 'Viscon Wave slabs on our living room wall look like moving clouds. The installer matched the direction of the veins beautifully.', author: 'Vikram Sundaram', role: 'Living Room wall, Coimbatore', rating: 5 },
];

export default function GranitePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ── FILTER STATES ──
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedUse, setSelectedUse] = useState('All');

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState(0);



  const materials = ['All', 'Premium Granite', 'Exotic Quartzites', 'Italian Marble', 'Travertine Blocks', 'Flamed Basalts'];
  const finishes = ['All', 'Mirror Polished', 'Flame Brushed', 'Satin Honed', 'Polished', 'High Polish', 'Matte Honed'];
  const colors = ['All', 'Black', 'Gold', 'White', 'Grey'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (selectedMaterial !== 'All' && p.material !== selectedMaterial) return false;
      if (selectedFinish !== 'All' && p.finish !== selectedFinish) return false;
      if (selectedColor !== 'All' && p.color !== selectedColor) return false;
      if (selectedSize !== 'All' && p.size !== selectedSize) return false;
      if (selectedUse !== 'All') {
        const wantsOutdoor = selectedUse === 'Outdoor';
        if (p.outdoor !== wantsOutdoor) return false;
      }
      if (selectedPrice !== 'All') {
        if (selectedPrice === 'Under ₹250' && p.price >= 250) return false;
        if (selectedPrice === '₹250 - ₹400' && (p.price < 250 || p.price > 400)) return false;
        if (selectedPrice === 'Over ₹400' && p.price <= 400) return false;
      }
      return true;
    });
  }, [selectedMaterial, selectedFinish, selectedColor, selectedSize, selectedUse, selectedPrice]);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF8F5] text-[#2A2A2A] overflow-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative h-[95dvh] flex items-center justify-center overflow-hidden bg-dark">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=2400&q=90"
            alt="Monolithic polished Absolute Black granite slab kitchen countertop background"
            className="w-full h-full object-cover img-grade filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-dark/40 to-dark/80" />
        </motion.div>

        <div className="wrap relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="eyebrow mb-6 tracking-[0.45em] text-[#C9A96E] block">Stone of Permanence</span>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,6.5rem)] font-medium leading-[1.02] tracking-tight text-white mb-6">
              Premium Granite &amp;<br />
              <span className="italic font-normal text-[#C9A96E]">Natural Stone</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-base font-light leading-[1.8] text-white/80 mb-10">
              Quarry-sourced block cuts selected for density, mineral crystallization, and silent authority in architectural spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="wrap">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="eyebrow text-[#C9A96E] mb-3">Architectural Slabs</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-dark">Stone Varieties</h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mt-6" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }} className="group relative h-[420px] overflow-hidden cursor-pointer shadow-md">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 img-grade" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="font-body text-[10px] font-bold text-[#C9A96E] uppercase tracking-[0.35em] mb-2 block font-semibold">Series 0{i+1}</span>
                  <h3 className="font-display text-2xl font-medium text-white mb-2">{cat.title}</h3>
                  <p className="font-body text-xs text-white/70 leading-relaxed max-w-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cat.description}</p>
                  <div className="flex items-center gap-2 text-[#C9A96E] font-body text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Explore Collection <ArrowUpRight className="w-3.5 h-3.5" /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY FILTERS ── */}
      <section className="sticky top-12 z-40 bg-white/95 border-y border-ink/8 backdrop-blur-md shadow-sm">
        <div className="wrap py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-dark/70">
            <SlidersHorizontal className="w-4 h-4 text-[#C9A96E]" />
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">Filter Granite</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <select value={selectedMaterial} onChange={e => setSelectedMaterial(e.target.value)} className="px-3.5 py-2 bg-[#FAF8F5] border border-ink/10 text-xs font-body text-dark/80 rounded-none outline-none focus:border-[#C9A96E] cursor-pointer">
              <option value="All">All Formats</option>
              {materials.slice(1).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={selectedFinish} onChange={e => setSelectedFinish(e.target.value)} className="px-3.5 py-2 bg-[#FAF8F5] border border-ink/10 text-xs font-body text-dark/80 rounded-none outline-none focus:border-[#C9A96E] cursor-pointer">
              <option value="All">All Finishes</option>
              {finishes.slice(1).map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)} className="px-3.5 py-2 bg-[#FAF8F5] border border-ink/10 text-xs font-body text-dark/80 rounded-none outline-none focus:border-[#C9A96E] cursor-pointer">
              <option value="All">All Colors</option>
              {colors.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)} className="px-3.5 py-2 bg-[#FAF8F5] border border-ink/10 text-xs font-body text-dark/80 rounded-none outline-none focus:border-[#C9A96E] cursor-pointer">
              <option value="All">All Pricing</option>
              <option value="Under ₹250">Under ₹250 / sqft</option>
              <option value="₹250 - ₹400">₹250 - ₹400 / sqft</option>
              <option value="Over ₹400">Over ₹400 / sqft</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── FEATURED GRID ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="wrap">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(prod => (
                <motion.div key={prod.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.6 }} className="group relative bg-[#FAF8F5] border border-[#C9A96E]/10 p-4 hover:border-[#C9A96E]/40 transition-all duration-500 shadow-md">
                  <div className="absolute top-6 left-6 z-10 bg-dark/75 border border-[#C9A96E]/40 backdrop-blur-md px-3 py-1 text-[9px] font-body font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">{prod.badge}</div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-white mb-6">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover img-grade transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-body text-[10px] font-semibold text-[#C9A96E] uppercase tracking-wider">{prod.material}</span>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-display text-xl font-medium text-dark">{prod.name}</h3>
                      <span className="font-display text-lg text-[#8B6914] font-semibold">₹{prod.price} <span className="text-[10px] font-body text-ink/40 font-normal">/ sqft</span></span>
                    </div>
                    <div className="mt-4 border-t border-ink/8 pt-3 grid grid-cols-2 gap-2 text-[11px] font-body text-ink/50">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-ink/35">Slab Dimensions</span>
                        <span className="font-medium text-dark/80">{prod.size}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-ink/35">Polished / Satin</span>
                        <span className="font-medium text-dark/80">{prod.finish}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── INSPIRATION ── */}
      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="wrap">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="eyebrow text-[#C9A96E] mb-3">Atmosphere Curation</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-dark">Inspiration Gallery</h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mt-6" />
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {INSPIRATION.map(ins => (
              <div key={ins.title} className="group relative overflow-hidden bg-white border border-[#C9A96E]/10 p-3 shadow-md break-inside-avoid">
                <div className="relative overflow-hidden aspect-[4/5] bg-dark">
                  <img src={ins.image} alt={ins.title} className="w-full h-full object-cover img-grade transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <span className="font-body text-[10px] font-bold text-[#C9A96E] uppercase tracking-[0.25em] mb-2">{ins.tag}</span>
                  <h3 className="font-display text-lg font-medium text-white">{ins.title}</h3>
                </div>
                <div className="p-3 flex items-center justify-between border-t border-ink/5 mt-2 bg-white">
                  <span className="font-body text-[10px] font-bold text-ink/40 uppercase tracking-widest">{ins.tag}</span>
                  <span className="font-body text-[11px] font-semibold text-dark/75">{ins.title.split(',')[1] || ins.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 md:py-28 bg-white border-y border-ink/5">
        <div className="wrap">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={b.title} className="border border-[#C9A96E]/15 bg-[#FAF8F5] p-8 hover:border-[#C9A96E]/40 hover:bg-white transition-all duration-500 shadow-sm">
                  <div className="w-12 h-12 border border-[#C9A96E]/20 bg-white flex items-center justify-center text-[#C9A96E] mb-6">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-dark mb-3">{b.title}</h3>
                  <p className="font-body text-xs text-ink/50 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ACCORDION SPECS ── */}
      <section className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="wrap">
          <div className="viewport-grid items-start gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow text-[#C9A96E] mb-3">Slab Matrix</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight text-dark mb-6">Technical Specifications</h2>
              <div className="line-gold max-w-sm" />
            </div>
            <div className="lg:col-span-7 space-y-4">
              {ACCORDIONS.map((acc, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div key={acc.title} className="border border-[#C9A96E]/15 bg-white shadow-sm overflow-hidden">
                    <button type="button" onClick={() => setOpenAccordion(isOpen ? -1 : idx)} className="w-full flex items-center justify-between p-6 text-left">
                      <h3 className="font-display text-lg font-medium text-dark">{acc.title}</h3>
                      <ChevronDown className={`w-4 h-4 text-[#C9A96E] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.45 }}>
                          <div className="px-6 pb-6 pt-2 border-t border-ink/5 font-body text-xs leading-relaxed text-ink/60">{acc.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT SHOWCASE ── */}
      <section className="py-20 md:py-28 bg-white border-t border-ink/5">
        <div className="wrap">
          <div className="space-y-20">
            {PROJECTS.map((proj, idx) => {
              const imageFirst = idx % 2 === 0;
              return (
                <div key={proj.name} className="grid gap-8 lg:grid-cols-12 items-center">
                  <div className={`lg:col-span-7 ${imageFirst ? '' : 'lg:order-2'}`}>
                    <img src={proj.image} alt={proj.name} className="w-full aspect-[16/10] object-cover shadow-xl border border-ink/10 img-grade" />
                  </div>
                  <div className={`lg:col-span-5 ${imageFirst ? '' : 'lg:order-1'}`}>
                    <span className="font-body text-[10px] font-bold text-[#C9A96E] uppercase tracking-[0.25em] mb-3 block">Completed Slabs</span>
                    <h3 className="font-display text-3xl font-medium text-dark mb-4">{proj.name}</h3>
                    <div className="my-5 border-y border-ink/8 py-4 font-body text-xs text-ink/50 space-y-2">
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35">Materials used</span><span className="font-medium text-dark/80">{proj.material}</span></div>
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35">Location</span><span className="font-medium text-dark/80">{proj.location}</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-[#FAF8F5] border-t border-ink/5">
        <div className="wrap">
          <div className="grid gap-8 sm:grid-cols-2">
            {TESTIMONIALS.map(t => (
              <div key={t.author} className="bg-white border border-[#C9A96E]/15 p-8 shadow-sm flex flex-col justify-between h-72">
                <p className="font-body text-sm italic leading-relaxed text-ink/70">"{t.quote}"</p>
                <div className="border-t border-ink/5 pt-4 mt-6">
                  <h4 className="font-display text-base font-medium text-dark">{t.author}</h4>
                  <span className="font-body text-[10px] text-ink/40 uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-dark text-white text-center">
        <div className="absolute inset-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=2400&q=90" alt="Fine granite countertop texture" className="w-full h-full object-cover img-grade filter brightness-[0.25]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark" />
        </div>
        <div className="wrap relative z-10 max-w-4xl mx-auto">
          <span className="eyebrow text-[#C9A96E] mb-6 block">Bespoke Design Services</span>
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">Bring Permanence Into Every Space</h2>
        </div>
      </section>


    </div>
  );
}