import { useRef, useEffect } from 'react';
import { gsap } from '../../utils/gsap';
import { SPACES } from '../../data/content';

const dominant = SPACES.find((s) => s.dominant);
const supporting = SPACES.filter((s) => !s.dominant);

export default function FeaturedSpaces() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.space-intro .space-intro-item', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.space-intro', start: 'top 88%' },
      });

      gsap.from('.space-dominant', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.space-dominant', start: 'top 82%' },
      });

      gsap.from('.space-support', {
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.space-grid', start: 'top 80%' },
      });

      gsap.utils.toArray('.space-depth-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spaces"
      className="section-y-lg -mt-[clamp(3.5rem,9vw,7rem)] overflow-x-hidden bg-cream pt-[calc(clamp(3.5rem,9vw,7rem)+2.25rem)]"
    >
      <div className="wrap space-intro section-head">
        <div className="viewport-grid items-start lg:items-end">
          <div className="space-intro-item lg:col-span-7">
            <p className="eyebrow mb-3 leading-relaxed">Featured Spaces</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-[1.1] text-dark">
              Curated<br /><span className="italic text-gold">Environments</span>
            </h2>
          </div>
          <p className="space-intro-item mt-4 font-body text-sm leading-relaxed text-ink/50 md:mt-0 md:text-base lg:col-span-4 lg:col-start-9">
            One featured composition with two supporting scenes — editorial pacing, generous whitespace, and layered depth.
          </p>
        </div>
        <div className="space-intro-item mt-6 line-gold max-w-xl opacity-60" />
      </div>

      <div className="wrap space-grid">
        <div className="viewport-grid relative">
          {/* Featured — ~30% shorter than before */}
          <div className="space-dominant depth-scene relative lg:col-span-8">
            <div className="depth-card depth-glint group relative overflow-hidden shadow-editorial">
              <div className="aspect-[4/3] min-h-[240px] sm:aspect-[16/10] sm:min-h-[320px] md:min-h-[420px] lg:aspect-auto lg:h-[62vh] lg:min-h-[560px] lg:max-h-[720px]">
                <img
                  src={dominant.image}
                  alt={dominant.title}
                  data-view-space
                  className="space-depth-img depth-media img-grade h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/55 via-dark/5 to-transparent" />
            </div>

            <div className="float-card depth-lift relative z-10 mx-4 -mt-8 max-w-none p-5 sm:mx-5 md:-mt-12 md:ml-10 md:mr-5 md:max-w-2xl md:p-8 lg:absolute lg:bottom-10 lg:left-10 lg:mx-0 lg:-mt-0">
              <p className="eyebrow mb-2">{dominant.tag}</p>
              <h3 className="font-display text-2xl text-dark md:text-3xl">{dominant.title}</h3>
              <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink/55 md:text-base">{dominant.description}</p>
            </div>
          </div>

          {/* Supporting */}
          <div className="flex flex-col gap-5 lg:col-span-4 lg:justify-between lg:gap-6">
            {supporting.map((space, i) => (
              <article key={space.id} className="space-support depth-scene group relative">
                <div className={`relative ${i === 1 ? 'lg:-ml-6' : ''}`}>
                  <div className="depth-card depth-glint overflow-hidden shadow-editorial">
                    <div className="aspect-[16/10] min-h-[200px] sm:min-h-[240px] md:min-h-[285px] lg:min-h-[275px] 2xl:min-h-[330px]">
                      <img
                        src={space.image}
                        alt={space.title}
                        data-view-space
                        className="space-depth-img depth-media img-grade h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="float-card depth-lift relative z-10 -mt-9 mx-4 p-5 md:mx-6 md:max-w-[92%] md:p-6">
                    <p className="font-body text-[10px] uppercase tracking-[0.28em] text-gold">{space.tag}</p>
                    <h3 className="mt-1 font-display text-lg text-dark">{space.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
