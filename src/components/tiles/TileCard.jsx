import { motion } from 'framer-motion';
import { Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function TileCard({ tile, onSelect, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.05 }}
      className="group relative rounded-[24px] bg-white border border-black/8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#B8941F]/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12),0_0_25px_rgba(184,148,31,0.15)] flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={tile.image}
          alt={tile.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[1.01]"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[10px] font-semibold tracking-widest text-[#B8941F] uppercase shadow-xs">
            {tile.finish || tile.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[10px] font-mono tracking-wider text-neutral-700 shadow-xs">
            {tile.size}
          </span>
        </div>

        {/* Hover Glass Overlay with "View Details" */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-[#0B0B0B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center p-6 z-20">
          <button
            onClick={() => onSelect(tile)}
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase shadow-xl hover:bg-[#B8941F] hover:text-white transition-all duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#B8941F]">
              {tile.subCategory || tile.category}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              {tile.thickness}
            </span>
          </div>

          <h3 className="text-xl font-light text-[#0B0B0B] font-display leading-tight mb-3 group-hover:text-[#B8941F] transition-colors"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            {tile.name}
          </h3>

          <p className="text-xs text-neutral-600 font-light line-clamp-2 leading-relaxed mb-4">
            {tile.description}
          </p>
        </div>

        {/* Bottom Specs & Quick Action */}
        <div className="pt-4 border-t border-black/8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-light">
            <CheckCircle2 className="w-3 h-3 text-[#B8941F]" />
            <span>Vitrified Body</span>
          </div>

          <button
            onClick={() => onSelect(tile)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-neutral-800 hover:text-[#B8941F] transition-colors group/btn"
          >
            Details
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
