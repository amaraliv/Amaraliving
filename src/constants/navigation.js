export const NAV_LINKS = [
  { label: 'Home', href: '#/', isPage: true },
  { label: 'Our Collections', href: '#collections-modal', isModalTrigger: true },
  { label: 'Company', href: '#/company', isCompanyDropdown: true },
  { label: 'Design Your Space', href: '#/consultation', isPage: true },
  { label: 'Where to Buy', href: '#/where-to-buy', isPage: true },
  { label: 'Contact Us', href: '#contact' },
];

export const COMPANY_DROPDOWN_LINKS = [
  { label: 'Company', href: '#/company', desc: 'Our story, philosophy & heritage' },
  { label: 'Our People', href: '#/our-people', desc: 'Meet our developers & team' },
  { label: 'Blog', href: '#/blog', desc: 'Design insights, trends & stories' },
  { label: 'Careers', href: '#/careers', desc: 'Explore open positions & opportunities' },
];

export const PAGE_SECTIONS = [
  'hero',
  'spaces',
  'materials',
  'story',
  'furniture',
  'testimonials',
  'contact',
];

const NAV_IDS = new Set(['contact']);

export function resolveNavSection(sectionId) {
  if (NAV_IDS.has(sectionId)) return sectionId;

  const idx = PAGE_SECTIONS.indexOf(sectionId);
  if (idx <= 0) return null;

  for (let i = idx - 1; i >= 0; i -= 1) {
    if (NAV_IDS.has(PAGE_SECTIONS[i])) return PAGE_SECTIONS[i];
  }

  return null;
}
