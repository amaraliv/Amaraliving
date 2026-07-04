import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../../hooks/SmoothScroll';
import { NAV_LINKS, PAGE_SECTIONS, resolveNavSection } from '../../constants/navigation';
import logoImg from '../../assets/images/amara-logo.png';

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
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
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    // Call initial check
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isSubpage = currentPath === '#/furniture' || currentPath === '#/tiles' || currentPath === '#/granite'|| currentPath === '#/blog' || currentPath === '#/consultation' || currentPath === '#/company';
 

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ease-out ${scrolled ? 'border-b border-ink/8 bg-[#F5F0E8]/85 shadow-sm backdrop-blur-md' : 'bg-transparent'
          }`}
      >
        <nav
          className={`wrap flex items-center justify-between transition-all duration-500 ease-out ${scrolled ? 'py-0' : 'py-0 md:py-1'
            }`}
        >
          <a href={isSubpage ? '#/' : '#hero'} className="group shrink-0 -translate-y-3 -translate-x-8 transform" aria-label="Amara Living home">
            <img
              src={logoImg}
              alt="Amara Living"
              className="object-contain transition-all duration-500 h-32 md:h-[9.5rem]"
            />
          </a>

          <ul
            className={`hidden items-center transition-all duration-500 lg:flex ${scrolled ? 'gap-4 xl:gap-7' : 'gap-6 xl:gap-9'
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
                    className={`relative font-body font-medium uppercase tracking-[0.16em] transition-all duration-500 ${scrolled ? 'text-xs xl:text-[13px]' : 'text-sm xl:text-[15px]'
                      } ${isActive
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
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                        }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

        </nav>
      </motion.header>
    </>
  );
}