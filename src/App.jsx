import SmoothScroll from './hooks/SmoothScroll';
import PageLoader from './components/ui/PageLoader';
import ImageViewHint from './components/common/ImageViewHint';
import Navbar from './components/layout/Navbar';
import ContactFooter from './components/layout/ContactFooter';
import HomePage from './pages/HomePage';

export default function App() {
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
      <HomePage />
      <ContactFooter />
    </SmoothScroll>
  );
}
