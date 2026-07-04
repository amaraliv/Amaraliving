import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  TreePine, 
  Recycle, 
  MapPin, 
  Globe, 
  Compass, 
  ArrowUpRight,
  Sparkles,
  Users,
  Briefcase
} from 'lucide-react';

const TABS = [
  { id: 'about', label: 'About Us' },
  { id: 'certs', label: 'Certifications & Awards' },
  { id: 'domestic', label: 'Domestic Presence' },
  { id: 'global', label: 'Global Presence' }
];

const TIMELINE = [
  { year: '2010', title: 'Studio Founded', desc: 'Established our primary design workshop in Chennai, Tamil Nadu, focused on local stone craftsmanship.' },
  { year: '2014', title: 'Artisan Assembly', desc: 'Partnered with elite traditional woodworkers to blend hand-milled timber joinery with stone work.' },
  { year: '2018', title: 'Material Imports', desc: 'Launched direct procurement channels for Italian marble and exotic Brazilian quartzites.' },
  { year: '2022', title: 'Bespoke Collections', desc: 'Unveiled our signature furniture line, creating complete scale solutions for living and dining spaces.' },
  { year: '2026', title: 'Architectural Scale', desc: 'Expanding design consultation services globally while maintaining our core commitment to sustainable materials.' }
];

const VALUES = [
  { icon: Sparkles, title: 'Material Honesty', desc: 'We let the raw beauty of natural timbers and stones speak for themselves, using non-toxic finishes.' },
  { icon: Users, title: 'Artisanal Heritage', desc: 'Every piece is detailed and hand-finished by master craftsmen who preserve traditional techniques.' },
  { icon: Briefcase, title: 'Tailored Scale', desc: 'Our design consultations scale precisely to the architectural intent and physical volume of each space.' }
];

const CERTIFICATIONS = [
  {
    icon: TreePine,
    title: 'FSC Certified Hardwoods',
    subtitle: 'Forest Stewardship Council',
    desc: 'All solid timber products are sourced from responsibly managed forests, ensuring environmental sustainability and biodiversity protection.'
  },
  {
    icon: ShieldCheck,
    title: 'ISO 9001:2015 Certification',
    subtitle: 'Quality Management System',
    desc: 'Our fabrication workshop and on-site masonry installation protocols adhere strictly to international quality standard procedures.'
  },
  {
    icon: Award,
    title: 'Artisanal Excellence Award',
    subtitle: 'South Indian Design Guild 2024',
    desc: 'Awarded in recognition of our commitment to maintaining traditional joinery skills and promoting local craft careers.'
  },
  {
    icon: Recycle,
    title: 'Zero-Waste Stone Cutting',
    subtitle: 'IGBC Green Material Standard',
    desc: 'We reuse granite and marble waste slurry for mosaic composites and architectural accents, minimizing our landfill footprint.'
  }
];

const DOMESTIC_PROJECTS = [
  {
    name: 'Alibaug Coast Villa',
    location: 'Coastal Maharashtra',
    type: 'Bespoke Solid Oak Dining & Seating',
    desc: 'A collection of tailored dining tables and consoles designed to merge with a beachfront concrete setting.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Chennai Duplex Foyer',
    location: 'Nungambakkam',
    type: 'Absolute Black Granite Console',
    desc: 'A brass-inlaid granite console table that anchors the foyer and acts as a bold entryway statement.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Coimbatore Living Suite',
    location: 'Coimbatore Foyer',
    type: 'Modular Velvet Lounge Setting',
    desc: 'Deep olive velvet seating clusters scaling smoothly into a granite-framed fireplace library.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'
  },
  {
    name: 'Mumbai Corporate Office',
    location: 'Bandra Kurla Complex',
    type: 'Executive Boardroom Surfaces',
    desc: 'Integrated polished granite tables and conference paneling matching clean minimalist steel structure lines.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85'
  }
];

const GLOBAL_SOCIETIES = [
  {
    region: 'Italy & Europe',
    type: 'Exotic Material Sourcing',
    desc: 'Sourcing select blocks of Calacatta marble from Carrara quarries and walnut panels from managed European woodlands.',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=85'
  },
  {
    region: 'Dubai, UAE',
    type: 'Bespoke Penthouse Furnishing',
    desc: 'Tailored dining layouts and statement granite walls delivered directly to a luxury penthouse suite in Downtown Dubai.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85'
  },
  {
    region: 'Singapore',
    type: 'Private Residential Installation',
    desc: 'Custom-fitted closets and teak furniture pieces designed to weather tropical humidity with elegance.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  }
];

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="bg-[#FAF8F5] text-[#2A2A2A] min-h-screen pb-16">
      {/* ── HERO BANNER ── */}
      <section className="relative py-24 md:py-28 bg-dark text-white text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90"
            alt="Amara Living Headquarters"
            className="w-full h-full object-cover img-grade filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/45 to-dark" />
        </div>
        
        <div className="wrap relative z-10 max-w-4xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow text-[#C9A96E] mb-4 block">Crafting Legacies</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">
              Our Identity &amp;<br />
              <span className="italic font-normal text-[#C9A96E]">Structure</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-sm font-light leading-[1.8] text-white/70">
              Amara Living bridges architectural intent and material honesty. From locally selected quarries to our integrated Chennai workshop, our work is defined by precision and permanence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECONDARY TAB BAR ── */}
      <div className="sticky top-[70px] z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-gold/15 shadow-sm">
        <div className="wrap max-w-4xl flex items-center justify-between overflow-x-auto scrollbar-hide py-1">
          <div className="flex w-full justify-around min-w-[500px]">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative ${
                    isActive ? 'text-[#B8941F]' : 'text-[#2A2A2A]/60 hover:text-[#B8941F]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCompanyTabLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8941F]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DYNAMIC CONTENT CONTAINER ── */}
      <main className="wrap max-w-6xl mt-12 md:mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
          >
            {/* ──── ABOUT US SUB-PAGE ──── */}
            {activeTab === 'about' && (
              <div className="space-y-16">
                {/* Brand Story Layout */}
                <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="md:col-span-7 space-y-6">
                    <span className="eyebrow text-[#B8941F]">The Philosophy</span>
                    <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-dark">
                      Bespoke Interiors Built For <span className="italic text-[#B8941F]">Permanence</span>
                    </h2>
                    <p className="font-body text-sm font-light leading-[1.8] text-[#2A2A2A]/85">
                      Since 2010, Amara Living has operated with a singular focus: aligning raw natural materials with structural integrity. We believe that true luxury lies in the durability of joinery, the precise grain matching of stone slabs, and layouts tailored to organic living routines.
                    </p>
                    <p className="font-body text-sm font-light leading-[1.8] text-[#2A2A2A]/85">
                      Our custom fabrication suite handles processing under one roof. Each slab of black granite or plank of walnut timber undergoes extensive kiln drying, surface sealing, and dry-matching before reaching installation. This keeps the execution flawless and the quality pristine.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold/15">
                      <div>
                        <p className="font-display text-2xl md:text-3xl font-semibold text-[#B8941F]">2010</p>
                        <p className="font-body text-[10px] uppercase tracking-wider text-dark/60 mt-1">Established</p>
                      </div>
                      <div>
                        <p className="font-display text-2xl md:text-3xl font-semibold text-[#B8941F]">1,200+</p>
                        <p className="font-body text-[10px] uppercase tracking-wider text-dark/60 mt-1">Projects Delivered</p>
                      </div>
                      <div>
                        <p className="font-display text-2xl md:text-3xl font-semibold text-[#B8941F]">40+</p>
                        <p className="font-body text-[10px] uppercase tracking-wider text-dark/60 mt-1">Master Artisans</p>
                      </div>
                    </div>
                  </div>

                  {/* 3D Depth Card Image */}
                  <div className="md:col-span-5 depth-scene hidden md:block">
                    <div className="depth-card rounded-md overflow-hidden aspect-[4/5] border border-gold/20">
                      <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                        alt="Creative drafting studio layout"
                        className="w-full h-full object-cover depth-media img-grade"
                      />
                    </div>
                  </div>
                </div>

                {/* Values Checklist */}
                <div className="bg-[#F5F0E8] border border-gold/15 rounded-sm p-8 md:p-10">
                  <div className="text-center max-w-xl mx-auto mb-10">
                    <span className="eyebrow text-[#B8941F] mb-2 block">Our Foundations</span>
                    <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-dark">
                      What Directs Our Output
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {VALUES.map((val) => {
                      const IconComponent = val.icon;
                      return (
                        <div key={val.title} className="space-y-3">
                          <div className="w-10 h-10 rounded-full bg-[#B8941F]/15 flex items-center justify-center text-[#B8941F]">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h4 className="font-display text-lg font-semibold text-dark">{val.title}</h4>
                          <p className="font-body text-xs font-light leading-relaxed text-dark/85">{val.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Brand Timeline */}
                <div className="space-y-8 pt-4">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="eyebrow text-[#B8941F] mb-2 block">The Journey</span>
                    <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-dark">
                      Chronology of Craft
                    </h3>
                  </div>

                  <div className="relative border-l border-gold/30 pl-6 md:pl-10 max-w-3xl mx-auto space-y-10">
                    {TIMELINE.map((item) => (
                      <div key={item.year} className="relative group">
                        {/* Timeline Node dot */}
                        <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#B8941F] bg-[#FAF8F5] group-hover:bg-[#B8941F] transition-colors duration-300" />
                        
                        <div className="space-y-1">
                          <span className="font-display text-lg font-bold text-[#B8941F]">{item.year}</span>
                          <h4 className="font-display text-base font-semibold text-dark">{item.title}</h4>
                          <p className="font-body text-xs font-light leading-relaxed text-[#2A2A2A]/75">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ──── CERTIFICATIONS SUB-PAGE ──── */}
            {activeTab === 'certs' && (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="eyebrow text-[#B8941F] mb-3 block">Validated Quality</span>
                  <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-dark">
                    Our Industry Standards <span className="italic text-[#B8941F]">&amp; Credentials</span>
                  </h2>
                  <p className="font-body text-sm font-light leading-relaxed text-[#2A2A2A]/70 mt-3">
                    We maintain regular external audits and support sustainable forest harvesting networks to ensure our bespoke outputs meet premium architectural specifications.
                  </p>
                </div>

                {/* Grid of 3D Cards */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 pt-4">
                  {CERTIFICATIONS.map((cert) => {
                    const IconComponent = cert.icon;
                    return (
                      <div 
                        key={cert.title} 
                        className="bg-[#FAF8F5] border border-gold/25 rounded-md p-6 md:p-8 hover:border-[#B8941F] transition-all duration-300 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(184,148,31,0.12)] flex flex-col md:flex-row gap-5"
                      >
                        <div className="w-12 h-12 shrink-0 rounded-lg bg-[#B8941F]/10 flex items-center justify-center text-[#B8941F]">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-display text-lg font-semibold text-dark">{cert.title}</h3>
                          <p className="font-body text-[10px] font-bold tracking-widest text-[#B8941F] uppercase">{cert.subtitle}</p>
                          <p className="font-body text-xs font-light leading-relaxed text-[#2A2A2A]/75 pt-1">{cert.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional trust banner */}
                <div className="bg-dark text-white rounded-sm p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="font-display text-xl font-medium">Have specific tender requirements?</h3>
                    <p className="font-body text-xs text-white/60 font-light max-w-xl">
                      We offer detailed technical sheets, quarry certification records, and forest-to-project custody certificates upon professional request.
                    </p>
                  </div>
                  <a href="#/consultation" className="btn-gold shrink-0 border-[#C9A96E] text-[#C9A96E] hover:text-white hover:bg-[#C9A96E]">
                    <span>Request Data Sheet</span>
                  </a>
                </div>
              </div>
            )}

            {/* ──── DOMESTIC PRESENCE SUB-PAGE ──── */}
            {activeTab === 'domestic' && (
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="eyebrow text-[#B8941F]">National Operations</span>
                    <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-dark">
                      Serving Prominent Locations Across <span className="italic text-[#B8941F]">India</span>
                    </h2>
                    <p className="font-body text-sm font-light leading-relaxed text-[#2A2A2A]/80">
                      Amara Living operates its primary design studio, showroom, and stone processing site in **Chennai, Tamil Nadu**. Our delivery systems and expert deployment crew coordinate projects on site across South India and Maharashtra.
                    </p>
                    
                    {/* Office List */}
                    <div className="space-y-4 pt-4">
                      <div className="flex gap-4 items-start">
                        <MapPin className="w-5 h-5 text-[#B8941F] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display text-base font-semibold text-dark">HQ Studio &amp; Fabrication</h4>
                          <p className="font-body text-xs text-[#2A2A2A]/70 mt-1">Maduravoyal, Chennai, Tamil Nadu - 600095</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <MapPin className="w-5 h-5 text-[#B8941F] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-display text-base font-semibold text-dark">Service Corridors</h4>
                          <p className="font-body text-xs text-[#2A2A2A]/70 mt-1">Chennai, Coimbatore, Madurai, Bengaluru, Hyderabad, Alibaug, and Mumbai.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[250px] md:h-[350px] rounded-lg overflow-hidden border border-gold/15 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
                      alt="Modern lounge layout in Chennai duplex"
                      className="w-full h-full object-cover img-grade"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="font-body text-[9px] font-bold tracking-widest uppercase text-gold">Featured Showcase</span>
                      <p className="font-display text-base font-semibold">Living Room, Coimbatore</p>
                    </div>
                  </div>
                </div>

                {/* Domestic Gallery Grid */}
                <div className="space-y-6 pt-6">
                  <h3 className="font-display text-xl font-semibold text-dark border-b border-gold/15 pb-3">Selected Regional Installations</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {DOMESTIC_PROJECTS.map((proj) => (
                      <div key={proj.name} className="group flex flex-col gap-4 bg-white border border-gold/10 p-5 rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="h-[200px] md:h-[240px] overflow-hidden rounded-sm relative">
                          <img 
                            src={proj.image}
                            alt={proj.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 img-grade"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-display text-base font-semibold text-dark">{proj.name}</h4>
                            <span className="font-body text-[10px] font-bold text-[#B8941F] tracking-wide uppercase">{proj.location}</span>
                          </div>
                          <p className="font-body text-xs font-semibold text-[#B8941F]">{proj.type}</p>
                          <p className="font-body text-xs font-light leading-relaxed text-[#2A2A2A]/70 pt-1">{proj.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ──── GLOBAL PRESENCE SUB-PAGE ──── */}
            {activeTab === 'global' && (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="eyebrow text-[#B8941F] mb-3 block">Global Scale</span>
                  <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-dark">
                    Sourcing Worldwide &amp; Delivering <span className="italic text-[#B8941F]">Abroad</span>
                  </h2>
                  <p className="font-body text-sm font-light leading-relaxed text-[#2A2A2A]/70 mt-3">
                    Premium stones, timbers, and fabrics require international access. We maintain active partnerships with stone workshops and woodland reserves globally to import fine raw resources while exporting custom furnishings for selective clients.
                  </p>
                </div>

                {/* Sourcing/Export Split cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pt-4">
                  {GLOBAL_SOCIETIES.map((item) => (
                    <div 
                      key={item.region} 
                      className="group bg-white border border-gold/15 rounded-md overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="h-[150px] overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.region} 
                          className="w-full h-full object-cover img-grade group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-display text-lg font-semibold text-[#B8941F] flex items-center justify-between">
                            {item.region}
                            <ArrowUpRight className="w-4 h-4 text-[#B8941F]/60 group-hover:text-[#B8941F] transition-colors" />
                          </h3>
                          <p className="font-body text-[10px] font-bold uppercase tracking-widest text-dark/50">{item.type}</p>
                          <p className="font-body text-xs font-light leading-relaxed text-[#2A2A2A]/75 pt-1">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Global Metrics Board */}
                <div className="bg-[#F5F0E8] border border-gold/20 rounded-md p-8 md:p-10">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-[#B8941F]/10 flex items-center justify-center text-[#B8941F]">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-2xl font-medium tracking-tight text-dark">International Consultation Network</h3>
                      <p className="font-body text-xs font-light leading-relaxed text-[#2A2A2A]/80">
                        We consult on international private projects from our primary design studio in India. Sourcing, detailing, matching, and layout planning are executed digitally with extreme precision, followed by custom sea freight packing of timber and stone elements.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gold/15 p-4 rounded-sm">
                        <span className="font-display text-xl font-bold text-[#B8941F]">4 Countries</span>
                        <p className="font-body text-[9px] uppercase tracking-wider text-dark/60 mt-1">Direct Procurement</p>
                      </div>
                      <div className="bg-white border border-gold/15 p-4 rounded-sm">
                        <span className="font-display text-xl font-bold text-[#B8941F]">100% Crated</span>
                        <p className="font-body text-[9px] uppercase tracking-wider text-dark/60 mt-1">Export Freight Ready</p>
                      </div>
                      <div className="bg-white border border-gold/15 p-4 rounded-sm">
                        <span className="font-display text-xl font-bold text-[#B8941F]">24/7 Digital</span>
                        <p className="font-body text-[9px] uppercase tracking-wider text-dark/60 mt-1">Design Collaboration</p>
                      </div>
                      <div className="bg-white border border-gold/15 p-4 rounded-sm">
                        <span className="font-display text-xl font-bold text-[#B8941F]">Italian</span>
                        <p className="font-body text-[9px] uppercase tracking-wider text-dark/60 mt-1">Class-A Carrara Marble</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
