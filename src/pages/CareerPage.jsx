import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, MapPin, Clock, Award, CheckCircle, Mail, Globe, Heart, Shield, Zap } from 'lucide-react';
import JobModal from '../components/ui/JobModal';
import { COMPANY_BENEFITS, DEPARTMENTS, OPEN_POSITIONS } from '../data/careersData';

/* ─── Icon Map for Benefits ───────────────────────────────────────── */
const BENEFIT_ICONS = {
  Sparkles: Sparkles,
  Globe: Globe,
  TrendUp: Zap,
  Building: Shield,
  Clock: Clock,
  Heart: Heart,
};

/* ─── Reveal helper (with repeat on scroll) ────────────────────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 32, filter: 'blur(6px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-[#0B0B0B] text-left overflow-hidden">
      {/* Radial gold glow */}
      <div
        className="absolute bottom-0 left-0 w-[65vw] h-[65vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(212,175,55,0.14) 0%, transparent 65%)',
        }}
      />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pt-44 pb-12 my-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.16 } },
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="block text-[11px] font-bold uppercase tracking-[0.45em] text-[#D4AF37] mb-6"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            CAREERS AT AMARA LIVING
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="font-display text-[clamp(2.2rem,8.5vw,7.5rem)] font-semibold text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Build the Future <br />
            <em className="text-[#D4AF37] not-italic">of Luxury Living</em>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="text-base md:text-xl font-light text-[#C0A87A] max-w-xl leading-[1.8]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Join a collective of passionate designers, architects, engineers, and strategists shaping extraordinary spaces worldwide.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 pb-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#777]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Scroll to view openings
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Benefits / Why Join Us Section ──────────────────────────────── */
function BenefitsSection() {
  return (
    <section className="py-24 bg-[#FAF6F0] border-b border-[#E8E2D9]">
      <div className="w-full px-6 sm:px-12 lg:px-20">
        <Reveal className="max-w-3xl mb-16">
          <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-[#D4AF37] mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Life at Amara
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0B0B0B] leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Why You’ll Love <em className="text-[#D4AF37] not-italic">Working Here</em>
          </h2>
          <p className="text-sm text-[#666] leading-relaxed mt-4 max-w-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            We empower our people with an environment that nurtures innovation, celebrates craftsmanship, and rewards excellence.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPANY_BENEFITS.map((benefit, i) => {
            const IconComponent = BENEFIT_ICONS[benefit.icon] || Sparkles;
            return (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                  className="bg-white border border-[#E8E2D9] hover:border-[#D4AF37]/50 rounded-3xl p-8 h-full flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(11,11,11,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.15)] transition-all duration-500 group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#B8912A] mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={20} />
                    </div>
                    <h3
                      className="font-display text-2xl font-semibold text-[#0B0B0B] mb-3"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-[#555] leading-[1.8]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Career Page Component ─────────────────────────────────── */
export default function CareerPage() {
  const [activeDept, setActiveDept] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPositions = activeDept === 'all'
    ? OPEN_POSITIONS
    : OPEN_POSITIONS.filter((j) => j.department === activeDept);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#0B0B0B]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero */}
      <HeroSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* Openings Section */}
      <section id="openings" className="py-24 bg-white border-b border-[#E8E2D9]">
        <div className="w-full px-6 sm:px-12 lg:px-20">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-[#D4AF37] mb-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Current Opportunities
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0B0B0B] leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Open <em className="text-[#D4AF37] not-italic">Positions</em>
              </h2>
            </div>
            <p className="text-xs text-[#666] max-w-sm leading-relaxed" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Explore roles across our design, engineering, sales, and architectural studios. Click any role to apply.
            </p>
          </Reveal>

          {/* Department Filter Tabs */}
          <Reveal className="flex gap-2.5 mb-12 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide md:overflow-visible">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDept(dept.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border-none cursor-pointer ${
                  activeDept === dept.id
                    ? 'bg-[#0B0B0B] text-white shadow-md'
                    : 'bg-[#FAF6F0] border border-[#E8E2D9] text-[#666] hover:text-[#0B0B0B] hover:border-[#D4AF37]/50'
                }`}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {dept.label}
              </button>
            ))}
          </Reveal>

          {/* Job Listings Grid */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filteredPositions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-[#FAF6F0] border border-[#E8E2D9] rounded-3xl p-12 text-center space-y-4 max-w-2xl mx-auto my-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 text-[#B8912A] flex items-center justify-center mx-auto mb-2">
                    <Sparkles size={22} />
                  </div>
                  <h3
                    className="font-display text-2xl md:text-3xl font-semibold text-[#0B0B0B]"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    No Active Openings Right Now
                  </h3>
                  <p className="text-xs text-[#666] leading-[1.8]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    We do not have active open positions listed at the moment. However, we are always eager to connect with exceptional talent! Send us a spontaneous application.
                  </p>
                  <div className="pt-4">
                    <a
                      href="mailto:careers@amaraliv.com?subject=Spontaneous%20Application%20-%20Amara%20Living"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0B0B0B] hover:bg-[#D4AF37] transition-all shadow-md"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      Send Your Resume <Mail size={13} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                filteredPositions.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div
                      onClick={() => setSelectedJob(job)}
                      className="group relative bg-[#FAF6F0] hover:bg-white border border-[#E8E2D9] hover:border-[#D4AF37] rounded-3xl p-8 transition-all duration-500 shadow-[0_6px_24px_-8px_rgba(11,11,11,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(212,175,55,0.2)] cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B8912A]">
                            {job.departmentLabel}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-stone-200/80 text-stone-700">
                            {job.type}
                          </span>
                        </div>

                        <h3
                          className="font-display text-2xl md:text-3xl font-semibold text-[#0B0B0B] group-hover:text-[#B8912A] transition-colors duration-300"
                          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                        >
                          {job.title}
                        </h3>

                        <p className="text-xs text-[#555] max-w-2xl leading-[1.8]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          {job.summary}
                        </p>

                        <div className="flex flex-wrap gap-5 text-xs text-[#777] pt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          <span className="flex items-center gap-1.5"><MapPin size={13} className="text-[#D4AF37]" /> {job.location}</span>
                          <span className="flex items-center gap-1.5"><Award size={13} className="text-[#D4AF37]" /> {job.experience}</span>
                        </div>
                      </div>

                      <div className="shrink-0 pt-2 md:pt-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0B0B0B] group-hover:bg-[#D4AF37] transition-all duration-300 border-none cursor-pointer shadow-md"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          View Role & Apply <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* General / Spontaneous Application Banner */}
      <section className="py-24 bg-[#0B0B0B] text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mx-auto mb-6">
              <Mail size={24} />
            </div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-[#D4AF37] mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Spontaneous Applications
            </span>
            <h2
              className="font-display text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Don't See Your <em className="text-[#D4AF37] not-italic">Dream Role?</em>
            </h2>
            <p className="text-sm font-light text-[#999] leading-[1.9] mb-10 max-w-lg mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              We are always eager to connect with exceptionally talented architects, designers, developers, and visionaries. Send your resume and portfolio directly to us.
            </p>
            <a
              href="mailto:careers@amaraliv.com?subject=Spontaneous%20Application%20-%20Amara%20Living"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-white bg-gradient-to-r from-[#D4AF37] to-[#B8912A] hover:shadow-[0_10px_30px_-5px_rgba(212,175,55,0.5)] transition-all duration-300"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Email Your Resume <Mail size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
