import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, ExternalLink } from 'lucide-react';

const SOCIAL_ICONS = {
  linkedin: Globe,
  twitter: Globe,
  github: Globe,
};

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const PANEL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.96, y: 24, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export default function TeamMemberModal({ member, accent, onClose, triggerRef }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap + restore focus on close
  useEffect(() => {
    if (!member) return;

    // Focus the close button on open
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Focus trap
      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Restore focus to triggering card
      triggerRef?.current?.focus();
    };
  }, [member, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          variants={OVERLAY_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-8 bg-[#0B0B0B]/70 backdrop-blur-md"
          onClick={onClose}
          aria-hidden={!member}
        >
          <motion.div
            ref={modalRef}
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={`${member?.name} profile`}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(11,11,11,0.4)] my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header gradient band */}
            <div
              className="h-2 w-full shrink-0"
              style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }}
            />

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5F0EB] text-[#555] hover:bg-[#0B0B0B] hover:text-white transition-all duration-300 border-none cursor-pointer"
              aria-label="Close profile modal"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 overflow-y-auto flex-1">
              {/* Left column — photo + socials */}
              <div className="flex flex-col items-center sm:items-start gap-5 shrink-0">
                <div
                  className="relative w-32 h-32 rounded-2xl overflow-hidden"
                  style={{ boxShadow: `0 0 0 3px ${accent.from}40, 0 16px 40px -8px ${accent.from}30` }}
                >
                  <img
                    src={member.imageUrl}
                    alt={`${member.name} — ${member.role}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-2">
                  {member.socials.map(({ platform, url }) => {
                    const Icon = SOCIAL_ICONS[platform] || ExternalLink;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${platform}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#E8E2D9] text-[#555] text-xs font-semibold hover:text-white transition-all duration-300 capitalize"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${accent.from}, ${accent.to})`;
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '';
                          e.currentTarget.style.borderColor = '#E8E2D9';
                          e.currentTarget.style.color = '#555';
                        }}
                      >
                        <Icon size={12} />
                        {platform}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Right column — details */}
              <div className="flex flex-col gap-5 flex-grow min-w-0">
                {/* Name + role */}
                <div>
                  <h2
                    className="font-display text-3xl font-semibold text-[#0B0B0B] leading-tight"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {member.name}
                  </h2>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.22em] mt-1"
                    style={{ color: accent.text, fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {member.role}
                  </p>
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full"
                  style={{ background: `linear-gradient(90deg, ${accent.from}50, transparent)` }}
                />

                {/* Bio */}
                <p
                  className="text-sm font-normal leading-[1.85] text-[#444]"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {member.bio}
                </p>



                {/* CTA */}
                <div className="mt-auto pt-2">
                  <a
                    href="mailto:connect@amaraliv.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                      fontFamily: 'Inter, system-ui, sans-serif',
                      boxShadow: `0 4px 20px -4px ${accent.from}60`,
                    }}
                  >
                    Get in Touch
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
