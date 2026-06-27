import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SURFACES } from '../../data/content';
import {
  EASE_LUXURY,
  fadeUpTall,
  gridContainer,
  headerContainerAlt,
  textReveal,
  tileReveal,
} from '../../constants/animations';
import SurfaceImage from '../ui/SurfaceImage';
import SurfaceLightbox from '../ui/SurfaceLightbox';

export default function SurfaceGallery() {
  const [activeItem, setActiveItem] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const tileRefs = useRef({});

  const openLightbox = useCallback((item) => {
    const node = tileRefs.current[item.name];
    if (!node) return;

    const rect = node.getBoundingClientRect();
    setOriginRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setActiveItem(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveItem(null);
    setOriginRect(null);
  }, []);

  return (
    <section id="surfaces" className="section-y-sm overflow-hidden bg-dark text-cream">
      <div className="wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerContainerAlt}
          className="section-head"
        >
          <motion.p variants={fadeUpTall} className="eyebrow mb-3">
            Surface Gallery
          </motion.p>
          <motion.h2 variants={fadeUpTall} className="font-display text-section font-medium">
            Granite · Tiles
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.2 }}
            className="mt-5 line-gold max-w-2xl origin-left"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={gridContainer}
          className="grid auto-rows-auto grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[minmax(260px,auto)] lg:grid-cols-12 lg:auto-rows-[minmax(250px,auto)] lg:gap-5 2xl:auto-rows-[minmax(300px,auto)]"
        >
          {SURFACES.map((item) => {
            const isTile = item.type === 'Tiles';

            return (
              <motion.article
                key={item.name}
                variants={tileReveal}
                whileHover={{ rotateX: 3, rotateY: -3, y: -8, z: 32 }}
                transition={{ duration: 0.55, ease: EASE_LUXURY }}
                className={`surface-tile depth-card depth-glint group relative min-h-[240px] overflow-hidden rounded-sm border border-cream/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-500 hover:border-gold/40 hover:shadow-glow-sm ${item.span}`}
              >
                <button
                  type="button"
                  ref={(node) => {
                    tileRefs.current[item.name] = node;
                  }}
                  onClick={isTile ? () => window.location.hash = '#/tiles' : () => openLightbox(item)}
                  className={`absolute inset-0 z-20 block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${isTile ? 'cursor-pointer' : 'cursor-zoom-in'}`}
                  aria-label={isTile ? `Explore ${item.name} tiles` : `View ${item.name} ${item.type} material`}
                />

                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <SurfaceImage
                    src={item.image}
                    alt=""
                    className="surface-tile-img depth-media img-grade h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/20 transition-opacity duration-500 group-hover:from-dark group-hover:via-dark/75"
                  aria-hidden="true"
                />

                <motion.div
                  variants={textReveal}
                  className="depth-lift pointer-events-none absolute inset-0 flex min-h-0 flex-col justify-end"
                >
                  <div className="border-t border-cream/10 bg-dark/55 p-5 backdrop-blur-[2px] transition-colors duration-500 group-hover:border-gold/25 group-hover:bg-dark/70 md:p-7">
                    <span className="mb-2 inline-flex w-fit rounded-sm border border-gold/35 bg-dark/60 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                      {item.type}
                    </span>
                    <h3 className="font-display text-xl leading-snug text-cream md:text-2xl">{item.name}</h3>
                    {item.description && (
                      <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-cream/85 line-clamp-3 md:line-clamp-none">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="h-px w-12 bg-gold transition-all duration-500 group-hover:w-16" />
                      <span className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/40 transition-colors duration-500 group-hover:text-gold/80">
                        {isTile ? 'Explore Tiles' : 'View Material'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeItem && originRect && (
          <SurfaceLightbox
            key={activeItem.name}
            item={activeItem}
            originRect={originRect}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
