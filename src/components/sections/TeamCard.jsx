import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function TeamCard({ member, accent, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(member);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer outline-none"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      onClick={() => onClick(member)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View profile of ${member.name}`}
    >
      {/* Blob glow behind photo */}
      <div
        className="absolute -inset-3 rounded-[40px] blur-2xl opacity-30 group-hover:opacity-55 transition-opacity duration-700 -z-10"
        style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
      />

      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-[32px] aspect-[3/4]"
        style={{ boxShadow: `0 20px 60px -12px rgba(11,11,11,0.25)` }}
      >
        {/* Shimmer skeleton */}
        {!imgLoaded && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}33)` }}
          />
        )}

        {/* Portrait photo */}
        <img
          src={member.imageUrl}
          alt={`${member.name} — ${member.role}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlay at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.4) 40%, transparent 70%)',
          }}
        />

        {/* Accent color tint top-left */}
        <div
          className="absolute top-0 left-0 w-24 h-24 rounded-br-full opacity-20 group-hover:opacity-35 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        />

        {/* LinkedIn badge — top right */}
        {member.socials.length > 0 && (
          <a
            href={member.socials[0].url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all duration-300"
          >
            <Globe size={15} />
          </a>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Team badge */}
          <span
            className="inline-block text-[8px] font-bold uppercase tracking-[0.3em] px-2.5 py-1 rounded-full mb-2"
            style={{
              background: `linear-gradient(135deg, ${accent.from}30, ${accent.to}20)`,
              color: accent.text,
              border: `1px solid ${accent.from}40`,
              fontFamily: 'Inter, system-ui, sans-serif',
              backdropFilter: 'blur(8px)',
            }}
          >
            {member.team === 'development' ? 'Web Dev' : member.team === 'design' ? 'Design & Content' : 'International Sales'}
          </span>

          {/* Name */}
          <h3
            className="font-display text-xl font-semibold text-white leading-tight mb-0.5"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            {member.name}
          </h3>

          {/* Role */}
          <p
            className="text-[11px] font-medium leading-tight"
            style={{ color: accent.text, fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            {member.role}
          </p>

          {/* "View Profile" hint on hover */}
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div
              className="h-px flex-1 max-w-[32px]"
              style={{ background: accent.from }}
            />
            <span
              className="text-[9px] font-bold uppercase tracking-wider"
              style={{ color: accent.text, fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              View Profile
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
