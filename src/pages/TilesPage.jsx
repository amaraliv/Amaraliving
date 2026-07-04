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
    title: 'Porcelain Tiles',
    description: 'Sintered porcelain in grand architectural formats.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Ceramic Tiles',
    description: 'Moroccan Zellige clay and handcrafted artisanal glazes.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Luxury Wall Tiles',
    description: 'Textured matrices and gold-threaded mosaic panels.',
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Handmade Mosaics',
    description: 'Exquisitely crafted mosaic patterns.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Outdoor Tiling',
    description: 'Slip-resistant split face and flamed stone surfaces.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Terrazzo Tiles',
    description: 'Satin honed terrazzo matrices from Verona.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=85',
  },
];

const PRODUCTS = [
  {
    name: 'Calacatta Luxe',
    material: 'Porcelain Tiles',
    finish: 'Polished Mirror',
    color: 'White',
    size: '120cm x 240cm',
    price: 280,
    outdoor: false,
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Emerald Zellige',
    material: 'Ceramic Tiles',
    finish: 'Glossy Glaze',
    color: 'Green',
    size: '10cm x 10cm',
    price: 320,
    outdoor: false,
    badge: 'Handcrafted',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Verona White Terrazzo',
    material: 'Terrazzo Tiles',
    finish: 'Satin Honed',
    color: 'White',
    size: '60cm x 60cm',
    price: 165,
    outdoor: false,
    badge: 'Verona Sourced',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Cobalt Moroccan Clay',
    material: 'Ceramic Tiles',
    finish: 'Glossy Glaze',
    color: 'Blue',
    size: '10cm x 10cm',
    price: 310,
    outdoor: false,
    badge: 'Artisan Clay',
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Textured Gold Mosaic',
    material: 'Luxury Wall Tiles',
    finish: 'Metallic Satin',
    color: 'Gold',
    size: '30cm x 30cm',
    price: 490,
    outdoor: false,
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Madras Grey Slate',
    material: 'Outdoor Tiling',
    finish: 'Natural Cleft',
    color: 'Grey',
    size: '30cm x 60cm',
    price: 135,
    outdoor: true,
    badge: 'Slip Resistant',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85',
  },
];

const INSPIRATION = [
  { tag: 'Bathroom', title: 'Moroccan Zellige Suite, Nungambakkam', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Kitchen', title: 'Calacatta Backsplash, Alibaug Villa', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Lobby', title: 'Terrazzo Flooring matrix, Atrium lobby', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Office', title: 'Minimalist Porcelain Wall cladding, Tech Hub', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=85' },
  { tag: 'Villa Patio', title: 'Madras Slate Outdoor Pool Deck', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85' },
];

const PROJECTS = [
  {
    name: 'Alibaug Seaside Penthouse',
    material: 'Emerald Zellige Wall & Calacatta Porcelain Floor',
    location: 'Coastal Maharashtra',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'The Nungambakkam Club Foyer',
    material: 'Verona White Terrazzo Grid Matrices',
    location: 'Chennai Central',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  },
];

const BENEFITS = [
  { title: 'Premium Curation', desc: 'Hand-selected tiles chosen for layout patterns and dynamic glaze continuity.', icon: Sparkles },
  { title: 'Quarry & Kiln Direct', desc: 'Imported clay and sintered porcelain from Fes, Verona, and Faenza.', icon: Compass },
  { title: 'Scratch Proof Sintering', desc: 'High-density firing prevents surface scratches from micro-aggregates.', icon: Layers },
  { title: 'Impermeable Seal', desc: 'Pre-treated surfaces with near-zero porosity, ideal for bathrooms.', icon: Droplets },
  { title: 'Hygienic Maintenance', desc: 'Fungus-resistant grout matrices and simple soap-and-water cleanup.', icon: Flame },
  { title: 'Lifetime Structural Integrity', desc: 'Resistant to glaze delamination, impact, and mineral colour fade.', icon: ShieldCheck },
];

const ACCORDIONS = [
  { title: 'Moroccan Zellige Origin', content: 'Our handcrafted clay tiles are formed from raw clay extracted directly from ancient riverbeds near Fes, Morocco. Each tile is hand-molded and sun-baked before glaze firing, resulting in beautiful organic variations.' },
  { title: 'Tile Sizes & Box Math', content: 'We package tiles in complete boxes to prevent transport chip damage. Small zellige clay tiles are packaged 50 pcs per box (covering ~5.5 sq ft), whereas large-format porcelain slabs are packed 2 pcs per box (covering ~27 sq ft).' },
  { title: 'Recommended Grout Matrix', content: 'For professional installations, we recommend neutral non-sanded epoxy grout. Joint widths vary from 2mm (fine flush look for porcelain) to 5mm ( rustic traditional cleft spacing for slate and zellige clay).' },
  { title: 'Maintenance & Sealing', content: 'Unfinished terracotta and natural slate require an application of a penetrating breathable sealer post-installation. Sintered porcelain and glossy glazed ceramics require no sealing.' },
  { title: 'Tile Warranty Terms', content: 'All premium tiles carry a lifetime warranty against glaze cracks, solar colour fade, and base material delamination under standard residential environments.' },
];

const TESTIMONIALS = [
  { quote: 'The zellige wall tiles are simply mesmerizing. The way the glossy surface catches the sunset light makes our kitchen feel alive.', author: 'Meera Subramanian', role: 'Coimbatore Residence', rating: 5 },
  { quote: 'We went with the Calacatta porcelain tiles for the master bath. Seamless floor-to-wall tiling with 2mm joints was executed perfectly.', author: 'Karthik & Ananya R.', role: 'Bengaluru Villa', rating: 5 },
];

export default function TilesPage() {
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

  // ── CALCULATOR STATES ──
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcGrout, setCalcGrout] = useState('3');
  const [calcWaste, setCalcWaste] = useState(10);
  const [calcTileSize, setCalcTileSize] = useState('60x60');
  const [calcBookingOpen, setCalcBookingOpen] = useState(false);
  const [calcBookingName, setCalcBookingName] = useState('');
  const [calcBookingEmail, setCalcBookingEmail] = useState('');
  const [calcBookingSuccess, setCalcBookingSuccess] = useState(false);

  const materials = ['All', 'Porcelain Tiles', 'Ceramic Tiles', 'Terrazzo Tiles', 'Luxury Wall Tiles', 'Outdoor Tiling'];
  const finishes = ['All', 'Polished Mirror', 'Glossy Glaze', 'Satin Honed', 'Metallic Satin', 'Natural Cleft'];
  const colors = ['All', 'White', 'Green', 'Blue', 'Gold', 'Grey'];

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
        if (selectedPrice === 'Under ₹200' && p.price >= 200) return false;
        if (selectedPrice === '₹200 - ₹350' && (p.price < 200 || p.price > 350)) return false;
        if (selectedPrice === 'Over ₹350' && p.price <= 350) return false;
      }
      return true;
    });
  }, [selectedMaterial, selectedFinish, selectedColor, selectedSize, selectedUse, selectedPrice]);

  // Calculator Math
  const lenVal = parseFloat(calcLength) || 0;
  const widVal = parseFloat(calcWidth) || 0;
  const rawSqFt = lenVal * widVal;
  const wasteMultiplier = 1 + calcWaste / 100;
  const groutAdj = 1 - parseFloat(calcGrout) * 0.0015;
  const adjustedArea = rawSqFt * wasteMultiplier * groutAdj;
  
  const tileCoverage = calcTileSize === '60x60' ? 3.88 : calcTileSize === '30x60' ? 1.94 : calcTileSize === '10x10' ? 0.11 : 13.78;
  const perBox = calcTileSize === '60x60' ? 4 : calcTileSize === '30x60' ? 8 : calcTileSize === '10x10' ? 50 : 2;

  const tilesNeeded = Math.ceil(adjustedArea / tileCoverage);
  const boxesNeeded = Math.ceil(tilesNeeded / perBox);
  const totalCost = adjustedArea * 210; // Avg tiles rate
  const calcReady = lenVal > 0 && widVal > 0;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!calcBookingName || !calcBookingEmail) return;
    setCalcBookingSuccess(true);
    setTimeout(() => {
      setCalcBookingSuccess(false);
      setCalcBookingOpen(false);
      setCalcBookingName('');
      setCalcBookingEmail('');
    }, 2500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF8F5] text-[#2A2A2A] overflow-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative h-[95dvh] flex items-center justify-center overflow-hidden bg-dark">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Artisan porcelain tiled wall in luxury interior lounge"
            className="w-full h-full object-cover img-grade filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-dark/40 to-dark/80" />
        </motion.div>

        <div className="wrap relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="eyebrow mb-6 tracking-[0.45em] text-[#C9A96E] block">Surfaces of Texture</span>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,6.5rem)] font-medium leading-[1.02] tracking-tight text-white mb-6">
              Artisan Tiles &amp;<br />
              <span className="italic font-normal text-[#C9A96E]">Porcelain</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-base font-light leading-[1.8] text-white/80 mb-10">
              Hand-pressed Moroccan clays, Italian terrazzos, and sintered slabs designed with minimal tolerances for luxury environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="wrap">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="eyebrow text-[#C9A96E] mb-3">Architectural Kiln</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-dark">Tile Collections</h2>
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
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C9A96E]">Filter Tiles</span>
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
              <option value="Under ₹200">Under ₹200 / sqft</option>
              <option value="₹200 - ₹350">₹200 - ₹350 / sqft</option>
              <option value="Over ₹350">Over ₹350 / sqft</option>
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
                        <span className="block text-[9px] uppercase tracking-wider text-ink/35">Format Size</span>
                        <span className="font-medium text-dark/80">{prod.size}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-ink/35">Glaze Finish</span>
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
              <span className="eyebrow text-[#C9A96E] mb-3">Tiling Matrix</span>
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
                    <span className="font-body text-[10px] font-bold text-[#C9A96E] uppercase tracking-[0.25em] mb-3 block">Completed Tiling</span>
                    <h3 className="font-display text-3xl font-medium text-dark mb-4">{proj.name}</h3>
                    <div className="my-5 border-y border-ink/8 py-4 font-body text-xs text-ink/50 space-y-2">
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35">Material Sourced</span><span className="font-medium text-dark/80">{proj.material}</span></div>
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35">Location</span><span className="font-medium text-dark/80">{proj.location}</span></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="tile-calculator" className="py-20 md:py-28 bg-[#F2ECE5]">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <span className="eyebrow text-[#C9A96E] mb-3">Investment Plan</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-dark mb-6">Estimate Tiling</h2>
              <p className="font-body text-sm leading-relaxed text-ink/60">Configure room dimensions, layout joints, and waste buffer to compute total pieces and box packaging counts.</p>
            </div>
            <div className="lg:col-span-8 bg-white border border-[#C9A96E]/20 p-6 md:p-10 shadow-lg">
              <div className="grid gap-5 sm:grid-cols-3 mb-6">
                <div>
                  <label className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Length (ft)</label>
                  <input type="number" min="0" placeholder="0" value={calcLength} onChange={e => setCalcLength(e.target.value)} className="w-full border border-ink/15 bg-[#FAF8F5] px-4 py-3 text-lg font-display text-dark outline-none focus:border-[#C9A96E]" />
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Width (ft)</label>
                  <input type="number" min="0" placeholder="0" value={calcWidth} onChange={e => setCalcWidth(e.target.value)} className="w-full border border-ink/15 bg-[#FAF8F5] px-4 py-3 text-lg font-display text-dark outline-none focus:border-[#C9A96E]" />
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Cutting Waste</label>
                  <select value={calcWaste} onChange={e => setCalcWaste(parseInt(e.target.value))} className="w-full border border-ink/15 bg-[#FAF8F5] px-3.5 py-3 text-xs font-body text-dark outline-none focus:border-[#C9A96E]">
                    <option value="5">5% (Straight run)</option>
                    <option value="10">10% (Standard grid)</option>
                    <option value="15">15% (Herringbone)</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 mb-6">
                <div>
                  <label className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Format Size</label>
                  <select value={calcTileSize} onChange={e => setCalcTileSize(e.target.value)} className="w-full border border-ink/15 bg-[#FAF8F5] px-3.5 py-3 text-xs font-body text-dark outline-none focus:border-[#C9A96E]">
                    <option value="60x60">60×60 cm (Terrazzo)</option>
                    <option value="30x60">30×60 cm (Slate)</option>
                    <option value="10x10">10×10 cm (Moroccan Clay)</option>
                    <option value="80x160">80×160 cm (Porcelain)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">Grout Width</label>
                  <select value={calcGrout} onChange={e => setCalcGrout(e.target.value)} className="w-full border border-ink/15 bg-[#FAF8F5] px-3.5 py-3 text-xs font-body text-dark outline-none focus:border-[#C9A96E]">
                    <option value="2">2 mm (Fine fit)</option>
                    <option value="3">3 mm (Standard)</option>
                    <option value="5">5 mm (Rustic)</option>
                  </select>
                </div>
              </div>

              <div className="border border-[#C9A96E]/20 bg-[#FAF8F5] p-5 mb-6">
                <AnimatePresence mode="wait">
                  {calcReady ? (
                    <motion.div key={`${rawSqFt}-${calcGrout}-${calcWaste}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35 mb-1">Layout Area</span><span className="font-display text-xl text-dark font-medium">{formatNumber(rawSqFt, { maximumFractionDigits: 1 })} sqft</span></div>
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35 mb-1">Tiles Needed</span><span className="font-display text-xl text-dark font-medium">{formatNumber(tilesNeeded)} pcs</span></div>
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35 mb-1">Boxes Needed</span><span className="font-display text-xl text-dark font-medium">{formatNumber(boxesNeeded)} box</span></div>
                      <div><span className="block text-[9px] uppercase tracking-wider text-ink/35 mb-1">Est. Cost</span><span className="font-display text-xl text-[#8B6914] font-semibold">{formatCurrency(totalCost)}</span></div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-4 font-body text-xs text-ink/40">Enter layout dimensions to calculate.</div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-ink/8 pt-5">
                <span className="font-body text-xs text-ink/40">Includes layout recommendations and box delivery scheduling.</span>
                <button type="button" onClick={() => setCalcBookingOpen(true)} className="btn-solid w-full text-center sm:w-auto">Request Samples</button>
              </div>
            </div>
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
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90" alt="Fine mosaic tiled wall surface texture" className="w-full h-full object-cover img-grade filter brightness-[0.25]" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark" />
        </div>
        <div className="wrap relative z-10 max-w-4xl mx-auto">
          <span className="eyebrow text-[#C9A96E] mb-6 block">Bespoke Design Services</span>
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">Bring Texture Into Every Space</h2>
        </div>
      </section>

      {/* Calculator Modal */}
      <AnimatePresence>
        {calcBookingOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCalcBookingOpen(false)} className="absolute inset-0 bg-dark/70 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-white border border-[#C9A96E]/30 p-7 md:p-9 z-10 shadow-2xl">
              <button type="button" onClick={() => setCalcBookingOpen(false)} className="absolute top-4 right-4 font-body text-xs font-bold uppercase tracking-widest text-ink/40 hover:text-[#C9A96E] transition-colors">Close ✕</button>
              <h3 className="font-display text-2xl text-dark mb-4">Book a Consultation</h3>
              {calcBookingSuccess ? (
                <div className="py-10 text-center">
                  <span className="block text-4xl mb-4 text-[#C9A96E]">✓</span>
                  <p className="font-display text-lg text-dark">Request Received</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-widest text-[#C9A96E] mb-1">Full Name</label>
                    <input type="text" required placeholder="Meera Sundaram" value={calcBookingName} onChange={e => setCalcBookingName(e.target.value)} className="w-full border border-ink/15 bg-[#FAF8F5] px-3.5 py-2.5 text-sm font-body text-dark outline-none focus:border-[#C9A96E]" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] uppercase tracking-widest text-[#C9A96E] mb-1">Email Address</label>
                    <input type="email" required placeholder="meera@example.com" value={calcBookingEmail} onChange={e => setCalcBookingEmail(e.target.value)} className="w-full border border-ink/15 bg-[#FAF8F5] px-3.5 py-2.5 text-sm font-body text-dark outline-none focus:border-[#C9A96E]" />
                  </div>
                  <button type="submit" className="btn-solid w-full text-center mt-2">Confirm Booking</button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}