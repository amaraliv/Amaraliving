import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ArrowLeft, Eye, Check, CheckCircle2, Sparkles, Download, Layers } from 'lucide-react';

/* ─────────── APPLICATION DATA ─────────── */
const APPLICATIONS = [
  { id: 'bathroom',     name: 'Bathroom',          label: 'Wet Areas',       highlight: false, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80' },
  { id: 'living-room',  name: 'Living Room',        label: 'Common Spaces',   highlight: false, image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=600&q=80' },
  { id: 'kitchen',      name: 'Kitchen',            label: 'Culinary Spaces', highlight: false, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80' },
  { id: 'bedroom',      name: 'Bedroom',            label: 'Private Retreat', highlight: false, image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80' },
  { id: 'staircase',    name: 'Staircase',          label: 'Vertical Surfaces', highlight: true, image: 'https://images.unsplash.com/photo-1580216643062-cf460548a66a?auto=format&fit=crop&w=600&q=80' },
  { id: 'kitchen-top',  name: 'Kitchen Top',        label: 'Counter Top',     highlight: true,  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80' },
  { id: 'balcony',      name: 'Balcony / SOA',      label: 'Sitout Area',     highlight: false, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'parking',      name: 'Parking',            label: 'Heavy Load',      highlight: false, image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80' },
  { id: 'commercial',   name: 'Commercial / BPT',   label: 'Budget Friendly', highlight: true,  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  { id: 'wooden-plank', name: 'Wooden Plank',       label: 'Wood Look',       highlight: false, image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80' },
  { id: 'hotel',        name: 'Hotel / Kitchen',    label: 'Hospitality',     highlight: false, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80' },
  { id: 'slab',         name: 'Slab',               label: 'Large Format',    highlight: true,  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
  { id: 'elevation',    name: 'Elevation / Exterior', label: 'Exterior Facade', highlight: false, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  { id: 'terrace',      name: 'Terrace / Cool Roof', label: 'Cool Roof',      highlight: false, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80' },
];

/* ─────────── TILE MASTER DATA ─────────── */
const TILE_FORMATS = {
  A: { id: 'A', dims: '1200×2400 mm', unit: '8×4 FT', tag: null, highlight: true },
  B: { id: 'B', dims: '1200×1800 mm', unit: '6×4 FT', tag: null, highlight: true },
  C: { id: 'C', dims: '800×2400 mm', unit: '8×2.5 FT', tag: 'HEAVY DUTY', highlight: true },
  D: { id: 'D', dims: '600×1200 mm', unit: '4×2 FT', tag: null, highlight: false },
  E: { id: 'E', dims: '600×600 mm', unit: '2×2 FT', tag: 'FLOOR', highlight: false },
  F: { id: 'F', dims: '600×600 mm', unit: '2×2 FT', tag: 'FULL BODY', highlight: true },
  G: { id: 'G', dims: '400×400 mm', unit: '16×16 IN', tag: null, highlight: false },
  H: { id: 'H', dims: '300×600 mm', unit: '2×1 FT', tag: null, highlight: true },
  I: { id: 'I', dims: '300×450 mm', unit: '18×12 IN', tag: null, highlight: false },
  J: { id: 'J', dims: '300×300 mm', unit: '1×1 FT', tag: 'WALL', highlight: false },
  K: { id: 'K', dims: '300×300 mm', unit: '1×1 FT', tag: 'COOL ROOF', highlight: false },
  L: { id: 'L', dims: '300×300 mm', unit: '1×1 FT', tag: 'PARKING', highlight: false },
  M: { id: 'M', dims: '200×1200 mm', unit: 'WOODEN PLANK', tag: null, highlight: false },
  N: { id: 'N', dims: '300×1200 mm', unit: '4 FT', tag: 'STAIRCASE', highlight: false },
  O: { id: 'O', dims: '300×1000 mm', unit: '3.25 FT', tag: 'STAIRCASE', highlight: false },
  P: { id: 'P', dims: '300×900 mm', unit: '3 FT', tag: 'STAIRCASE', highlight: false },
};

/* ─────────── APPLICATION MAPPING ─────────── */
const APP_MAPPING = {
  "bathroom": ["A", "B", "D", "H", "J"],
  "living-room": ["A", "B", "C", "D"],
  "kitchen": ["C", "D", "E", "H", "I", "J"],
  "bedroom": ["D", "E", "H", "M"],
  "staircase": ["N", "O", "P"],
  "kitchen-top": ["C"],
  "balcony": ["F", "G", "M"],
  "parking": ["L", "G", "F"],
  "commercial": ["D", "E"],
  "wooden-plank": ["M"],
  "hotel": ["A", "B", "D", "I"],
  "slab": ["A", "B", "C"],
  "elevation": ["A", "B", "C", "D", "H"],
  "terrace": ["K", "G", "F"]
};

/* ─────────── PRODUCTS DATA ─────────── */
const PRODUCT_DATABASE = [
  {
    id: 'p-g1',
    name: 'Statuario Royale Luxe',
    finish: 'Mirror Polished PGVT',
    thickness: '9.5 mm',
    code: 'AM-GL-101',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=90',
    description: 'Ethereal grey veining flowing gracefully over an ultra-white porcelain body.'
  },
  {
    id: 'p-g2',
    name: 'Calacatta Gold Imperial',
    finish: 'High Gloss Gold Vein',
    thickness: '10 mm',
    code: 'AM-GL-102',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=90',
    description: 'Champagne gold currents and soft bronze accents for opulent interior spaces.'
  },
  {
    id: 'p-g3',
    name: 'Nero Marquina Velvet',
    finish: 'Deep Black Polish',
    thickness: '9.5 mm',
    code: 'AM-GL-103',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=90',
    description: 'Dramatic obsidian canvas intersected by crisp white quartz veins.'
  },
  {
    id: 'p-b1',
    name: 'Aura Infinite Bookmatch A+B',
    finish: 'Endless Continuous Vein',
    thickness: '12 mm Slabs',
    code: 'AM-BM-301',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=90',
    description: 'Dual slab mirrored veining creating symmetrical architectural masterworks.'
  },
  {
    id: 'p-m1',
    name: 'Crema Satin Touch',
    finish: 'Silk Touch Matt',
    thickness: '9 mm',
    code: 'AM-MT-201',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=90',
    description: 'Ultra-smooth tactile matte finish with R10 anti-slip rating.'
  },
  {
    id: 'p-c1',
    name: 'Prism Sculpt 3D Relief',
    finish: 'Punch & Metallic Coating',
    thickness: '11 mm',
    code: 'AM-CV-401',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=90',
    description: 'Tactile geometric micro-grooves that capture dynamic room lighting.'
  }
];

/* ─────────── APPLICATION CARD ─────────── */
function AppCard({ item, index, isSelected, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(item)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex w-full flex-col text-left transition-all duration-300 ease-out cursor-pointer"
    >
      {/* Image area */}
      <div className={`relative h-[140px] sm:h-[150px] md:h-[165px] w-full shrink-0 overflow-hidden rounded-2xl transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]
        ${isSelected
          ? 'ring-2 ring-[#C8102E] shadow-[0_8px_25px_-5px_rgba(200,16,46,0.45)] scale-[1.02]'
          : item.highlight 
            ? 'ring-2 ring-[#C8102E]/70 shadow-[0_8px_25px_-5px_rgba(200,16,46,0.35)]' 
            : 'ring-1 ring-black/5 shadow-sm group-hover:ring-[#C8102E]/40'}
      `}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: 'saturate(0.96) contrast(1.04)' }}
        />
        
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />
        <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 pointer-events-none" />

        {isSelected ? (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-[#C8102E] text-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest shadow-md border border-white/20">
            Selected
          </span>
        ) : item.highlight ? (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-[#C8102E] text-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest shadow-md border border-white/20">
            <span className="text-[11px] leading-none">★</span> Featured
          </span>
        ) : null}

        <span className={`absolute right-3 top-3 z-20 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/95 text-[#1A1A1A] shadow-lg backdrop-blur-md transition-all duration-300 ${isSelected ? 'opacity-100 bg-[#C8102E] text-white' : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-[-4px]'}`}>
          <ArrowUpRight className={`h-4.5 w-4.5 transition-transform duration-300 ${isSelected ? 'rotate-90 text-white' : 'group-hover:rotate-45 text-[#C8102E]'}`} />
        </span>
      </div>

      {/* Label plate */}
      <div className="relative flex flex-1 items-center gap-3 px-1 py-3 transition-colors duration-300">
        <span
          className={`shrink-0 text-lg sm:text-xl font-bold leading-none tabular-nums transition-colors duration-300 pt-0.5
            ${isSelected || item.highlight ? 'text-[#C8102E]' : 'text-[#A09A8F] group-hover:text-[#C8102E]'}`}
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight transition-colors duration-300
              ${isSelected || item.highlight ? 'text-[#C8102E]' : 'text-[#1A1A1A] group-hover:text-[#C8102E]'}`}
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            {item.name}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

/* ─────────── PROPORTIONAL TILE GLYPH SHAPE ─────────── */
function TileGlyph({ dims, highlight }) {
  const parts = dims.split(/×|x/).map((s) => parseInt(s.replace(/[^0-9]/g, ''), 10));
  const ratio = (parts.length === 2 && parts[0] > 0 && parts[1] > 0) ? parts[0] / parts[1] : 0.5;
  
  const MAX = 95;
  const height = MAX;
  const width = Math.max(24, Math.min(95, Math.round(MAX * ratio)));

  return (
    <div className="flex items-center justify-center h-[115px] py-1 w-full">
      <div
        className={`relative rounded-[6px] transition-all duration-500 transform group-hover:scale-110 ${
          highlight 
            ? 'border-[2px] border-[#C8102E] shadow-[0_8px_25px_-3px_rgba(200,16,46,0.45)]' 
            : 'border-[1.5px] border-[#B0A8A0] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12)]'
        }`}
        style={{
          width,
          height,
          background: highlight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #FFE4E8 35%, #FFA8B5 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #F7F5F0 50%, #ECE8DF 100%)',
        }}
      >
        <span className="absolute inset-x-[1px] top-[1px] h-[3px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

/* ─────────── TILE FORMAT ITEM (ONLY SHAPE & TEXT) ─────────── */
function ModalTileCard({ format, onClick }) {
  const cleanDims = format.dims.replace(' mm', '');

  return (
    <div 
      onClick={() => onClick(format)}
      className="group relative flex flex-col items-center justify-between py-4 px-3 text-center transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* 1. Proportional Tile Shape Graphic */}
      <TileGlyph dims={format.dims} highlight={format.highlight} />

      {/* 2. Dimensions & Unit */}
      <div className="mt-3 mb-1 flex flex-col items-center">
        <h4
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight transition-colors ${
            format.highlight 
              ? 'text-[#C8102E]' 
              : 'text-[#1A1A1A] group-hover:text-[#C8102E]'
          }`}
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {cleanDims}
        </h4>
        <p
          className={`text-[12px] sm:text-[13px] uppercase tracking-[0.22em] mt-1 ${
            format.highlight 
              ? 'text-[#C8102E] font-black' 
              : 'text-[#777777] font-extrabold'
          }`}
        >
          {format.unit}
        </p>
      </div>

      {/* 3. Special Property Tag Badge */}
      <div className="min-h-[28px] flex items-center justify-center mt-1">
        {format.tag ? (
          <span
            className={`inline-block px-3 py-1 rounded-[4px] text-[10px] font-black uppercase tracking-[0.16em] transition-all duration-300 ${
              format.highlight
                ? 'bg-[#C8102E] text-white shadow-[0_3px_10px_rgba(200,16,46,0.4)]'
                : 'bg-[#EAE6DF] text-[#444444]'
            }`}
          >
            {format.tag}
          </span>
        ) : null}
      </div>

      {/* Hover action pill */}
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#C8102E] uppercase tracking-widest">
        <span>View Products</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

/* ─────────── UNIFIED SHOWCASE VIEW (HARMONIZED WITH MAIN TILECARD SECTION) ─────────── */
function ProductDisplayView({ selectedApp, selectedFormat, onBack, onClose }) {
  const [copiedId, setCopiedId] = useState(null);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [activeFormat, setActiveFormat] = useState(selectedFormat);

  useEffect(() => {
    setActiveFormat(selectedFormat);
  }, [selectedFormat]);

  // Derive available format shapes for selectedApp category
  const categoryFormatIds = (selectedApp?.id && selectedApp?.id !== 'all' && APP_MAPPING[selectedApp.id])
    ? APP_MAPPING[selectedApp.id]
    : Object.keys(TILE_FORMATS);

  const categoryFormats = categoryFormatIds.map(id => TILE_FORMATS[id]).filter(Boolean);

  const displayProducts = PRODUCT_DATABASE;

  const handleEnquire = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] w-screen h-screen bg-[#F4F1EA] flex flex-col justify-between overflow-hidden text-[#111111] selection:bg-[#C8102E] selection:text-white"
    >
      {/* ── 1. STICKY TOP TOOLBAR ── */}
      <div className="px-6 sm:px-12 py-3.5 bg-[#F4F1EA]/90 backdrop-blur-xl border-b border-black/10 flex items-center justify-between shadow-xs z-30 shrink-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 border border-black/10 bg-white hover:bg-[#C8102E] hover:text-white rounded-full text-xs font-semibold uppercase tracking-wider text-[#111111] transition-all duration-300 cursor-pointer shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Formats</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-pulse" />
            <div>
              <span className="text-[10px] font-semibold text-[#C8102E] uppercase tracking-[0.38em] block leading-none mb-1">
                {selectedApp?.name || 'Ceramic'} Surface Collection
              </span>
              <h3 className="text-lg sm:text-xl font-light text-[#111111] leading-none tracking-tight font-display" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {activeFormat.dims} <span className="text-xs font-normal text-neutral-600 font-sans ml-1">({activeFormat.unit})</span>
              </h3>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 text-neutral-600 hover:text-[#C8102E] hover:bg-black/5 rounded-full transition-all duration-200 cursor-pointer"
          aria-label="Close window"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── 2. SPLIT SCREEN EDITORIAL SHOWCASE ── */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-full overflow-hidden">
        
        {/* LEFT COLUMN: FIXED EDITORIAL CONTENT & CATEGORY LISTED SIZES */}
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 p-8 lg:p-10 border-r border-black/10 flex flex-col justify-between bg-[#F4F1EA] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#C8102E]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#C8102E] uppercase">Ceramic Size</span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-light tracking-tight text-[#111111] mb-3" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              {activeFormat.dims}
            </h2>
            <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
              Discover our exclusive ceramic collection engineered for the <span className="font-semibold text-[#111111]">{activeFormat.dims}</span> format. Impeccable craftsmanship tailored for luxury {selectedApp?.name?.toLowerCase() || 'interior'} spaces.
            </p>

            {/* Category Listed Sizes Selector */}
            <div className="mb-10">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Sizes in {selectedApp?.name || 'Category'} ({categoryFormats.length})
              </h4>
              <div className="flex flex-col gap-2">
                {categoryFormats.map((fmt) => {
                  const isSelected = activeFormat.id === fmt.id;
                  return (
                    <button 
                      key={fmt.id}
                      onClick={() => setActiveFormat(fmt)}
                      className={`text-left px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                        isSelected 
                          ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                          : 'bg-white/60 text-neutral-700 border-black/8 hover:bg-white hover:text-[#C8102E] hover:border-[#C8102E]/30'
                      }`}
                    >
                      <div>
                        <span className="text-base font-bold block leading-none" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                          {fmt.dims}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider mt-1 block ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                          {fmt.unit}
                        </span>
                      </div>

                      {fmt.tag && (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          isSelected ? 'bg-[#C8102E] text-white' : 'bg-stone-200 text-neutral-600'
                        }`}>
                          {fmt.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Full Catalog Action (Simple Sleek Button) */}
          <button 
            onClick={() => setShowCatalogModal(true)}
            className="group relative w-full h-[64px] bg-[#111111] hover:bg-[#C8102E] text-white rounded-[16px] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-between px-6 mt-auto border border-black/10 transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#C8102E] group-hover:text-white transition-colors" />
              <span className="text-white text-[12px] font-bold tracking-[0.2em] uppercase font-sans">
                View Catalog
              </span>
            </div>

            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:border-white transition-all duration-300">
               <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* RIGHT COLUMN: SCROLLABLE PRODUCT GRID */}
        <div className="flex-1 bg-[#FAFAF8] overflow-y-auto p-6 sm:p-8 lg:p-10" style={{ scrollbarWidth: 'none' }}>
          {displayProducts.length === 0 ? (
            <div className="h-full flex items-center justify-center text-neutral-400">
              No products match this format.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto pb-10">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-[24px] bg-white border border-black/8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#C8102E]/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12),0_0_25px_rgba(200,16,46,0.15)] flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[1.01]"
                    />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[10px] font-semibold tracking-widest text-[#C8102E] uppercase shadow-xs">
                        {product.finish}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[10px] font-mono tracking-wider text-neutral-700 shadow-xs">
                        {activeFormat.unit}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C8102E]">
                          {product.code}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {product.thickness}
                        </span>
                      </div>
                      <h3 className="text-2xl font-light text-[#0B0B0B] font-display leading-tight mb-3 group-hover:text-[#C8102E] transition-colors"
                          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-600 font-light line-clamp-2 leading-relaxed mb-6">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/8 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span>Vitrified Body</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEnquire(product.id); }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-neutral-800 hover:text-[#C8102E] transition-colors group/btn cursor-pointer"
                      >
                        {copiedId === product.id ? 'Requested ✓' : 'Enquire'}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 3. FOOTER STATUS BAR ── */}
      <div className="px-6 sm:px-12 py-3.5 border-t border-black/10 bg-[#F4F1EA] flex items-center justify-between text-xs text-neutral-600 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
          <span>Format {activeFormat.dims} ({activeFormat.unit}) — {displayProducts.length} Surfaces Available</span>
        </div>
        <button
          onClick={onClose}
          className="font-semibold text-[#C8102E] hover:underline cursor-pointer"
        >
          Exit Full Screen
        </button>
      </div>

      {/* ── CATALOG MODAL TOAST / POPUP ── */}
      <AnimatePresence>
        {showCatalogModal && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative border border-stone-200"
            >
              <button
                onClick={() => setShowCatalogModal(false)}
                className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-14 h-14 bg-[#FFE4E8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#C8102E]">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Amara Living Architectural Specs
              </h3>
              <p className="text-xs text-[#666] leading-relaxed mb-6 font-sans">
                The official 2026 architectural specification document for {activeFormat.dims} includes complete engineering tolerances, stain resistance certifications, and BIM/CAD files.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setShowCatalogModal(false)}
                  className="py-3 bg-[#C8102E] hover:bg-[#900B20] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md block text-center cursor-pointer"
                >
                  Download Complete Spec PDF
                </a>
                <button
                  onClick={() => setShowCatalogModal(false)}
                  className="py-2.5 border border-stone-200 hover:bg-stone-100 text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Return to Showcase
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function TileCatalogSelector() {
  const [selectedAppId, setSelectedAppId] = useState('living-room');
  const [selectedFormat, setSelectedFormat] = useState(null);

  const selectedApp = APPLICATIONS.find(a => a.id === selectedAppId) || null;

  // Select application category and smooth scroll down to formats section
  const handleSelectApp = (appId) => {
    setSelectedAppId(appId);
    setSelectedFormat(null);
    setTimeout(() => {
      const sectionEl = document.getElementById('tile-formats-section');
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  // Derive active formats based on category filter tab
  const activeFormatIds = (selectedAppId && selectedAppId !== 'all' && APP_MAPPING[selectedAppId])
    ? APP_MAPPING[selectedAppId]
    : Object.keys(TILE_FORMATS);

  // Handle ESC key for format popup view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedFormat) {
          setSelectedFormat(null);
        }
      }
    };
    if (selectedFormat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedFormat]);

  return (
    <section id="catalog-selector" className="relative bg-[#FBFBFA] pb-16 pt-8 md:pb-20 md:pt-10">
      {/* Soft ambient wash */}
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(1200px 500px at 15% 0%, rgba(139,30,45,0.04), transparent 60%), radial-gradient(1000px 500px at 90% 20%, rgba(139,30,45,0.03), transparent 55%)' }} />

      {/* ─────────── 1. SHOP BY APPLICATION CARDS GRID ─────────── */}
      <div className="wrap relative mb-8 md:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span
              className="mb-2 block text-[10px] font-black uppercase tracking-[0.44em] text-[#8B1E2D] md:text-[11px]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Amara Ceramics — Catalogue Navigator
            </span>
            <h2
              className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Shop by <span className="italic text-[#8B1E2D]">Application</span>
            </h2>
          </div>
          <p
            className="max-w-[320px] text-[12px] font-medium leading-relaxed text-[#777]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Explore luxury surfaces curated by space, function, and architectural vision.
          </p>
        </motion.div>
      </div>

      <div className="wrap relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {APPLICATIONS.map((item, i) => (
            <AppCard
              key={item.id}
              item={item}
              index={i}
              isSelected={selectedAppId === item.id}
              onClick={() => handleSelectApp(item.id)}
            />
          ))}
        </div>
      </div>

      {/* ─────────── 2. DEDICATED TILE FORMATS & SIZES SECTION ─────────── */}
      <div id="tile-formats-section" className="wrap relative mt-16 pt-12 border-t border-stone-200/80">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-[11px] font-extrabold text-[#8B1E2D] uppercase tracking-[0.35em] block mb-1">
            Available Tile Formats & Sizes
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {selectedApp ? `${selectedApp.name} Formats` : 'All Tile Formats'}
                <span className="text-sm font-normal text-[#777] font-sans ml-3">
                  ({activeFormatIds.length} {activeFormatIds.length === 1 ? 'Format' : 'Formats'} Available)
                </span>
              </h3>
            </div>
            <p className="text-xs text-[#666] max-w-md">
              Click any category filter pill below to switch spaces, or click a format card below to view products.
            </p>
          </div>
        </div>

        {/* ── CATEGORY FILTER PILLS BAR AT THE TOP ── */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setSelectedAppId('all')}
              className={`px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                selectedAppId === 'all'
                  ? 'bg-[#8B1E2D] text-white shadow-md shadow-[#8B1E2D]/25 ring-2 ring-[#8B1E2D]'
                  : 'bg-white text-[#444] border border-stone-200 hover:bg-stone-100 hover:text-[#8B1E2D]'
              }`}
            >
              {selectedAppId === 'all' && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
              <span>All Categories</span>
            </button>

            {APPLICATIONS.map((app) => {
              const isActive = selectedAppId === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => handleSelectApp(app.id)}
                  className={`px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#8B1E2D] text-white shadow-md shadow-[#8B1E2D]/25 ring-2 ring-[#8B1E2D]'
                      : 'bg-white text-[#444] border border-stone-200 hover:bg-stone-100 hover:text-[#8B1E2D]'
                  }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  <span>{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TILE FORMATS / SIZES GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-6">
          {activeFormatIds.map((formatId) => (
            <ModalTileCard
              key={formatId}
              format={TILE_FORMATS[formatId]}
              onClick={setSelectedFormat}
            />
          ))}
          {activeFormatIds.length === 0 && (
            <div className="col-span-full text-center py-12 text-[#777] text-base font-medium">
              No tile formats explicitly mapped for this application yet.
            </div>
          )}
        </div>

        {/* Footer bar */}
        <div className="mt-10 pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777] gap-3">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B1E2D]" />
            Click any format shape above to view products & engineering specifications
          </span>
          {selectedAppId !== 'all' && (
            <button
              onClick={() => setSelectedAppId('all')}
              className="font-bold text-[#8B1E2D] hover:underline cursor-pointer"
            >
              Reset to All Categories
            </button>
          )}
        </div>
      </div>

      {/* ─────────── 3. NEW SECTION: SHOP BY SIZE ─────────── */}
      <div id="shop-by-size" className="wrap relative mt-20 pt-16 border-t border-stone-200/80">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className="mb-2 block text-[10px] font-black uppercase tracking-[0.44em] text-[#8B1E2D] md:text-[11px]"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Amara Ceramics — Dimension Matrix
            </span>
            <h2
              className="text-[clamp(2.2rem,4.2vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Shop by <span className="italic text-[#8B1E2D]">Size</span>
            </h2>
          </div>
          <p
            className="max-w-[340px] text-[12px] font-medium leading-relaxed text-[#777]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Explore all available tile dimensions across our entire porcelain and vitrified catalog.
          </p>
        </div>

        {/* All Sizes Formats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-6">
          {Object.keys(TILE_FORMATS).map((formatId) => (
            <ModalTileCard
              key={formatId}
              format={TILE_FORMATS[formatId]}
              onClick={setSelectedFormat}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777] gap-3">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B1E2D]" />
            Showing all {Object.keys(TILE_FORMATS).length} tile dimensions. Click any shape above to browse products.
          </span>
        </div>
      </div>

      {/* Full-screen product display showcase when a tile format shape card is clicked */}
      <AnimatePresence>
        {selectedFormat && (
          <ProductDisplayView
            selectedApp={selectedApp || { name: 'All Categories', id: 'all' }}
            selectedFormat={selectedFormat}
            onBack={() => setSelectedFormat(null)}
            onClose={() => setSelectedFormat(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
