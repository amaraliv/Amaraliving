import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { useLenis } from '../../hooks/SmoothScroll';
import { NAV_LINKS, PAGE_SECTIONS, COMPANY_DROPDOWN_LINKS, resolveNavSection } from '../../constants/navigation';
import logoImg from '../../assets/logo/logo.png';
import furnitureImg from '../../assets/furniture/00_hero.jpg';
import tilesImg from '../../assets/tiles/AMARA_Image_01.jpg';
import graniteImg from '../../assets/granite/AMARA_Image_10.jpg';
import CompanyMegaMenu from './CompanyMegaMenu';

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const companyMenuRef = useRef(null);
  const onHero = !scrolled;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (companyMenuRef.current && !companyMenuRef.current.contains(e.target)) {
        setIsCompanyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsCollectionsOpen(false);
    setIsCompanyOpen(false);
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > 70);
    setVisible(true);
    lastScrollY.current = currentScrollY;

    const contactEl = document.getElementById('contact');
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 120);

    if (contactEl && (contactEl.getBoundingClientRect().top <= window.innerHeight * 0.55 || isAtBottom)) {
      setActiveSection('contact');
      return;
    }

    const sections = [
      { id: 'where-to-buy-intro', key: 'where-to-buy' },
      { id: 'spaces', key: 'collections' },
      { id: 'story', key: 'company' },
      { id: 'hero', key: 'home' },
    ];

    const trigger = window.innerHeight * 0.45;
    let found = 'home';

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= trigger) {
          found = sec.key;
          break;
        }
      }
    }

    setActiveSection(found);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    lenis?.on('scroll', updateScrollState);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      lenis?.off('scroll', updateScrollState);
    };
  }, [lenis, updateScrollState]);



  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    // Call initial check
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isSubpage = currentPath.startsWith('#/furniture') || currentPath.startsWith('#/tiles') || currentPath.startsWith('#/granite') || currentPath.startsWith('#/consultation') || currentPath.startsWith('#/company') || currentPath.startsWith('#/blog') || currentPath.startsWith('#/where-to-buy') || currentPath.startsWith('#/our-people') || currentPath.startsWith('#/careers');

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-out ${scrolled
            ? 'border-b border-stone-200/80 bg-white/95 shadow-md backdrop-blur-md h-20'
            : 'border-b border-stone-200/50 bg-white shadow-sm backdrop-blur-md h-24'
          }`}
      >
        <nav
          className="wrap h-full flex items-center justify-between transition-all duration-500 ease-out"
        >
          <a href={isSubpage ? '#/' : '#hero'} className="group shrink-0 flex items-center h-full" aria-label="Amara Living home">
            <img
              src={logoImg}
              alt="Amara Living"
              className={`object-contain transition-all duration-500 max-h-full py-1 ${scrolled ? 'h-14 md:h-16' : 'h-18 md:h-22'}`}
            />
          </a>

          <ul
            className={`hidden items-center transition-all duration-500 lg:flex ${scrolled ? 'gap-4 xl:gap-7' : 'gap-6 xl:gap-9'
              }`}
          >
            {NAV_LINKS.map((link) => {
              const isHome = currentPath === '#/' || currentPath === '' || currentPath === '#hero';
              const isCollectionActive = currentPath.startsWith('#/furniture') || currentPath.startsWith('#/tiles') || currentPath.startsWith('#/granite');
              
              let isActive = false;
              if (link.isModalTrigger) {
                isActive = (isHome && activeSection === 'collections') || isCollectionActive;
              } else if (link.href === '#/') {
                isActive = isHome && (activeSection === 'home' || !activeSection);
              } else if (link.href === '#/where-to-buy') {
                isActive = currentPath.startsWith('#/where-to-buy') || (isHome && activeSection === 'where-to-buy');
              } else if (link.href === '#/company') {
                isActive = currentPath.startsWith('#/company') || currentPath.startsWith('#/our-people') || currentPath.startsWith('#/blog') || currentPath.startsWith('#/careers') || (isHome && activeSection === 'company');
              } else if (link.href === '#contact') {
                isActive = (!isSubpage && activeSection === 'contact') || currentPath === '#/contact' || currentPath === '#contact';
              } else if (link.isPage) {
                isActive = currentPath.startsWith(link.href);
              }

              if (link.isCompanyDropdown) {
                const isCompanyActive = currentPath === '#/company' || currentPath === '#/our-people' || currentPath === '#/blog' || currentPath === '#/careers' || (isHome && activeSection === 'company');
                return (
                  <li key={link.href} ref={companyMenuRef} className="relative group/company">
                    <button
                      type="button"
                      onClick={() => setIsCompanyOpen((prev) => !prev)}
                      onMouseEnter={() => setIsCompanyOpen(true)}
                      aria-expanded={isCompanyOpen}
                      className={`group relative font-body font-medium uppercase tracking-[0.16em] transition-all duration-500 hover:-translate-y-0.5 flex items-center gap-1.5 bg-transparent border-none cursor-pointer ${
                        scrolled ? 'text-xs xl:text-[13px]' : 'text-sm xl:text-[15px]'
                      } ${isCompanyActive || isCompanyOpen ? 'text-[#C8102E] font-bold' : 'text-[#1A1A1A] hover:text-[#C8102E]'}`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isCompanyOpen ? 'rotate-180 text-[#C8102E]' : 'text-[#888]'}`}
                      />
                      <span
                        className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#C8102E] w-full transition-transform duration-300 origin-left scale-x-0 group-hover/company:scale-x-100 ${
                          isCompanyActive || isCompanyOpen ? 'scale-x-100' : ''
                        }`}
                      />
                    </button>

                    {/* Company Mega Menu */}
                    <AnimatePresence>
                      {isCompanyOpen && (
                        <CompanyMegaMenu
                          isOpen={isCompanyOpen}
                          onClose={() => setIsCompanyOpen(false)}
                        />
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              const href = link.isModalTrigger
                ? '#/collections'
                : (link.isPage
                  ? link.href
                  : (isSubpage ? link.href.replace('#', '#/') : link.href));

              return (
                <li key={link.href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      if (link.isModalTrigger) {
                        e.preventDefault();
                        setIsCollectionsOpen(true);
                      } else if (isHome && link.href === '#/where-to-buy') {
                        const el = document.getElementById('where-to-buy-intro');
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else if (isHome && link.href === '#/company') {
                        const el = document.getElementById('story');
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else if (isHome && (link.href === '#/' || link.href === '#hero')) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (isHome && link.href === '#contact') {
                        const el = document.getElementById('contact');
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative font-body font-medium uppercase tracking-[0.16em] transition-all duration-500 hover:-translate-y-0.5 ${scrolled ? 'text-xs xl:text-[13px]' : 'text-sm xl:text-[15px]'
                      } ${isActive
                        ? 'text-[#C8102E] font-bold'
                        : 'text-[#1A1A1A] hover:text-[#C8102E]'
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#C8102E] w-full transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''
                        }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-[#0B0B0B] hover:text-[#C8102E] transition-colors focus:outline-none bg-transparent border-none cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </nav>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] flex justify-end bg-[#0B0B0B]/70 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xs sm:max-w-sm h-full bg-[#FAF6F0] border-l border-[#C8102E]/30 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#0B0B0B]/10">
                  <a href="#/" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <img src={logoImg} alt="Amara Living" className="h-12 sm:h-14 object-contain" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#666] hover:text-[#0B0B0B] transition-colors border-none bg-transparent cursor-pointer"
                    aria-label="Close drawer"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="py-6 space-y-4">
                  {/* Home */}
                  <div>
                    <a
                      href="#/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-[0.2em] text-[#0B0B0B] hover:text-[#C8102E] py-2 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Home
                    </a>
                  </div>

                  {/* Collections Accordion */}
                  <div className="border-b border-[#0B0B0B]/5 pb-3">
                    <button
                      type="button"
                      onClick={() => setIsMobileCollectionsOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#0B0B0B] hover:text-[#C8102E] transition-colors border-none bg-transparent cursor-pointer text-left"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>Collections</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isMobileCollectionsOpen ? 'rotate-180 text-[#C8102E]' : 'text-[#888]'}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isMobileCollectionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4 pt-2 space-y-2.5"
                        >
                          <a
                            href="#/tiles"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs font-semibold uppercase tracking-wider text-[#444] hover:text-[#C8102E] py-1.5 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            • Amara Ceramics
                          </a>
                          <a
                            href="#/granite"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs font-semibold uppercase tracking-wider text-[#444] hover:text-[#C8102E] py-1.5 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            • Amara Natural Stone
                          </a>
                          <a
                            href="#/furniture"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs font-semibold uppercase tracking-wider text-[#444] hover:text-[#C8102E] py-1.5 transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            • Amara Furniture
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company Accordion */}
                  <div className="border-b border-[#0B0B0B]/5 pb-3">
                    <button
                      type="button"
                      onClick={() => setIsMobileCompanyOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#0B0B0B] hover:text-[#C8102E] transition-colors border-none bg-transparent cursor-pointer text-left"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>Company</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${isMobileCompanyOpen ? 'rotate-180 text-[#C8102E]' : 'text-[#888]'}`}
                      />
                    </button>
                    <AnimatePresence>
                      {isMobileCompanyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4 pt-2 space-y-2.5"
                        >
                          {COMPANY_DROPDOWN_LINKS.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={(e) => {
                                setIsMobileMenuOpen(false);
                                if (item.href === '#/our-people#careers') {
                                  e.preventDefault();
                                  window.location.hash = '#/our-people';
                                  setTimeout(() => {
                                    const el = document.querySelector('section:nth-last-child(2)') || document.getElementById('careers');
                                    el?.scrollIntoView({ behavior: 'smooth' });
                                  }, 250);
                                }
                              }}
                              className="block text-xs font-semibold uppercase tracking-wider text-[#444] hover:text-[#C8102E] py-1.5 transition-colors"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              • {item.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Where to Buy / Experience Centers */}
                  <div>
                    <a
                      href="#/where-to-buy"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-bold uppercase tracking-[0.2em] text-[#0B0B0B] hover:text-[#C8102E] py-2 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Experience Centers
                    </a>
                  </div>

                  {/* Contact Us */}
                  <div>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        const el = document.getElementById('contact');
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="block text-sm font-bold uppercase tracking-[0.2em] text-[#0B0B0B] hover:text-[#C8102E] py-2 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Contact Us
                    </a>
                  </div>
                </nav>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-6 border-t border-[#0B0B0B]/10 space-y-3">
                <a
                  href="#/consultation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#C8102E] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-md hover:bg-[#0B0B0B] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight size={14} />
                </a>
                <p className="text-[10px] text-center text-[#777] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Est. 2010 · Premium Surfaces &amp; Furniture
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collections Modal Popup */}
      <AnimatePresence>
        {isCollectionsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0B0B0B]/60 backdrop-blur-md"
            onClick={() => setIsCollectionsOpen(false)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl mx-4 bg-[#FAF6F0] border border-[#C8102E]/30 p-8 md:p-14 text-center overflow-hidden rounded-sm shadow-[0_40px_80px_-20px_rgba(11,11,11,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold Ambient Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.08),transparent_70%)] pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCollectionsOpen(false)}
                className="absolute top-6 right-6 text-[#6B6B6B] hover:text-[#C8102E] transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group bg-transparent border-none cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Close
                <span className="inline-block transition-transform duration-300 group-hover:rotate-90">✕</span>
              </button>

              {/* Header */}
              <div className="mb-10 relative z-10">
                <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-[#C8102E] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Atelier Portfolios
                </span>
                <h2
                  className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[#0B0B0B] mb-5"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Explore Amara Living <span className="italic text-[#C8102E]">Collections</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-[#C8102E]/45 to-transparent w-40 mx-auto" />
              </div>

              {/* Grid of 3 Cards */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
              >
                {[
                  {
                    title: 'Amara Ceramics',
                    image: tilesImg,
                    href: '#/tiles',
                  },
                  {
                    title: 'Amara Natural Stone',
                    image: graniteImg,
                    href: '#/granite',
                  },
                  {
                    title: 'Amara Furniture',
                    image: furnitureImg,
                    href: '#/furniture',
                  },
                ].map((col) => (
                  <motion.div
                    key={col.href}
                    variants={{
                      hidden: { opacity: 0, y: 25 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <a
                      href={col.href}
                      onClick={() => setIsCollectionsOpen(false)}
                      className="group block relative overflow-hidden bg-white border border-[#0B0B0B]/10 hover:border-[#C8102E]/60 p-5 rounded-sm transition-all duration-500 shadow-[0_8px_20px_-10px_rgba(11,11,11,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(11,11,11,0.25)] cursor-pointer"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/3] overflow-hidden mb-5">
                        <img
                          src={col.image}
                          alt={col.title}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#0B0B0B]/10 group-hover:bg-transparent transition-all duration-500" />
                      </div>
                      
                      {/* Collection label */}
                      <h3
                        className="font-display text-xl font-medium text-[#0B0B0B] group-hover:text-[#C8102E] leading-tight min-h-[2.5rem] flex items-center justify-center transition-colors duration-500"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {col.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#C8102E] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span>Explore</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
