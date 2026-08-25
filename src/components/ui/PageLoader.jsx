import { useEffect, useState } from 'react';
import logoImg from '../../assets/logo/logo.png';
import loadingbg from '../../assets/images/loadingbg.png';

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
      className="loader-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center animate-loader-exit bg-[#FAF6F0]"
      aria-live="polite"
      aria-label="Loading Amara Living"
    >
      {/* Subtle vignette overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(225,220,210,0.5)_100%)]"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 md:px-16">
        <div className="text-center">
          {/* Logo image (Emblem + AMARA LIVING) */}
          <div className="mx-auto mb-8 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Amara Living"
              className="h-32 object-contain md:h-40 drop-shadow-sm"
            />
          </div>

          {/* Tagline: — CRAFTING SPACES THAT MATTER — */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <div className="h-px w-16 bg-[#C8102E]/50" />
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.38em] text-[#C8102E] font-semibold">
              Crafting Spaces That Matter
            </p>
            <div className="h-px w-16 bg-[#C8102E]/50" />
          </div>
        </div>

        {/* Loading progress bar shifted below the logo and text */}
        <div className="loader-line mx-auto mt-12 h-px w-full max-w-xl origin-left animate-loader-line bg-[#C8102E]" />
      </div>

      <p className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.4em] text-[#C8102E]/60">
        Loading Experience
      </p>
    </div>
  );
}
