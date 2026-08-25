import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, Mail, User, MapPin } from 'lucide-react';

export default function TileEnquiryModal({ tile, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    quantity: '500 - 1500 sq.ft',
    projectType: 'Residential',
    message: ''
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  const handleWhatsAppDirect = () => {
    const tileText = tile ? tile.name : 'Tiles Collection';
    const text = `Hello Amara Living, I am interested in inquiring about the tile: ${tileText} (${tile?.size || '600x600'}). Please share catalog and architectural pricing.`;
    window.open(`https://wa.me/917397623509?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white border border-black/10 rounded-[24px] overflow-hidden p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.2)] z-10 text-[#0B0B0B]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 text-neutral-800 flex items-center justify-center hover:bg-[#0B0B0B] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-[#C8102E] mb-4 animate-bounce" />
              <h3 className="text-2xl font-light text-[#0B0B0B] font-display mb-2">
                Enquiry Submitted!
              </h3>
              <p className="text-sm text-neutral-600 font-light max-w-sm mx-auto">
                Thank you. Our architectural tile specialist will contact you shortly with samples & pricing.
              </p>
            </div>
          ) : (
            <div>
              <span className="text-[10px] font-semibold tracking-[0.35em] text-[#C8102E] uppercase block mb-1">
                Direct Specification Enquiry
              </span>
              <h3
                className="text-2xl md:text-3xl font-light text-[#0B0B0B] font-display mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Inquire about {tile ? tile.name : 'Tiles'}
              </h3>
              {tile && (
                <p className="text-xs text-neutral-500 font-mono mb-6">
                  Format: {tile.size} • Finish: {tile.finish}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#0B0B0B] placeholder-neutral-400 focus:outline-none focus:border-[#C8102E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#0B0B0B] placeholder-neutral-400 focus:outline-none focus:border-[#C8102E]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#0B0B0B] placeholder-neutral-400 focus:outline-none focus:border-[#C8102E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                      City / Location *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Mumbai, Bangalore, etc."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#0B0B0B] placeholder-neutral-400 focus:outline-none focus:border-[#C8102E]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                      Estimated Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2.5 px-3 text-xs text-[#0B0B0B] focus:outline-none focus:border-[#C8102E]"
                    >
                      <option value="Under 500 sq.ft">Under 500 sq.ft</option>
                      <option value="500 - 1500 sq.ft">500 - 1500 sq.ft</option>
                      <option value="1500 - 3000 sq.ft">1500 - 3000 sq.ft</option>
                      <option value="Above 3000 sq.ft (Commercial)">Above 3000 sq.ft (Commercial)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2.5 px-3 text-xs text-[#0B0B0B] focus:outline-none focus:border-[#C8102E]"
                    >
                      <option value="Residential">Residential Villa / Apartment</option>
                      <option value="Commercial">Commercial Office / Hotel</option>
                      <option value="Architect">Architect / Interior Designer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5 block">
                    Additional Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific shade preferences or delivery timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl py-2 px-3 text-xs text-[#0B0B0B] placeholder-neutral-400 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0B0B0B] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#C8102E] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Formal Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3.5 px-5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-xs tracking-wider uppercase hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                  >
                    WhatsApp Instant
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
