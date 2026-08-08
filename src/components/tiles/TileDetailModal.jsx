import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, MessageSquare, ZoomIn, Check, ShieldCheck } from 'lucide-react';

export default function TileDetailModal({ tile, onClose, onEnquire }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!tile) return null;

  const galleryImages = tile.gallery && tile.gallery.length > 0 ? tile.gallery : [tile.image];
  const activeImage = galleryImages[selectedImageIndex] || tile.image;

  const handleDownloadCatalogue = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white border border-black/10 rounded-[24px] overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row z-10 my-auto text-[#0B0B0B]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full bg-black/5 hover:bg-[#0B0B0B] hover:text-white text-[#0B0B0B] border border-black/10 flex items-center justify-center transition-all duration-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Large Gallery & Zoom */}
          <div className="w-full lg:w-3/5 p-6 md:p-8 bg-[#F7F5F0] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/8">
            {/* Main Preview Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-black/10 group mb-6 shadow-sm">
              <img
                src={activeImage}
                alt={tile.name}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Zoom Action Hint */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#0B0B0B] text-[10px] font-semibold tracking-widest uppercase flex items-center gap-2 hover:bg-[#0B0B0B] hover:text-white transition-colors shadow-sm"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                {isZoomed ? 'Reset Zoom' : 'Click to Zoom'}
              </button>

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[10px] font-semibold tracking-widest text-[#B8941F] uppercase shadow-xs">
                  {tile.sizeCategory || tile.size}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails Switcher */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedImageIndex(i);
                      setIsZoomed(false);
                    }}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                      selectedImageIndex === i
                        ? 'border-[#B8941F] shadow-md scale-105'
                        : 'border-black/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Editorial Tile Specification Details */}
          <div className="w-full lg:w-2/5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[85vh] scrollbar-hide bg-white">
            <div>
              {/* Category & Finish Tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold tracking-[0.35em] text-[#B8941F] uppercase">
                  {tile.category} • {tile.subCategory || 'Vitrified'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  In Stock
                </span>
              </div>

              {/* Tile Name */}
              <h2
                className="text-3xl md:text-4xl font-light text-[#0B0B0B] font-display mb-4 leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                {tile.name}
              </h2>

              <p className="text-sm font-light text-neutral-600 leading-relaxed mb-6">
                {tile.description}
              </p>

              {/* Specifications Table */}
              <div className="space-y-3 p-5 rounded-2xl bg-[#FAF8F5] border border-black/8 mb-6">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-black/5">
                  <span className="text-neutral-500 font-light">Finish</span>
                  <span className="text-[#0B0B0B] font-semibold">{tile.finish}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-black/5">
                  <span className="text-neutral-500 font-light">Tile Size</span>
                  <span className="text-[#0B0B0B] font-mono font-medium">{tile.size}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-black/5">
                  <span className="text-neutral-500 font-light">Thickness</span>
                  <span className="text-[#0B0B0B] font-mono font-medium">{tile.thickness}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-light">Application</span>
                  <span className="text-[#0B0B0B] font-medium text-right max-w-[200px]">{tile.application}</span>
                </div>
              </div>

              {/* Available Colors */}
              {tile.colors && tile.colors.length > 0 && (
                <div className="mb-6">
                  <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase block mb-3">
                    Available Colors / Tones
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {tile.colors.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-black/8"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs text-neutral-700 font-medium">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              {tile.features && (
                <div className="mb-8">
                  <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase block mb-3">
                    Engineered Features
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {tile.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-neutral-700 font-light">
                        <Check className="w-3.5 h-3.5 text-[#B8941F] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-black/8">
              {downloadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Specification Sheet & Catalogue PDF downloaded!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadCatalogue}
                  className="px-5 py-3.5 rounded-xl border border-black/15 text-[#0B0B0B] font-semibold text-xs tracking-wider uppercase hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#B8941F]" />
                  Download Catalogue
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onEnquire(tile);
                  }}
                  className="px-5 py-3.5 rounded-xl bg-[#0B0B0B] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#B8941F] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enquiry Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
