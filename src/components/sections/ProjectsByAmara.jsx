import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowUpRight, Sparkles, MapPin, CheckCircle2, Eye, X } from 'lucide-react';

import kgSignatureImg from '../../assets/project/KG Signature City.jpeg';
import ayana95Img from '../../assets/project/Ayana 95.jpeg';
import prestigeGroupImg from '../../assets/project/Prestige Group.png';
import chennaiMetroImg from '../../assets/project/Chennai Metro Rail Limited.png';
import balajiSquareImg from '../../assets/project/Balaji Square.png';
import clkkBuildersImg from '../../assets/project/CLKK Builders.png';

const PROJECTS = [
  {
    id: 'kg-signature-city',
    name: 'KG Signature City',
    category: 'Residential Township',
    location: 'Mogappair, Chennai',
    image: kgSignatureImg,
    description: 'A grand multi-acre residential landmark featuring Amara’s vitrified tiles, custom stone cladding, and handcrafted foyer elements.',
    highlights: ['Vitrified Flooring', 'Custom Stone Cladding', 'Lobby Interiors'],
    badge: 'Signature Township',
  },
  {
    id: 'ayana-95',
    name: 'Ayana 95',
    category: 'Luxury Apartments',
    location: 'Anna Nagar, Chennai',
    image: ayana95Img,
    description: 'Bespoke modern living spaces styled with premium marble-finish porcelain tiles and handcrafted wooden casework.',
    highlights: ['Porcelain Tiles', 'Bespoke Furniture', 'Feature Walls'],
    badge: 'Luxury Residence',
  },
  {
    id: 'prestige-group',
    name: 'Prestige Group',
    category: 'Commercial & High-Rise',
    location: 'South India Developments',
    image: prestigeGroupImg,
    description: 'High-traffic commercial towers and luxury residential spaces completed with heavy-duty vitrified slabs and polished granites.',
    highlights: ['Architectural Slabs', 'High-Traffic Granite', 'Lobby Wall Cladding'],
    badge: 'Enterprise Partner',
  },
  {
    id: 'chennai-metro-rail',
    name: 'Chennai Metro Rail Limited',
    category: 'Infrastructure Landmark',
    location: 'Chennai Metro Stations',
    image: chennaiMetroImg,
    description: 'High-density heavy traffic transit hubs installed with Amara’s anti-slip vitrified body and polished granite flooring.',
    highlights: ['Anti-Slip Vitrified', 'Heavy-Load Granite', 'Precision Edging'],
    badge: 'Public Infrastructure',
  },
  {
    id: 'balaji-square',
    name: 'Balaji Square',
    category: 'Commercial Plaza',
    location: 'Prime Business District',
    image: balajiSquareImg,
    description: 'Contemporary commercial square adorned with luxury stone facades, sleek glass balconies, and premium interior flooring.',
    highlights: ['Exterior Stone Facade', 'Marble Foyer', 'Custom Wall Panels'],
    badge: 'Commercial Hub',
  },
  {
    id: 'clkk-builders',
    name: 'CLKK Builders',
    category: 'Bespoke Villa Projects',
    location: 'Premium Gated Communities',
    image: clkkBuildersImg,
    description: 'Exclusive custom villas built with Amara’s natural granite countertops, designer floor tiles, and bespoke timber furniture.',
    highlights: ['Natural Granite', 'Designer Tiles', 'Custom Timber Joinery'],
    badge: 'Bespoke Villas',
  },
];

export default function ProjectsByAmara() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Residential Township', 'Luxury Apartments', 'Commercial Plaza', 'Infrastructure Landmark'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || (activeFilter === 'Commercial Plaza' && (p.category.includes('Commercial') || p.category.includes('Plaza'))));

  return (
    <section id="projects-by-amara" className="bg-[#FAF6F0] py-20 md:py-28 border-t border-[#0B0B0B]/8 relative overflow-hidden">
      {/* Background Decorative Ambient Radial Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(184,145,42,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="wrap relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8912A]/10 text-[#9A7B1E] border border-[#B8912A]/20 text-[10px] font-bold uppercase tracking-[0.35em]">
                <Sparkles className="w-3 h-3 text-[#B8912A]" />
                Landmark Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.4rem,5vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-[#0B0B0B]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Projects By <em style={{ color: '#B8912A', fontStyle: 'italic' }}>Amara</em>
            </motion.h2>

            <div className="h-[2px] w-28 mt-6 mb-6" style={{ background: 'linear-gradient(90deg, #B8912A 0%, transparent 100%)' }} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-[#444444] font-light leading-relaxed max-w-xl"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              A showcase of signature developments, luxury residential towers, and public infrastructure projects crafted with Amara’s materials &amp; architectural expertise.
            </motion.p>
          </div>

          {/* Quick Counter Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="self-start md:self-end p-5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(212,175,55,0.08)] flex items-center gap-5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#B8912A]/10 border border-[#B8912A]/20 flex items-center justify-center text-[#B8912A]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-light text-[#0B0B0B] font-display block leading-none" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                500+ Projects
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7B1E]">
                Delivered Across South India
              </span>
            </div>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#0B0B0B]/10 hover:border-[#B8912A]/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(184,145,42,0.18)] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Top Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/75 via-[#0B0B0B]/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-[#0B0B0B]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    {project.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-semibold text-neutral-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B8912A]" />
                    {project.location.split(',')[0]}
                  </span>
                </div>

                {/* Bottom Overlay Title & Location */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37] block mb-1">
                    {project.category}
                  </span>
                  <h3
                    className="text-2xl font-medium text-white leading-tight font-display drop-shadow-sm"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {project.name}
                  </h3>
                </div>

                {/* Hover Action Button */}
                <div className="absolute inset-0 bg-[#0B0B0B]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center z-20">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-6 py-3 rounded-full bg-[#B8912A] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#0B0B0B] transition-all duration-300 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <p className="text-xs text-[#555555] font-light leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.highlights.map((item) => (
                      <span
                        key={item}
                        className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF6F0] text-[#666666] border border-black/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-black/8 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B8912A]" />
                    <span>Completed Project</span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider text-[#0B0B0B] hover:text-[#B8912A] transition-colors group/btn uppercase"
                  >
                    Explore
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#B8912A]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0B0B0B]/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-[#B8912A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-[#B8912A] text-white text-[9px] font-bold uppercase tracking-widest inline-block mb-2">
                    {selectedProject.badge}
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-medium text-white font-display"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                  >
                    {selectedProject.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedProject.location}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7B1E] mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-[#333333] leading-relaxed font-light">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7B1E] mb-3">
                    Amara Living Solutions Delivered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.highlights.map((h) => (
                      <div key={h} className="p-3 rounded-xl bg-white border border-black/8 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#B8912A] shrink-0" />
                        <span className="text-xs font-medium text-[#222]">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <span className="text-xs text-[#777]">Interested in a similar project?</span>
                  <a
                    href="#/consultation"
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B8912A] transition-colors"
                  >
                    Book Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
