import { useEffect, useState } from 'react';
import logoImg from '../../assets/images/amara-logo.png';
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
      className="loader-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center animate-loader-exit"
      style={{
        backgroundImage: `url(${loadingbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-live="polite"
      aria-label="Loading Amara Living"
    >
      {/* Subtle vignette/dark overlay for contrast */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#0B0B0B]/60 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 md:px-16">
        <div className="text-center">
          {/* Logo image (Emblem + AMARA LIVING) */}
          <div className="mx-auto mb-8 flex items-center justify-center">
            <img
              src={logoImg}
              alt="Amara Living"
              className="h-56 object-contain md:h-72"
              style={{ filter: 'brightness(1.15) drop-shadow(0 0 20px rgba(222, 194, 101, 0.25))' }}
            />
          </div>

          {/* Tagline: — CRAFTING SPACES THAT MATTER — */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <div className="h-px w-16 bg-gold/50" />
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.38em] text-[#D4AF37] font-semibold">
              Crafting Spaces That Matter
            </p>
            <div className="h-px w-16 bg-gold/50" />
          </div>
        </div>

        {/* Loading progress bar shifted below the logo and text */}
        <div className="loader-line mx-auto mt-12 h-px w-full max-w-xl origin-left animate-loader-line bg-gold" />
      </div>

      <p className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.4em] text-gold/50">
        Loading Experience
      </p>
    </div>
  );
}
