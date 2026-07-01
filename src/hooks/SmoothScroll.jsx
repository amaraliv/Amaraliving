import { useEffect, createContext, useContext, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '../utils/gsap';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.1,
    });

    lenisRef.current = instance;
    setLenis(instance);
    instance.on('scroll', ScrollTrigger.update);

    let rafId = 0;
    const raf = (time) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
