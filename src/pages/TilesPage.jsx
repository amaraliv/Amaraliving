import { useState } from 'react';
import TileHero from '../components/tiles/TileHero';
import TileCatalogSelector from '../components/tiles/TileCatalogSelector';
import TileDetailModal from '../components/tiles/TileDetailModal';
import TileEnquiryModal from '../components/tiles/TileEnquiryModal';

export default function TilesPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  return (
    <main id="main-content" className="bg-[#F4F1EA] text-[#111111] selection:bg-[#C8102E]/30 min-h-screen">
      {/* Hero Section */}
      <TileHero />

      {/* Catalog Browser: Shop by Application */}
      <TileCatalogSelector />

      {/* Section: Architectural Specification & Applications */}
      <section className="py-24 md:py-32 bg-[#EFECE5] border-t border-black/10 relative overflow-hidden">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
        </div>
      </section>

      {/* Bottom CTA */}
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
              onClick={() => setEnquiryProduct({ name: 'Physical Sample Kit Request', size: 'Standard & Large Format', finish: 'Assorted Swatches' })}
              className="px-9 py-4 rounded-full bg-[#111111] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#C8102E] transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              Request Sample Swatch Kit
            </button>
            <a
              href="#/consultation"
              className="px-9 py-4 rounded-full bg-[#FAF8F4] border border-black/15 text-[#111111] font-semibold text-xs tracking-[0.25em] uppercase hover:border-[#C8102E] hover:text-[#C8102E] transition-all shadow-xs inline-block"
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