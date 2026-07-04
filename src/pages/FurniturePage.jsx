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
    title: 'Sofa Sets & Lounges',
    description: 'Deep velvet and premium leather upholstery with sculpted profiles.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Luxury Dining Tables',
    description: 'Solid oak and marble dining tables proportioned for gatherings.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Bedsteads & Storage',
    description: 'Tufted headboards and granite-topped bedside credenzas.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Entryway Consoles',
    description: 'Polished stone top consoles reinforced with brushed brass bases.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Study Desks & Shelving',
    description: 'Minimalist workspace furniture crafted for focus and utility.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  },
];

const LIVING_GALLERY = [
  {
    title: 'Modular Wardrobes',
    description: 'Fitted closet structures featuring integrated warm LED grids.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
  },
];

const PRODUCTS = [
  {
    name: 'Velvet Lounge Sofa',
    material: 'Sofa Sets & Lounges',
    finish: 'Deep Upholstered',
    color: 'Green',
    size: '3-Seater (220cm)',
    price: 85000,
    outdoor: false,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Solid Oak Dining',
    material: 'Luxury Dining Tables',
    finish: 'Satin Hand-oiled',
    color: 'Natural Oak',
    size: '6-Seater (180cm)',
    price: 68000,
    outdoor: false,
    badge: 'Signature Item',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Granite Entry Console',
    material: 'Entryway Consoles',
    finish: 'Polished Brass Inlay',
    color: 'Black',
    size: '140cm x 40cm',
    price: 42000,
    outdoor: false,
    badge: 'Exotic Base',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Tufted King Bedstead',
    material: 'Bedsteads & Storage',
    finish: 'Tufted Velvet',
    color: 'Beige',
    size: 'King Size (180x200cm)',
    price: 95000,
    outdoor: false,
    badge: 'Limited Yield',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Walnut Sideboard',
    material: 'Bedsteads & Storage',
    finish: 'Matte Oil Finish',
    color: 'Brown',
    size: '160cm x 50cm',
    price: 54000,
    outdoor: false,
    badge: 'Classic Craft',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Executive Mahogany Desk',
    material: 'Study Desks & Shelving',
    finish: 'Piano Lacquer',
    color: 'Mahogany',
    size: '150cm x 75cm',
    price: 48000,
    outdoor: false,
    badge: 'Premium Studio',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85',
  },
];

const INSPIRATION = [
  { tag: 'Living Room', title: 'Velvet Sofa Arrangement, Alibaug Penthouse', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Dining Room', title: 'Solid Oak Dining layout, Coimbatore Residence', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Bedroom', title: 'King Tufted Headboard setup, Nungambakkam Foyer', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Workspace', title: 'Mahogany Executive Table alignment, Corporate Suite', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Foyer', title: 'Polished Granite console table placement, Grand Lobby', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=85' },
];

const PROJECTS = [
  {
    name: 'Alibaug Coast Dining Space',
    material: 'Bespoke Solid Oak Dining & Seating',
    location: 'Coastal Maharashtra',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Nungambakkam Duplex Foyer',
    material: 'Custom Polished Granite Entrance Console Table',
    location: 'Chennai Central',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
  },
];

const BENEFITS = [
  { title: 'Hand-Milled Joinery', desc: 'Crafted using traditional mortise and tenon joinery for maximum lifetime strength.', icon: Sparkles },
  { title: 'FSC Certified Hardwoods', desc: 'Sustainable solid timbers selected for moisture tolerance and grain pattern.', icon: Compass },
  { title: 'Stone Base Integration', desc: 'Designed to blend seamlessly with matching marble and granite accents.', icon: Layers },
  { title: 'Stain-Resistant Fab', desc: 'Premium velvet and leather materials treated to resist surface moisture spills.', icon: Droplets },
  { title: 'Custom Dimensions', desc: 'Millimetre-precision sizing custom-scaled to fit your floor layout plan.', icon: Flame },
  { title: 'Structural Warranties', desc: 'Backed by a lifetime structural warranty on timber frames and joinery.', icon: ShieldCheck },
];

const ACCORDIONS = [
  { title: 'Timber Sourcing & Provenance', content: 'Our hardwoods are sourced from sustainable certified plantations: white oak from North America, walnut from Eastern Europe, and mahogany from local premium reserves. Every batch is kiln-dried to optimal moisture levels to prevent warping.' },
  { title: 'Custom Sizing Limits', content: 'We custom manufacture pieces to order. Sofas can be scaled from 2-seater inline configurations up to expansive multi-angle modular lounges. Dining tables are built to lengths of up to 4 meters without center joints.' },
  { title: 'Upholstery Selection', content: 'Choose from a curated deck of premium fabrics, including Belgian velvet, Belgian linen, and full-grain aniline leathers. All fabrics carry Martindale rub tests exceeding 40,000 cycles.' },
  { title: 'Maintenance & Wood Care', content: 'For hand-oiled finishes, we recommend application of a natural beeswax wax layer every 12 months. Clean spillages instantly using a dry microfiber cloth. Avoid direct sun exposure to prevent wood dry shrinkage.' },
];

const TESTIMONIALS = [
  { quote: 'The oak dining table is the heart of our dining room. The wood is warm to touch, and the joinery is absolutely immaculate.', author: 'Aravind Swamy', role: 'Dining Room, Chennai Duplex', rating: 5 },
  { quote: 'Our modular velvet sofa is exceptionally comfortable. The fabric is highly stain-resistant and handles daily family use easily.', author: 'Meera & Raghavan', role: 'Living Room Lounge, Coimbatore', rating: 5 },
];

export default function FurniturePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ── FILTER STATES ──
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState(0);



  const categories = ['All', 'Sofa Sets & Lounges', 'Luxury Dining Tables', 'Bedsteads & Storage', 'Entryway Consoles', 'Study Desks & Shelving', 'Modular Wardrobes'];
  const finishes = ['All', 'Deep Upholstered', 'Satin Hand-oiled', 'Polished Brass Inlay', 'Tufted Velvet', 'Matte Oil Finish', 'Piano Lacquer'];
  const colors = ['All', 'Green', 'Natural Oak', 'Black', 'Beige', 'Brown', 'Mahogany'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (selectedCategory !== 'All' && p.material !== selectedCategory) return false;
      if (selectedFinish !== 'All' && p.finish !== selectedFinish) return false;
      if (selectedColor !== 'All' && p.color !== selectedColor) return false;
      if (selectedPrice !== 'All') {
        if (selectedPrice === 'Under ₹50,000' && p.price >= 50000) return false;
        if (selectedPrice === '₹50,000 - ₹80,000' && (p.price < 50000 || p.price > 80000)) return false;
        if (selectedPrice === 'Over ₹80,000' && p.price <= 80000) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedFinish, selectedColor, selectedPrice]);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF8F5] text-[#2A2A2A] overflow-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative h-[95dvh] flex items-center justify-center overflow-hidden bg-dark">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2400&q=90"
            alt="Bespoke luxury velvet lounge sofa set inside modern living room"
            className="w-full h-full object-cover img-grade filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-dark/40 to-dark/80" />
        </motion.div>

        <div className="wrap relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="eyebrow mb-6 tracking-[0.45em] text-[#C9A96E] block">Bespoke Furniture</span>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,6.5rem)] font-medium leading-[1.02] tracking-tight text-white mb-6">
              Furniture &amp;<br />
              <span className="italic font-normal text-[#C9A96E]">Crafted Living</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-base font-light leading-[1.8] text-white/80 mb-10">
              Premium sofas, solid oak dining pieces, and consoles engineered with structural timber frames and natural stone bases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="wrap">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="eyebrow text-[#C9A96E] mb-3">Architectural Atelier</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-dark">Furniture Collections</h2>
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
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">Filter Furniture</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3.5 py-2 bg-[#FAF8F5] border border-ink/10 text-xs font-body text-dark/80 rounded-none outline-none focus:border-[#C9A96E] cursor-pointer">
              <option value="All">All Categories</option>
              {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
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
              <option value="Under ₹50,000">Under ₹50,000</option>
              <option value="₹50,000 - ₹80,000">₹50,000 - ₹80,000</option>
              <option value="Over ₹80,000">Over ₹80,000</option>
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
                      <span className="font-display text-lg text-[#8B6914] font-semibold">₹{formatNumber(prod.price)}</span>
                    </div>
                    <div className="mt-4 border-t border-ink/8 pt-3 grid grid-cols-2 gap-2 text-[11px] font-body text-ink/50">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-ink/35">Scale Sizing</span>
                        <span className="font-medium text-dark/80">{prod.size}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-ink/35">Base Material</span>
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
              <span className="eyebrow text-[#C9A96E] mb-3">Timber Matrix</span>
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
                    <span className="font-body text-[10px] font-bold text-[#C9A96E] uppercase tracking-[0.25em] mb-3 block">Completed Joinery</span>
                    <h3 className="font-display text-3xl font-medium text-dark mb-4">{proj.name}</h3>
                    <div className="my-5 border-y border-ink/8 py-4 font-body text-xs text-ink/50 space-y-2">
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35">Timbers Sourced</span><span className="font-medium text-dark/80">{proj.material}</span></div>
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
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2400&q=90" alt="Fine upholstered furniture texture" className="w-full h-full object-cover img-grade filter brightness-[0.25]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark" />
        </div>
        <div className="wrap relative z-10 max-w-4xl mx-auto">
          <span className="eyebrow text-[#C9A96E] mb-6 block">Bespoke Design Services</span>
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">Bring Comfort Into Every Space</h2>
        </div>
      </section>


    </div>
  );
}