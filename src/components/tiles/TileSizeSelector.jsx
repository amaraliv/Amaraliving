import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, Maximize2, Check, Ruler, Shield, Droplets, Grid3X3 } from 'lucide-react';
import { TILE_SIZES } from '../../data/tilesData';

/* ── Spec highlights per size ── */
const SIZE_SPECS = {
  '600x600': {
    headline: 'The Classic Standard',
    body: 'The 600×600mm format is the most versatile tile dimension in modern architecture. Perfectly balanced between coverage and ease of handling, it creates elegant grid patterns with clean symmetry.',
    specs: [
      { icon: Ruler, label: 'Thickness', value: '8–10 mm' },
      { icon: Shield, label: 'Hardness', value: 'MOHS 7+' },
      { icon: Droplets, label: 'Absorption', value: '< 0.05%' },
      { icon: Grid3X3, label: 'Coverage', value: '~2.78 tiles/m²' },
    ],
    applications: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Retail Spaces'],
  },
  '600x1200': {
    headline: 'The Grand Format',
    body: 'The 600×1200mm slab delivers a seamless, expansive aesthetic with fewer grout lines. Preferred by leading architects for luxury residences, hotel lobbies, and high-end commercial interiors.',
    specs: [
      { icon: Ruler, label: 'Thickness', value: '9–12 mm' },
      { icon: Shield, label: 'Hardness', value: 'MOHS 8+' },
      { icon: Droplets, label: 'Absorption', value: '< 0.03%' },
      { icon: Grid3X3, label: 'Coverage', value: '~1.39 tiles/m²' },
    ],
    applications: ['Luxury Lobbies', 'Feature Walls', 'Bathrooms', 'Facades'],
  },
};

export default function TileSizeSelector({ selectedFormat, onSelectFormat, onViewProducts }) {

  const handleCardClick = (id) => {
    onSelectFormat(id);
  };

  const activeSize = TILE_SIZES.find((item) => item.id === selectedFormat) || TILE_SIZES[0];
  const extra = SIZE_SPECS[activeSize.id];

  return (
    <section
      id="choose-size"
      className="relative overflow-hidden"
      style={{ background: '#F8F6F2' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 md:px-8 lg:px-12 pt-1 md:pt-4 pb-12 md:pb-16">

        {/* ── Title Row: Left title + Right luxury architectural size selector ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-12">
          {/* Left: Title */}
          <div className="max-w-2xl">
            <span
              className="inline-block text-[11px] font-semibold tracking-[0.35em] uppercase mb-1.5"
              style={{ color: '#B8941F', fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Format Selection
            </span>
            <h2
              className="text-2xl md:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.08] tracking-[-0.02em] mb-2.5"
              style={{ fontFamily: 'Playfair Display, Georgia, serif', color: '#111' }}
            >
              Choose Your Tile Size
            </h2>
            <p
              className="text-xs md:text-sm text-[#777] font-normal leading-relaxed"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Each format is engineered for a distinct spatial experience. Select one to explore the full collection.
            </p>
          </div>

          {/* Right: Architectural Material Size Selector with Compact Container Highlight */}
          <div className="shrink-0 w-full lg:w-auto p-3.5 md:p-4 rounded-xl bg-gradient-to-b from-white via-[#FAF7F2] to-[#F5F0E6] border border-[#D4AF37]/35 shadow-[0_8px_25px_rgba(184,148,31,0.1)]">
            {/* Prominent Eyebrow Label */}
            <div className="flex items-center justify-between gap-4 mb-2.5 pb-2 border-b border-[#B8941F]/15">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8941F] animate-pulse" />
                <span
                  className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#B8941F]"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  SELECT SIZE
                </span>
              </div>
              <span
                className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full bg-[#B8941F]/10 text-[#9E7B1A] border border-[#B8941F]/20"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                2 Formats Available
              </span>
            </div>

            {/* Sleek Horizontal Stretched Rectangle Specification Cards */}
            <div className="flex items-center gap-3 md:gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-full">
              {TILE_SIZES.map((sizeItem) => {
                const isActive = selectedFormat === sizeItem.id;
                return (
                  <button
                    key={sizeItem.id}
                    type="button"
                    onClick={() => handleCardClick(sizeItem.id)}
                    className={`
                      relative group text-left px-4 py-2.5 md:px-5 md:py-3 rounded-lg transition-all duration-300
                      cursor-pointer outline-none border flex flex-col justify-center min-w-[170px] sm:min-w-[195px] md:min-w-[210px]
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-white via-[#FFFDF8] to-[#FAF5EB] border-2 border-[#B8941F] shadow-[0_4px_18px_rgba(184,148,31,0.15)]'
                          : 'bg-white/80 border-[#E2DDD3] hover:bg-white hover:border-[#B8941F]/50 shadow-2xs'
                      }
                    `}
                  >
                    {/* Top Row: Descriptor + Active Badge */}
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[9px] md:text-[10px] font-extrabold tracking-[0.2em] uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#B8941F]' : 'text-[#777777] group-hover:text-[#333333]'
                          }`}
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {sizeItem.id === '600x600' ? 'STANDARD' : 'SLAB'}
                        </span>
                        <span className="text-[8px] text-[#BBB]">•</span>
                        <span
                          className={`text-[8px] md:text-[9px] font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#9E7B1A]' : 'text-[#A0A0A0]'
                          }`}
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          VITRIFIED
                        </span>
                      </div>
                      {isActive && (
                        <span className="px-1.5 py-0.5 rounded bg-[#B8941F] text-white text-[7.5px] font-bold tracking-wider uppercase shrink-0">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    {/* Dimensions Main Typography (Stretched Wide) */}
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-[#111111]' : 'text-[#444444] group-hover:text-[#111111]'
                        }`}
                        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                      >
                        {sizeItem.title}
                      </span>
                      <span
                        className={`text-[8px] md:text-[9px] font-medium tracking-wider uppercase transition-colors duration-300 ${
                          isActive ? 'text-[#B8941F]' : 'text-[#A0A0A0]'
                        }`}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {sizeItem.id === '600x600' ? '60×60 cm' : '60×120 cm'}
                      </span>
                    </div>

                    {/* Animated Gold Bottom Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSizeLine"
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#B8941F] via-[#D4AF37] to-[#B8941F] rounded-b-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Single Displayed Card + Info Panel for Selected Format ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSize.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14 items-center"
          >
            {/* ── Card ── */}
            <div
              className="group relative rounded-2xl overflow-hidden text-left shrink-0 w-full md:w-[380px] lg:w-[420px] ring-2 ring-[#D4AF37] shadow-lg"
              style={{ background: '#fff' }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={activeSize.image}
                  alt={activeSize.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Size on image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span
                    className="text-xl md:text-2xl font-medium text-white tracking-tight"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {activeSize.title}
                  </span>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#D4AF37] text-[#111]">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Badges */}
                <div
                  className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#111]/80 text-[#D4AF37] text-[9px] font-semibold tracking-wider uppercase"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  <Check className="w-3 h-3" />
                  Active Selection
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/80 text-[9px] font-semibold tracking-[0.15em] text-[#111] uppercase"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {activeSize.id === '600x600' ? <Layers className="w-3 h-3 text-[#B8941F]" /> : <Maximize2 className="w-3 h-3 text-[#B8941F]" />}
                    {activeSize.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-5">
                <h3
                  className="text-base md:text-lg font-medium text-[#111] mb-1"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {activeSize.title} Collection
                </h3>
                <p
                  className="text-[11px] text-[#888] font-normal leading-relaxed mb-3"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {activeSize.description}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activeSize.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[8px] uppercase tracking-[0.1em] px-2 py-[3px] rounded bg-[#F0EDE6] text-[#666] font-medium"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between pt-3 border-t border-black/[0.05]">
                  <span
                    className="text-[9px] font-semibold tracking-[0.2em] text-[#B8941F] uppercase"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {activeSize.dimensions}
                  </span>
                  <button
                    type="button"
                    onClick={onViewProducts}
                    className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#111111] hover:text-[#B8941F] uppercase transition-colors"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    View Products
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Info Panel ── */}
            <div className="flex-1 min-w-0">
              {/* Headline */}
              <span
                className="text-[10px] font-semibold tracking-[0.35em] uppercase block mb-2"
                style={{ color: '#B8941F', fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {activeSize.dimensions} Specifications
              </span>
              <h3
                className="text-xl md:text-2xl lg:text-3xl font-medium text-[#111] mb-3 leading-snug"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                {extra.headline}
              </h3>
              <div className="w-12 h-px bg-gradient-to-r from-[#D4AF37] to-transparent mb-4" />
              <p
                className="text-[13px] text-[#666] font-normal leading-[1.75] mb-6"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {extra.body}
              </p>

              {/* Spec Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {extra.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-black/[0.06] shadow-xs"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#F8F6F2] flex items-center justify-center shrink-0">
                      <spec.icon className="w-4 h-4 text-[#B8941F]" />
                    </span>
                    <div>
                      <span
                        className="text-[10px] text-[#999] uppercase tracking-[0.15em] block leading-none mb-0.5"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="text-sm font-semibold text-[#222]"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Applications & Action */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span
                    className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#999] block mb-2"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Ideal Applications
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extra.applications.map((app) => (
                      <span
                        key={app}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-[#111] text-white font-medium shadow-xs"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onViewProducts}
                  className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#B8941F] text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-md shrink-0 flex items-center justify-center gap-2 group cursor-pointer"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  Explore {activeSize.title} Products
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

