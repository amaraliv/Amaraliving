import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_LUXURY } from '../constants/animations';
import { formatCurrency, formatNumber } from '../utils/format';

const TILE_VARIETIES = [
  {
    id: 'terrazzo-white',
    name: 'Terrazzo White',
    category: 'Terrazzo',
    swatchColor: '#E6E3DF',
    roomImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    description: 'Light grey base with hand-selected granite and quartz aggregate shards. Gives a crisp, contemporary Mediterranean vibe.',
    size: '60cm x 60cm',
    thickness: '18mm',
    finish: 'Satin Honed',
    origin: 'Verona, Italy',
    sqFtPerTile: 3.88,
    rate: 165,
  },
  {
    id: 'slate-grey',
    name: 'Slate Grey',
    category: 'Natural Slate',
    swatchColor: '#4A4E52',
    roomImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    description: 'Fine-grained natural slate sourced from South Indian quarries. Characterized by subtle cleft texturing and deep carbon tones.',
    size: '30cm x 60cm',
    thickness: '12mm',
    finish: 'Natural Cleft',
    origin: 'Madurai, India',
    sqFtPerTile: 1.94,
    rate: 135,
  },
  {
    id: 'emerald-zellige',
    name: 'Emerald Zellige',
    category: 'Handcrafted Clay',
    swatchColor: '#0E5440',
    roomImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
    description: 'Traditional Moroccan hand-molded clay tiles. Each tile features slight organic surface waves and chromatic differences in deep emerald green.',
    size: '10cm x 10cm',
    thickness: '10mm',
    finish: 'Glossy Translucent Glaze',
    origin: 'Fes, Morocco',
    sqFtPerTile: 0.11,
    rate: 320,
  },
  {
    id: 'desert-sand',
    name: 'Desert Sand',
    category: 'Terracotta',
    swatchColor: '#D99873',
    roomImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    description: 'Warm, sun-baked clay terracotta tiles. Selected for high porosity, thermal cooling efficiency, and grounding texture.',
    size: '30cm x 30cm',
    thickness: '20mm',
    finish: 'Matte Raw / Waxed',
    origin: 'Chennai, India',
    sqFtPerTile: 0.97,
    rate: 110,
  },
  {
    id: 'calacatta-porcelain',
    name: 'Calacatta Luxe',
    category: 'Porcelain',
    swatchColor: '#F5F5F5',
    roomImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    description: 'High-density sintered porcelain reproducing Italian Calacatta veining. Perfect for seamless wall-to-floor layouts.',
    size: '80cm x 160cm',
    thickness: '9mm',
    finish: 'Polished Mirror / Honed',
    origin: 'Faenza, Italy',
    sqFtPerTile: 13.78,
    rate: 280,
  }
];

const SURFACE_MATERIALS = [
  { id: 'granite', label: 'Granite', rate: 220 },
  { id: 'designer-tiles', label: 'Designer Tiles', rate: 165 },
  { id: 'premium-tiles', label: 'Premium Tiles', rate: 120 },
];

export default function TilesPage() {
  const [activeTileId, setActiveTileId] = useState(TILE_VARIETIES[0].id);

  // Calculator states
  const [materialId, setMaterialId] = useState(SURFACE_MATERIALS[1].id); // starts with designer-tiles
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [selectedTileSize, setSelectedTileSize] = useState('60x60'); // '60x60', '30x60', '10x10', '80x160'
  const [groutWidth, setGroutWidth] = useState('3'); // '2', '3', '5' (mm)
  const [wasteMargin, setWasteMargin] = useState(10); // 10%, 15%

  // Consultation Modal Booking states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeTile = useMemo(() => {
    return TILE_VARIETIES.find(t => t.id === activeTileId) || TILE_VARIETIES[0];
  }, [activeTileId]);

  const activeMaterial = useMemo(() => {
    return SURFACE_MATERIALS.find(m => m.id === materialId) || SURFACE_MATERIALS[2];
  }, [materialId]);

  const isTileCalc = materialId.includes('tiles');

  // Calculator Math
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const rawArea = l * w;

  // Waste multiplier
  const wasteMultiplier = 1 + wasteMargin / 100;
  
  // Grout adjustment factor (only applies to tiles): 2mm ~ 1.002, 3mm ~ 1.004, 5mm ~ 1.008 (slightly reducing layout area needed)
  const groutAdjustment = isTileCalc ? (1 - (parseFloat(groutWidth) * 0.0015)) : 1;
  
  const calculatedArea = rawArea * wasteMultiplier * groutAdjustment;

  // Tile coverage math
  const tileCoverageSqFt = useMemo(() => {
    switch (selectedTileSize) {
      case '60x60': return 3.88; // 0.6 * 0.6 m = 3.88 sq ft
      case '30x60': return 1.94; // 0.3 * 0.6 m = 1.94 sq ft
      case '10x10': return 0.11; // 0.1 * 0.1 m = 0.11 sq ft
      case '80x160': return 13.78; // 0.8 * 1.6 m = 13.78 sq ft
      default: return 3.88;
    }
  }, [selectedTileSize]);

  const tilesNeeded = Math.ceil(calculatedArea / tileCoverageSqFt);
  
  // Package calculation (Assuming box coverage)
  const tilesPerBox = useMemo(() => {
    switch (selectedTileSize) {
      case '60x60': return 4;  // 4 tiles = 15.52 sq ft
      case '30x60': return 8;  // 8 tiles = 15.52 sq ft
      case '10x10': return 50; // 50 tiles = 5.5 sq ft
      case '80x160': return 2; // 2 tiles = 27.56 sq ft
      default: return 4;
    }
  }, [selectedTileSize]);

  const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);
  const totalCost = calculatedArea * activeMaterial.rate;

  const calculatorReady = l > 0 && w > 0;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setBookingName('');
      setBookingEmail('');
      setBookingMsg('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-dark text-cream pt-24 pb-16">
      {/* Background overlay glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-10 right-0 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_60%)]" />
      </div>

      <div className="wrap relative z-10">
        {/* Back navigation */}
        <div className="mb-8">
          <a
            href="#/"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold hover:text-cream transition-colors group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            Back to Home
          </a>
        </div>

        {/* Hero header */}
        <header className="mb-12 md:mb-16">
          <p className="eyebrow mb-3 text-gold">Surface Atelier</p>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
                Artisan Tiles &amp; <br />
                <span className="italic text-gold">Porcelain Surfaces</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="font-body text-sm leading-relaxed text-cream/50">
                Textural details composed to elevate walls, backsplashes, and floor matrices. Handcrafted clays and sintered materials selected for performance and timeless aesthetic.
              </p>
            </div>
          </div>
          <div className="mt-8 line-gold max-w-xl origin-left" />
        </header>

        {/* SECTION: Interactive Visualizer */}
        <section className="grid gap-8 lg:grid-cols-12 items-stretch mb-20">
          {/* Left panel: Room Preview Image */}
          <div className="lg:col-span-8 relative h-[350px] md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden border border-cream/10 bg-dark shadow-2xl">
            <div className="absolute inset-0 z-20 border border-cream/5 rounded-2xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTile.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeTile.roomImage}
                  alt={`${activeTile.name} in room scene`}
                  className="w-full h-full object-cover img-grade"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Room Visualizer Active Label Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="font-body text-[9px] font-bold tracking-[0.25em] text-gold uppercase bg-dark/60 border border-gold/30 px-2 py-0.5 rounded-sm mb-2 inline-block">
                  Live Visualizer Preview
                </span>
                <h3 className="font-display text-2xl text-cream md:text-3xl">
                  {activeTile.name}
                </h3>
                <p className="font-body text-xs text-cream/75 max-w-md mt-1 leading-relaxed">
                  {activeTile.description}
                </p>
              </div>
              <div className="shrink-0">
                <span className="text-sm font-body text-cream/50 block md:text-right">Material Pricing</span>
                <span className="text-xl font-display text-gold">₹{activeTile.rate} <span className="text-xs font-body text-cream/60">/ sq ft</span></span>
              </div>
            </div>
          </div>

          {/* Right panel: Swatch and info selector */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-cream/10 bg-cream/[0.02] p-6 md:p-8 rounded-2xl shadow-xl">
            <div>
              <span className="font-body text-[10px] font-bold tracking-widest text-gold uppercase block mb-3">
                Select Tile Finish
              </span>
              <h2 className="font-display text-xl text-cream mb-6">
                Interactive Swatches
              </h2>

              <div className="grid grid-cols-5 gap-3.5 mb-8">
                {TILE_VARIETIES.map((t) => {
                  const active = t.id === activeTileId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setActiveTileId(t.id);
                        // Pre-select appropriate tile size in calculator based on selected swatch
                        if (t.id === 'emerald-zellige') setSelectedTileSize('10x10');
                        else if (t.id === 'slate-grey') setSelectedTileSize('30x60');
                        else if (t.id === 'calacatta-porcelain') setSelectedTileSize('80x160');
                        else setSelectedTileSize('60x60');
                      }}
                      title={`Preview ${t.name}`}
                      className={`relative aspect-square rounded-full border transition-all duration-300 ${
                        active 
                          ? 'border-gold scale-110 shadow-[0_0_12px_rgba(212,175,55,0.45)]' 
                          : 'border-cream/25 hover:border-gold/60'
                      }`}
                      style={{ backgroundColor: t.swatchColor }}
                    >
                      {active && (
                        <div className="absolute inset-1 rounded-full border border-dark opacity-50" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Technical Specifications */}
              <div className="border-t border-cream/10 pt-6 space-y-4">
                <span className="font-body text-[10px] font-bold tracking-widest text-gold uppercase block">
                  Technical Specifications
                </span>
                
                <div className="grid grid-cols-2 gap-y-3.5 text-xs font-body">
                  <div>
                    <span className="text-cream/45 block">Category</span>
                    <span className="text-cream font-medium">{activeTile.category}</span>
                  </div>
                  <div>
                    <span className="text-cream/45 block">Standard Size</span>
                    <span className="text-cream font-medium">{activeTile.size}</span>
                  </div>
                  <div>
                    <span className="text-cream/45 block">Thickness</span>
                    <span className="text-cream font-medium">{activeTile.thickness}</span>
                  </div>
                  <div>
                    <span className="text-cream/45 block">Surface Finish</span>
                    <span className="text-cream font-medium leading-tight block">{activeTile.finish}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-cream/45 block">Studio Source / Origin</span>
                    <span className="text-cream font-medium">{activeTile.origin}</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => {
                // Return to home contact
                window.location.hash = '#/contact';
              }}
              className="w-full text-center py-3.5 mt-8 bg-gold hover:bg-cream text-dark font-body text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm transition-all shadow-md"
            >
              Order Sample Pack
            </a>
          </div>
        </section>

        {/* SECTION: Integrated Surface & Tile Calculator */}
        <section id="calculator" className="border border-cream/10 rounded-2xl bg-cream/[0.01] p-6 md:p-10 relative overflow-hidden mb-8">
          <div className="absolute -left-10 top-0 pointer-events-none w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)]" />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Description Column */}
            <div className="lg:col-span-4">
              <p className="eyebrow text-gold mb-2.5">Investment</p>
              <h2 className="font-display text-2xl md:text-3xl font-medium text-cream mb-4">
                Estimate Your<br /><span className="italic text-gold">Surface Investment</span>
              </h2>
              <p className="font-body text-xs md:text-sm leading-relaxed text-cream/50">
                Select your surface material, enter layout dimensions, and specify grout configurations. Receive an instant estimate tailored for luxury spaces.
              </p>
              <div className="mt-6 border-l-2 border-gold/45 pl-4 py-1.5 text-xs font-body italic text-cream/65">
                Note: Standard slab calculations cover seamless granite placement. Tile layouts account for spacing cuts, joints, and packing boxes.
              </div>
            </div>

            {/* Right Form & Outputs Column */}
            <div className="lg:col-span-8 bg-dark border border-cream/10 p-5 md:p-8 rounded-xl shadow-2xl relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-gold/40 pointer-events-none" />

              {/* Material Selector Fieldset */}
              <fieldset className="mb-6 border-b border-cream/10 pb-5">
                <legend className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Select Material
                </legend>
                <div className="flex flex-wrap gap-2">
                  {SURFACE_MATERIALS.map((item) => {
                    const selected = item.id === materialId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMaterialId(item.id)}
                        aria-pressed={selected}
                        className={`rounded-sm border px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                          selected
                            ? 'border-gold bg-gold/15 text-gold shadow-glow-sm'
                            : 'border-cream/20 bg-cream/[0.04] text-cream/60 hover:border-gold/35 hover:text-cream'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {/* Length Input */}
                <div>
                  <label htmlFor="tile-len" className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                    Length (ft)
                  </label>
                  <input
                    id="tile-len"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full bg-cream/[0.05] border border-cream/20 px-4 py-3 text-lg font-display text-cream rounded-sm outline-none focus:border-gold"
                  />
                </div>

                {/* Width Input */}
                <div>
                  <label htmlFor="tile-wid" className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                    Width (ft)
                  </label>
                  <input
                    id="tile-wid"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-cream/[0.05] border border-cream/20 px-4 py-3 text-lg font-display text-cream rounded-sm outline-none focus:border-gold"
                  />
                </div>

                {/* Waste Margin Selector */}
                <div>
                  <label htmlFor="waste-pct" className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                    Waste &amp; Cutting Margin
                  </label>
                  <select
                    id="waste-pct"
                    value={wasteMargin}
                    onChange={(e) => setWasteMargin(parseInt(e.target.value))}
                    className="w-full bg-[#081229] border border-cream/20 px-3.5 py-3 text-xs font-body text-cream rounded-sm outline-none focus:border-gold"
                  >
                    <option value="10">10% (Straight lay grid)</option>
                    <option value="15">15% (Diagonal / Herringbone)</option>
                    <option value="5">5% (Simple slab borders)</option>
                  </select>
                </div>

                {/* Conditional Tile Inputs */}
                {isTileCalc && (
                  <>
                    {/* Tile Size Selector */}
                    <div>
                      <label htmlFor="tile-sz" className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                        Tile Format Size
                      </label>
                      <select
                        id="tile-sz"
                        value={selectedTileSize}
                        onChange={(e) => setSelectedTileSize(e.target.value)}
                        className="w-full bg-[#081229] border border-cream/20 px-3.5 py-3 text-xs font-body text-cream rounded-sm outline-none focus:border-gold"
                      >
                        <option value="60x60">60x60 cm (Terrazzo / Porcelain)</option>
                        <option value="30x60">30x60 cm (Slate / Granite)</option>
                        <option value="10x10">10x10 cm (Zellige Clay)</option>
                        <option value="80x160">80x160 cm (Luxe Porcelain)</option>
                      </select>
                    </div>

                    {/* Grout Width Selector */}
                    <div>
                      <label htmlFor="grout-sz" className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                        Grout Joint Width
                      </label>
                      <select
                        id="grout-sz"
                        value={groutWidth}
                        onChange={(e) => setGroutWidth(e.target.value)}
                        className="w-full bg-[#081229] border border-cream/20 px-3.5 py-3 text-xs font-body text-cream rounded-sm outline-none focus:border-gold"
                      >
                        <option value="2">2 mm (Fine flush fit)</option>
                        <option value="3">3 mm (Standard joint)</option>
                        <option value="5">5 mm (Artisan rustique)</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Selected Swatch Mirror */}
                <div>
                  <label className="block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                    Current Rate
                  </label>
                  <div className="flex items-center gap-2.5 h-[46px] border border-cream/15 px-3.5 bg-cream/[0.02] rounded-sm text-xs font-body">
                    <span className="text-gold font-semibold uppercase">{activeMaterial.label}</span>
                    <span className="text-cream/50 ml-auto">₹{activeMaterial.rate} / sq ft</span>
                  </div>
                </div>
              </div>

              {/* Calculator output block */}
              <div className="mt-6 border border-cream/10 bg-cream/[0.04] p-5 rounded-lg">
                <AnimatePresence mode="wait">
                  {calculatorReady ? (
                    <motion.div
                      key={`${activeMaterial.id}-${rawArea}-${selectedTileSize}-${groutWidth}-${wasteMargin}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-xs font-body text-cream/70"
                    >
                      <div>
                        <span className="text-cream/45 block mb-1">Layout Area</span>
                        <span className="text-xl font-display text-cream block">{formatNumber(rawArea, { maximumFractionDigits: 1 })} <span className="text-xs font-body text-cream/50">sq ft</span></span>
                      </div>
                      
                      {isTileCalc ? (
                        <>
                          <div>
                            <span className="text-cream/45 block mb-1">Total Tiles Needed</span>
                            <span className="text-xl font-display text-cream block">{formatNumber(tilesNeeded)} <span className="text-xs font-body text-cream/50">pcs</span></span>
                            <span className="text-[10px] text-cream/40 leading-none">incl. {wasteMargin}% waste</span>
                          </div>
                          <div>
                            <span className="text-cream/45 block mb-1">Boxes to Order</span>
                            <span className="text-xl font-display text-cream block">{formatNumber(boxesNeeded)} <span className="text-xs font-body text-cream/50">boxes</span></span>
                            <span className="text-[10px] text-cream/40 leading-none">({tilesPerBox} pcs / box)</span>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2">
                          <span className="text-cream/45 block mb-1">Total Adjusted Slab Area</span>
                          <span className="text-xl font-display text-cream block">{formatNumber(calculatedArea, { maximumFractionDigits: 1 })} <span className="text-xs font-body text-cream/50">sq ft</span></span>
                          <span className="text-[10px] text-cream/40 leading-none">incl. {wasteMargin}% cut layout buffer</span>
                        </div>
                      )}

                      <div>
                        <span className="text-cream/45 block mb-1">Estimated Investment</span>
                        <span className="text-xl font-display text-gold block">{formatCurrency(totalCost)}</span>
                        <span className="text-[10px] text-cream/40 leading-none">indicative pricing</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex h-12 items-center justify-center">
                      <p className="text-xs font-body text-cream/55">
                        Please enter length and width dimensions to estimate surface cost in Indian Rupees.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book Consultation Button */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-cream/5 pt-5">
                <span className="text-xs font-body text-cream/45">
                  Pre-fill calculator results in your advisory consultation inquiry.
                </span>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="px-6 py-3.5 bg-gold text-dark hover:bg-cream hover:text-dark font-body text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm transition-all duration-300 shadow-md hover:shadow-glow-sm"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Book Consultation Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-dark/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: EASE_LUXURY }}
              className="relative w-full max-w-lg bg-dark border border-gold/30 rounded-xl overflow-hidden p-6 md:p-8 z-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 text-cream/50 hover:text-gold transition-colors font-body text-sm font-semibold"
                aria-label="Close modal"
              >
                CLOSE
              </button>

              <p className="eyebrow text-gold mb-1">Consultation Scheduler</p>
              <h3 className="font-display text-xl md:text-2xl text-cream mb-4">
                Book Consultation
              </h3>

              {/* Estimate Details Box */}
              <div className="bg-cream/[0.03] border border-cream/10 p-4 rounded-sm text-xs font-body text-cream/70 mb-5 space-y-1.5">
                <div>
                  <span className="text-gold font-bold uppercase tracking-wider text-[9px] mr-2">Selected Material:</span>
                  <span className="text-cream font-medium">{activeMaterial.label}</span>
                </div>
                {calculatorReady && (
                  <>
                    <div>
                      <span className="text-gold font-bold uppercase tracking-wider text-[9px] mr-2">Dimensions:</span>
                      <span className="text-cream font-medium">{length} ft x {width} ft ({formatNumber(rawArea, { maximumFractionDigits: 1 })} sq ft)</span>
                    </div>
                    <div>
                      <span className="text-gold font-bold uppercase tracking-wider text-[9px] mr-2">Estimated Investment:</span>
                      <span className="text-gold font-semibold">{formatCurrency(totalCost)}</span>
                    </div>
                  </>
                )}
              </div>

              {bookingSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-10 text-center"
                >
                  <span className="block text-4xl mb-4">✓</span>
                  <p className="font-display text-lg text-gold mb-2">Consultation Booked</p>
                  <p className="font-body text-xs text-cream/60">We will call/email you in the next 24 hours to confirm your designer slots.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="booking-name" className="block font-body text-[10px] uppercase tracking-widest text-gold mb-1">
                      Full Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="Meera Sundaram"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-cream/[0.05] border border-cream/20 px-3.5 py-2.5 text-sm font-body text-cream rounded-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="block font-body text-[10px] uppercase tracking-widest text-gold mb-1">
                      Email Address
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="meera@example.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full bg-cream/[0.05] border border-cream/20 px-3.5 py-2.5 text-sm font-body text-cream rounded-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-msg" className="block font-body text-[10px] uppercase tracking-widest text-gold mb-1">
                      Additional Site Notes (Optional)
                    </label>
                    <textarea
                      id="booking-msg"
                      rows="3"
                      placeholder="Living room flooring project in Chennai. Looking to coordinate matching wall tiles."
                      value={bookingMsg}
                      onChange={(e) => setBookingMsg(e.target.value)}
                      className="w-full bg-cream/[0.05] border border-cream/20 px-3.5 py-2.5 text-sm font-body text-cream rounded-sm outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-3.5 bg-gold hover:bg-gold/90 text-dark font-body text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm transition-all shadow-md mt-4"
                  >
                    Confirm Booking Schedule
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
