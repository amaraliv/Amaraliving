import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Clock, ChevronRight } from 'lucide-react';

/* ─── helpers ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  );
}
function Eyebrow({ children, light = false }) {
  return <span className={`block text-[10px] font-semibold uppercase tracking-[0.42em] mb-4 ${light ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{children}</span>;
}
function GoldRule({ className = '' }) {
  return <div className={`h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent ${className}`} />;
}
function GoldBtn({ children, href = '#/consultation' }) {
  return (
    <a href={href} className="group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] border border-[#D4AF37] text-[#D4AF37] hover:text-[#0B0B0B] transition-all duration-700" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
      <span className="relative z-10 flex items-center gap-3">{children}<ArrowUpRight className="w-3.5 h-3.5" /></span>
    </a>
  );
}

/* ─── data ─── */
const FEATURED_ARTICLE = {
  category: 'Material Intelligence',
  readTime: '8 min read',
  title: 'Choosing Materials That Age Gracefully',
  subtitle: 'A truly luxurious interior is never defined by a single statement piece — it is the quiet result of considered materials working together over time.',
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90',
  content: [
    'Natural stone, solid timber, and hand-finished textiles each carry their own character, and that character only deepens with age when the underlying craftsmanship is sound. At Amara Living, every material we recommend is chosen first for how it will wear a decade from now — not just how it photographs on day one.',
    'Granite surfaces are selected for veining that holds its depth under daily use. Furniture frames are built to be re-upholstered rather than replaced, and finishes are sealed to resist the everyday realities of a lived-in home. The result is a space that feels complete on move-in day, yet continues to feel considered years later.',
    'Luxury, in the truest sense, is not measured in trend — it is measured in permanence. The homes that endure are those where every decision was made with time in mind.',
  ],
};

const ARTICLES = [
  {
    id: 1,
    category: 'Stone Selection',
    readTime: '6 min read',
    title: 'The Art of Granite Selection',
    excerpt: 'How our specialists read geological movement, crystal density, and quarry provenance to find slabs that will anchor a room for generations.',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=90',
    date: 'June 2025',
  },
  {
    id: 2,
    category: 'Living with Stone',
    readTime: '5 min read',
    title: 'The Quiet Life of Natural Stone',
    excerpt: "Stone doesn't compete. It holds space. Here is how to let your stone surfaces breathe and become the silent foundation of a considered home.",
    image: 'https://images.unsplash.com/photo-1567226840607-8999f0550901?auto=format&fit=crop&w=900&q=90',
    date: 'May 2025',
  },
  {
    id: 3,
    category: 'Furniture Design',
    readTime: '7 min read',
    title: 'Furniture That Lasts Generations',
    excerpt: 'The difference between furniture that is discarded after five years and furniture that is handed down is entirely in the joints, the timber, and the maker.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=90',
    date: 'April 2025',
  },
  {
    id: 4,
    category: 'Tile Design',
    readTime: '5 min read',
    title: 'The Tile Revolution in Modern Indian Interiors',
    excerpt: 'Large-format porcelain, handmade Zellige, and satin terrazzo are rewriting what Indian homes can look like. Here is the shift we are seeing on every project.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=90',
    date: 'March 2025',
  },
  {
    id: 5,
    category: 'Founder\'s Vision',
    readTime: '10 min read',
    title: 'Why Amara Living Exists',
    excerpt: 'Founder Arjun Sivakumar on why he walked away from a corporate career to build a stone and furniture company in Chennai — and what he believes luxury really means.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=90',
    date: 'February 2025',
  },
  {
    id: 6,
    category: 'Care & Maintenance',
    readTime: '4 min read',
    title: 'How to Care for Marble & Granite Surfaces',
    excerpt: 'A practical, no-nonsense guide to keeping your natural stone surfaces looking as beautiful at year ten as they did on day one.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=90',
    date: 'January 2025',
  },
];

const TOPICS = ['All Topics', 'Stone Selection', 'Furniture Design', 'Tile Design', 'Living with Stone', 'Founder\'s Vision', 'Care & Maintenance'];

/* ─── component ─── */
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('All Topics');

  const filtered = activeFilter === 'All Topics'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeFilter);

  return (
    <main id="main-content" className="bg-[#0B0B0B]">

      {/* ══ 1. HERO ══ */}
      <section className="relative h-[65dvh] min-h-[480px] overflow-hidden bg-[#0B0B0B] flex items-end pb-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90" alt="The Amara Journal" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent" />
        </div>
        <div className="wrap relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
            <Eyebrow>The Amara Journal</Eyebrow>
            <h1 className="font-display text-[clamp(2.8rem,6vw,7rem)] font-medium leading-[0.95] tracking-tight text-[#F8F6F2] max-w-3xl" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Ideas on Living<br />
              <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>With Intention</em>
            </h1>
            <p className="mt-5 text-sm text-[#A0A0A0] font-light leading-[1.9] max-w-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Essays on material selection, design philosophy, craftsmanship, and the art of building spaces that endure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. FEATURED ARTICLE ══ */}
      <section className="bg-[#0B0B0B] py-20 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <Reveal className="mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Featured Essay</span>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <Reveal>
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={FEATURED_ARTICLE.image} alt={FEATURED_ARTICLE.title} className="w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 to-transparent" />
              </div>
            </Reveal>
            {/* Text */}
            <Reveal delay={0.15} className="lg:py-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{FEATURED_ARTICLE.category}</span>
                <span className="w-4 h-px bg-[#A0A0A0]/40" />
                <span className="flex items-center gap-1.5 text-[10px] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}><Clock className="w-3 h-3" />{FEATURED_ARTICLE.readTime}</span>
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-[#F8F6F2] mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {FEATURED_ARTICLE.title}
              </h2>
              <GoldRule className="mb-6 max-w-xs" />
              <p className="text-base text-[#A0A0A0] font-light leading-[1.9] mb-6 italic" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {FEATURED_ARTICLE.subtitle}
              </p>
              {FEATURED_ARTICLE.content.map((para, i) => (
                <p key={i} className="text-sm text-[#A0A0A0] font-light leading-[1.9] mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{para}</p>
              ))}
              <div className="mt-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37] cursor-pointer hover:gap-5 transition-all duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Continue Reading <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 3. TOPIC FILTER ══ */}
      <section className="bg-[#111111] py-10 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <div className="flex flex-wrap gap-3">
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => setActiveFilter(topic)}
                className={`px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] border transition-all duration-400 ${activeFilter === topic ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-[#F8F6F2]/10 text-[#A0A0A0] hover:border-[#D4AF37]/40 hover:text-[#F8F6F2]'}`}
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. ARTICLE GRID ══ */}
      <section className="bg-[#0B0B0B] py-16 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <Reveal key={article.id} delay={i * 0.07}>
                <article className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/3] mb-6">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108" />
                    <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/25 transition-all duration-700" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{article.category}</span>
                    <span className="w-3 h-px bg-[#A0A0A0]/40" />
                    <span className="flex items-center gap-1.5 text-[10px] text-[#A0A0A0]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}><Clock className="w-3 h-3" />{article.readTime}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-medium leading-[1.2] tracking-tight text-[#F8F6F2] mb-3 group-hover:text-[#D4AF37] transition-colors duration-400" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#A0A0A0] font-light leading-[1.75]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    {article.excerpt}
                  </p>
                  <div className="mt-5 h-px w-0 group-hover:w-16 bg-[#D4AF37] transition-all duration-500" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. NEWSLETTER ══ */}
      <section className="bg-[#111111] py-20 border-t border-[#F8F6F2]/5">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <Eyebrow>The Amara Journal</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.05] tracking-tight text-[#F8F6F2]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Conversations on Material,<br />
                <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Design & Living Well</em>
              </h2>
              <GoldRule className="mt-8 max-w-xs" />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-sm text-[#A0A0A0] font-light leading-[1.9] mb-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                New essays on interior design, material culture, and the craft of building spaces that endure — delivered to your inbox quarterly. No promotions. No noise. Just ideas worth keeping.
              </p>
              <div className="flex flex-col sm:flex-row gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border border-[#F8F6F2]/15 px-5 py-3.5 text-sm text-[#F8F6F2] placeholder-[#A0A0A0]/50 focus:outline-none focus:border-[#D4AF37]/50 transition-colors duration-300"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                />
                <button className="bg-[#D4AF37] text-[#0B0B0B] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] hover:bg-[#F8F6F2] transition-colors duration-400 whitespace-nowrap" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-[10px] text-[#A0A0A0]/50" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Quarterly essays. Unsubscribe anytime.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 6. CTA ══ */}
      <section className="relative bg-[#0B0B0B] py-24 overflow-hidden border-t border-[#F8F6F2]/5">
        <div className="wrap relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.0] tracking-tight text-[#F8F6F2]" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Ready to Build Your<br /><em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Space?</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <GoldBtn href="#/consultation">Book a Consultation</GoldBtn>
          </Reveal>
        </div>
      </section>

    </main>
  );
}