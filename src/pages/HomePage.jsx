import { lazy, Suspense } from 'react';
import Hero from '../components/sections/Hero';
import SectionDivider from '../components/common/SectionDivider';
import SectionFallback from '../components/ui/SectionFallback';

const FeaturedSpaces = lazy(() => import('../components/sections/FeaturedSpaces'));
const MaterialsShowcase = lazy(() => import('../components/sections/MaterialsShowcase'));
const CraftsmanshipStory = lazy(() => import('../components/sections/CraftsmanshipStory'));
const LeadershipVision = lazy(() => import('../components/sections/LeadershipVision'));
const FurnitureCollection = lazy(() => import('../components/sections/FurnitureCollection'));
const SurfaceGallery = lazy(() => import('../components/sections/SurfaceGallery'));
const Testimonials = lazy(() => import('../components/sections/Testimonials'));
const BookConsultationForm = lazy(() => import('../components/sections/BookConsultationForm'));

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
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
        <LeadershipVision />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FurnitureCollection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SurfaceGallery />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BookConsultationForm />
      </Suspense>
    </main>
  );
}
