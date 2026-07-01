import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../utils/gsap';
import { TIMELINE, IMG } from '../../data/content';

export default function CraftsmanshipStory() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const galleryImages = [
    IMG.craft,
    IMG.livingRoom,
    IMG.kitchen,
    IMG.concept
  ];

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.craft-head', {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.8,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.craft-track', start: 'top 60%', end: 'bottom 50%', scrub: 1 },
      });

      gsap.utils.toArray('.craft-step').forEach((step, index) => {
        gsap.from(step, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.08,
          scrollTrigger: { trigger: step, start: 'top 85%' },
        });
      });

      gsap.from('.craft-visual-container', {
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.craft-visual-container', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="story" 
      className="relative bg-[#1A1008] text-cream py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.06)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_rgba(26,16,8,0.6)_0%,_transparent_60%)]" />

      <div className="wrap">
        <div className="viewport-grid gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Legacy Timeline */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div className="craft-head mb-8">
              <span className="font-body text-xs md:text-sm font-semibold tracking-[0.4em] text-gold uppercase mb-3 block">
                OUR LEGACY
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-cream">
                16 Years of<br />
                <span className="italic text-gold">Craftsmanship</span>
              </h2>
              {/* Divider Line */}
              <div className="h-[1px] w-24 bg-gold/40 my-5" />
              <p className="font-body text-sm md:text-base leading-relaxed text-cream/70 max-w-md">
                From the finest raw materials to impeccable finishing, we craft timeless spaces that reflect elegance, quality, and a legacy you can trust.
              </p>
            </div>

            {/* Vertical timeline */}
            <div className="craft-track relative mt-4 pl-2">
              <div ref={lineRef} className="absolute bottom-2 left-[20px] top-2 w-[1.5px] origin-top bg-gold/25" />
              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    phase: '01',
                    title: 'RAW MATERIAL',
                    text: 'Hand-selected granite and timber from trusted quarries and ateliers worldwide.',
                    icon: (
                      <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 20L8 8L14 17L18 11L22 20H2Z" />
                      </svg>
                    )
                  },
                  {
                    phase: '02',
                    title: 'DESIGN',
                    text: 'Every surface and furnishing composed with architectural intent and material honesty.',
                    icon: (
                      <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    )
                  },
                  {
                    phase: '03',
                    title: 'MANUFACTURING',
                    text: 'Precision cutting, finishing, and assembly by artisans at our Chennai studio.',
                    icon: (
                      <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                      </svg>
                    )
                  },
                  {
                    phase: '04',
                    title: 'INSTALLATION',
                    text: 'Meticulous on-site execution — seamless joints, level surfaces, structural integrity.',
                    icon: (
                      <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a8 8 0 00-8 8v1h16v-1a8 8 0 00-8-8zM4 13h16M12 4v4M8 13v3a4 4 0 008 0v-3" />
                      </svg>
                    )
                  },
                  {
                    phase: '05',
                    title: 'LUXURY LIVING',
                    text: 'Spaces reborn through stone, surface, and furniture working in quiet harmony.',
                    icon: (
                      <svg className="w-5 h-5 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 12h16M4 12a3 3 0 013-3h10a3 3 0 013 3M8 9V6a2 2 0 012-2h4a2 2 0 012 2v3" />
                      </svg>
                    )
                  }
                ].map((step) => (
                  <div key={step.phase} className="craft-step relative flex items-start gap-5 z-10">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center bg-[#1A1008] text-xs font-bold text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                        {step.phase}
                      </div>
                    </div>
                    {/* Circle icon container */}
                    <div className="h-10 w-10 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-body text-sm md:text-base font-bold text-gold tracking-wider uppercase">{step.title}</h3>
                      <p className="mt-1.5 font-body text-xs md:text-sm leading-relaxed text-cream/60 max-w-sm">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Cursive text */}
            <span className="font-display italic text-3xl text-gold/90 mt-12 block pl-2 font-light tracking-wide">
              Built on trust. Crafted for life.
            </span>
          </div>

          {/* RIGHT COLUMN: Why Choose + Wreath stats + Main Showcase Image */}
          <div className="lg:col-span-8 flex flex-col gap-8 w-full">
            
            {/* Row 1: Why Choose Amara Living - 5 horizontal item cards */}
            <div className="flex flex-col gap-4">
              <span className="font-body text-xs md:text-sm font-semibold tracking-[0.35em] text-gold uppercase">
                WHY CHOOSE AMARA LIVING
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    title: 'Premium Quality Materials',
                    desc: 'Sourced from the finest quarries',
                    icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Expert Design Consultation',
                    desc: 'Bespoke layouts made for you',
                    icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Nationwide Delivery',
                    desc: 'Seamless transit across India',
                    icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 0 1-1.125-1.125V7.5a1.125 1.125 0 0 1 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.375m7.5 6.375a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5a1.125 1.125 0 0 0 1.125-1.125v-4.571a1.5 1.5 0 0 0-.439-1.06l-4.22-4.22a1.5 1.5 0 0 0-1.06-.44H15m0 7.5H1.5M15 11.25V18.75m0 0h-1.5M22.5 11.25H15" />
                      </svg>
                    )
                  },
                  {
                    title: 'Direct Factory Pricing',
                    desc: 'No middleman margins',
                    icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 0 0 1.591 0l7.25-7.25a1.125 1.125 0 0 0 0-1.591L12.5 3.659A2.25 2.25 0 0 0 10.91 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
                      </svg>
                    )
                  },
                  {
                    title: 'Installation Support',
                    desc: 'Meticulous site supervision',
                    icon: (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.25 12h5.5M12 9.25v5.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                      </svg>
                    )
                  }
                ].map((feat) => (
                  <div 
                    key={feat.title} 
                    className="border border-gold/15 bg-[#241408] rounded-xl p-4 md:p-5 flex flex-col items-start gap-3.5 hover:border-gold/45 hover:shadow-[0_8px_30px_rgba(212,175,55,0.06)] transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-lg border border-gold/30 bg-gold/5 flex items-center justify-center text-gold shadow-inner">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="font-body text-xs md:text-sm font-bold text-cream leading-snug">{feat.title}</h4>
                      <p className="font-body text-[10px] md:text-xs text-cream/45 mt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Wreath & Stat strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 px-6 border border-gold/10 bg-[#241408]/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-base md:text-lg font-bold text-gold leading-none">16+</p>
                  <p className="font-body text-[9px] md:text-xs text-cream/60 uppercase tracking-wider mt-0.5">Years of Legacy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 15v4M9 20h6" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-base md:text-lg font-bold text-gold leading-none">500+</p>
                  <p className="font-body text-[9px] md:text-xs text-cream/60 uppercase tracking-wider mt-0.5">Projects Completed</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-base md:text-lg font-bold text-gold leading-none">300+</p>
                  <p className="font-body text-[9px] md:text-xs text-cream/60 uppercase tracking-wider mt-0.5">Happy Families</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-base md:text-lg font-bold text-gold leading-none">Pan India</p>
                  <p className="font-body text-[9px] md:text-xs text-cream/60 uppercase tracking-wider mt-0.5">Delivery Support</p>
                </div>
              </div>
            </div>

            {/* Row 3: Image Showcase container with overlapping glass overlay */}
            <div className="craft-visual-container relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              
              {/* The Image */}
              <div 
                className="relative h-[320px] md:h-[400px] lg:h-[450px] w-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img 
                  src={galleryImages[activeImgIndex]} 
                  alt="Amara Living Craftsmanship" 
                  className="w-full h-full object-cover transition-all duration-1000 transform scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Left & Right arrow controls */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3.5 z-30">
                  <button 
                    onClick={handlePrev}
                    className="h-10 w-10 rounded-full border border-gold/30 bg-black/50 hover:bg-gold/15 text-gold flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={handleNext}
                    className="h-10 w-10 rounded-full border border-gold/30 bg-black/50 hover:bg-gold/15 text-gold flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom Glassmorphic Overlay Panel */}
              <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-xl border-t border-white/10 px-8 py-5 grid grid-cols-4 gap-6 items-center z-20">
                {/* 16 Years */}
                <div className="border-r border-white/10 pr-6">
                  <p className="font-display text-5xl lg:text-6xl font-bold text-gold leading-none">16</p>
                  <p className="font-body text-[10px] md:text-xs text-cream/45 uppercase tracking-[0.2em] mt-2 whitespace-nowrap">Years of Legacy</p>
                </div>

                {/* 500+ Projects Completed */}
                <div className="border-r border-white/10 px-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 15v4M9 20h6" />
                    </svg>
                    <p className="font-display text-xl lg:text-2xl font-bold text-cream leading-none">500+</p>
                  </div>
                  <p className="font-body text-[9px] md:text-xs text-cream/45 uppercase tracking-wider mt-1 whitespace-nowrap">Projects Completed</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-gold text-xs">★</span>
                    ))}
                    <span className="font-body text-[9px] text-cream/60 ml-1.5">4.9/5 Rating</span>
                  </div>
                </div>

                {/* 300+ Happy Families */}
                <div className="border-r border-white/10 px-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3" />
                    </svg>
                    <p className="font-display text-xl lg:text-2xl font-bold text-cream leading-none">300+</p>
                  </div>
                  <p className="font-body text-[9px] md:text-xs text-cream/45 uppercase tracking-wider mt-1">Happy Families</p>
                  {/* User avatars */}
                  <div className="flex items-center -space-x-2 mt-2">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80'
                    ].map((avatar, idx) => (
                      <img 
                        key={idx} 
                        src={avatar} 
                        alt="Customer Avatar" 
                        className="w-7 h-7 rounded-full border border-dark object-cover" 
                      />
                    ))}
                    <div className="w-7 h-7 rounded-full border border-dark bg-gold/25 flex items-center justify-center text-[10px] text-gold font-bold">
                      +
                    </div>
                  </div>
                </div>

                {/* Pan India Delivery Support */}
                <div className="pl-6 flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                      </svg>
                      <p className="font-display text-lg lg:text-xl font-bold text-cream leading-none">Pan India</p>
                    </div>
                    <p className="font-body text-[9px] md:text-xs text-cream/45 uppercase tracking-wider mt-1">Delivery Support</p>
                  </div>
                  {/* Small gold India outline mapping */}
                  <svg className="w-10 h-10 text-gold opacity-75 shrink-0 hidden md:block" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M32 6 L35 12 L38 10 L37 15 L42 16 L40 20 L44 24 L39 26 L35 32 L32 30 L29 34 L25 36 L27 40 L23 44 L20 38 L22 34 L20 30 L24 26 L21 22 L25 18 L23 14 L27 12 Z" fill="currentColor" fillOpacity="0.15" />
                  </svg>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
