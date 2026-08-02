import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLenis } from '../../hooks/SmoothScroll';
import { NAV_LINKS, PAGE_SECTIONS, COMPANY_DROPDOWN_LINKS, resolveNavSection } from '../../constants/navigation';
import logoImg from '../../assets/images/amara-logo.png';
import furnitureImg from '../../assets/furniture/00_hero.jpg';
import tilesImg from '../../assets/tiles/AMARA_Image_01.jpg';
import graniteImg from '../../assets/granite/Hawk_Image_04.jpg';

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const companyMenuRef = useRef(null);
  const onHero = !scrolled;

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

  const isSubpage = currentPath === '#/furniture' || currentPath === '#/tiles' || currentPath === '#/granite' || currentPath === '#/consultation' || currentPath === '#/company' || currentPath === '#/blog' || currentPath === '#/where-to-buy' || currentPath === '#/our-people' || currentPath === '#/careers';

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
          <a href={isSubpage ? '#/' : '#hero'} className="group shrink-0 transform -translate-x-4 md:translate-x-0" aria-label="Amara Living home">
            <img
              src={logoImg}
              alt="Amara Living"
              className={`object-contain transition-all duration-500 ${scrolled ? 'h-20 md:h-24' : 'h-28 md:h-36'}`}
            />
          </a>

          <ul
            className={`hidden items-center transition-all duration-500 lg:flex ${scrolled ? 'gap-4 xl:gap-7' : 'gap-6 xl:gap-9'
              }`}
          >
            {NAV_LINKS.map((link) => {
              const isHome = currentPath === '#/' || currentPath === '' || currentPath === '#hero';
              const isCollectionActive = currentPath === '#/furniture' || currentPath === '#/tiles' || currentPath === '#/granite';
              
              let isActive = false;
              if (link.isModalTrigger) {
                isActive = (isHome && activeSection === 'collections') || isCollectionActive;
              } else if (link.href === '#/') {
                isActive = isHome && (activeSection === 'home' || !activeSection);
              } else if (link.href === '#/where-to-buy') {
                isActive = currentPath === '#/where-to-buy' || (isHome && activeSection === 'where-to-buy');
              } else if (link.href === '#/company') {
                isActive = currentPath === '#/company' || currentPath === '#/our-people' || currentPath === '#/blog' || currentPath === '#/careers' || (isHome && activeSection === 'company');
              } else if (link.href === '#contact') {
                isActive = (!isSubpage && activeSection === 'contact') || currentPath === '#/contact' || currentPath === '#contact';
              } else if (link.isPage) {
                isActive = currentPath === link.href;
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
                      } ${isCompanyActive || isCompanyOpen ? 'text-[#B8912A] font-bold' : 'text-[#1A1A1A] hover:text-[#B8912A]'}`}
                    >
                      {link.label}
                      <span className={`text-[8px] transition-transform duration-300 ${isCompanyOpen ? 'rotate-180 text-[#B8912A]' : 'text-[#888]'}`}>▼</span>
                      <span
                        className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#B8912A] w-full transition-transform duration-300 origin-left scale-x-0 group-hover/company:scale-x-100 ${
                          isCompanyActive || isCompanyOpen ? 'scale-x-100' : ''
                        }`}
                      />
                    </button>

                    {/* Company Dropdown Menu */}
                    <AnimatePresence>
                      {isCompanyOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#FAF6F0] border border-[#B8912A]/30 rounded-2xl p-2.5 shadow-[0_20px_50px_-10px_rgba(11,11,11,0.22)] backdrop-blur-md z-50 text-left"
                          onMouseLeave={() => setIsCompanyOpen(false)}
                        >
                          <div className="flex flex-col gap-1">
                            {COMPANY_DROPDOWN_LINKS.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                  setIsCompanyOpen(false);
                                  if (item.href === '#/our-people#careers') {
                                    e.preventDefault();
                                    window.location.hash = '#/our-people';
                                    setTimeout(() => {
                                      const el = document.querySelector('section:nth-last-child(2)') || document.getElementById('careers');
                                      el?.scrollIntoView({ behavior: 'smooth' });
                                    }, 250);
                                  }
                                }}
                                className="group/item flex flex-col p-3 rounded-xl hover:bg-[#B8912A]/10 transition-all duration-200"
                              >
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0B0B0B] group-hover/item:text-[#B8912A] transition-colors flex items-center justify-between">
                                  {item.label}
                                  <ArrowUpRight size={11} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-[#B8912A]" />
                                </span>
                                <span className="text-[10px] text-[#777] font-normal mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {item.desc}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
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
                        if (isHome) {
                          const el = document.getElementById('spaces');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            setIsCollectionsOpen(true);
                          }
                        } else {
                          setIsCollectionsOpen(true);
                        }
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
                        ? 'text-[#B8912A] font-bold'
                        : 'text-[#1A1A1A] hover:text-[#B8912A]'
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#B8912A] w-full transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : ''
                        }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

        </nav>
      </motion.header>

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
              className="relative w-full max-w-5xl mx-4 bg-[#FAF6F0] border border-[#B8912A]/30 p-8 md:p-14 text-center overflow-hidden rounded-sm shadow-[0_40px_80px_-20px_rgba(11,11,11,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold Ambient Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCollectionsOpen(false)}
                className="absolute top-6 right-6 text-[#6B6B6B] hover:text-[#9A7B1E] transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group bg-transparent border-none cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Close
                <span className="inline-block transition-transform duration-300 group-hover:rotate-90">✕</span>
              </button>

              {/* Header */}
              <div className="mb-10 relative z-10">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9A7B1E] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Atelier Portfolios
                </span>
                <h2
                  className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[#0B0B0B] mb-5"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                >
                  Explore Our <span className="italic text-[#B8912A]">Collections</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent w-40 mx-auto" />
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
                    title: 'Premium Tiles',
                    image: tilesImg,
                    href: '#/tiles',
                  },
                  {
                    title: 'Natural Granites',
                    image: graniteImg,
                    href: '#/granite',
                  },
                  {
                    title: 'Custom Handcrafted Furniture',
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
                      className="group block relative overflow-hidden bg-white border border-[#0B0B0B]/10 hover:border-[#B8912A]/60 p-5 rounded-sm transition-all duration-500 shadow-[0_8px_20px_-10px_rgba(11,11,11,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(11,11,11,0.25)] cursor-pointer"
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
                        className="font-display text-xl font-medium text-[#0B0B0B] group-hover:text-[#9A7B1E] leading-tight min-h-[2.5rem] flex items-center justify-center transition-colors duration-500"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {col.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#9A7B1E] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" style={{ fontFamily: 'Inter, sans-serif' }}>
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
