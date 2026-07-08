import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../constants/navigation';
import { IMG } from '../../data/content';
import { EASE_LUXURY } from '../../constants/animations';
import logoImg from '../../assets/images/amara-logo.png';

const PREVIEW_IMAGES = {
  '#/': IMG.hero,
  '#spaces': IMG.livingRoom,
  '#materials': IMG.granite,
  '#/furniture': IMG.furniture,
  '#/tiles': IMG.tiles,
  '#/granite': IMG.granite,
  '#/company': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
  '#story': IMG.concept,
  '#surfaces': IMG.granite,
  '#contact': IMG.kitchen,
};

export default function NavigationSidebar({ onClose, currentPath, isSubpage, activeSection }) {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLinkClick = (href) => {
    onClose();
    // For hash section changes, let routing process then close sidebar
    setTimeout(() => {
      if (href.startsWith('#/')) {
        window.location.hash = href;
      }
    }, 50);
  };

  const previewSrc = hoveredLink ? PREVIEW_IMAGES[hoveredLink] : null;

  return (
    <>
      {/* Backdrop shadow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        onClick={onClose}
        className="fixed inset-0 z-[10000] bg-dark/95 backdrop-blur-xs cursor-pointer"
      />

      {/* Slide-out Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.55, ease: EASE_LUXURY }}
        data-lenis-prevent
        className="fixed right-0 top-0 bottom-0 z-[10001] w-full max-w-[460px] bg-[#1A1008] text-cream border-l border-gold/20 p-8 md:p-12 shadow-2xl flex flex-col justify-between overflow-y-auto"
      >
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-cream/10 pb-6 mb-8">
            <img
              src={logoImg}
              alt="Amara Living"
              className="h-12 object-contain brightness-0 invert"
            />

            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cream/50 hover:text-gold transition-colors"
            >
              Close
              <motion.span
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-sm"
              >
                ✕
              </motion.span>
            </button>
          </div>

          {/* Navigation Links list */}
          <nav className="relative z-10 my-8">
            <span className="font-body text-[9px] font-bold tracking-[0.3em] text-gold uppercase block mb-4">
              SITE MAP &amp; ARCHITECTURE
            </span>
            <ul className="flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => {
                const isActive = link.isPage
                  ? currentPath === link.href
                  : !isSubpage && activeSection === link.href.slice(1);

                const href = link.isPage
                  ? link.href
                  : (isSubpage ? link.href.replace('#', '#/') : link.href);

                return (
                  <motion.li
                    key={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={href}
                      onClick={() => handleLinkClick(href)}
                      className={`group/link flex items-baseline gap-4 font-display text-2xl md:text-3xl transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
                      }`}
                    >
                      <span className="font-body text-[10px] font-bold text-cream/20 group-hover/link:text-gold/40 transition-colors">
                        0{i + 1}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Interactive Floating Hover Preview (Desktop Only) */}
          <div className="hidden md:block relative h-[140px] rounded-lg overflow-hidden border border-cream/10 bg-dark/40 mt-8 mb-4">
            <div className="absolute inset-0 border border-cream/5 pointer-events-none rounded-lg z-20" />
            <AnimatePresence mode="wait">
              {previewSrc ? (
                <motion.img
                  key={previewSrc}
                  src={previewSrc}
                  alt="Section preview thumbnail"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.65, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover img-grade"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center p-6 text-center text-cream/30 text-xs font-body leading-relaxed"
                >
                  Hover over a menu option to preview its architectural atmosphere.
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008]/90 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Footer Details */}
        <div className="border-t border-cream/10 pt-6 mt-8">
          <div className="grid grid-cols-2 gap-4 text-[10px] font-body text-cream/50 leading-relaxed">
            <div>
              <span className="text-gold font-bold uppercase tracking-widest block mb-1">
                Studio Address
              </span>
              <span>
                No. 3, Seemathamman Nagar,<br />
                Maduravoyal, Chennai<br />
                Tamil Nadu - 600095
              </span>
            </div>
            <div>
              <span className="text-gold font-bold uppercase tracking-widest block mb-1">
                Inquiries
              </span>
              <a href="mailto:connect@amaraliv.com" className="hover:text-gold block transition-colors">
                connect@amaraliv.com
              </a>
              <a href="tel:7397623509" className="hover:text-gold block transition-colors mt-0.5">
                7397623509
              </a>
              <span className="block mt-1 text-[8px] text-cream/40">GST: 33BRYPA3994H1ZB</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 text-[9px] font-semibold tracking-wider text-cream/30 border-t border-cream/5 pt-4">
            <span>© 2026 AMARA LIVING</span>
            <div className="flex gap-3">
              <a href="#" className="hover:text-gold transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-gold transition-colors">PINTEREST</a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
