import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FURNITURE, IMG } from '../data/content';
import { EASE_LUXURY, fadeUp, fadeUpSoft, headerContainer } from '../constants/animations';

// Expand the furniture data locally with premium specifications for the details page
const EXTENDED_FURNITURE = [
  {
    ...FURNITURE[0], // Velvet Lounge
    category: 'Living',
    dimensions: '240cm W x 95cm D x 75cm H',
    materials: 'High-density velvet upholstery, solid teak frame, polished brass legs.',
    pairing: 'Absolute Black granite details or Imperial Gold granite accents.',
    leadTime: '6-8 Weeks',
    features: ['Plush double-layered cushioning', 'Reinforced joinery', 'Stain-resistant luxury pile'],
  },
  {
    ...FURNITURE[1], // Granite Console
    category: 'Entryway',
    dimensions: '140cm W x 40cm D x 85cm H',
    materials: 'Imperial Gold granite slab, hand-brushed solid brass support inlay.',
    pairing: 'Viscon White granite floors.',
    leadTime: '5-7 Weeks',
    features: ['Book-matched granite top', 'Anti-tip wall anchoring structure', 'Honed silk finish surface'],
  },
  {
    ...FURNITURE[2], // Oak Dining
    category: 'Dining',
    dimensions: '220cm W x 100cm D x 76cm H',
    materials: 'Agrade European Oak, Absolute Black polished granite column bases.',
    pairing: 'Absolute Black granite islands or Terrazzo White floors.',
    leadTime: '8-10 Weeks',
    features: ['Seats up to 8 adults comfortably', 'Granite core structural base', 'Natural wax matte finish'],
  },
  {
    ...FURNITURE[3], // Stone Sideboard
    category: 'Bedroom',
    dimensions: '180cm W x 48cm D x 72cm H',
    materials: 'Honed Viscon White granite countertop, dark American walnut cladding.',
    pairing: 'Viscon White granite statement walls and oak furniture.',
    leadTime: '7-9 Weeks',
    features: ['Integrated soft-close flush handles', 'Adjustable internal walnut shelving', 'Honed moisture-sealed stone top'],
  },
  {
    title: 'Monolith Coffee Table',
    tag: 'Living',
    category: 'Living',
    description: 'A solid granite coffee table carved from a single block, showcasing natural cleft edges.',
    image: IMG.concept,
    dimensions: '110cm W x 110cm D x 35cm H',
    materials: 'Absolute Black granite, natural hand-chiseled cleft texture edges.',
    pairing: 'Velvet Lounge and modern minimal rugs.',
    leadTime: '8 Weeks',
    features: ['Carved from a single quarry block', 'Matte honed top surface', 'Weather-sealed surface treatment'],
  },
  {
    title: 'Artisan Study Desk',
    tag: 'Workspace',
    category: 'Workspace',
    description: 'Slim workspace desk pairing leather-wrapped timber with structured granite drawers.',
    image: IMG.workspace,
    dimensions: '150cm W x 70cm D x 75cm H',
    materials: 'Full-grain Italian saddle leather, dark ash wood, Kashmir White granite.',
    pairing: 'Executive workspace shelves and slate floor tiles.',
    leadTime: '6-8 Weeks',
    features: ['Hidden wire routing channel', 'Felt-lined utility drawers', 'Saddle-stitched leather work pad'],
  }
];

const CATEGORIES = ['All', 'Living', 'Dining', 'Bedroom', 'Entryway', 'Workspace'];

export default function FurniturePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeInquiry, setActiveInquiry] = useState(null); // holds piece object when inquiry modal open
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFurniture = useMemo(() => {
    if (selectedCategory === 'All') return EXTENDED_FURNITURE;
    return EXTENDED_FURNITURE.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setActiveInquiry(null);
      setName('');
      setEmail('');
      setMsg('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-dark text-cream pt-24 pb-16">
      {/* Background radial effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
      </div>

      <div className="wrap relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="#/"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold hover:text-cream transition-colors group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
            Back to Home
          </a>
        </div>

        {/* Hero Section */}
        <header className="mb-12 md:mb-16">
          <p className="eyebrow mb-3 text-gold">Curated Living</p>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="font-display text-[clamp(2.5rem,4.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
                The Bespoke <br />
                <span className="italic text-gold">Furniture Collection</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="font-body text-sm leading-relaxed text-cream/50">
                Sculpted profiles designed to operate in spatial harmony with architectural stone. Craftsmanship refined for absolute comfort and permanence.
              </p>
            </div>
          </div>
          <div className="mt-8 line-gold max-w-xl origin-left" />
        </header>

        {/* Category Filters */}
        <div className="mb-12 overflow-x-auto scrollbar-hide">
          <div className="flex border-b border-cream/10 pb-3 min-w-max gap-8">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative pb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                    active ? 'text-gold' : 'text-cream/40 hover:text-cream'
                  }`}
                >
                  {cat}
                  {active && (
                    <motion.div
                      layoutId="active-furniture-tab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Showcase */}
        <motion.div
          layout
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredFurniture.map((item, index) => (
              <motion.article
                layout
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: EASE_LUXURY, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between bg-cream/[0.03] border border-cream/10 hover:border-gold/30 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.06)]"
              >
                <div>
                  {/* Image wrapper */}
                  <div className="aspect-[16/11] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover img-grade transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/10 to-transparent" />
                    <span className="absolute top-4 right-4 bg-dark/65 border border-gold/40 px-2.5 py-0.5 rounded-sm font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-gold z-10">
                      {item.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8">
                    <h2 className="font-display text-xl font-medium text-cream mb-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h2>
                    <p className="font-body text-xs leading-relaxed text-cream/55 mb-6">
                      {item.description}
                    </p>

                    {/* Specifications */}
                    <div className="border-t border-cream/10 pt-4 flex flex-col gap-3">
                      <div>
                        <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                          Dimensions
                        </span>
                        <span className="font-body text-xs text-cream/75">{item.dimensions}</span>
                      </div>
                      <div>
                        <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                          Atelier Materials
                        </span>
                        <span className="font-body text-xs text-cream/75 leading-relaxed block">{item.materials}</span>
                      </div>
                      <div>
                        <span className="font-body text-[9px] font-bold uppercase tracking-[0.2em] text-gold block mb-0.5">
                          Recommended Surface Pairing
                        </span>
                        <span className="font-body text-xs italic text-cream/65 block">{item.pairing}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer/Action */}
                <div className="p-6 md:p-8 pt-0 mt-auto">
                  <button
                    type="button"
                    onClick={() => setActiveInquiry(item)}
                    className="w-full text-center py-3 bg-gold text-dark font-body text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm hover:bg-cream hover:text-dark transition-all duration-300 shadow-md hover:shadow-glow-sm"
                  >
                    Inquire About Piece
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Style pairing design system guide */}
        <section className="mt-20 border border-cream/10 rounded-2xl bg-cream/[0.01] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 pointer-events-none w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
          <p className="eyebrow text-gold mb-2">Design Philosophy</p>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-cream mb-4">
            How we pair Wood &amp; Stone
          </h2>
          <p className="font-body text-sm leading-relaxed text-cream/50 max-w-3xl mb-8">
            Furniture should never compete with stone surfaces; it should anchor them. We choose tight grain hardwoods (teak, ash, walnut) with rich organic oils, and pair them alongside specific stone veining patterns so that countertops, fireplace backings, and soft seating speak in a unified, architectural tongue.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="border border-cream/5 p-5 rounded-lg bg-dark/40">
              <span className="font-display text-lg text-gold mb-2 block">Warm Contrast</span>
              <p className="font-body text-xs leading-relaxed text-cream/60">
                Imperial Gold granite countertops paired with American walnut sideboards. The gold granite veining responds beautifully to the deep, golden brown of the wood grain.
              </p>
            </div>
            <div className="border border-cream/5 p-5 rounded-lg bg-dark/40">
              <span className="font-display text-lg text-gold mb-2 block">Monochromatic Depth</span>
              <p className="font-body text-xs leading-relaxed text-cream/60">
                Absolute Black granite columns paired with carbonized black oak. Perfect for executive workspace aesthetics where structural shadows create formal boundaries.
              </p>
            </div>
            <div className="border border-cream/5 p-5 rounded-lg bg-dark/40">
              <span className="font-display text-lg text-gold mb-2 block">Textural Balance</span>
              <p className="font-body text-xs leading-relaxed text-cream/60">
                Terrazzo White floors paired with low-profile bouclé seating and raw teak tables. The aggregate in the terrazzo is balanced by the rich, soft texture of the woven cloth.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {activeInquiry && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInquiry(null)}
              className="absolute inset-0 bg-dark/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: EASE_LUXURY }}
              className="relative w-full max-w-lg bg-dark border border-gold/30 rounded-xl overflow-hidden p-6 md:p-8 z-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveInquiry(null)}
                className="absolute top-4 right-4 text-cream/50 hover:text-gold transition-colors font-body text-sm font-semibold"
                aria-label="Close modal"
              >
                CLOSE
              </button>

              <p className="eyebrow text-gold mb-1">Product Consultation</p>
              <h3 className="font-display text-xl md:text-2xl text-cream mb-4">
                Inquire: {activeInquiry.title}
              </h3>

              <div className="border-b border-cream/10 pb-4 mb-4 text-xs text-cream/50 font-body">
                Our design advisors will follow up to review dimensions, wood finishes, and shipping details.
              </div>

              {inquirySuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <span className="block text-4xl mb-4">✓</span>
                  <p className="font-display text-lg text-gold mb-2">Inquiry Received</p>
                  <p className="font-body text-xs text-cream/60">An Amara designer will email you details shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block font-body text-[10px] uppercase tracking-widest text-gold mb-1">
                      Full Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="Priya Krishnan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-cream/[0.05] border border-cream/20 px-3.5 py-2.5 text-sm font-body text-cream rounded-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block font-body text-[10px] uppercase tracking-widest text-gold mb-1">
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cream/[0.05] border border-cream/20 px-3.5 py-2.5 text-sm font-body text-cream rounded-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-msg" className="block font-body text-[10px] uppercase tracking-widest text-gold mb-1">
                      Custom Customization Request (Optional)
                    </label>
                    <textarea
                      id="modal-msg"
                      rows="3"
                      placeholder="Interested in a custom length (260cm) in Natural Teak."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full bg-cream/[0.05] border border-cream/20 px-3.5 py-2.5 text-sm font-body text-cream rounded-sm outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center py-3.5 bg-gold hover:bg-gold/90 text-dark font-body text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm transition-all shadow-md mt-4"
                  >
                    Submit Advisory Request
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
