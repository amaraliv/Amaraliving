export const NAV_LINKS = [
  { label: 'Home', href: '#/', isPage: true },
  { label: 'Furniture', href: '#/furniture', isPage: true },
  { label: 'Tiles', href: '#/tiles', isPage: true },
  { label: 'Granite', href: '#/granite', isPage: true },
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
