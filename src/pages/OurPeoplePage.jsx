import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Globe } from 'lucide-react';
import TeamMemberModal from '../components/ui/TeamMemberModal';
import { TEAM_MEMBERS, TEAM_SECTIONS, COMPANY_TIMELINE } from '../data/teamData';

/* ─── Reveal helper ─────────────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 36, filter: 'blur(8px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Get accent for a team key ──────────────────────────────────── */
function getAccent(teamKey) {
  return TEAM_SECTIONS.find((s) => s.key === teamKey)?.accent || TEAM_SECTIONS[0].accent;
}

/* ─── Single alternating member row ─────────────────────────────── */
function MemberRow({ member, index, onOpenModal }) {
  const accent = getAccent(member.team);
  const imgRef = useRef(null);
  const inView = useInView(imgRef, { once: false, margin: '-60px' });
  const [imgLoaded, setImgLoaded] = useState(false);

  // Even index → image RIGHT, text LEFT
  // Odd index  → image LEFT,  text RIGHT
  const imageOnRight = index % 2 === 0;

  const teamLabel =
    member.team === 'development'
      ? 'Web Development'
      : member.team === 'design'
      ? 'Design & Content'
      : 'International Sales';

  return (
    <div
      className={`max-w-5xl mx-auto flex flex-col ${imageOnRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-8 md:gap-12 py-12 md:py-16 border-b border-[#E8E2D9] last:border-0`}
    >
      {/* ── Text / Bio side ─────────────────────────────────── */}
      <motion.div
        ref={imgRef}
        className="flex-1 min-w-0 max-w-lg"
        initial={{ opacity: 0, x: imageOnRight ? -45 : 45, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: imageOnRight ? -45 : 45, filter: 'blur(6px)' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* Team badge */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="inline-block text-[9px] font-bold uppercase tracking-[0.35em] px-3 py-1.5 rounded-full mb-5 cursor-default transition-all"
          style={{
            background: accent.bg,
            color: accent.text,
            border: `1px solid ${accent.from}35`,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {teamLabel}
        </motion.span>

        {/* Name */}
        <h2
          className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold text-[#0B0B0B] leading-[1.0] tracking-tight mb-2"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {member.name}
        </h2>

        {/* Role */}
        <p
          className="text-base md:text-lg font-semibold uppercase tracking-[0.14em] mb-6"
          style={{ color: accent.text, fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {member.role}
        </p>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px w-20 mb-7 origin-left"
          style={{ background: `linear-gradient(90deg, ${accent.from}, transparent)` }}
        />

        {/* Bio */}
        <p
          className="text-sm font-normal leading-[1.95] text-[#555] mb-8 max-w-md"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {member.bio}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenModal(member, accent)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 focus:outline-none"
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: `0 8px 24px -6px ${accent.from}50`,
            }}
          >
            View Full Profile <ArrowUpRight size={13} />
          </motion.button>

          {member.socials.length > 0 && (
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={member.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#D8D2CA] text-[#555] hover:border-[#999] hover:text-[#0B0B0B] transition-all duration-300"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              <Globe size={13} />
              LinkedIn
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* ── Photo side ───────────────────────────────────────── */}
      <motion.div
        className="relative shrink-0 w-full md:w-[340px] lg:w-[360px]"
        initial={{ opacity: 0, x: imageOnRight ? 45 : -45, scale: 0.94 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: imageOnRight ? 45 : -45, scale: 0.94 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 240, damping: 20 } }}
      >
        {/* Accent blob behind photo */}
        <div
          className="absolute -inset-6 rounded-[48px] blur-3xl opacity-25 -z-10 transition-opacity duration-500 hover:opacity-40"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        />

        {/* Photo container */}
        <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] w-full max-w-[380px] mx-auto shadow-[0_30px_80px_-16px_rgba(11,11,11,0.2)] group cursor-pointer"
          onClick={() => onOpenModal(member, accent)}
        >
          {/* Shimmer */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}28)` }}
            />
          )}

          <img
            src={member.imageUrl}
            alt={`${member.name} — ${member.role}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Subtle gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Corner accent */}
          <div
            className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
            style={{ background: `linear-gradient(45deg, ${accent.from}, ${accent.to})` }}
          />
        </div>

        {/* Floating number badge */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="absolute -top-3 -right-3 md:top-4 md:right-4 w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-lg cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            fontFamily: 'Cormorant Garamond, Georgia, serif',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Team Section Divider (inside box header) ──────────────────── */
function TeamDivider({ section }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });
  return (
    <div ref={ref} className="flex items-center gap-5 mb-0 group">
      {/* Animated icon container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 6 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-shadow duration-300 group-hover:shadow-lg"
        style={{
          background: section.accent.bg,
          border: `1px solid ${section.accent.from}40`,
          boxShadow: `0 4px 16px -4px ${section.accent.from}30`,
        }}
      >
        {/* Pulsing dot */}
        <motion.div
          animate={{ scale: [1, 1.28, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-4 h-4 rounded-full shadow-sm"
          style={{ background: `linear-gradient(135deg, ${section.accent.from}, ${section.accent.to})` }}
        />
      </motion.div>

      {/* Text reveal */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <span
          className="block text-[10px] font-bold uppercase tracking-[0.42em] mb-1"
          style={{ color: section.accent.text, fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          {section.eyebrow}
        </span>
        <h3
          className="font-display text-2xl md:text-3xl font-semibold text-[#0B0B0B] leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
        >
          {section.label}
        </h3>
      </motion.div>
    </div>
  );
}

/* ─── Page Intro — dark full-bleed hero ─────────────────────────── */
function PageIntro() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between bg-[#0B0B0B] overflow-hidden">
      {/* Radial gold glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[60vw] h-[60vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(212,175,55,0.13) 0%, transparent 65%)',
        }}
      />
      {/* Subtle grid */}
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
            THE PEOPLE BEHIND AMARA LIVING
          </motion.span>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="font-display text-[clamp(3.5rem,9vw,8rem)] font-semibold text-white leading-[0.9] tracking-tight mb-8"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Meet <em className="text-[#D4AF37] not-italic">Our People</em>
          </motion.h1>
          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="text-base md:text-xl font-light text-[#C0A87A] max-w-xl leading-[1.8]"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Meet the passionate individuals who craft, design, and connect Amara Living with the world.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator at bottom of hero fold */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 pb-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#777]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          Scroll to explore team
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

/* ─── Timeline ───────────────────────────────────────────────────── */
function Timeline() {
  return (
    <section className="py-24 bg-[#0B0B0B]">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-[#D4AF37] mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Our Journey
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#FAF6F0]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Growing <em className="text-[#D4AF37] not-italic">Together</em>
          </h2>
        </Reveal>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent md:-translate-x-px" />
          <div className="space-y-12">
            {COMPANY_TIMELINE.map((node, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={node.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-14 md:pl-0`}>
                      <div className="inline-block bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-5 text-left hover:border-[#D4AF37]/50 transition-all duration-300">
                        <span className="block text-2xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{node.year}</span>
                        <h3 className="text-base font-semibold text-[#FAF6F0] mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{node.title}</h3>
                        <p className="text-xs font-light text-[#999] leading-[1.8]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{node.desc}</p>
                      </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 top-5 md:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#D4AF37] bg-[#0B0B0B] z-10" />
                    <div className="hidden md:block flex-1" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────────── */
function JoinCTA() {
  const ref = useRef(null);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMagnetPos({ x: (e.clientX - (rect.left + rect.width / 2)) * 0.25, y: (e.clientY - (rect.top + rect.height / 2)) * 0.25 });
  }, []);
  return (
    <section id="careers" className="py-28 bg-[#FAF6F0] text-center">
      <div className="wrap max-w-3xl mx-auto px-4">
        <Reveal>
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mx-auto mb-6">
            <Sparkles size={20} />
          </div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-[#D4AF37] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Career Opportunities
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0B0B0B] mb-6 leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
            Want to Join <em className="text-[#D4AF37] not-italic">Our Team?</em>
          </h2>
          <p className="text-sm font-normal text-[#666] leading-[1.9] mb-10 max-w-lg mx-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            We're always looking for passionate people who believe in the power of great design, honest materials, and meaningful work.
          </p>
          <motion.a
            ref={ref}
            href="mailto:connect@amaraliv.com?subject=Career%20Enquiry"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMagnetPos({ x: 0, y: 0 })}
            animate={{ x: magnetPos.x, y: magnetPos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B8912A)', boxShadow: '0 8px 32px -8px rgba(212,175,55,0.5)', fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Get in Touch <ArrowUpRight size={14} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────── */
export default function OurPeoplePage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedAccent, setSelectedAccent] = useState(null);
  const triggerRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleOpenModal = useCallback((member, accent) => {
    setSelectedMember(member);
    setSelectedAccent(accent);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMember(null);
    setSelectedAccent(null);
  }, []);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#0B0B0B]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <PageIntro />

      {/* All members — each team in its own styled box */}
      <main id="main-content" className="w-full px-6 sm:px-12 lg:px-20 py-16 space-y-10">
        {TEAM_SECTIONS.map((section, sIdx) => {
          const members = TEAM_MEMBERS.filter((m) => m.team === section.key);
          return (
            <Reveal key={section.key} delay={sIdx * 0.07}>
              <div
                className="relative rounded-3xl overflow-hidden border border-[#E8E2D9] bg-white shadow-[0_8px_40px_-12px_rgba(11,11,11,0.10)]"
              >
                {/* Top accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-1 w-full origin-left"
                  style={{ background: `linear-gradient(90deg, ${section.accent.from}, ${section.accent.to})` }}
                />

                {/* Box header */}
                <div className="px-8 sm:px-12 pt-8 pb-6 border-b border-[#F0EBE3]">
                  <TeamDivider section={section} />
                </div>

                {/* Members inside box */}
                <div className="px-8 sm:px-12">
                  {members.map((member) => {
                    const globalIndex = TEAM_MEMBERS.indexOf(member);
                    return (
                      <MemberRow
                        key={member.id}
                        member={member}
                        index={globalIndex}
                        onOpenModal={handleOpenModal}
                      />
                    );
                  })}
                </div>
              </div>
            </Reveal>
          );
        })}
      </main>

      <Timeline />
      <JoinCTA />

      <AnimatePresence>
        {selectedMember && selectedAccent && (
          <TeamMemberModal
            member={selectedMember}
            accent={selectedAccent}
            onClose={handleCloseModal}
            triggerRef={triggerRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
