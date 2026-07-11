import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Globe, Compass, Sparkles } from 'lucide-react';

/* ─── helpers ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-5" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {children}
    </span>
  );
}

function GoldRule({ className = '' }) {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent ${className}`} />
  );
}

/* ─── data ─── */
const SHOWROOMS = [
  {
    city: 'Chennai Atelier & Workshop',
    address: 'No. 3, Seemathamman Nagar, Maduravoyal, Chennai - 600095',
    phone: '+91 73976 23509',
    email: 'chennai@amaraliv.com',
    hours: 'Monday - Saturday: 10:00 AM - 8:00 PM',
    mapUrl: 'https://maps.google.com/?q=Maduravoyal,+Chennai',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    desc: 'Our primary design workshop and showroom. Here you can walk through physical installations, inspect uncut granite slabs, and consult with our master furniture artisans.',
  },
  {
    city: 'Madurai Experience Center',
    address: '88, Meltur Road, Near KK Nagar, Madurai - 625020',
    phone: '+91 73976 23509',
    email: 'madurai@amaraliv.com',
    hours: 'Monday - Saturday: 10:00 AM - 8:00 PM',
    mapUrl: 'https://maps.google.com/?q=KK+Nagar,+Madurai',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    desc: 'Showcasing our curated collections of premium granite and bespoke designer tiles. A dedicated consultation studio for architects and homeowners in Southern Tamil Nadu.',
  },
];

const CONTACTS_NATIONAL = [
  {
    office: 'Chennai Corporate Office',
    location: 'Maduravoyal, Chennai',
    role: 'Contracts, Builder Partnerships & Large Scale Shipments',
    phone: '+91 73976 23509',
    email: 'corporate@amaraliv.com',
  },
  {
    office: 'Mumbai Liaison Office',
    location: 'Bandra Kurla Complex, Mumbai',
    role: 'Western India Consultations & Architect Relationships',
    phone: '+91 98765 43210',
    email: 'mumbai@amaraliv.com',
  },
  {
    office: 'Coimbatore Foyer Studio',
    location: 'Race Course, Coimbatore',
    role: 'Central Tamil Nadu Sales & Material Selections',
    phone: '+91 87654 32109',
    email: 'coimbatore@amaraliv.com',
  },
];

const CONTACTS_INTERNATIONAL = [
  {
    office: 'Middle East Office',
    location: 'Downtown Dubai, UAE',
    role: 'GCC Region Logistics, Custom Sea Freight & Penthouse Projects',
    phone: '+971 4 123 4567',
    email: 'dubai@amaraliv.com',
  },
  {
    office: 'South-East Asia Liaison',
    location: 'Orchard Road, Singapore',
    role: 'SE Asia Private Residential Shipments & Import Consultations',
    phone: '+65 6789 0123',
    email: 'singapore@amaraliv.com',
  },
];

export default function WhereToBuyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0B0B0B] text-[#F8F6F2] min-h-screen">
      {/* Hero section */}
      <section className="relative py-28 md:py-36 bg-[#0B0B0B] text-center overflow-hidden border-b border-[#F8F6F2]/5">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Amara Living showroom background"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-[#0B0B0B]" />
        </div>

        <div className="wrap relative z-10 max-w-4xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Eyebrow>Where to Buy</Eyebrow>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Our Experience Centers &amp;<br />
              <span className="italic font-normal text-[#D4AF37]">Global Contacts</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-sm font-light leading-[1.8] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Experience the weight of natural stone, the texture of artisanal tile, and the joinery of handcrafted hardwoods. Visit our dedicated ateliers, or connect with our domestic and international liaison teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Showrooms Locations Section */}
      <section className="py-20 md:py-28 border-b border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal className="text-center mb-16">
            <Eyebrow>Physical Locations</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Visit Our <em className="text-[#D4AF37] not-italic">Ateliers</em>
            </h2>
            <GoldRule className="max-w-xs mx-auto mt-6" />
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            {SHOWROOMS.map((sr, index) => (
              <Reveal key={sr.city} delay={index * 0.1}>
                <div className="group border border-[#F8F6F2]/8 bg-[#111111] overflow-hidden rounded-sm hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={sr.image}
                      alt={sr.city}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0B0B0B]/40" />
                  </div>

                  <div className="p-8 md:p-10">
                    <h3 className="font-display text-2xl font-medium text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      {sr.city}
                    </h3>
                    <p className="text-sm font-light text-[#A0A0A0] leading-relaxed mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {sr.desc}
                    </p>

                    <div className="space-y-4 border-t border-[#F8F6F2]/5 pt-6 text-xs text-[#A0A0A0] font-body">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{sr.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{sr.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <a href={`mailto:${sr.email}`} className="hover:text-white transition-colors">{sr.email}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{sr.hours}</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href={sr.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        Get Directions
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global Contacts & Inquiries Section */}
      <section className="py-20 md:py-28 bg-[#111111]">
        <div className="wrap">
          <Reveal className="text-center mb-16">
            <Eyebrow>Direct Channels</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              National &amp; International <em className="text-[#D4AF37] not-italic">Contacts</em>
            </h2>
            <GoldRule className="max-w-xs mx-auto mt-6" />
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* National Contacts */}
            <Reveal>
              <div className="border border-[#F8F6F2]/8 bg-[#0B0B0B] p-8 md:p-10 rounded-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/35 bg-[#D4AF37]/5 text-[#D4AF37]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-white leading-none" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      National Offices
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] mt-2 font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Across India Project Support
                    </p>
                  </div>
                </div>

                <div className="space-y-8 divide-y divide-[#F8F6F2]/5">
                  {CONTACTS_NATIONAL.map((contact, idx) => (
                    <div key={contact.office} className={`pt-6 ${idx === 0 ? 'pt-0' : ''}`}>
                      <h4 className="font-display text-lg font-medium text-[#F8F6F2] mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {contact.office} <span className="text-xs text-[#D4AF37]/75 font-body font-light tracking-wide block sm:inline sm:ml-2">({contact.location})</span>
                      </h4>
                      <p className="text-xs text-[#A0A0A0] font-light leading-relaxed mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {contact.role}
                      </p>
                      <div className="grid gap-2 text-xs font-body text-[#A0A0A0] sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                          <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* International Contacts */}
            <Reveal delay={0.1}>
              <div className="border border-[#F8F6F2]/8 bg-[#0B0B0B] p-8 md:p-10 rounded-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/35 bg-[#D4AF37]/5 text-[#D4AF37]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-white leading-none" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                      International Liaisons
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] mt-2 font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Global Logistics &amp; Sourcing
                    </p>
                  </div>
                </div>

                <div className="space-y-8 divide-y divide-[#F8F6F2]/5">
                  {CONTACTS_INTERNATIONAL.map((contact, idx) => (
                    <div key={contact.office} className={`pt-6 ${idx === 0 ? 'pt-0' : ''}`}>
                      <h4 className="font-display text-lg font-medium text-[#F8F6F2] mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {contact.office} <span className="text-xs text-[#D4AF37]/75 font-body font-light tracking-wide block sm:inline sm:ml-2">({contact.location})</span>
                      </h4>
                      <p className="text-xs text-[#A0A0A0] font-light leading-relaxed mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {contact.role}
                      </p>
                      <div className="grid gap-2 text-xs font-body text-[#A0A0A0] sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                          <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-[#F8F6F2]/8 pt-6">
                  <div className="flex items-center gap-3 p-4 bg-[#F8F6F2]/[0.02] border border-[#F8F6F2]/5 rounded-sm">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <p className="text-xs font-light leading-relaxed text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      For customized shipping rates, sea freight logistics, or physical material swatch requests, connect with our export division at <a href="mailto:exports@amaraliv.com" className="text-white underline">exports@amaraliv.com</a>.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
