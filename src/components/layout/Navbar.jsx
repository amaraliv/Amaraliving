import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../../hooks/SmoothScroll';
import { NAV_LINKS, PAGE_SECTIONS, resolveNavSection } from '../../constants/navigation';
import NavigationSidebar from './NavigationSidebar';

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const onHero = !scrolled;

  const updateScrollState = useCallback(() => {
    setScrolled(window.scrollY > 70);

    const trigger = window.innerHeight * 0.32;
    let currentSection = PAGE_SECTIONS[0];

    PAGE_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= trigger) {
        currentSection = id;
      }
    });

    setActiveSection(resolveNavSection(currentSection));
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
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    // Call initial check
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isSubpage = currentPath === '#/furniture' || currentPath === '#/tiles';

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-out ${
          scrolled ? 'border-b border-ink/5 bg-cream/40 shadow-sm backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className={`wrap flex items-center justify-between transition-all duration-500 ease-out ${
            scrolled ? 'py-3' : 'py-5 md:py-6'
          }`}
        >
          <a href={isSubpage ? '#/' : '#hero'} className="group shrink-0" aria-label="Amara Living home">
            <span
              className={`block h-px bg-gold transition-all duration-500 group-hover:w-16 ${
                scrolled ? 'w-8 md:w-9' : 'w-10 md:w-12'
              }`}
            />
            <span
              className={`mt-2 block font-display font-medium transition-all duration-500 ${
                scrolled
                  ? 'text-lg sm:text-xl md:text-[1.35rem] lg:text-[1.45rem]'
                  : 'text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.85rem]'
              } ${onHero ? 'text-cream' : 'text-dark'}`}
            >
              Amara <span className="italic text-gold">Living</span>
            </span>
          </a>

          <ul
            className={`hidden items-center transition-all duration-500 lg:flex ${
              scrolled ? 'gap-4 xl:gap-7' : 'gap-6 xl:gap-9'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = link.isPage
                ? currentPath === link.href
                : !isSubpage && activeSection === link.href.slice(1);

              const href = link.isPage
                ? link.href
                : (isSubpage ? link.href.replace('#', '#/') : link.href);

              return (
                <li key={link.href}>
                  <a
                    href={href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative font-body font-medium uppercase tracking-[0.16em] transition-all duration-500 ${
                      scrolled ? 'text-[10px] xl:text-[11px]' : 'text-[11px] xl:text-xs'
                    } ${
                      isActive
                        ? onHero
                          ? 'text-gold'
                          : 'font-semibold text-gold'
                        : onHero
                          ? 'text-cream/75 hover:text-gold'
                          : 'text-ink/60 hover:text-gold'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}

            <li>
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className={`flex items-center gap-1.5 text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.2em] border px-4 py-1.5 rounded-sm transition-all duration-300 ml-3 ${
                  onHero 
                    ? 'border-cream/20 text-cream hover:border-gold hover:text-gold' 
                    : scrolled 
                      ? 'border-ink/10 text-ink/70 hover:border-gold hover:text-gold' 
                      : 'border-dark/20 text-dark/70 hover:border-gold hover:text-gold'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                Menu
              </button>
            </li>
          </ul>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            className="relative z-50 shrink-0 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-label="Open sidebar menu"
          >
            <span className={`block h-px w-8 transition-all ${onHero ? 'bg-cream' : 'bg-dark'}`} />
            <span className={`my-1.5 block h-px w-6 transition-all ${onHero ? 'bg-cream/60' : 'bg-ink/50'}`} />
            <span className={`block h-px w-8 transition-all ${onHero ? 'bg-cream' : 'bg-dark'}`} />
          </button>
        </nav>
      </motion.header>

      {/* Sidebar Navigation - Rendered as a sibling to avoid containing-block transform clipping */}
      <AnimatePresence>
        {sidebarOpen && (
          <NavigationSidebar
            key="sidebar-drawer"
            onClose={() => setSidebarOpen(false)}
            currentPath={currentPath}
            isSubpage={isSubpage}
            activeSection={activeSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}
