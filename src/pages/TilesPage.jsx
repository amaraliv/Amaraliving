import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TileHero from '../components/tiles/TileHero';
import TileCatalogSelector from '../components/tiles/TileCatalogSelector';
import Section600x600 from '../components/tiles/Section600x600';
import Section600x1200 from '../components/tiles/Section600x1200';
import TileDetailModal from '../components/tiles/TileDetailModal';
import TileEnquiryModal from '../components/tiles/TileEnquiryModal';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const getParamsFromUrl = () => {
  const hash = decodeURIComponent(window.location.hash || '');
  const queryString = hash.includes('?') ? hash.split('?')[1] : '';
  const urlParams = new URLSearchParams(queryString);

  const appParam = urlParams.get('application') || '';
  const sizeParam = urlParams.get('size') || '';

  let format = '600x600';
  if (
    hash.includes('1200') ||
    hash.includes('1800') ||
    hash.includes('2400') ||
    hash.includes('2700') ||
    hash.includes('3200') ||
    hash.includes('1600') ||
    hash.includes('slab') ||
    sizeParam.includes('1200') ||
    sizeParam.includes('1800') ||
    sizeParam.includes('2400') ||
    sizeParam.includes('2700') ||
    sizeParam.includes('3200')
  ) {
    format = '600x1200';
  }

  return { format, appParam, sizeParam };
};

export default function TilesPage() {
  const [urlState, setUrlState] = useState(() => getParamsFromUrl());
  const [selectedFormat, setSelectedFormat] = useState(urlState.format);
  const [activeAppFilter, setActiveAppFilter] = useState(urlState.appParam);
  const [activeSizeFilter, setActiveSizeFilter] = useState(urlState.sizeParam);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = getParamsFromUrl();
      setSelectedFormat(parsed.format);
      setActiveAppFilter(parsed.appParam);
      setActiveSizeFilter(parsed.sizeParam);

      if (parsed.appParam || parsed.sizeParam || window.location.hash.includes('collection-view')) {
        setTimeout(() => {
          const el = document.getElementById('collection-view');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    if (urlState.appParam || urlState.sizeParam || window.location.hash.includes('collection-view')) {
      setTimeout(() => {
        const el = document.getElementById('collection-view');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClearFilter = () => {
    setActiveAppFilter('');
    setActiveSizeFilter('');
    if (window.location.hash.startsWith('#/tiles')) {
      window.history.replaceState(null, '', `${window.location.pathname}#/tiles`);
    }
  };

  return (
    <main id="main-content" className="bg-[#F4F1EA] text-[#111111] selection:bg-[#C8102E]/30 min-h-screen">
      {/* Hero Section */}
      <TileHero />

      {/* Catalog Browser: Shop by Application + Shop by Size */}
      <TileCatalogSelector />

      {/* Anchor for Smooth Scroll to Active Collection */}
      <div id="collection-view" className="relative pt-2">

        {/* 
          LOGIC:
          - Application filter active  → show BOTH sections (all sizes for that space)
          - Size filter active          → show ONLY matching size section
          - No filter                   → show BOTH sections
        */}
        <AnimatePresence mode="wait">
          {activeAppFilter ? (
            /* APPLICATION FILTER: render both sections so user sees all sizes for that space */
            <motion.div
              key={`app-${activeAppFilter}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
            >
              <Section600x600
                onSelectProduct={(tile) => setSelectedProduct(tile)}
                activeAppFilter={activeAppFilter}
                activeSizeFilter={''}
                onClearFilter={handleClearFilter}
              />
              <Section600x1200
                onSelectProduct={(tile) => setSelectedProduct(tile)}
                activeAppFilter={activeAppFilter}
                activeSizeFilter={''}
                onClearFilter={handleClearFilter}
              />
            </motion.div>
          ) : activeSizeFilter ? (
            /* SIZE FILTER: render only the section matching that size */
            <motion.div
              key={`size-${activeSizeFilter}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
            >
              {selectedFormat === '600x600' ? (
                <Section600x600
                  onSelectProduct={(tile) => setSelectedProduct(tile)}
                  activeAppFilter={''}
                  activeSizeFilter={activeSizeFilter}
                  onClearFilter={handleClearFilter}
                />
              ) : (
                <Section600x1200
                  onSelectProduct={(tile) => setSelectedProduct(tile)}
                  activeAppFilter={''}
                  activeSizeFilter={activeSizeFilter}
                  onClearFilter={handleClearFilter}
                />
              )}
            </motion.div>
          ) : (
            /* NO FILTER: show both sections */
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
            >
              <Section600x600
                onSelectProduct={(tile) => setSelectedProduct(tile)}
                activeAppFilter={''}
                activeSizeFilter={''}
                onClearFilter={handleClearFilter}
              />
              <Section600x1200
                onSelectProduct={(tile) => setSelectedProduct(tile)}
                activeAppFilter={''}
                activeSizeFilter={''}
                onClearFilter={handleClearFilter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* Section 4: Architectural Specification & Applications */}
      <section className="py-24 md:py-32 bg-[#EFECE5] border-t border-black/10 relative overflow-hidden">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.38em] text-[#C8102E] uppercase block mb-4">
                Engineering Perfection
              </span>
              <h2
                className="text-4xl md:text-6xl font-light tracking-tight text-[#111111] font-display mb-6"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Vitrified Strength.<br />
                <span className="italic text-[#C8102E]">Architectural Elegance.</span>
              </h2>
              <div className="w-20 h-px bg-gradient-to-r from-[#C8102E] to-transparent mb-6" />
              <p className="text-neutral-800 text-sm md:text-base font-normal leading-relaxed mb-8">
                Our porcelain and vitrified slabs undergo high-tonnage hydraulic pressing and firing temperatures exceeding 1,200°C. The result is a non-porous surface with near-zero water absorption (&lt;0.05%), extreme stain resistance, and enduring structural stability.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-black/10 shadow-xs">
                  <span className="text-3xl font-light font-display text-[#C8102E] block mb-1">
                    &lt;0.05%
                  </span>
                  <span className="text-xs uppercase tracking-wider text-neutral-800 font-semibold">
                    Water Absorption
                  </span>
                </div>
                <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-black/10 shadow-xs">
                  <span className="text-3xl font-light font-display text-[#C8102E] block mb-1">
                    MOHS 7+
                  </span>
                  <span className="text-xs uppercase tracking-wider text-neutral-800 font-semibold">
                    Scratch Hardness
                  </span>
                </div>
              </div>
            </div>

            <div className="relative rounded-[24px] overflow-hidden border border-black/10 bg-white aspect-[4/3] group shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90"
                alt="Luxury Vitrified Tile Precision"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white">
                <span className="font-mono text-white">Rectified Precision Edges</span>
                <span className="px-3 py-1 rounded-full bg-white/90 text-black backdrop-blur-md font-semibold text-[10px] uppercase">
                  Zero Grout Expansion
                </span>
              </div>
            </div>
          </div>

          {/* Bespoke Customization Section */}
          <div className="p-8 md:p-14 rounded-[24px] bg-[#FAF8F4] border border-black/12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8102E]/10 text-[10px] font-semibold tracking-widest text-[#C8102E] uppercase mb-4 border border-[#C8102E]/20">
                <Sparkles className="w-3 h-3" />
                Custom Architectural Atelier
              </span>
              <h3
                className="text-3xl md:text-4xl font-light text-[#111111] font-display mb-3"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Require Custom Tile Dimensions or Glaze Colors?
              </h3>
              <p className="text-neutral-800 text-sm font-normal leading-relaxed">
                We partner directly with leading interior architects and developers to formulate bespoke porcelain glazes, custom bookmatches, and project-specific slab cuts.
              </p>
            </div>

            <button
              onClick={() => setEnquiryProduct({ name: 'Custom Bespoke Tiles', size: 'Bespoke Format', finish: 'Custom Glaze' })}
              className="px-8 py-4 rounded-full bg-[#111111] text-white font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#C8102E] transition-all shadow-md shrink-0 flex items-center gap-3"
            >
              Request Custom Atelier Consultation
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: Bottom CTA */}
      <section className="py-28 md:py-36 bg-[#F4F1EA] relative overflow-hidden border-t border-black/10">
        <div className="wrap relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-[11px] font-semibold tracking-[0.38em] text-[#C8102E] uppercase block mb-4">
            Transform Your Spaces
          </span>
          <h2
            className="text-4xl md:text-7xl font-light tracking-tight text-[#111111] font-display mb-6"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Experience Premium Tiles <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-[#C8102E] to-[#C8102E]">
              In Person.
            </span>
          </h2>
          <p className="text-neutral-800 text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto mb-10">
            Visit our flagship Amara Living experience center or request physical tile swatches delivered directly to your studio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => setEnquiryProduct({ name: 'Physical Sample Kit Request', size: '600x600 & 600x1200', finish: 'Assorted Swatches' })}
              className="px-9 py-4 rounded-full bg-[#111111] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#C8102E] transition-all shadow-lg hover:scale-105"
            >
              Request Sample Swatch Kit
            </button>
            <a
              href="#/consultation"
              className="px-9 py-4 rounded-full bg-[#FAF8F4] border border-black/15 text-[#111111] font-semibold text-xs tracking-[0.25em] uppercase hover:border-[#C8102E] hover:text-[#C8102E] transition-all shadow-xs"
            >
              Book Showroom Visit
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <TileDetailModal
          tile={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEnquire={(tile) => setEnquiryProduct(tile)}
        />
      )}

      {/* Product Enquiry Modal */}
      {enquiryProduct && (
        <TileEnquiryModal
          tile={enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
        />
      )}
    </main>
  );
}