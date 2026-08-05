import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Newspaper, Briefcase } from 'lucide-react';

/**
 * Company Vertical Dropdown items dataset
 */
const MENU_ITEMS = [
  {
    id: 'company',
    icon: Building2,
    title: 'Company',
    description: 'Our story, philosophy & heritage',
    href: '#/company',
  },
  {
    id: 'people',
    icon: Users,
    title: 'Our People',
    description: 'Meet our developers & team',
    href: '#/our-people',
  },
  {
    id: 'blog',
    icon: Newspaper,
    title: 'Blog',
    description: 'Design inspiration & stories',
    href: '#/blog',
  },
  {
    id: 'careers',
    icon: Briefcase,
    title: 'Careers',
    description: 'Join our growing team',
    href: '#/careers',
  },
];

/**
 * Premium Vertical Luxury Dropdown Menu for Amara Living Company Section
 */
export default function CompanyMegaMenu({ isOpen, onClose }) {
  const containerRef = useRef(null);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle arrow key focus movement inside vertical menu
  const handleKeyDownList = (e, index) => {
    const total = MENU_ITEMS.length;
    let nextIndex = index;

    if (e.key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
    } else if (e.key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
    }

    if (nextIndex !== index) {
      e.preventDefault();
      const items = containerRef.current?.querySelectorAll('[role="menuitem"]');
      if (items && items[nextIndex]) {
        items[nextIndex].focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={onClose}
      className="absolute top-full left-0 mt-3 w-[330px] z-50 pointer-events-auto"
      role="menu"
      aria-label="Company Dropdown Menu"
    >
      {/* Top small diamond pointer arrow connecting dropdown to Company tab */}
      <div className="absolute -top-1.5 left-[52px] -translate-x-1/2 w-3.5 h-3.5 bg-[#FCFAF7] border-t border-l border-[#E7DED0] rotate-45 z-30 shadow-sm" />

      {/* Floating Card Container */}
      <div className="relative z-20 rounded-[20px] bg-[#FCFAF7] border border-[#E7DED0] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl flex flex-col gap-[10px] overflow-hidden">
        {/* Single Vertical Column Items Container */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-[10px]"
        >
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.href}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDownList(e, index)}
                onClick={() => {
                  onClose();
                  if (item.href === '#/careers') {
                    window.location.hash = '#/careers';
                  }
                }}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group flex items-start gap-3.5 p-3 rounded-xl bg-transparent border-l-4 border-l-transparent hover:border-l-[#C79A3B] hover:bg-[#F8F2E6] transition-all duration-250 cursor-pointer outline-none focus:ring-2 focus:ring-[#C79A3B]/40 text-left"
              >
                {/* Small luxury icon */}
                <div className="w-8 h-8 rounded-full bg-[#F2ECE0] border border-[#E7DED0] flex items-center justify-center text-[#B8912A] group-hover:scale-110 group-hover:text-[#C79A3B] shrink-0 transition-all duration-250 mt-0.5 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title & Short description */}
                <div className="flex flex-col min-w-0">
                  <h3
                    className="text-[18px] font-semibold text-[#1A1A1A] group-hover:text-[#C79A3B] transition-colors duration-250 leading-snug"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] text-[#6B6B6B] font-normal leading-relaxed mt-0.5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
