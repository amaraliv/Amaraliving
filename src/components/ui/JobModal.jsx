import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Briefcase, MapPin, Clock, Award, Send } from 'lucide-react';

export default function JobModal({ job, onClose }) {
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'apply'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!job) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [job, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (!job) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6 bg-[#0B0B0B]/75 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(11,11,11,0.5)] border border-[#D4AF37]/30 my-8 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gold bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5D97A] to-[#D4AF37]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-[#EFE8DF] text-[#555] hover:bg-[#0B0B0B] hover:text-white transition-all duration-300 border-none cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Modal Header */}
          <div className="p-8 sm:p-10 border-b border-[#E8E2D9] bg-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#B8912A] border border-[#D4AF37]/30">
                {job.departmentLabel}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-stone-100 text-stone-600">
                {job.type}
              </span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold text-[#0B0B0B] mb-4"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              {job.title}
            </h2>

            <div className="flex flex-wrap gap-6 text-xs text-[#666]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#D4AF37]" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#D4AF37]" />
                {job.type}
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={13} className="text-[#D4AF37]" />
                {job.experience}
              </div>
            </div>

            {/* Tab switch */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#F0EBE3]">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#0B0B0B] text-white shadow-md'
                    : 'bg-[#EFE8DF] text-[#666] hover:text-[#0B0B0B]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Role Overview
              </button>
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${
                  activeTab === 'apply'
                    ? 'bg-[#D4AF37] text-white shadow-md'
                    : 'bg-[#EFE8DF] text-[#666] hover:text-[#0B0B0B]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-8 sm:p-10 max-h-[60vh] overflow-y-auto">
            {activeTab === 'details' ? (
              <div className="space-y-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Summary */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8912A] mb-2">
                    About The Role
                  </h3>
                  <p className="text-sm text-[#444] leading-[1.8]">{job.summary}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0B0B0B] mb-3">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2.5">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-[#555] leading-[1.7]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0B0B0B] mb-3">
                    Qualifications & Requirements
                  </h3>
                  <ul className="space-y-2.5">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-[#555] leading-[1.7]">
                        <CheckCircle size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E8E2D9]">
                  <button
                    onClick={() => setActiveTab('apply')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white bg-[#0B0B0B] hover:bg-[#D4AF37] transition-all duration-300 border-none cursor-pointer"
                  >
                    Proceed to Application <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#B8912A] flex items-center justify-center mx-auto">
                      <CheckCircle size={36} />
                    </div>
                    <h3
                      className="font-display text-3xl font-semibold text-[#0B0B0B]"
                      style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                    >
                      Application Submitted!
                    </h3>
                    <p className="text-xs text-[#666] max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Thank you for applying to Amara Living. Our talent acquisition team will review your submission for the <strong className="text-[#0B0B0B]">{job.title}</strong> role and contact you shortly.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#0B0B0B] hover:bg-[#D4AF37] transition-all border-none cursor-pointer"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#444] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3 rounded-xl border border-[#D8D2CA] bg-white text-xs text-[#0B0B0B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#444] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#D8D2CA] bg-white text-xs text-[#0B0B0B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#444] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-[#D8D2CA] bg-white text-xs text-[#0B0B0B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#444] mb-2">
                          Portfolio / Resume Link *
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="https://linkedin.com/in/jane or website"
                          className="w-full px-4 py-3 rounded-xl border border-[#D8D2CA] bg-white text-xs text-[#0B0B0B] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#444] mb-2">
                        Cover Note / Why Amara Living?
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us briefly about your background and why you wish to join our studio..."
                        className="w-full px-4 py-3 rounded-xl border border-[#D8D2CA] bg-white text-xs text-[#0B0B0B] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-white bg-gradient-to-r from-[#D4AF37] to-[#B8912A] hover:shadow-lg transition-all duration-300 border-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          Submit Application <Send size={13} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
