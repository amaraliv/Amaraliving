import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';

const CLOSE_THRESHOLD = 130;
const SPRING_OPEN = { type: 'spring', stiffness: 420, damping: 38, mass: 0.85 };
const SPRING_RETURN = { type: 'spring', stiffness: 520, damping: 42, mass: 0.75 };
const SPRING_CLOSE = { type: 'spring', stiffness: 460, damping: 40, mass: 0.9 };

function computeLayout(originRect) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxW = Math.min(vw * 0.92, 1200);
  const maxH = vh * 0.82;
  const aspect = originRect.width / Math.max(originRect.height, 1);

  let targetW = maxW;
  let targetH = targetW / aspect;

  if (targetH > maxH) {
    targetH = maxH;
    targetW = targetH * aspect;
  }

  const scaleStart = originRect.width / targetW;
  const startX = originRect.left + originRect.width / 2 - vw / 2;
  const startY = originRect.top + originRect.height / 2 - vh / 2;

  return { startX, startY, scaleStart, targetW, targetH };
}

export default function SurfaceLightbox({ item, originRect, onClose }) {
  const closingRef = useRef(false);
  const layout = useMemo(() => computeLayout(originRect), [originRect]);

  const x = useMotionValue(layout.startX);
  const y = useMotionValue(layout.startY);
  const scale = useMotionValue(layout.scaleStart);

  const dragDistance = useTransform([x, y], ([xv, yv]) => Math.hypot(xv, yv));
  const backdropOpacity = useTransform(dragDistance, [0, 320], [0.88, 0.35]);
  const imageOpacity = useTransform(dragDistance, [0, 360], [1, 0.72]);

  const closeToOrigin = useCallback(async () => {
    if (closingRef.current) return;
    closingRef.current = true;

    await Promise.all([
      animate(x, layout.startX, SPRING_CLOSE),
      animate(y, layout.startY, SPRING_CLOSE),
      animate(scale, layout.scaleStart, SPRING_CLOSE),
    ]);

    onClose();
  }, [layout.scaleStart, layout.startX, layout.startY, onClose, scale, x, y]);

  useEffect(() => {
    const controls = [
      animate(x, 0, SPRING_OPEN),
      animate(y, 0, SPRING_OPEN),
      animate(scale, 1, SPRING_OPEN),
    ];

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeToOrigin();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      controls.forEach((control) => control.stop());
    };
  }, [closeToOrigin, scale, x, y]);

  const handleDragEnd = (_, info) => {
    const distance = Math.hypot(info.offset.x, info.offset.y);

    if (distance > CLOSE_THRESHOLD) {
      closeToOrigin();
      return;
    }

    animate(x, 0, SPRING_RETURN);
    animate(y, 0, SPRING_RETURN);
    animate(scale, 1, SPRING_RETURN);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} material preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-dark/90 backdrop-blur-2xl"
        style={{ opacity: backdropOpacity }}
        onClick={closeToOrigin}
      />

      <motion.div
        drag
        dragElastic={0.08}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{
          x,
          y,
          scale,
          opacity: imageOpacity,
          width: layout.targetW,
          height: layout.targetH,
        }}
        className="relative z-10 touch-none cursor-grab active:cursor-grabbing"
      >
        <div className="relative h-full w-full overflow-hidden rounded-sm border border-cream/15 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.75)]">
          <img
            src={item.image}
            alt={item.name}
            draggable={false}
            className="img-grade h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6"
        >
          <span className="mb-2 inline-flex rounded-sm border border-gold/35 bg-dark/70 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
            {item.type}
          </span>
          <h3 className="font-display text-2xl text-cream md:text-3xl">{item.name}</h3>
          {item.description && (
            <p className="mt-2 max-w-lg font-body text-sm leading-relaxed text-cream/80">
              {item.description}
            </p>
          )}
        </motion.div>
      </motion.div>

      <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.32em] text-cream/35 sm:block">
        Drag to close · ESC
      </p>
    </motion.div>
  );
}
