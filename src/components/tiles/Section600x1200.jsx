import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { CATEGORIES_600x1200, SUB_FILTERS_600x1200, TILES_600x1200 } from '../../data/tilesData';
import TileCard from './TileCard';

export default function Section600x1200({ onSelectProduct, activeAppFilter, activeSizeFilter, onClearFilter }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubFilter, setActiveSubFilter] = useState('all');

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveSubFilter('all');
  };

  const filteredTiles = useMemo(() => {
    let list = TILES_600x1200;

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
      list = list.filter((tile) => {
        let matchesMain = tile.category === activeCategory || tile.subCategory === activeCategory;
        if (activeCategory === 'Glossy' && tile.category === 'Glossy') matchesMain = true;
        if (!matchesMain) return false;
        if (activeSubFilter !== 'all') {
          if (tile.subCategory !== activeSubFilter && tile.category !== activeSubFilter) {
            return false;
          }
        }
        return true;
      });
    }

    return list;
  }, [activeAppFilter, activeSizeFilter, activeCategory, activeSubFilter]);

  const currentSubFilters = SUB_FILTERS_600x1200[activeCategory] || null;

  return (
    <section id="section-600x1200" className="py-24 md:py-32 bg-[#F4F1EA] border-t border-black/10 relative">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.38em] text-[#C8102E] uppercase block mb-3">
              Large Format Architectural Slabs
            </span>
            <h2
              className="text-4xl md:text-6xl font-light tracking-tight text-[#111111] font-display"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              600 × 1200 Collection
            </h2>
          </div>
          <p className="text-neutral-700 text-sm font-normal max-w-md">
            Luxury large-format porcelain slabs designed for dramatic floor-to-ceiling elevation with minimal grout lines.
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
        <div className="sticky top-[64px] z-30 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-14 lg:px-14 py-4 bg-[#F4F1EA]/90 backdrop-blur-xl border-y border-black/10 mb-8">
          <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide py-1">
            {CATEGORIES_600x1200.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold shadow-md'
                      : 'text-neutral-800 hover:text-black bg-[#EFECE5] border border-black/10 hover:border-black/20 shadow-2xs'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeChipBg1200Dimmed"
                      className="absolute inset-0 rounded-full bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Sub Filters Pill Buttons */}
          <AnimatePresence>
            {currentSubFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-3 border-t border-black/10 mt-3 flex items-center gap-3 overflow-x-auto scrollbar-hide"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#C8102E] shrink-0">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Sub Finish:</span>
                </div>
                <div className="flex items-center gap-2">
                  {currentSubFilters.map((sub) => {
                    const isSubActive = activeSubFilter === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubFilter(sub.id)}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-300 ${
                          isSubActive
                            ? 'bg-[#C8102E] text-white shadow-xs'
                            : 'bg-[#EFECE5] text-neutral-800 hover:bg-neutral-200 border border-black/10'
                        }`}
                      >
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeSubFilter}`}
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
                No tiles available matching your filter selection.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
