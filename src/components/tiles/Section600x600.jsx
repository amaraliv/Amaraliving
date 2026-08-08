import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES_600x600, TILES_600x600 } from '../../data/tilesData';
import TileCard from './TileCard';

export default function Section600x600({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTiles = activeCategory === 'all'
    ? TILES_600x600
    : TILES_600x600.filter((tile) => tile.category === activeCategory);

  return (
    <section id="section-600x600" className="py-24 md:py-32 bg-[#F4F1EA] border-t border-black/10 relative">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.38em] text-[#B8941F] uppercase block mb-3">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
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
