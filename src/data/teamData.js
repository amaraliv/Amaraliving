// Team member images — imported via Vite asset pipeline
import sahilImg from '../assets/people/Sahil Bhagat.png';
import mounikaImg from '../assets/people/Mounika jami.jpeg';
import akshraImg from '../assets/people/Akshra Aggarwal .jpeg';
import aarnaImg from '../assets/people/Aarna Singh.PNG';
import vaishnavi from '../assets/people/K.V.Sai Vaishnavi    .jpeg';
import mahakImg from '../assets/people/Mahak Kashav.jpg';
import gauriImg from '../assets/people/Gauri Chavan.png';

/**
 * @typedef {Object} TeamMember
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {'development'|'design'|'sales'} team
 * @property {string} bio
 * @property {string[]} skills
 * @property {string} imageUrl
 * @property {{ platform: string; url: string }[]} socials
 */

/** @type {TeamMember[]} */
export const TEAM_MEMBERS = [
  // ── Web Development ────────────────────────────────────────────────
  {
    id: 'sahil-bhagat',
    name: 'Sahil Bhagat',
    role: 'Software Engineer & Full-Stack Developer',
    team: 'development',
    bio: 'Crafted and passionate about building modern, high-performance web applications and websites with modern design principles, responsive layouts, and attention to detail to deliver a premium user experience.',
    skills: ['React', 'Node.js', 'TypeScript', 'GSAP', 'TailwindCSS'],
    imageUrl: sahilImg,
    socials: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/sahil-bhagat-3a65b0299/' },
    ],
  },
  {
    id: 'mounika-jami',
    name: 'Mounika Jami',
    role: 'Web Developer',
    team: 'development',
    bio: 'I love spending time in nature and exploring peaceful places like hills and temples. Singing and classical dance are close to my heart. I believe positivity, creativity, and meaningful connections make every journey more enjoyable.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'UI Design', 'Accessibility'],
    imageUrl: mounikaImg,
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },

  // ── Design & Content ──────────────────────────────────────────────
  {
    id: 'akshra-aggarwal',
    name: 'Akshra Aggarwal',
    role: 'Content & Creative Designer',
    team: 'design',
    bio: 'I enjoy bringing creativity, curiosity, and a positive attitude to everything I do. I\'m always happy to take on new challenges and learn along the way. Off the clock, I\'m usually hunting for good food, planning a trip I haven\'t booked yet, or making my friends laugh with completely unnecessary commentary.',
    skills: ['Content Strategy', 'Copywriting', 'Brand Voice', 'Creative Direction'],
    imageUrl: akshraImg,
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    id: 'aarna-singh',
    name: 'Aarna Singh',
    role: 'Content Designer',
    team: 'design',
    bio: 'Chasing sunsets, trekking, and long drives with my dog are some of my favorite ways to unwind. I want to live a life full of experiences — and I bring that same open, adventurous spirit to every creative project.',
    skills: ['Visual Content', 'Photography', 'Storytelling', 'Social Media'],
    imageUrl: aarnaImg,
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    id: 'kv-sai-vaishnavi',
    name: 'K.V. Sai Vaishnavi',
    role: 'Content Specialist',
    team: 'design',
    bio: 'Professional vibing-alone expert. Planner of gatherings that never happen. Surviving college and home powered by music and rewatching cartoons and movies. Might not be at every party, but always there to listen.',
    skills: ['Content Writing', 'Research', 'Editing', 'Digital Marketing'],
    imageUrl: vaishnavi,
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },

  // ── International Sales ───────────────────────────────────────────
  {
    id: 'mahak-kashav',
    name: 'Mahak Kashav',
    role: 'International Sales Executive',
    team: 'sales',
    bio: 'I\'m passionate about learning, exploring new ideas, and growing through new experiences. Outside of work, I enjoy travelling, appreciating nature and aesthetics, and spending quality time with my family. I believe every new opportunity is a chance to become a better version of myself.',
    skills: ['International Sales', 'Client Relations', 'Negotiation', 'Market Research'],
    imageUrl: mahakImg,
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
  {
    id: 'gauri-chavan',
    name: 'Gauri Chavan',
    role: 'Sales & Business Development',
    team: 'sales',
    bio: 'I\'m someone who loves learning, exploring new experiences, and connecting with people. I believe in staying positive and enjoying the journey — every conversation is a chance to create something meaningful.',
    skills: ['Business Development', 'Lead Generation', 'Communication', 'CRM'],
    imageUrl: gauriImg,
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
  },
];

export const TEAM_SECTIONS = [
  {
    key: 'development',
    label: 'Web Development Team',
    eyebrow: 'Engineering',
    accent: { from: '#22D3EE', to: '#3B82F6', text: '#22D3EE', bg: 'rgba(34,211,238,0.08)' },
    desc: 'The builders behind our digital presence — crafting fast, accessible, and beautiful experiences on every screen.',
  },
  {
    key: 'design',
    label: 'Design & Content Team',
    eyebrow: 'Creative',
    accent: { from: '#A78BFA', to: '#EC4899', text: '#A78BFA', bg: 'rgba(167,139,250,0.08)' },
    desc: 'Storytellers, visual thinkers, and brand custodians who shape how Amara Living speaks to the world.',
  },
  {
    key: 'sales',
    label: 'International Sales Team',
    eyebrow: 'Global Sales',
    accent: { from: '#FBBF24', to: '#F97316', text: '#FBBF24', bg: 'rgba(251,191,36,0.08)' },
    desc: 'The connectors who bring Amara Living\'s premium products to clients across India and beyond.',
  },
];

export const COMPANY_TIMELINE = [
  { year: '2010', title: 'Founded', desc: 'Amara Living was established in Chennai with a vision to redefine premium surfaces and interiors.' },
  { year: '2014', title: 'First International Client', desc: 'Secured our first overseas export contract, marking the beginning of our global expansion.' },
  { year: '2018', title: 'Team Expansion', desc: 'Grew our team across design, sales, and engineering to serve a rapidly growing client base.' },
  { year: '2022', title: 'Digital Transformation', desc: 'Launched our digital experience platform, connecting clients worldwide with our curated collections.' },
  { year: '2026', title: 'Growing Together', desc: 'Today, our diverse team of passionate people continues to push boundaries and create exceptional living spaces.' },
];
