export const NAV_LINKS = [
  { label: 'Home', href: '#/', isPage: true },
  { label: 'Our Collections', href: '#collections-modal', isModalTrigger: true },
  { label: 'Blog', href: '#/blog', isPage: true },
  { label: 'Company', href: '#/company', isPage: true },
  { label: 'Consultation', href: '#/consultation', isPage: true },
  { label: 'Where to Buy', href: '#/where-to-buy', isPage: true },
  { label: 'Contact', href: '#contact' },
];

export const PAGE_SECTIONS = [
  'hero',
  'spaces',
  'materials',
  'story',
  'furniture',
  'surfaces',
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
