import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';
import SectionDivider from '../components/common/SectionDivider';
import SectionFallback from '../components/ui/SectionFallback';

const FeaturedSpaces = lazy(() => import('../components/sections/FeaturedSpaces'));
const MaterialsShowcase = lazy(() => import('../components/sections/MaterialsShowcase'));
const CraftsmanshipStory = lazy(() => import('../components/sections/CraftsmanshipStory'));
const FurnitureCollection = lazy(() => import('../components/sections/FurnitureCollection'));
const SurfaceGallery = lazy(() => import('../components/sections/SurfaceGallery'));
const SpaceCalculator = lazy(() => import('../components/sections/SpaceCalculator'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <SectionDivider />
      <Suspense fallback={<SectionFallback />}>
        <FeaturedSpaces />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionFallback />}>
        <MaterialsShowcase />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CraftsmanshipStory />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FurnitureCollection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SurfaceGallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SpaceCalculator />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
    </main>
  );
}
