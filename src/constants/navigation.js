export const NAV_LINKS = [
  { label: 'Spaces', href: '#spaces' },
  { label: 'Materials', href: '#materials' },
  { label: 'Furniture', href: '#/furniture', isPage: true },
  { label: 'Tiles', href: '#/tiles', isPage: true },
  { label: 'Story', href: '#story' },
  { label: 'Surfaces', href: '#surfaces' },
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

const NAV_IDS = new Set(['spaces', 'materials', 'story', 'surfaces', 'contact']);

export function resolveNavSection(sectionId) {
  if (NAV_IDS.has(sectionId)) return sectionId;

  const idx = PAGE_SECTIONS.indexOf(sectionId);
  if (idx <= 0) return null;

  for (let i = idx - 1; i >= 0; i -= 1) {
    if (NAV_IDS.has(PAGE_SECTIONS[i])) return PAGE_SECTIONS[i];
  }

  return null;
}
