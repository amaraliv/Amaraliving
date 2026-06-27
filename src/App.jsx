import { useState, useEffect } from 'react';
import SmoothScroll from './hooks/SmoothScroll';
import PageLoader from './components/ui/PageLoader';
import ImageViewHint from './components/common/ImageViewHint';
import Navbar from './components/layout/Navbar';
import ContactFooter from './components/layout/ContactFooter';
import HomePage from './pages/HomePage';
import FurniturePage from './pages/FurniturePage';
import TilesPage from './pages/TilesPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentPath(hash);
      
      // If it's a primary subpage or the home root, scroll to top instantly
      if (hash === '#/furniture' || hash === '#/tiles' || hash === '#/' || hash === '') {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Call initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle scrolling to sections when landing back on the home page via hashes like `#/spaces`
  useEffect(() => {
    const hash = currentPath;
    if (hash.startsWith('#/') && hash !== '#/' && hash !== '#/furniture' && hash !== '#/tiles') {
      const elementId = hash.slice(2); // e.g. "spaces"
      const el = document.getElementById(elementId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [currentPath]);

  const isFurniture = currentPath === '#/furniture';
  const isTiles = currentPath === '#/tiles';

  return (
    <SmoothScroll>
      <PageLoader />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-dark"
      >
        Skip to content
      </a>
      <ImageViewHint />
      <Navbar />
      {isFurniture ? (
        <FurniturePage />
      ) : isTiles ? (
        <TilesPage />
      ) : (
        <HomePage />
      )}
      <ContactFooter />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/914424987654?text=Hello%20Amara%20Living%2C%20I%20would%20like%20to%20inquire%20about%20your%20design%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-cream border border-gold/40 shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4),0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.5),0_0_25px_rgba(212,175,55,0.25)] group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current transition-transform duration-300 group-hover:scale-105">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997a11.966 11.966 0 01-5.748-1.483L0 24zm6.59-4.846c1.785 1.059 3.548 1.621 5.361 1.622 5.568 0 10.103-4.52 10.106-10.076.002-2.693-1.04-5.225-2.935-7.123C17.227 1.66 14.707.618 12.013.618 6.45.618 1.916 5.14 1.913 10.697c-.001 1.9.49 3.75 1.42 5.394l-.995 3.633 3.709-.97zm10.963-7.53c-.302-.152-1.791-.882-2.072-.983-.281-.102-.486-.152-.69.152-.204.304-.791.983-.97 1.185-.18.203-.359.228-.661.076-.302-.152-1.274-.469-2.426-1.496-.896-.798-1.5-1.783-1.676-2.086-.176-.304-.019-.468.132-.619.136-.135.302-.354.453-.532.15-.177.2-.304.301-.506.102-.203.05-.38-.025-.532-.075-.152-.69-1.66-.945-2.27-.248-.594-.5-.513-.69-.523-.178-.01-.383-.01-.588-.01-.205 0-.537.076-.819.38-.282.304-1.075 1.049-1.075 2.56 0 1.513 1.1 2.977 1.25 3.18.15.203 2.166 3.307 5.248 4.636.732.316 1.305.505 1.75.647.736.234 1.403.2 1.932.121.59-.088 1.791-.73 2.046-1.436.256-.707.256-1.314.18-1.436-.076-.123-.282-.204-.585-.356z" />
        </svg>
      </a>
    </SmoothScroll>
  );
}

