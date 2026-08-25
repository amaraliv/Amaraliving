import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES_600x600, TILES_600x600 } from '../../data/tilesData';
import TileCard from './TileCard';

export default function Section600x600({ onSelectProduct, activeAppFilter, activeSizeFilter, onClearFilter }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTiles = useMemo(() => {
    let list = TILES_600x600;

    if (activeAppFilter) {
      const key = activeAppFilter.toLowerCase().trim();
      list = list.filter((t) => {
        if (t.appKeys && t.appKeys.includes(key)) return true;
        if (t.application && t.application.toLowerCase().includes(key.replace('-', ' '))) return true;
        if (t.application && t.application.toLowerCase().includes(key)) return true;
        return false;
      });
    } else if (activeSizeFilter) {
      const key = activeSizeFilter.toLowerCase().trim();
      list = list.filter((t) => {
        if (t.sizeKey && t.sizeKey.toLowerCase() === key) return true;
        if (t.id && t.id.toLowerCase() === key) return true;
        const cleanSize = key.replace('sz-', '').replace('-floor', '').replace('-full', '').replace('-wall', '').replace('-cool', '').replace('-park', '');
        if (t.size && t.size.toLowerCase().includes(cleanSize)) return true;
        return false;
      });
    }

    if (activeCategory !== 'all') {
      list = list.filter((tile) => tile.category === activeCategory);
    }

    return list;
  }, [activeAppFilter, activeSizeFilter, activeCategory]);

  return (
    <section id="section-600x600" className="py-24 md:py-32 bg-[#F4F1EA] border-t border-black/10 relative">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.38em] text-[#C8102E] uppercase block mb-3">
              Compact Architectural Precision
            </span>
            <h2
              className="text-4xl md:text-6xl font-light tracking-tight text-[#111111] font-display"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              600 × 600 Collection
            </h2>
          </div>
          <p className="text-neutral-700 text-sm font-normal max-w-md">
            Versatile square vitrified tiles engineered for seamless floor surfaces, bathroom walls, and urban interior layouts.
          </p>
        </div>

        {/* Active Filter Badge Banner */}
        {(activeAppFilter || activeSizeFilter) && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#FFF4F5] via-white to-[#FAF8F4] border border-[#C8102E]/35 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-pulse shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-[#111111] uppercase tracking-wider">
                Filtered by {activeAppFilter ? `Space: "${activeAppFilter.replace('-', ' ')}"` : `Format: "${activeSizeFilter.replace('sz-', '')}"`}
                <span className="ml-2 text-neutral-800 font-normal text-xs">({filteredTiles.length} products found)</span>
              </span>
            </div>
            <button
              onClick={onClearFilter}
              className="self-start sm:self-auto px-4 py-1.5 rounded-full bg-[#C8102E] text-white text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-all shadow-xs"
            >
              Clear Filter ✕
            </button>
          </div>
        )}

        {/* Sticky Category Chips Navigation */}
        <div className="sticky top-[64px] z-30 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14 py-4 bg-[#F4F1EA]/90 backdrop-blur-xl border-y border-black/10 mb-12">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
            {CATEGORIES_600x600.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === 'all'
                ? TILES_600x600.length
                : TILES_600x600.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold shadow-md'
                      : 'text-neutral-800 hover:text-black bg-[#EFECE5] border border-black/10 hover:border-black/20 shadow-2xs'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeChipBg600Dimmed"
                      className="absolute inset-0 rounded-full bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat.name}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-black/8 text-neutral-800'}`}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredTiles.length > 0 ? (
              filteredTiles.map((tile, index) => (
                <TileCard
                  key={tile.id}
                  tile={tile}
                  index={index}
                  onSelect={onSelectProduct}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-neutral-600 font-medium">
                No tiles found in this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
