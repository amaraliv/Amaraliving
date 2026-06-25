import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadershipVision() {
  const containerRef = useRef(null);

  // Mouse handlers for 3D card tilt & spotlight reflections
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const rotateX = -((y - rect.height / 2) / rect.height) * 15; // Max 15 deg
    const rotateY = ((x - rect.width / 2) / rect.width) * 15; // Max 15 deg
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section 
      ref={containerRef} 
      className="bg-white text-dark py-20 lg:py-28 relative overflow-hidden border-t border-stone/30"
    >
      {/* Self-contained styling for specialized luxury animations */}
      <style>{`
        .luxury-3d-card {
          transform: perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, box-shadow 0.25s ease;
          will-change: transform;
        }
        .parallax-media {
          transform: translate3d(calc(var(--rotate-y, 0deg) * -0.4), calc(var(--rotate-x, 0deg) * 0.4), 20px) scale(1.03);
          transition: transform 0.15s ease-out;
        }
        .parallax-depth-text {
          transform: translateZ(40px);
        }
        .card-spotlight-white {
          background: radial-gradient(circle 180px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.45) 0%, transparent 80%);
        }
        .card-spotlight-gold {
          background: radial-gradient(circle 220px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.22) 0%, transparent 80%);
        }
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px) scale(0.8); opacity: 0.1; }
          50% { transform: translateY(-40px) translateX(20px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(-80px) translateX(-10px) scale(0.8); opacity: 0; }
        }
        .particle-1 { animation: floatParticle 6s infinite ease-in-out; }
        .particle-2 { animation: floatParticle 8s infinite ease-in-out 1.5s; }
        .particle-3 { animation: floatParticle 7s infinite ease-in-out 3s; }
        .particle-4 { animation: floatParticle 9s infinite ease-in-out 4.5s; }
        
        .shimmer-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(120deg, transparent 20%, rgba(212,175,55,0.4) 40%, rgba(212,175,55,0.8) 50%, rgba(212,175,55,0.4) 60%, transparent 80%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 200% 100%;
          background-position: 100% 0;
          transition: background-position 0.8s ease;
          pointer-events: none;
        }
        .group:hover .shimmer-border::before {
          background-position: 0 0;
        }
      `}</style>

      {/* Marble overlay background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/white-marble.png')" }} 
      />
      {/* Backlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <span className="eyebrow text-gold tracking-[0.4em] mb-4 block">
            LEADERSHIP & VISION
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] text-dark">
            Built by Vision.<br />
            <span className="italic text-gold">Defined by Craftsmanship.</span>
          </h2>
          <p className="mt-4 font-body text-xs md:text-sm text-ink/65 leading-relaxed max-w-2xl mx-auto">
            Meet the minds behind Amara Living — transforming premium materials, furniture, and design into timeless living experiences.
          </p>
        </div>

        {/* 3-Column Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* CARD 1: FOUNDER */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group luxury-3d-card relative bg-gradient-to-b from-stone/10 to-stone/20 rounded-[24px] border border-stone/40 p-6 flex flex-col justify-between shadow-[0_12px_40px_-20px_rgba(8,18,41,0.06)] hover:shadow-[0_30px_70px_-15px_rgba(212,175,55,0.12)] transition-all duration-300"
          >
            {/* Shimmer Border Overlay */}
            <div className="shimmer-border absolute inset-0 rounded-[24px] pointer-events-none" />
            {/* Spotlight reflection */}
            <div className="card-spotlight-white absolute inset-0 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Card edge vertical badge */}
            <div className="absolute right-[-24px] top-20 origin-center rotate-90 text-[8px] font-bold tracking-[0.4em] text-gold/80 uppercase pb-1 pointer-events-none">
              FOUNDER
            </div>

            <div className="relative">
              {/* Profile Image container */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[220px] lg:h-[260px] xl:h-[300px] rounded-[18px] overflow-hidden mb-6 shadow-md border border-stone/20">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                  alt="Aravind Amara" 
                  className="parallax-media w-full h-full object-cover filter saturate-[0.9]" 
                />
              </div>

              {/* Name details */}
              <div className="parallax-depth-text">
                <span className="font-body text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-gold uppercase block mb-1">
                  Founder & Creative Visionary
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-2">
                  Aravind Amara
                </h3>
                <div className="h-[1px] w-12 bg-gold/45 mb-4 group-hover:w-20 transition-all duration-500" />
              </div>
            </div>

            {/* Vision statement */}
            <div className="parallax-depth-text relative z-10 pt-4 border-t border-stone/30">
              <span className="text-gold text-2xl font-display leading-none absolute -top-1 left-0">“</span>
              <p className="font-body text-xs md:text-sm leading-relaxed text-ink/75 italic pl-4">
                Amara Living was founded with a simple belief — exceptional spaces begin with exceptional materials. Our mission is to bring together luxury marble, premium furniture, and timeless design under one trusted destination.
              </p>
              
              {/* Signature reveal on hover */}
              <div className="mt-4 pl-4 overflow-hidden h-6">
                <p className="font-display italic text-sm text-gold/90 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 font-medium">
                  Aravind Amara
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: CO-FOUNDER */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group luxury-3d-card relative bg-gradient-to-b from-stone/10 to-stone/20 rounded-[24px] border border-stone/40 p-6 flex flex-col justify-between shadow-[0_12px_40px_-20px_rgba(8,18,41,0.06)] hover:shadow-[0_30px_70px_-15px_rgba(212,175,55,0.12)] transition-all duration-300"
          >
            {/* Shimmer Border Overlay */}
            <div className="shimmer-border absolute inset-0 rounded-[24px] pointer-events-none" />
            {/* Spotlight reflection - gold reflections for Co-Founder */}
            <div className="card-spotlight-gold absolute inset-0 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Card edge vertical badge */}
            <div className="absolute right-[-34px] top-24 origin-center rotate-90 text-[8px] font-bold tracking-[0.4em] text-gold/80 uppercase pb-1 pointer-events-none">
              CO-FOUNDER
            </div>

            <div className="relative">
              {/* Profile Image container */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[220px] lg:h-[260px] xl:h-[300px] rounded-[18px] overflow-hidden mb-6 shadow-md border border-stone/20">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                  alt="Nisha Amara" 
                  className="parallax-media w-full h-full object-cover filter saturate-[0.9]" 
                />
              </div>

              {/* Name details */}
              <div className="parallax-depth-text">
                <span className="font-body text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-gold uppercase block mb-1">
                  Co-Founder & Operations Lead
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-2">
                  Nisha Amara
                </h3>
                <div className="h-[1px] w-12 bg-gold/45 mb-4 group-hover:w-20 transition-all duration-500" />
              </div>
            </div>

            {/* Vision statement */}
            <div className="parallax-depth-text relative z-10 pt-4 border-t border-stone/30">
              <span className="text-gold text-2xl font-display leading-none absolute -top-1 left-0">“</span>
              <p className="font-body text-xs md:text-sm leading-relaxed text-ink/75 italic pl-4">
                We focus on delivering quality, reliability, and craftsmanship at every stage — from sourcing materials to creating spaces that endure for generations.
              </p>

              {/* Signature reveal on hover */}
              <div className="mt-4 pl-4 overflow-hidden h-6">
                <p className="font-display italic text-sm text-gold/90 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 font-medium">
                  Nisha Amara
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: TEAM CARD */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group luxury-3d-card relative bg-gradient-to-b from-stone/10 to-stone/20 rounded-[24px] border border-stone/40 p-6 flex flex-col justify-between shadow-[0_12px_40px_-20px_rgba(8,18,41,0.06)] hover:shadow-[0_30px_70px_-15px_rgba(212,175,55,0.12)] transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer Border Overlay */}
            <div className="shimmer-border absolute inset-0 rounded-[24px] pointer-events-none" />
            {/* Spotlight reflection */}
            <div className="card-spotlight-white absolute inset-0 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating particles inside team card */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="particle-1 absolute bottom-4 left-1/4 h-1.5 w-1.5 rounded-full bg-gold/40" />
              <div className="particle-2 absolute bottom-12 right-1/4 h-1 w-1 rounded-full bg-gold/50" />
              <div className="particle-3 absolute bottom-24 left-1/3 h-1.5 w-1.5 rounded-full bg-gold/30" />
              <div className="particle-4 absolute bottom-6 right-1/3 h-2 w-2 rounded-full bg-gold/20" />
            </div>

            <div className="relative z-10">
              {/* Profile Image container */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[220px] lg:h-[260px] xl:h-[300px] rounded-[18px] overflow-hidden mb-6 shadow-md border border-stone/20">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                  alt="Design & Project Team" 
                  className="parallax-media w-full h-full object-cover filter saturate-[0.9]" 
                />
              </div>

              {/* Name details */}
              <div className="parallax-depth-text">
                <span className="font-body text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-gold uppercase block mb-1">
                  Core Design & Project Team
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-2">
                  Design & Project Team
                </h3>
                <div className="h-[1px] w-12 bg-gold/45 mb-4 group-hover:w-20 transition-all duration-500" />
              </div>
            </div>

            {/* Vision statement */}
            <div className="parallax-depth-text relative z-10 pt-4 border-t border-stone/30">
              <span className="text-gold text-2xl font-display leading-none absolute -top-1 left-0">“</span>
              <p className="font-body text-xs md:text-sm leading-relaxed text-ink/75 italic pl-4">
                Our team combines creativity, technical expertise, and attention to detail to ensure every project reflects elegance, functionality, and lasting value.
              </p>
              <p className="font-body text-[10px] text-gold tracking-widest uppercase mt-4 pl-4 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Architects & Specialists
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
