import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  const [activeTab, setActiveTab] = useState('philosophy');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 130; // offset for sticky bar and top navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const sections = ['philosophy', 'credentials', 'domestic', 'global'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveTab(id);
          }
        });
      }, {
        rootMargin: '-30% 0px -60% 0px'
      });
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(o => {
        if (o) o.observer.unobserve(o.el);
      });
    };
  }, []);

  return (
    <div className="bg-[#FAF6F0] text-[#0B0B0B] min-h-screen pb-24" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* ── HERO BANNER ── */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#0B0B0B]">
        <div className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90"
            alt="Amara Living Headquarters"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-[#0B0B0B]" />
        </div>

        <div className="wrap relative z-10 w-full text-center">
          <Reveal>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37] mb-5">Crafting Legacies</span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-[#FAF6F0] mb-8" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Our Identity &amp;<br />
              <span className="italic font-normal text-[#D4AF37]">Structure</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm font-light leading-[1.9] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Amara Living bridges architectural intent and material honesty. From locally selected quarries to our integrated Chennai workshop, our work is defined by precision and permanence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── STICKY TAB BAR ── */}
      <div className="sticky top-[70px] z-30 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="wrap max-w-4xl flex items-center justify-between overflow-x-auto scrollbar-hide py-1">
          <div className="flex w-full justify-around min-w-[500px]">
            {[
              { id: 'philosophy', label: 'Philosophy' },
              { id: 'credentials', label: 'Credentials & Awards' },
              { id: 'domestic', label: 'Domestic Presence' },
              { id: 'global', label: 'Global Sourcing' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-4 py-4 font-body text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#0B0B0B]/60 hover:text-[#D4AF37]'
                  }`}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCompanyTabLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE SECTIONS ── */}
      <main className="wrap max-w-6xl mt-20 md:mt-28 space-y-32">

        {/* 1. PHILOSOPHY SECTION */}
        <section id="philosophy" className="scroll-mt-36 space-y-16">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <Reveal>
                <Eyebrow>The Philosophy</Eyebrow>
                <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Bespoke Interiors Built For <span className="italic text-[#D4AF37]">Permanence</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-sm font-light leading-[1.8] text-[#555555]">
                  Since 2010, Amara Living has operated with a singular focus: aligning raw natural materials with structural integrity. We believe that true luxury lies in the durability of joinery, the precise grain matching of stone slabs, and layouts tailored to organic living routines.
                </p>
                <p className="font-body text-sm font-light leading-[1.8] text-[#555555] mt-4">
                  Our custom fabrication suite handles processing under one roof. Each slab of black granite or plank of walnut timber undergoes extensive kiln drying, surface sealing, and dry-matching before reaching installation. This keeps the execution flawless and the quality pristine.
                </p>
              </Reveal>

              {/* Stats */}
              <Reveal delay={0.15}>
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#D4AF37]/15 mt-6">
                  <div>
                    <p className="font-display text-2xl md:text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>2010</p>
                    <p className="font-body text-[9px] uppercase tracking-wider text-[#A0A0A0] mt-1">Established</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl md:text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>1,200+</p>
                    <p className="font-body text-[9px] uppercase tracking-wider text-[#A0A0A0] mt-1">Projects Delivered</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl md:text-3xl font-semibold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>40+</p>
                    <p className="font-body text-[9px] uppercase tracking-wider text-[#A0A0A0] mt-1">Master Artisans</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Studio Image Card */}
            <div className="md:col-span-5 hidden md:block">
              <Reveal delay={0.2}>
                <div className="rounded-md overflow-hidden aspect-[4/5] border border-[#D4AF37]/20 relative">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                    alt="Creative drafting studio layout"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Values Grid */}
          <Reveal>
            <div className="bg-[#FAF6F0] border border-[#D4AF37]/15 p-8 md:p-12 shadow-sm rounded-sm">
              <div className="text-center max-w-xl mx-auto mb-12">
                <Eyebrow>Our Foundations</Eyebrow>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  What Directs Our Output
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {VALUES.map((val) => {
                  const IconComponent = val.icon;
                  return (
                    <div key={val.title} className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-display text-lg font-semibold text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{val.title}</h4>
                      <p className="font-body text-xs font-light leading-relaxed text-[#555555]">{val.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Brand Timeline */}
          <div className="space-y-12 pt-8">
            <Reveal>
              <div className="text-center max-w-xl mx-auto">
                <Eyebrow>The Journey</Eyebrow>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Chronology of Craft
                </h3>
              </div>
            </Reveal>

            <div className="relative border-l border-[#D4AF37]/30 pl-6 md:pl-10 max-w-3xl mx-auto space-y-12">
              {TIMELINE.map((item, idx) => (
                <div key={item.year} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#D4AF37] bg-[#FAF6F0] group-hover:bg-[#D4AF37] transition-colors duration-300" />
                  
                  <Reveal delay={idx * 0.05}>
                    <div className="space-y-1">
                      <span className="font-display text-lg font-bold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.year}</span>
                      <h4 className="font-display text-base font-semibold text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.title}</h4>
                      <p className="font-body text-xs font-light leading-relaxed text-[#555555]">{item.desc}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. CREDENTIALS SECTION */}
        <section id="credentials" className="scroll-mt-36 space-y-16 pt-8 border-t border-[#D4AF37]/15">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal>
              <Eyebrow>Validated Quality</Eyebrow>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Our Industry Standards <span className="italic text-[#D4AF37]">&amp; Credentials</span>
              </h2>
              <p className="font-body text-sm font-light leading-relaxed text-[#555555] mt-4">
                We maintain regular external audits and support sustainable forest harvesting networks to ensure our bespoke outputs meet premium architectural specifications.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 pt-4">
            {CERTIFICATIONS.map((cert, idx) => {
              const IconComponent = cert.icon;
              return (
                <Reveal key={cert.title} delay={idx * 0.08}>
                  <div className="bg-[#FAF6F0] border border-[#D4AF37]/20 rounded-md p-6 md:p-8 hover:border-[#D4AF37] transition-all duration-300 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.08)] flex flex-col md:flex-row gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-semibold text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{cert.title}</h3>
                      <p className="font-body text-[9px] font-bold tracking-widest text-[#D4AF37] uppercase">{cert.subtitle}</p>
                      <p className="font-body text-xs font-light leading-relaxed text-[#555555] pt-1">{cert.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Technical Data Banner */}
          <Reveal>
            <div className="bg-[#0B0B0B] text-white rounded-sm p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-display text-xl font-medium" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Have specific tender requirements?</h3>
                <p className="font-body text-xs text-[#A0A0A0] font-light max-w-xl">
                  We offer detailed technical sheets, quarry certification records, and forest-to-project custody certificates upon professional request.
                </p>
              </div>
              <a href="#/consultation" className="group relative inline-flex items-center gap-3 overflow-hidden px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] border border-[#D4AF37] text-[#D4AF37] hover:text-[#0B0B0B] transition-all duration-500">
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="relative z-10 flex items-center gap-2">Request Data Sheet <ArrowUpRight className="w-3.5 h-3.5" /></span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* 3. DOMESTIC PRESENCE SECTION */}
        <section id="domestic" className="scroll-mt-36 space-y-16 pt-8 border-t border-[#D4AF37]/15">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Reveal>
                <Eyebrow>National Operations</Eyebrow>
                <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  Serving Prominent Locations Across <span className="italic text-[#D4AF37]">India</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-sm font-light leading-relaxed text-[#555555]">
                  Amara Living operates its primary design studio, showroom, and stone processing site in **Chennai, Tamil Nadu**. Our delivery systems and expert deployment crew coordinate projects on site across South India and Maharashtra.
                </p>
              </Reveal>

              {/* Office Details */}
              <Reveal delay={0.15}>
                <div className="space-y-6 pt-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>HQ Studio &amp; Fabrication</h4>
                      <p className="font-body text-xs text-[#777777] mt-1">Maduravoyal, Chennai, Tamil Nadu - 600095</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Service Corridors</h4>
                      <p className="font-body text-xs text-[#777777] mt-1">Chennai, Coimbatore, Madurai, Bengaluru, Hyderabad, Alibaug, and Mumbai.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Showcase Image Card */}
            <div className="h-[250px] md:h-[380px] rounded-lg overflow-hidden border border-[#D4AF37]/15 relative">
              <Reveal delay={0.2} className="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern lounge layout in Chennai duplex"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <span className="block text-[8px] font-bold tracking-widest uppercase text-[#D4AF37] mb-1">Featured Showcase</span>
                  <p className="font-display text-base font-medium" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Living Room, Coimbatore</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Domestic Gallery Grid */}
          <div className="space-y-8 pt-6">
            <Reveal>
              <h3 className="font-display text-xl font-semibold text-[#0B0B0B] border-b border-[#D4AF37]/15 pb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Selected Regional Installations</h3>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {DOMESTIC_PROJECTS.map((proj, idx) => (
                <Reveal key={proj.name} delay={idx * 0.08}>
                  <div className="group flex flex-col gap-4 bg-[#FAF6F0] border border-[#D4AF37]/15 p-5 hover:border-[#D4AF37] transition-all duration-300">
                    <div className="h-[200px] md:h-[240px] overflow-hidden rounded-sm relative bg-[#F0EDE8]">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-[1200ms]"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-base font-semibold text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{proj.name}</h4>
                        <span className="font-body text-[9px] font-bold text-[#D4AF37] tracking-wider uppercase">{proj.location}</span>
                      </div>
                      <p className="font-body text-xs font-semibold text-[#D4AF37]">{proj.type}</p>
                      <p className="font-body text-xs font-light leading-relaxed text-[#555555] pt-2">{proj.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. GLOBAL NETWORK SECTION */}
        <section id="global" className="scroll-mt-36 space-y-16 pt-8 border-t border-[#D4AF37]/15">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal>
              <Eyebrow>Global Scale</Eyebrow>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Sourcing Worldwide &amp; Delivering <span className="italic text-[#D4AF37]">Abroad</span>
              </h2>
              <p className="font-body text-sm font-light leading-relaxed text-[#555555] mt-4">
                Premium stones, timbers, and fabrics require international access. We maintain active partnerships with stone workshops and woodland reserves globally to import fine raw resources while exporting custom furnishings for selective clients.
              </p>
            </Reveal>
          </div>

          {/* Global Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pt-4">
            {GLOBAL_SOCIETIES.map((item, idx) => (
              <Reveal key={item.region} delay={idx * 0.08}>
                <div className="group bg-[#FAF6F0] border border-[#D4AF37]/15 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300">
                  <div className="h-[160px] overflow-hidden bg-[#F0EDE8]">
                    <img
                      src={item.image}
                      alt={item.region}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                  </div>
                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-semibold text-[#D4AF37] flex items-center justify-between" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {item.region}
                        <ArrowUpRight className="w-4 h-4 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors" />
                      </h3>
                      <p className="font-body text-[9px] font-bold uppercase tracking-widest text-[#A0A0A0]">{item.type}</p>
                      <p className="font-body text-xs font-light leading-relaxed text-[#555555] pt-2">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Metrics Board */}
          <Reveal>
            <div className="bg-[#FAF6F0] border border-[#D4AF37]/20 p-8 md:p-12 shadow-sm rounded-sm">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-[#0B0B0B]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>International Consultation Network</h3>
                  <p className="font-body text-xs font-light leading-relaxed text-[#555555]">
                    We consult on international private projects from our primary design studio in India. Sourcing, detailing, matching, and layout planning are executed digitally with extreme precision, followed by custom sea freight packing of timber and stone elements.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-[#D4AF37]/15 p-5 rounded-sm">
                    <span className="font-display text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>4 Countries</span>
                    <p className="font-body text-[8px] uppercase tracking-wider text-[#A0A0A0] mt-1.5">Direct Procurement</p>
                  </div>
                  <div className="bg-white border border-[#D4AF37]/15 p-5 rounded-sm">
                    <span className="font-display text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>100% Crated</span>
                    <p className="font-body text-[8px] uppercase tracking-wider text-[#A0A0A0] mt-1.5">Export Freight Ready</p>
                  </div>
                  <div className="bg-white border border-[#D4AF37]/15 p-5 rounded-sm">
                    <span className="font-display text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>24/7 Digital</span>
                    <p className="font-body text-[8px] uppercase tracking-wider text-[#A0A0A0] mt-1.5">Design Collaboration</p>
                  </div>
                  <div className="bg-[#FAF6F0] border border-[#D4AF37]/15 p-5 rounded-sm">
                    <span className="font-display text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Italian</span>
                    <p className="font-body text-[8px] uppercase tracking-wider text-[#A0A0A0] mt-1.5">Class-A Carrara Marble</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
    </div>
  );
}
