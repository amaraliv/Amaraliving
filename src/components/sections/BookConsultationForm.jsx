import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_LUXURY } from '../../constants/animations';

export default function BookConsultationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Chennai Experience Center');
  const [details, setDetails] = useState('');
  const [success, setSuccess] = useState(false);

  // Checkbox interest state
  const [interests, setInterests] = useState({
    stone: false,
    tiles: false,
    furniture: false,
    design: false,
  });

  const handleInterestChange = (key) => {
    setInterests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setLocation('Chennai Experience Center');
      setDetails('');
      setInterests({ stone: false, tiles: false, furniture: false, design: false });
    }, 3500);
  };

  return (
    <section id="book-consultation" className="section-y bg-cream text-dark relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 top-1/4 hidden h-48 w-48 rounded-full border border-gold/15 md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-12 bottom-1/4 hidden h-36 w-36 rounded-full border border-dark/5 md:block" aria-hidden="true" />

      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left info column */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-2">Schedule</p>
            <h2 className="heading-section mb-5">
              Book a Private<br /><span className="italic text-gold">Design Consultation</span>
            </h2>
            <p className="font-body text-sm leading-relaxed text-ink/75 max-w-md mb-6">
              Arrange an in-person walkthrough at our design studios, or setup a virtual advisory slot. Meet with our designers to curate custom dimensions, select stone blocks, and coordinate textures.
            </p>

            <div className="border-t border-dark/10 pt-6 space-y-4 font-body text-xs text-ink/60">
              <div>
                <span className="font-bold text-gold uppercase tracking-wider block mb-1">Chennai Atelier</span>
                <span>No. 3, Seemathamman Nagar, Maduravoyal, Chennai · 10 AM - 8 PM</span>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="relative border border-dark/15 bg-white p-6 shadow-editorial md:p-8 lg:p-10 rounded-sm">
              <div className="pointer-events-none absolute -right-3 -top-3 h-14 w-14 border border-gold/50" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 bg-gold/20" aria-hidden="true" />

              <div className="mb-6 border-b border-dark/10 pb-4">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.24em] text-ink/50">
                  Advisory Appointment Details
                </span>
              </div>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <span className="block text-5xl mb-4 text-gold">✓</span>
                    <h3 className="font-display text-xl text-dark mb-2">Appointment Requested</h3>
                    <p className="font-body text-sm text-ink/60 max-w-sm mx-auto">
                      Thank you. An Amara design specialist will reach out within 24 hours to confirm your preferred slot.
                    </p>
                  </motion.div>
                ) : (
                  <form key="booking-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="form-name" className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Full Name
                        </label>
                        <input
                          id="form-name"
                          type="text"
                          required
                          placeholder="Aravind Kumar"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-dark/[0.02] border border-dark/15 px-4 py-2.5 text-sm font-body text-dark rounded-sm outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="form-email" className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Email Address
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          required
                          placeholder="aravind@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-dark/[0.02] border border-dark/15 px-4 py-2.5 text-sm font-body text-dark rounded-sm outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="form-phone" className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Phone Number
                        </label>
                        <input
                          id="form-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-dark/[0.02] border border-dark/15 px-4 py-2.5 text-sm font-body text-dark rounded-sm outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="form-date" className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Preferred Date
                        </label>
                        <input
                          id="form-date"
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-dark/[0.02] border border-dark/15 px-4 py-2.5 text-sm font-body text-dark rounded-sm outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="form-loc" className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Consultation Mode / Location
                        </label>
                        <select
                          id="form-loc"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-white border border-dark/15 px-3 py-2.5 text-sm font-body text-dark rounded-sm outline-none focus:border-gold"
                        >
                          <option value="Chennai Experience Center">Chennai Experience Center (Maduravoyal)</option>
                        </select>
                      </div>
                      <div>
                        <span className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">
                          Areas of Interest
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[10.5px] font-body text-ink/75">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={interests.stone}
                              onChange={() => handleInterestChange('stone')}
                              className="accent-gold h-3.5 w-3.5"
                            />
                            Granite Surfaces
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={interests.tiles}
                              onChange={() => handleInterestChange('tiles')}
                              className="accent-gold h-3.5 w-3.5"
                            />
                            Tiles &amp; Walls
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={interests.furniture}
                              onChange={() => handleInterestChange('furniture')}
                              className="accent-gold h-3.5 w-3.5"
                            />
                            Furniture
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={interests.design}
                              onChange={() => handleInterestChange('design')}
                              className="accent-gold h-3.5 w-3.5"
                            />
                            Full Interiors
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-details" className="block font-body text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                        Project Brief / Details
                      </label>
                      <textarea
                        id="form-details"
                        rows="3"
                        placeholder="Please tell us a bit about your property, dimensions, or design needs..."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full bg-dark/[0.02] border border-dark/15 px-4 py-2.5 text-sm font-body text-dark rounded-sm outline-none focus:border-gold resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-center py-4 bg-gold text-dark hover:bg-dark hover:text-cream font-body text-[10px] font-bold uppercase tracking-[0.24em] rounded-sm transition-all duration-300 shadow-md mt-6"
                    >
                      Book Appointment Slot
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
