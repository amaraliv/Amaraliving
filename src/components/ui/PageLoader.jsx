import { useEffect, useState } from 'react';

const LOADER_MS = 2800;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), LOADER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="loader-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0B0B0B] animate-loader-exit"
      aria-live="polite"
      aria-label="Loading Amara Living"
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 md:px-16">
        <div className="loader-line mx-auto mb-12 h-px w-full max-w-xl origin-left animate-loader-line bg-gold" />
        <div className="text-center">
          <p className="loader-logo-main font-display text-4xl font-medium text-cream md:text-6xl">
            Amara <span className="italic text-gold">Living</span>
          </p>
          <p className="loader-logo-sub mt-4 font-body text-[11px] uppercase tracking-[0.45em] text-cream/40">
            Luxury · Est. 2010
          </p>
        </div>
      </div>
      <p className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.4em] text-gold/50">
        Loading Experience
      </p>
    </div>
  );
}
