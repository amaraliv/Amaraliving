import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FURNITURE, IMG } from '../data/content';
import { gsap } from '../utils/gsap';
import {
  fadeUp,
  fadeUpSoft,
  headerContainer,
  lineGrow,
} from '../constants/animations';

const HERO_SCENE_DURATION = 3600;

const SERVICES = [
  { label: 'Living Room Sets', href: '#living-room-sets' },
  { label: 'Dining Tables', href: '#dining-tables' },
  { label: 'Bedroom Storage', href: '#bedroom-storage' },
  { label: 'Entry Consoles', href: '#entry-consoles' },
];

const HERO_SCENES = [
  {
    label: 'Living Room',
    image: IMG.furniture,
    alt: 'Modern luxury living room with designer sofa and warm ambient lighting',
    position: 'object-center',
  },
  {
    label: 'Bedroom',
    image: IMG.furniture2,
    alt: 'Luxurious master bedroom with premium wooden furniture and soft lighting',
    position: 'object-center',
  },
  {
    label: 'Reading Room',
    image: IMG.workspace,
    alt: 'Stylish reading room with desk, shelving, and warm lamp lighting',
    position: 'object-center',
  },
  {
    label: 'Kitchen',
    image: IMG.kitchen,
    alt: 'Contemporary modular kitchen with granite countertops and luxury cabinets',
    position: 'object-center',
  },
  {
    label: 'Dining Room',
    image: IMG.furniture3,
    alt: 'Luxury dining area with premium chairs and refined interior design',
    position: 'object-center',
  },
];

const LIVING_GALLERY = [
  {
    src: '/furniture/living-classic.jpg',
    alt: 'Classic living room sofa set with chandelier and warm wood details',
    label: 'Classic Living',
  },
  {
    src: '/furniture/living-tv-wall.jpg',
    alt: 'Luxury cream living room with TV wall and marble flooring',
    label: 'TV Wall Lounge',
  },
  {
    src: '/furniture/living-lounge.jpg',
    alt: 'Elegant lounge with plum sofa and gold lighting',
    label: 'Statement Lounge',
  },
  {
    src: '/furniture/living-arch.jpg',
    alt: 'Soft neutral living room with arched interior detail',
    label: 'Arched Suite',
  },
];

const DINING_GALLERY = [
  {
    src: '/furniture/dining-cream-gold.jpg',
    alt: 'Cream and gold luxury dining table with marble wall accents',
    label: 'Cream Gold Dining',
  },
  {
    src: '/furniture/dining-chandelier.jpg',
    alt: 'Luxury dining room with gold chandelier and black marble floor',
    label: 'Chandelier Suite',
  },
  {
    src: '/furniture/dining-black-marble.jpg',
    alt: 'Black marble dining table with cream chairs and display cabinets',
    label: 'Black Marble Set',
  },
  {
    src: '/furniture/dining-classic-wood.jpg',
    alt: 'Classic polished wood dining table with upholstered chairs',
    label: 'Classic Wood Table',
  },
];

const BEDROOM_GALLERY = [
  {
    src: '/furniture/bedroom-modern-panel.jpg',
    alt: 'Modern luxury bedroom with paneled headboard and chandelier lighting',
    label: 'Modern Panel Suite',
  },
  {
    src: '/furniture/bedroom-classic-suite.jpg',
    alt: 'Classic luxury bedroom with tufted headboard and chandelier',
    label: 'Classic Bedroom',
  },
  {
    src: '/furniture/bedroom-architectural-panel.jpg',
    alt: 'Architectural bedroom with geometric wall panels and warm side lighting',
    label: 'Architectural Wall',
  },
  {
    src: '/furniture/bedroom-gold-geometric.jpg',
    alt: 'Luxury bedroom with gold geometric wall details and soft grey bench',
    label: 'Gold Geometric Suite',
  },
];

const ENTRY_GALLERY = [
  {
    src: '/furniture/entry-black-gold-console.jpg',
    alt: 'Black and gold entry console with round mirror on marble wall',
    label: 'Black Gold Console',
  },
  {
    src: '/furniture/entry-gold-ribbed-console.jpg',
    alt: 'Gold ribbed entry console with round mirror and marble wall',
    label: 'Ribbed Gold Console',
  },
  {
    src: '/furniture/entry-hall-console.jpg',
    alt: 'Luxury hallway console with circular mirror and chandelier lighting',
    label: 'Hall Console',
  },
  {
    src: '/furniture/entry-mirror-console.jpg',
    alt: 'Mirror console with gold base and wall lamps',
    label: 'Mirror Console',
  },
];

const PROCESS = [
  {
    title: 'Measure',
    text: 'We study the room, circulation, wall lines, and the way each piece will be used every day.',
  },
  {
    title: 'Material Pairing',
    text: 'Timber, upholstery, brass, marble, and granite are balanced with the larger interior palette.',
  },
  {
    title: 'Craft',
    text: 'Pieces are fabricated with proportion, edge detail, storage logic, and finish durability in mind.',
  },
];

const EDITORIAL_COLLECTION = FURNITURE.map((piece, index) => ({
  ...piece,
  number: String(index + 1).padStart(2, '0'),
  count: ['08 pieces', '05 finishes', '06 silhouettes', '04 stone options'][index],
  detail: ['Hand-tufted upholstery', 'Brass inlay detail', 'Solid oak joinery', 'Granite surface craft'][index],
  backgroundWord: ['LOUNGE', 'ENTRY', 'DINING', 'STORAGE'][index],
  sectionId: ['living-room-sets', 'entry-consoles', 'dining-tables', 'bedroom-storage'][index],
}));

export default function FurniturePage() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveScene((current) => (current + 1) % HERO_SCENES.length);
    }, HERO_SCENE_DURATION);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    HERO_SCENES.forEach((scene) => {
      const image = new Image();
      image.src = scene.image;
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.editorial-section').forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.editorial-reveal'),
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
          },
        );

        gsap.to(section.querySelector('.editorial-image'), {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main id="main-content" className="bg-cream">
      <section id="furniture" className="relative min-h-[92dvh] overflow-hidden bg-dark">
        <div className="absolute inset-0">
          {HERO_SCENES.map((scene, index) => {
            const isActive = activeScene === index;

            return (
              <motion.img
                key={scene.label}
                src={scene.image}
                alt={isActive ? scene.alt : ''}
                aria-hidden={!isActive}
                data-view-space={isActive ? true : undefined}
                className={`img-grade absolute inset-0 h-full w-full object-cover ${scene.position}`}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.08 : 1,
                  x: isActive ? '1.5%' : '-1.5%',
                }}
                transition={{
                  opacity: { duration: 1.4, ease: 'easeInOut' },
                  scale: { duration: HERO_SCENE_DURATION / 1000, ease: 'linear' },
                  x: { duration: HERO_SCENE_DURATION / 1000, ease: 'linear' },
                }}
              />
            );
          })}
          <div className="absolute inset-0 bg-hero-veil" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/35 to-dark/5" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-cream/20 to-transparent" />
        </div>

        <div className="wrap relative z-10 flex min-h-[92dvh] flex-col justify-center pb-16 pt-28 md:pt-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={lineGrow} className="mb-7 h-px w-20 origin-left bg-gold" />
            <motion.p variants={fadeUpSoft} className="eyebrow mb-5 text-gold/90">
              Bespoke Furniture
            </motion.p>
            <h1 className="font-display text-hero font-medium text-cream">
              <motion.span variants={fadeUpSoft} className="block">
                Furniture
              </motion.span>
              <motion.span variants={fadeUp} className="block italic text-gold">
                Crafted for Living
              </motion.span>
            </h1>
            <motion.p
              variants={fadeUpSoft}
              className="mt-7 max-w-2xl font-body text-base font-light leading-[1.8] text-cream/72 md:text-lg"
            >
              Premium sofas, dining pieces, consoles, and storage designed to sit naturally with granite, tiles, and refined interior finishes.
            </motion.p>
            <motion.div variants={fadeUpSoft} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/#contact" className="btn-solid w-full text-center sm:w-auto">
                Book Consultation
              </a>
              <a href="#collection" className="btn-gold w-full border-cream/25 text-center text-cream sm:w-auto">
                <span>View Collection</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="wrap absolute inset-x-0 bottom-8 z-10 hidden items-center justify-end gap-2 md:flex">
          {HERO_SCENES.map((scene, index) => (
            <button
              key={scene.label}
              type="button"
              onClick={() => setActiveScene(index)}
              aria-label={`Show ${scene.label} furniture scene`}
              className={`h-1 transition-all duration-500 ${
                activeScene === index ? 'w-9 bg-gold' : 'w-3 bg-cream/30 hover:bg-cream/55'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F2ECE5] py-10 md:py-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-24 border-r border-gold/10 bg-dark/[0.03] lg:block" />
        <div className="wrap">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <a
                key={service.label}
                href={service.href}
                className="group relative overflow-hidden border border-gold/15 bg-white/55 px-5 py-5 shadow-[0_18px_50px_-42px_rgba(8,18,41,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/45 hover:bg-white"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-dark transition-all duration-500 group-hover:w-1" />
                <span className="relative block font-body text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/65">
                  {service.label}
                </span>
                <span className="relative mt-3 block h-px w-10 bg-gold/45 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="collection" className="relative overflow-hidden bg-[#F8F5F2] text-dark">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#C9A96E]/18 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F2ECE5] to-transparent" />
        <div className="wrap relative z-10 py-12 md:py-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={headerContainer}
            className="mb-6 md:mb-8"
          >
            <motion.p variants={fadeUpSoft} className="eyebrow mb-3 text-[#C9A96E]">
              Furniture Collection
            </motion.p>
            <motion.h2 variants={fadeUp} className="max-w-5xl font-display text-[clamp(2.15rem,4vw,4.4rem)] font-medium leading-[1.06] text-dark">
              Signature pieces composed like a private interior catalogue
            </motion.h2>
            <motion.div variants={lineGrow} className="mt-6 h-px max-w-3xl origin-left bg-gradient-to-r from-transparent via-[#C9A96E]/70 to-transparent" />
          </motion.div>
        </div>

        {EDITORIAL_COLLECTION.map((piece, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <section
              key={piece.title}
              id={piece.sectionId}
              className={`editorial-section relative overflow-hidden border-t border-[#C9A96E]/18 ${
                index % 2 === 0 ? 'bg-[#F8F5F2]' : 'bg-[#EFE7DE]'
              }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/35 to-transparent" />
              <div
                className={`pointer-events-none absolute top-0 hidden h-full w-[18vw] bg-dark/[0.035] lg:block ${
                  imageFirst ? 'right-0' : 'left-0'
                }`}
              />
              <span
              className={`pointer-events-none absolute top-6 hidden font-display text-[11rem] leading-none text-[#C9A96E]/[0.08] lg:block ${
                  imageFirst ? 'right-10' : 'left-10'
                }`}
              >
                {piece.backgroundWord}
              </span>
              <span
                className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 rotate-180 font-display text-8xl text-[#C9A96E]/25 [writing-mode:vertical-rl] lg:block ${
                  imageFirst ? 'right-8' : 'left-8'
                }`}
              >
                {piece.number}
              </span>

              <div
                className={`wrap relative z-10 grid min-h-[76vh] items-center gap-8 py-10 md:py-12 lg:grid-cols-12 lg:gap-8 xl:gap-10 ${
                  imageFirst ? '' : ''
                }`}
              >
                <div
                  className={`editorial-reveal group relative lg:col-span-9 ${
                    imageFirst ? '' : 'lg:col-start-4 lg:row-start-1'
                  }`}
                >
                  {index === 0 ? (
                    <div className="relative">
                      <div className="absolute -right-5 top-6 -z-10 h-[84%] w-[84%] border border-[#C9A96E]/65" />
                      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
                        <button
                          type="button"
                          className="group/preview relative z-0 overflow-hidden rounded-sm border border-transparent bg-white text-left shadow-[0_38px_100px_-36px_rgba(0,0,0,0.65)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/60 hover:p-2 hover:shadow-[0_34px_90px_-32px_rgba(8,18,41,0.7)] focus-visible:z-20 focus-visible:border-[#C9A96E]/60 focus-visible:p-2 md:col-span-8"
                          aria-label="Preview Classic Living"
                        >
                          <img
                            src={LIVING_GALLERY[0].src}
                            alt={LIVING_GALLERY[0].alt}
                            data-view-space
                            className="editorial-image img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.06]"
                          />
                          <span className="pointer-events-none absolute bottom-3 left-3 bg-dark/70 px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                            {LIVING_GALLERY[0].label}
                          </span>
                        </button>
                        <div className="grid gap-3 md:col-span-4">
                          {LIVING_GALLERY.slice(1).map((image) => (
                            <button
                              key={image.src}
                              type="button"
                              className="group/preview relative z-0 overflow-hidden rounded-sm border-4 border-white bg-white text-left shadow-[0_22px_48px_-30px_rgba(8,18,41,0.55)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/65 hover:shadow-[0_28px_70px_-34px_rgba(8,18,41,0.72)] focus-visible:z-20 focus-visible:border-[#C9A96E]/65"
                              aria-label={`Preview ${image.label}`}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.12]"
                              />
                              <span className="pointer-events-none absolute bottom-2 left-2 bg-dark/70 px-2.5 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                                {image.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E]/65 to-transparent" />
                        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/45">
                          Living Moodboard
                        </span>
                      </div>
                    </div>
                  ) : index === 1 ? (
                    <div className="relative">
                      <div className="absolute -left-5 top-8 -z-10 h-[82%] w-[84%] border border-[#C9A96E]/65" />
                      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
                        <button
                          type="button"
                          className="group/preview relative z-0 overflow-hidden rounded-sm border border-transparent bg-white text-left shadow-[0_38px_100px_-36px_rgba(0,0,0,0.65)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/60 hover:p-2 hover:shadow-[0_34px_90px_-32px_rgba(8,18,41,0.7)] focus-visible:z-20 focus-visible:border-[#C9A96E]/60 focus-visible:p-2 md:col-span-8"
                          aria-label={`Preview ${ENTRY_GALLERY[0].label}`}
                        >
                          <img
                            src={ENTRY_GALLERY[0].src}
                            alt={ENTRY_GALLERY[0].alt}
                            data-view-space
                            className="editorial-image img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.06]"
                          />
                          <span className="pointer-events-none absolute bottom-3 left-3 bg-dark/70 px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                            {ENTRY_GALLERY[0].label}
                          </span>
                        </button>
                        <div className="grid gap-3 md:col-span-4">
                          {ENTRY_GALLERY.slice(1).map((image) => (
                            <button
                              key={image.src}
                              type="button"
                              className="group/preview relative z-0 overflow-hidden rounded-sm border-4 border-white bg-white text-left shadow-[0_22px_48px_-30px_rgba(8,18,41,0.55)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/65 hover:shadow-[0_28px_70px_-34px_rgba(8,18,41,0.72)] focus-visible:z-20 focus-visible:border-[#C9A96E]/65"
                              aria-label={`Preview ${image.label}`}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.12]"
                              />
                              <span className="pointer-events-none absolute bottom-2 left-2 bg-dark/70 px-2.5 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                                {image.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E]/65 to-transparent" />
                        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/45">
                          Entry Moodboard
                        </span>
                      </div>
                    </div>
                  ) : index === 2 ? (
                    <div className="relative">
                      <div className="absolute -right-5 top-6 -z-10 h-[84%] w-[84%] border border-[#C9A96E]/65" />
                      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
                        <button
                          type="button"
                          className="group/preview relative z-0 overflow-hidden rounded-sm border border-transparent bg-white text-left shadow-[0_38px_100px_-36px_rgba(0,0,0,0.65)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/60 hover:p-2 hover:shadow-[0_34px_90px_-32px_rgba(8,18,41,0.7)] focus-visible:z-20 focus-visible:border-[#C9A96E]/60 focus-visible:p-2 md:col-span-8"
                          aria-label={`Preview ${DINING_GALLERY[0].label}`}
                        >
                          <img
                            src={DINING_GALLERY[0].src}
                            alt={DINING_GALLERY[0].alt}
                            data-view-space
                            className="editorial-image img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.06]"
                          />
                          <span className="pointer-events-none absolute bottom-3 left-3 bg-dark/70 px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                            {DINING_GALLERY[0].label}
                          </span>
                        </button>
                        <div className="grid gap-3 md:col-span-4">
                          {DINING_GALLERY.slice(1).map((image) => (
                            <button
                              key={image.src}
                              type="button"
                              className="group/preview relative z-0 overflow-hidden rounded-sm border-4 border-white bg-white text-left shadow-[0_22px_48px_-30px_rgba(8,18,41,0.55)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/65 hover:shadow-[0_28px_70px_-34px_rgba(8,18,41,0.72)] focus-visible:z-20 focus-visible:border-[#C9A96E]/65"
                              aria-label={`Preview ${image.label}`}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.12]"
                              />
                              <span className="pointer-events-none absolute bottom-2 left-2 bg-dark/70 px-2.5 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                                {image.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E]/65 to-transparent" />
                        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/45">
                          Dining Moodboard
                        </span>
                      </div>
                    </div>
                  ) : index === 3 ? (
                    <div className="relative">
                      <div className="absolute -left-5 top-8 -z-10 h-[82%] w-[84%] border border-[#C9A96E]/65" />
                      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
                        <button
                          type="button"
                          className="group/preview relative z-0 overflow-hidden rounded-sm border border-transparent bg-white text-left shadow-[0_38px_100px_-36px_rgba(0,0,0,0.65)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/60 hover:p-2 hover:shadow-[0_34px_90px_-32px_rgba(8,18,41,0.7)] focus-visible:z-20 focus-visible:border-[#C9A96E]/60 focus-visible:p-2 md:col-span-8"
                          aria-label={`Preview ${BEDROOM_GALLERY[0].label}`}
                        >
                          <img
                            src={BEDROOM_GALLERY[0].src}
                            alt={BEDROOM_GALLERY[0].alt}
                            data-view-space
                            className="editorial-image img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.06]"
                          />
                          <span className="pointer-events-none absolute bottom-3 left-3 bg-dark/70 px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                            {BEDROOM_GALLERY[0].label}
                          </span>
                        </button>
                        <div className="grid gap-3 md:col-span-4">
                          {BEDROOM_GALLERY.slice(1).map((image) => (
                            <button
                              key={image.src}
                              type="button"
                              className="group/preview relative z-0 overflow-hidden rounded-sm border-4 border-white bg-white text-left shadow-[0_22px_48px_-30px_rgba(8,18,41,0.55)] outline-none transition-all duration-500 hover:z-20 hover:-translate-y-1 hover:border-[#C9A96E]/65 hover:shadow-[0_28px_70px_-34px_rgba(8,18,41,0.72)] focus-visible:z-20 focus-visible:border-[#C9A96E]/65"
                              aria-label={`Preview ${image.label}`}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="img-grade aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover/preview:scale-[1.12]"
                              />
                              <span className="pointer-events-none absolute bottom-2 left-2 bg-dark/70 px-2.5 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C9A96E] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/preview:opacity-100">
                                {image.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A96E]/65 to-transparent" />
                        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/45">
                          Bedroom Moodboard
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`absolute -z-10 border border-[#C9A96E]/65 ${
                          imageFirst
                            ? '-right-5 top-6 h-[82%] w-[82%]'
                            : '-left-5 top-10 h-[76%] w-[86%]'
                        }`}
                      />
                      <div
                        className={`overflow-hidden rounded-sm shadow-[0_38px_100px_-36px_rgba(0,0,0,0.65)] ${
                          index === 1
                            ? 'aspect-[4/5] lg:aspect-[10/11]'
                            : index === 2
                              ? 'aspect-[16/9] lg:aspect-[16/10]'
                              : 'aspect-[5/4] lg:aspect-[7/5]'
                        }`}
                      >
                        <img
                          src={piece.image}
                          alt={piece.title}
                          data-view-space
                          className="editorial-image img-grade h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.055]"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={`editorial-reveal relative lg:col-span-3 ${
                    imageFirst ? 'lg:col-start-10 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1'
                  }`}
                >
                  <div className="max-w-md border border-[#C9A96E]/18 bg-white/55 p-6 shadow-[0_28px_80px_-42px_rgba(8,18,41,0.35)] backdrop-blur-md md:p-7 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.38em] text-[#C9A96E]">
                      {piece.tag}
                    </p>
                    <h3 className="mt-4 font-display text-4xl font-medium leading-tight text-dark md:text-5xl lg:text-4xl xl:text-5xl">
                      {piece.title}
                    </h3>
                    <div className="my-5 h-px w-20 bg-[#C9A96E]/80" />
                    <p className="max-w-sm font-body text-sm leading-[1.75] text-ink/62">
                      {piece.description}
                    </p>
                    <a href="/#contact" className="btn-gold mt-7 w-full justify-center border-[#C9A96E]/70 px-5 text-center text-[#C9A96E] xl:w-auto xl:px-8">
                      <span>Explore Collection</span>
                    </a>
                    <div className="mt-7 flex flex-col gap-3 border-t border-ink/10 pt-5 xl:flex-row xl:flex-wrap xl:gap-x-8">
                      <p className="font-body text-[10px] uppercase tracking-[0.28em] text-ink/45">
                        <span className="text-[#C9A96E]">{piece.count}</span>
                      </p>
                      <p className="font-body text-[10px] uppercase tracking-[0.28em] text-ink/45">
                        {piece.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      <section className="section-y bg-cream">
        <div className="wrap">
          <div className="viewport-grid items-start">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-3">How We Work</p>
              <h2 className="heading-section">
                Designed around your room, not a catalogue.
              </h2>
            </div>
            <div className="space-y-5 lg:col-span-6 lg:col-start-7">
              {PROCESS.map((step, index) => (
                <div key={step.title} className="border-l border-gold/40 pl-5">
                  <span className="index-number font-display text-4xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-medium text-dark">{step.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink/70 md:text-base">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-dark text-cream">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-3">Made to Fit</p>
            <h2 className="font-display text-3xl font-medium md:text-5xl">
              Start with your room dimensions.
            </h2>
          </div>
          <a href="/#contact" className="btn-solid w-full text-center sm:w-auto">
            Contact Amara
          </a>
        </div>
      </section>
    </main>
  );
}
