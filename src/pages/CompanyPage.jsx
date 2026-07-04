import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  Globe, 
  MapPin, 
  Compass, 
  Layers, 
  ArrowUpRight, 
  Users, 
  Leaf, 
  Milestone 
} from 'lucide-react';

const TRUST_CARDS = [
  {
    title: 'FSC Certified Hardwoods',
    subtitle: 'Sustainable Timber',
    desc: '100% of our solid wood is sourced from responsibly managed forests, ensuring ecological balance and species preservation.',
    icon: Leaf,
    metric: '100% Sourced'
  },
  {
    title: 'ISO 9001:2015 Standards',
    subtitle: 'Precision Execution',
    desc: 'Certified manufacturing systems covering precise stone detailing, wood seasoning, and structural steel integrations.',
    icon: ShieldCheck,
    metric: 'Certified QA'
  },
  {
    title: 'Design Excellence 2025',
    subtitle: 'National Recognition',
    desc: 'Awarded for spatial integration of natural granite slabs and bespoke furniture layouts at the annual Interior Design Forum.',
    icon: Award,
    metric: 'National Winner'
  },
  {
    title: 'Eco-Green Compliance',
    subtitle: 'Carbon Neutral Goals',
    desc: 'Committed to low-VOC finishes and minimizing water waste during stone polishing across all production facilities.',
    icon: Compass,
    metric: 'Low VOC'
  }
];

const DOMESTIC_PROJECTS = {
  Chennai: {
    projects: [
      { name: 'Nungambakkam Duplex Foyer', type: 'Exotic Granite & Console', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Adyar Riverfront Villa', type: 'Complete Bespoke Furniture Suite', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85' }
    ],
    desc: 'Our headquarters and primary crafting studio. Chennai hosts our master joiners and stone processing yard.'
  },
  Bangalore: {
    projects: [
      { name: 'Indiranagar Penthouse', type: 'Structured Workspace & Stone Desk', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Sadashivanagar Courtyard', type: 'Outdoor Flamed Granite Paving', img: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=85' }
    ],
    desc: 'Serving Bangalore\'s premium residential clusters with specialized stone installations and custom modular wardrobe designs.'
  },
  Mumbai: {
    projects: [
      { name: 'Alibaug Coast Mansion', type: 'Bespoke Oak Dining & Velvet Lounges', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Bandra Sea-facing Suite', type: 'Artisan Wall Mosaics & Panelling', img: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=1200&q=85' }
    ],
    desc: 'Bringing marine-grade finished wood components and premium marble vanity integrations to coastal Maharashtra.'
  },
  Coimbatore: {
    projects: [
      { name: 'Race Course Bungalow', type: 'Artisanal Zellige Kitchen Backsplash', img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85' }
    ],
    desc: 'Collaborating with textile entrepreneurs to weave local organic upholstery fabrics into our custom lounging options.'
  }
};

const GLOBAL_PROJECTS = [
  {
    region: 'Dubai & GCC',
    type: 'Bespoke Dining Tables & Accent Pedestals',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    standards: 'Certified for high-temperature maritime shipping, pest-treated woods, and compliance with high-end villa codes.'
  },
  {
    region: 'Singapore & SE Asia',
    type: 'Modular Teak Closet Components & Bathroom Vanities',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
    standards: 'Flat-packed architectural systems with quick-locking steel joints, optimized for high-density modern layouts.'
  },
  {
    region: 'Europe & UK',
    type: 'Curated Granite Slabs & Polished Quartzite',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    standards: 'Sourced and sized with structural certifications adhering to strict CE safety and structural weight regulations.'
  }
];

export default function CompanyPage() {
  const [activeCity, setActiveCity] = useState('Chennai');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#2A2A2A] min-h-screen pb-20">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=90"
            alt="Amara Living Studio Atmosphere"
            className="w-full h-full object-cover img-grade filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-dark" />
        </div>

        <div className="wrap relative z-10 text-center max-w-4xl pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow text-[#C9A96E] mb-5 block">Amara Living Legacy</span>
            <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white mb-8">
              Spaces of Permanence,<br />
              <span className="italic font-normal text-[#C9A96E]">Architectural Honesty</span>
            </h1>
            <p className="max-w-2xl mx-auto font-body text-base font-light leading-[1.8] text-white/70">
              For over a decade, we have designed, milled, and installed bespoke interiors, uniting hand-selected stone blocks with artisanal timber craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT US SECTION ── */}
      <section className="section-y-lg wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow block mb-3">Our Core Philosophy</span>
            <h2 className="font-display text-3xl md:text-4xl text-dark font-medium leading-tight">
              A Bridge Between Raw Earth and High Design
            </h2>
            <div className="line-gold w-20 my-6" />
            <p className="font-body text-sm font-light leading-relaxed text-ink/75 mb-6">
              Amara Living was established with a singular objective: to elevate standard residential spaces into experiences of profound material luxury. We do not build facades. We curate timber logs, natural quartzites, and structural metals that perform together in quiet stability.
            </p>
            <p className="font-body text-sm font-light leading-relaxed text-ink/75">
              From our Chennai workshop, we oversee every phase. Precision sawing, humidity-controlled wood kiln seasoning, and millimeter-level stone slab routing are performed entirely in-house. This complete custody ensures that our products endure generations.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 md:h-96">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85"
                alt="Finely crafted wood joints"
                className="w-full h-full object-cover img-grade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-body uppercase tracking-wider text-gold">Honest Joinery</span>
                <p className="text-sm font-light mt-1 font-body">Traditional mortise-and-tenon craftsmanship.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 justify-between">
              <div className="bg-[#F5F0E8] border border-gold/15 rounded-2xl p-8 flex flex-col justify-center h-full">
                <span className="font-display text-4xl font-bold text-dark mb-2">500+</span>
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-gold">Residential Commissions</span>
                <p className="font-body text-[11px] text-ink/60 mt-2 leading-relaxed">
                  Tailored villas, oceanfront apartments, and heritage estates executed across major metro areas.
                </p>
              </div>

              <div className="bg-dark text-white rounded-2xl p-8 flex flex-col justify-center h-full border border-white/5">
                <span className="font-display text-4xl font-bold text-[#C9A96E] mb-2">30+</span>
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-gold">Master Artisans &amp; Stonemasons</span>
                <p className="font-body text-[11px] text-white/50 mt-2 leading-relaxed">
                  Decades of combined knowledge in traditional hand-carving and automated marble routers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS & AWARDS SECTION ── */}
      <section className="bg-dark text-white py-16 md:py-24 my-10 border-y border-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_rgba(201,169,76,0.06)_0%,_transparent_50%)]" />
        
        <div className="wrap relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow text-[#C9A96E]">Quality Assured &amp; Verified</span>
            <h2 className="font-display text-3xl md:text-4xl text-white font-medium mt-3">
              Certifications &amp; Accreditation
            </h2>
            <p className="font-body text-xs font-light text-white/50 mt-4 leading-relaxed">
              Every detail is engineered to international standards. From timber sustainability to safety testing and design praise, we carry verification you can rely on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_CARDS.map((card, index) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1C120B] hover:bg-[#2A1F16] border border-white/5 hover:border-gold/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-5 transition-transform duration-300 group-hover:scale-105">
                      <IconComp size={20} />
                    </div>
                    <span className="font-body text-[10px] font-bold text-gold/75 uppercase tracking-wider block mb-1">
                      {card.subtitle}
                    </span>
                    <h3 className="font-display text-lg font-medium text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="font-body text-xs text-white/50 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-body text-gold uppercase tracking-wider">
                    <span>{card.metric}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOMESTIC PRESENCE SECTION ── */}
      <section className="section-y-lg wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="eyebrow">Architectural Network</span>
            <h2 className="font-display text-3xl md:text-4xl text-dark font-medium mt-3">
              Domestic Presence &amp; Showcase
            </h2>
          </div>

          {/* City selector */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-[#F5F0E8] border border-gold/15 p-1 rounded-full">
            {Object.keys(DOMESTIC_PROJECTS).map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-full font-body text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCity === city
                    ? 'bg-gold text-white shadow-sm font-semibold'
                    : 'text-ink/60 hover:text-dark hover:bg-stone/20'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Selected City projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCity}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            <div className="lg:col-span-4 bg-[#F5F0E8] border border-gold/15 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold mb-4">
                  <MapPin size={18} />
                  <span className="font-body text-xs font-bold uppercase tracking-widest">Active Region</span>
                </div>
                <h3 className="font-display text-2xl font-medium text-dark mb-4">{activeCity}</h3>
                <p className="font-body text-xs font-light text-ink/75 leading-relaxed">
                  {DOMESTIC_PROJECTS[activeCity].desc}
                </p>
              </div>

              <div className="border-t border-gold/20 pt-6 mt-8">
                <span className="text-[10px] font-body text-gold uppercase tracking-wider block mb-1">
                  National Logistic Standards
                </span>
                <span className="font-body text-xs font-light text-ink/60">
                  Fully supervised transport, customized padding crates, and on-site alignment supervisors.
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DOMESTIC_PROJECTS[activeCity].projects.map((proj) => (
                <div key={proj.name} className="group relative rounded-3xl overflow-hidden shadow-md flex flex-col justify-end bg-dark h-80 lg:h-full">
                  <img
                    src={proj.img}
                    alt={proj.name}
                    className="absolute inset-0 w-full h-full object-cover img-grade transition-transform duration-700 group-hover:scale-105 filter brightness-[0.55]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 p-6 text-white">
                    <span className="font-body text-[10px] font-bold text-gold uppercase tracking-widest">
                      {proj.type}
                    </span>
                    <h4 className="font-display text-lg font-medium mt-1 group-hover:text-gold transition-colors">
                      {proj.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── GLOBAL PRESENCE SECTION ── */}
      <section className="bg-[#F5F0E8]/40 py-16 md:py-24 border-t border-gold/10">
        <div className="wrap">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">International Operations</span>
            <h2 className="font-display text-3xl md:text-4xl text-dark font-medium mt-3">
              Global Presence &amp; Shipping
            </h2>
            <p className="font-body text-xs font-light text-ink/60 mt-3 leading-relaxed">
              Our designs cross borders. We regularly export heavy stone dining slabs, precision custom cabinetry, and artisanal tiles to private residences globally, adhering to international transit and material guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {GLOBAL_PROJECTS.map((gp, i) => (
              <motion.div
                key={gp.region}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-stone/40 overflow-hidden shadow-[0_4px_25px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-dark">
                  <img
                    src={gp.img}
                    alt={gp.region}
                    className="w-full h-full object-cover img-grade group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
                    <Globe size={16} className="text-gold" />
                    <span className="font-display text-lg font-medium">{gp.region}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-body text-[10px] font-bold text-gold uppercase tracking-wider block mb-2">
                      Primary Shipments
                    </span>
                    <p className="font-body text-xs font-semibold text-dark mb-4">
                      {gp.type}
                    </p>
                    <p className="font-body text-xs font-light text-ink/70 leading-relaxed">
                      {gp.standards}
                    </p>
                  </div>

                  <div className="border-t border-stone/20 pt-4 mt-6 flex items-center justify-between text-[9px] font-body text-ink/40 font-bold uppercase tracking-widest">
                    <span>Compliant Packaging</span>
                    <span>Sea &amp; Air Freight</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
