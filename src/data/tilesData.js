// Premium Luxury Tiles Catalog Data
// Structure:
// 600 × 600: Glossy, Golden, Endless, Matt, 3D, Bookmatch
// 600 × 1200: 
//   - Glossy (PGVT / Satvario, Endless, Only X, 3D, Bookmatch, Wooden Glossy)
//   - Matt (Matt, Endless, Wooden Laminate)
//   - Coating (Coating Decor / Glossy Colours, Pastel Colours, Endless, Punch with Coating)
//   - Multicolour (Multicolour, Golden, Endless)

export const TILE_SIZES = [
  {
    id: '600x600',
    title: '600 × 600',
    subtitle: 'Classic Precision',
    dimensions: '600 × 600 mm',
    description: 'Perfect for residential flooring, feature walls, and elegant urban apartments.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
    tag: 'VERSATILE FORMAT',
    features: ['High Breaking Strength', 'Precision Rectified Edge', 'Easy Installation']
  },
  {
    id: '600x1200',
    title: '600 × 1200',
    subtitle: 'Grand Architecture',
    dimensions: '600 × 1200 mm',
    description: 'Luxury large-format tiles for seamless, joint-minimal modern interiors.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
    tag: 'SLAB FORMAT',
    features: ['Minimal Grout Lines', 'Expansive Spatial Feel', 'Ultra-Durable Vitrified']
  }
];

export const CATEGORIES_600x600 = [
  { id: 'all', name: 'All 600×600' },
  { id: 'Glossy', name: 'Glossy' },
  { id: 'Golden', name: 'Golden' },
  { id: 'Endless', name: 'Endless' },
  { id: 'Matt', name: 'Matt' },
  { id: '3D', name: '3D' },
  { id: 'Bookmatch', name: 'Bookmatch' }
];

export const CATEGORIES_600x1200 = [
  { id: 'all', name: 'All 600×1200' },
  { id: 'PGVT / Satvario', name: 'PGVT / Satvario', group: 'Glossy', subId: 'PGVT / Satvario' },
  { id: 'Glossy', name: 'Glossy', group: 'Glossy' },
  { id: 'Endless', name: 'Endless', group: 'Glossy', subId: 'Endless' },
  { id: 'Only X', name: 'Only X', group: 'Glossy', subId: 'Only X' },
  { id: '3D', name: '3D', group: 'Glossy', subId: '3D' },
  { id: 'Bookmatch', name: 'Bookmatch', group: 'Glossy', subId: 'Bookmatch' },
  { id: 'Wooden Glossy', name: 'Wooden Glossy', group: 'Glossy', subId: 'Wooden Glossy' },
  { id: 'Matt', name: 'Matt', group: 'Matt' },
  { id: 'Coating', name: 'Coating', group: 'Coating' },
  { id: 'Multicolour', name: 'Multicolour', group: 'Multicolour' }
];

export const SUB_FILTERS_600x1200 = {
  Coating: [
    { id: 'all', name: 'All Coating' },
    { id: 'Glossy Colours', name: 'Glossy Colours' },
    { id: 'Pastel Colours', name: 'Pastel Colours' },
    { id: 'Endless', name: 'Endless' },
    { id: 'Punch with Coating', name: 'Punch with Coating' }
  ],
  Matt: [
    { id: 'all', name: 'All Matt' },
    { id: 'Matt', name: 'Pure Matt' },
    { id: 'Endless', name: 'Endless Matt' },
    { id: 'Wooden Laminate', name: 'Wooden Laminate' }
  ],
  Multicolour: [
    { id: 'all', name: 'All Multicolour' },
    { id: 'Multicolour', name: 'Multicolour' },
    { id: 'Golden', name: 'Golden Accent' },
    { id: 'Endless', name: 'Endless Vein' }
  ],
  Glossy: [
    { id: 'all', name: 'All Glossy' },
    { id: 'PGVT / Satvario', name: 'PGVT / Satvario' },
    { id: 'Endless', name: 'Endless' },
    { id: 'Only X', name: 'Only X' },
    { id: '3D', name: '3D' },
    { id: 'Bookmatch', name: 'Bookmatch' },
    { id: 'Wooden Glossy', name: 'Wooden Glossy' }
  ]
};

export const TILES_600x600 = [
  {
    id: 't600-1',
    name: 'Carrara Imperial Gloss',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-floor',
    appKeys: ['bathroom', 'living-room', 'bedroom', 'hotel'],
    category: 'Glossy',
    finish: 'Mirror Glossy',
    thickness: '9 mm',
    application: 'Living Room, Bedroom & Bathrooms',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Crystal White', hex: '#F5F5F7' },
      { name: 'Silver Vein', hex: '#D1D5DB' }
    ],
    features: ['High Reflection', 'Stain Resistant', 'Zero Water Absorption', 'Scratch Proof'],
    description: 'Impeccable high-gloss Carrara porcelain with ethereal grey veins that elevate natural illumination.'
  },
  {
    id: 't600-2',
    name: 'Aura Golden Calacatta',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-floor',
    appKeys: ['living-room', 'bedroom', 'hotel', 'commercial'],
    category: 'Golden',
    finish: 'Polished Gold Glossy',
    thickness: '9.5 mm',
    application: 'Luxury Foyer & Premium Master Bedroom',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#FDFBF7' },
      { name: 'Champagne Gold', hex: '#C8102E' }
    ],
    features: ['24K Gold Vein Print', 'Nano-Sealed', 'Thermal Resistant', 'Antibacterial Surface'],
    description: 'Rich champagne gold currents interwoven over a warm ivory canvas, creating opulent focal points.'
  },
  {
    id: 't600-3',
    name: 'Infinite Statuario Linea',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-floor',
    appKeys: ['living-room', 'hotel', 'commercial', 'bedroom'],
    category: 'Endless',
    finish: 'Endless Vein Gloss',
    thickness: '9 mm',
    application: 'Seamless Living Rooms & Hotel Suites',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Graphite Grey', hex: '#4B5563' }
    ],
    features: ['Continuous Vein Match', 'Ultra Flatness', 'High Density Vitrified', 'Slip-Resistant Satin'],
    description: 'Engineered endless pattern matching that creates continuous natural stone veining across any room width.'
  },
  {
    id: 't600-4',
    name: 'Nero Satin Velvet',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-full',
    appKeys: ['bathroom', 'kitchen', 'bedroom', 'commercial'],
    category: 'Matt',
    finish: 'Silk Touch Matt',
    thickness: '10 mm',
    application: 'Contemporary Spa, Bathroom & Kitchen',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1E' },
      { name: 'Matte Smoke', hex: '#3A3A3C' }
    ],
    features: ['R10 Anti-Slip', 'Soft Touch Texture', 'Fingerprint Resistant', 'Low Maintenance'],
    description: 'Deep midnight matte finish with tactile silk warmth, tailored for minimalist luxury environments.'
  },
  {
    id: 't600-5',
    name: 'Prism Geometry 3D',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-floor',
    appKeys: ['elevation', 'kitchen-top', 'commercial', 'staircase'],
    category: '3D',
    finish: 'Structured 3D Relief',
    thickness: '11 mm',
    application: 'Accent Walls, Entryways & Bar Counter Cladding',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Sandstone Grey', hex: '#9CA3AF' },
      { name: 'Shadow White', hex: '#E5E7EB' }
    ],
    features: ['Sculptural Facets', 'Dynamic Light Shadow Effect', 'Precision Alignment', 'Impact Durable'],
    description: 'Architectural three-dimensional geometric tiles that interact dynamically with ambient lighting.'
  },
  {
    id: 't600-6',
    name: 'Royal Onyx Bookmatch',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-full',
    appKeys: ['bathroom', 'living-room', 'hotel', 'kitchen-top'],
    category: 'Bookmatch',
    finish: 'Mirror Polish Bookmatch',
    thickness: '9.5 mm',
    application: 'Feature Walls & Luxury Bath Suites',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=90',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Amber Gold', hex: '#D97706' },
      { name: 'Ivory Onyx', hex: '#FEF3C7' }
    ],
    features: ['Matched Mirror Set', 'Translucent Depth', 'High Impact Polish', 'Vitreous Body'],
    description: 'Dual-tile symmetric bookmatched patterns forming dramatic natural quartz and onyx art pieces.'
  },
  {
    id: 't600-7',
    name: 'Crema Marfil Silk',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-floor',
    appKeys: ['living-room', 'bedroom', 'hotel', 'commercial'],
    category: 'Glossy',
    finish: 'Polished Silk',
    thickness: '9 mm',
    application: 'Living Spaces, Corridors',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Warm Cream', hex: '#F3EFE0' }
    ],
    features: ['Stain Free', 'High Glossy', 'Vitrified Body'],
    description: 'Subtle warm Spanish limestone look reproduced in ultra-durable glazed vitrified tile.'
  },
  {
    id: 't600-8',
    name: 'Grit Stone Slate',
    size: '600 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-600x600-full',
    appKeys: ['balcony', 'terrace', 'parking', 'elevation'],
    category: 'Matt',
    finish: 'Rustico Micro-Matt',
    thickness: '10 mm',
    application: 'Balconies, Terraces & Courtyards',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=90'
    ],
    colors: [
      { name: 'Basalt Grey', hex: '#4A4E69' }
    ],
    features: ['Outdoor Rated', 'Anti Skid R11', 'UV Resistant'],
    description: 'Natural stone texture with tactical slip protection, ideal for indoor-outdoor transition zones.'
  },
  /* Dummy tiles for specific sizes and niche spaces */
  {
    id: 't-sz-400x400',
    name: 'Urban Grid Satin 400×400',
    size: '400 × 400 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-400x400',
    appKeys: ['kitchen', 'bathroom', 'balcony'],
    category: 'Matt',
    finish: 'Smooth Satin Matt',
    thickness: '8.5 mm',
    application: 'Compact Spaces, Kitchen Floors & Bathrooms',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Silver Grey', hex: '#9CA3AF' }],
    features: ['Compact Format', 'Anti Skid Surface', 'Easy Maintenance'],
    description: 'High-density 400×400mm vitrified tile engineered for precision grid layouts in medium and compact rooms.'
  },
  {
    id: 't-sz-300x600',
    name: 'Statuario Metro Wall 300×600',
    size: '300 × 600 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x600',
    appKeys: ['bathroom', 'kitchen', 'elevation'],
    category: 'Glossy',
    finish: 'High Gloss Wall Glaze',
    thickness: '8 mm',
    application: 'Bathroom Walls & Kitchen Backsplashes',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Statuario White', hex: '#FFFFFF' }],
    features: ['Zero Water Absorption', 'High Gloss Mirror', 'Stain Resistant'],
    description: 'Classic 300×600mm architectural wall tile with rich statuario veining for luxurious bath suites.'
  },
  {
    id: 't-sz-300x450',
    name: 'Royal Heritage Wall 300×450',
    size: '300 × 450 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x450',
    appKeys: ['bathroom', 'kitchen'],
    category: 'Glossy',
    finish: 'Digital Gloss Cladding',
    thickness: '8 mm',
    application: 'Residential Bathrooms & Kitchens',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Ivory Gold', hex: '#FFFBEB' }],
    features: ['HD Digital Print', 'Water Resistant Glaze', 'Easy Wipe Surface'],
    description: 'Delicate 300×450mm ceramic wall tile featuring crisp digital prints and non-porous glazed protective coating.'
  },
  {
    id: 't-sz-300x300-wall',
    name: 'Ceramic Craft Wall 300×300',
    size: '300 × 300 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x300-wall',
    appKeys: ['bathroom', 'kitchen'],
    category: 'Matt',
    finish: 'Micro-Texture Matt',
    thickness: '7.5 mm',
    application: 'Bathroom Walls & Powder Rooms',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Soft Sage', hex: '#D1FAE5' }],
    features: ['Precision Edge', 'Waterproof Body', 'Low Maintenance'],
    description: '300×300mm wall tile crafted for seamless wall cladding with tactile matte warmth.'
  },
  {
    id: 't-sz-300x300-cool',
    name: 'Solar Shield Cool Roof 300×300',
    size: '300 × 300 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x300-cool',
    appKeys: ['terrace', 'balcony'],
    category: 'Matt',
    finish: 'Solar Reflective Coating',
    thickness: '10 mm',
    application: 'Terrace & Rooftop Gardens',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Solar White', hex: '#FFFFFF' }],
    features: ['High SRI Value (>100)', 'Thermal Insulation', 'Weather Proof'],
    description: 'Engineered high-SRI white reflective tiles that lower internal building temperatures by reflecting 90%+ solar heat.'
  },
  {
    id: 't-sz-300x300-park',
    name: 'Heavy Load Paver 300×300',
    size: '300 × 300 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x300-park',
    appKeys: ['parking', 'commercial', 'balcony'],
    category: 'Matt',
    finish: 'Heavy Duty Punch Paver',
    thickness: '12 mm',
    application: 'Driveways, Parking & Commercial Ramp',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Basalt Charcoal', hex: '#1F2937' }],
    features: ['High Breaking Strength', 'R12 Anti-Skid', 'Vehicle Load Rated'],
    description: 'Extra-thick 12mm vitrified parking paver with high-traction surface engineered to withstand vehicular traffic.'
  },
  {
    id: 't-staircase-1',
    name: 'Bullnose Step Tread 300×1200',
    size: '300 × 1200 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x1200',
    appKeys: ['staircase'],
    category: 'Matt',
    finish: 'Anti-Slip Grooved Step',
    thickness: '15 mm',
    application: 'Staircase Steps & Escalator Access',
    image: 'https://images.unsplash.com/photo-1580216643062-cf460548a66a?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Granite Grey', hex: '#4B5563' }],
    features: ['Pre-Cut Bullnose Edge', 'Safety Grooves', 'Heavy Impact Resistant'],
    description: 'Factory rounded bullnose staircase tread with integrated safety traction grooves for elegant, safe vertical movement.'
  },
  {
    id: 't-staircase-2',
    name: 'Staircase Riser Tile 300×1000',
    size: '300 × 1000 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x1000',
    appKeys: ['staircase'],
    category: 'Glossy',
    finish: 'Polished Step Riser',
    thickness: '12 mm',
    application: 'Interior Staircases & Duplex Homes',
    image: 'https://images.unsplash.com/photo-1580216643062-cf460548a66a?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Cream Beige', hex: '#FDE68A' }],
    features: ['Seamless Step Fit', 'High Sheen Polish', 'Scratch Proof'],
    description: 'Precision riser tile designed to complement step treads for a continuous, luxurious staircase finish.'
  },
  {
    id: 't-staircase-3',
    name: 'Compact Step Tread 300×900',
    size: '300 × 900 mm',
    sizeCategory: '600x600',
    sizeKey: 'sz-300x900',
    appKeys: ['staircase'],
    category: 'Matt',
    finish: 'Micro-Grooved Tread',
    thickness: '12 mm',
    application: 'Residential Staircases & Access Steps',
    image: 'https://images.unsplash.com/photo-1580216643062-cf460548a66a?auto=format&fit=crop&w=1000&q=90',
    colors: [{ name: 'Smokey Black', hex: '#111827' }],
    features: ['Pre-molded Edge', 'High Abrasion', 'Easy Clean'],
    description: 'Standard 300×900mm staircase step tread designed for urban apartments and villa stairwells.'
  }
];

export const TILES_600x1200 = [
  {
    id: 't1200-1',
    name: 'Statuario Extra Supreme PGVT',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['living-room', 'hotel', 'bathroom', 'slab'],
    category: 'Glossy',
    subCategory: 'PGVT / Satvario',
    finish: 'PGVT High Gloss',
    thickness: '9 mm',
    application: 'Grand Living Halls, Luxury Dining & Hotel Foyers',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Bright Pure White', hex: '#FFFFFF' },
      { name: 'Deep Statuario Vein', hex: '#374151' }
    ],
    features: ['Polished Glazed Vitrified', 'High Gloss Mirror Polish', 'Seamless Large Format', 'Extreme Abrasion Rating'],
    description: 'Masterpiece 600×1200mm PGVT tile featuring dramatic Italian Statuario grey veining over clean alpine white.'
  },
  {
    id: 't1200-2',
    name: 'Endless Calacatta Oro Slabs',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['living-room', 'slab', 'hotel', 'kitchen-top'],
    category: 'Glossy',
    subCategory: 'Endless',
    finish: 'Continuous Pattern Gloss',
    thickness: '9 mm',
    application: 'Double-Height Living Rooms & Feature Slabs',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Warm Calacatta', hex: '#FAF7F2' },
      { name: 'Rich Gold', hex: '#C59B27' }
    ],
    features: ['4-Tile Seamless Pattern Loop', 'Nano Crystal Glaze', 'Stain Guard', 'Resistant to Household Acids'],
    description: 'Infinite continuous flow across 4 sequential tiles, producing sprawling luxury marble visual uninterrupted.'
  },
  {
    id: 't1200-3',
    name: 'Only X Monochrome Onyx',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['commercial', 'hotel', 'living-room'],
    category: 'Glossy',
    subCategory: 'Only X',
    finish: 'High Density X-Gloss',
    thickness: '9.5 mm',
    application: 'Executive Boardrooms & Boutique Showrooms',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Absolute Dark X', hex: '#0B0B0B' },
      { name: 'Silver Strata', hex: '#9CA3AF' }
    ],
    features: ['Exclusive Only-X Formulation', 'Deep Contrast Finish', 'Zero Surface Porosity', 'Heavy Traffic Load Rated'],
    description: 'Limited edition ultra-contrast dark onyx tile with deep dimensional translucent layering.'
  },
  {
    id: 't1200-4',
    name: 'Sculpted Wave 3D Slab',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['elevation', 'kitchen-top', 'hotel', 'commercial'],
    category: 'Glossy',
    subCategory: '3D',
    finish: 'Gloss 3D Wave Relief',
    thickness: '12 mm',
    application: 'Feature Walls, Reception Desks & TV Backgrounds',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Opal White', hex: '#F3F4F6' },
      { name: 'Pearl Gloss', hex: '#E5E7EB' }
    ],
    features: ['Curved Organic 3D Form', 'Light Amplification', 'Waterproof Wall Cladding', 'Easy Wipe Surface'],
    description: 'Subtle flowing ribbons etched into high-gloss vitreous surfaces, capturing dramatic architectural shadows.'
  },
  {
    id: 't1200-5',
    name: 'Panda White Bookmatch Slab',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['bathroom', 'hotel', 'slab', 'living-room'],
    category: 'Glossy',
    subCategory: 'Bookmatch',
    finish: 'Polished Bookmatch A+B',
    thickness: '9 mm',
    application: 'Master Bathroom Accent Walls & Fireplaces',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=90',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Snow White', hex: '#FFFFFF' },
      { name: 'Pitch Black', hex: '#111827' }
    ],
    features: ['Matched Mirror Pair (A/B)', 'High Impact Contrast', 'Precision Rectified', 'Chemical Resistant'],
    description: 'Iconic high-contrast black and white marble pairing that creates butterfly symmetry on feature walls.'
  },
  {
    id: 't1200-6',
    name: 'Teak Heritage Wooden Gloss',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['wooden-plank', 'bedroom', 'living-room', 'hotel'],
    category: 'Glossy',
    subCategory: 'Wooden Glossy',
    finish: 'High Gloss Wood Grain',
    thickness: '9 mm',
    application: 'Luxury Lounges, Penthouse Bedrooms & Libraries',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Burma Teak', hex: '#78350F' },
      { name: 'Golden Oak', hex: '#B45309' }
    ],
    features: ['Real Wood Grain Scan', 'Waterproof Vitrified Body', 'No Warp or Termite Risk', 'Radiant Heat Compatible'],
    description: 'Warm natural timber aesthetics elevated with a mirror-finish coat that captures timber depth with porcelain strength.'
  },
  {
    id: 't1200-7',
    name: 'Concrete Stone Soft Matt',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['commercial', 'living-room', 'bedroom', 'kitchen'],
    category: 'Matt',
    subCategory: 'Matt',
    finish: 'Soft Touch Micro-Matt',
    thickness: '9.5 mm',
    application: 'Modern Industrial Villas, Urban Lofts',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Concrete Grey', hex: '#6B7280' },
      { name: 'Raw Cement', hex: '#9CA3AF' }
    ],
    features: ['Tactile Matt Finish', 'Anti Stain Guard', 'Uniform Tone', 'Scratch Proof'],
    description: 'Refined architectural concrete texture in a velvety touch finish for calm, grounded minimalist interiors.'
  },
  {
    id: 't1200-8',
    name: 'Oak Scandinavian Laminate',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['wooden-plank', 'bedroom', 'living-room'],
    category: 'Matt',
    subCategory: 'Wooden Laminate',
    finish: 'Ultra Matt Wood Grain',
    thickness: '9.5 mm',
    application: 'Nordic Bedrooms & Contemporary Living',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1200&q=90',
    gallery: [
      'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=1200&q=90'
    ],
    colors: [
      { name: 'Nordic Oak', hex: '#D97706' },
      { name: 'Sand Pine', hex: '#FDE68A' }
    ],
    features: ['Natural Wood Texture', 'Zero Maintenance', 'Moisture Resistant', 'Pet Safe'],
    description: 'Subtle bleached Nordic wood grain rendition in durable, stain-free large format porcelain.'
  },
  {
    id: 't1200-9',
    name: 'Luxe Emerald Coating Decor',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['kitchen-top', 'kitchen', 'bathroom', 'hotel'],
    category: 'Coating',
    subCategory: 'Glossy Colours',
    finish: 'Pigmented Glass Coating',
    thickness: '10 mm',
    application: 'Luxury Kitchen Backsplashes & Vanity Walls',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=90',
    colors: [
      { name: 'Emerald Green', hex: '#065F46' },
      { name: 'Deep Forest', hex: '#022C22' }
    ],
    features: ['Vibrant Coating Pigment', 'Mirror Glaze', 'UV Fade Resistant', 'Easy Clean'],
    description: 'Deep jewel-toned emerald porcelain with high-gloss baked coating for rich designer feature walls.'
  },
  {
    id: 't1200-10',
    name: 'Sage Pastel Silk Coating',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['bathroom', 'hotel', 'bedroom'],
    category: 'Coating',
    subCategory: 'Pastel Colours',
    finish: 'Soft Satin Coating',
    thickness: '9.5 mm',
    application: 'Wellness Spas, Boutique Bathrooms & Powder Rooms',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=90',
    colors: [
      { name: 'Soft Sage', hex: '#A7F3D0' },
      { name: 'Dusty Rose', hex: '#FECDD3' }
    ],
    features: ['Satin Pastel Sheen', 'Velvet Smooth Touch', 'Non Porous Coating', 'Hypoallergenic'],
    description: 'Soothing pastel sage green palette with ultra-smooth powder coated texture engineered for serene spaces.'
  },
  {
    id: 't1200-11',
    name: 'Punch Textured Coating Slab',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['elevation', 'balcony', 'commercial'],
    category: 'Coating',
    subCategory: 'Punch with Coating',
    finish: 'Structured Punch Coating',
    thickness: '11 mm',
    application: 'Exterior Facades, Accent Pillars & Wet Areas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
    colors: [
      { name: 'Cobalt Blue', hex: '#1E40AF' },
      { name: 'Midnight Punch', hex: '#1E1B4B' }
    ],
    features: ['High-Relief Punch', 'Dual Coat Glaze', 'Weather Proof', 'Impact Resistant'],
    description: 'Tactile micro-punched surface structure combined with protective glass coating for dynamic texture.'
  },
  {
    id: 't1200-12',
    name: 'Terra Multicolour Terrazzo',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['commercial', 'hotel', 'kitchen'],
    category: 'Multicolour',
    subCategory: 'Multicolour',
    finish: 'Honed Venetian Polish',
    thickness: '10 mm',
    application: 'Cafes, Creative Offices & Contemporary Foyers',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=90',
    colors: [
      { name: 'Multi Marble Chips', hex: '#F59E0B' },
      { name: 'Terracotta Flakes', hex: '#B45309' }
    ],
    features: ['Recycled Quartz & Glass', 'Ecological Vitrified', 'High Load Capacity', 'Artisanal Look'],
    description: 'Playful Venetian chip terrazzo featuring multi-hued marble flakes embedded in warm ivory porcelain matrix.'
  },
  {
    id: 't1200-13',
    name: 'Golden Vein Portoro Multicolour',
    size: '600 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1200',
    appKeys: ['kitchen-top', 'hotel', 'living-room'],
    category: 'Multicolour',
    subCategory: 'Golden',
    finish: 'Polished Black & Gold',
    thickness: '9.5 mm',
    application: 'Luxury Bar Counters, Master Suites',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=90',
    colors: [
      { name: 'Deep Nero', hex: '#111827' },
      { name: 'Electric Gold', hex: '#F59E0B' }
    ],
    features: ['Vivid Golden Strata', 'Mirror Gloss Polish', 'Thermal Resistance'],
    description: 'Striking black Italian marble look laced with lightning gold and bronze mineral veins.'
  },
  /* Specific Dummy Tiles for Large Slabs & Formats */
  {
    id: 't-sz-1200x2400',
    name: 'Grand Calacatta Slab 1200×2400',
    size: '1200 × 2400 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-1200x2400',
    appKeys: ['slab', 'living-room', 'hotel', 'kitchen-top'],
    category: 'Glossy',
    finish: 'Polished Grand Slab',
    thickness: '9 mm',
    application: 'Double-Height Foyers & Luxury Slabs',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Statue White', hex: '#FFFFFF' }],
    features: ['8×4 FT Grand Format', 'Joint-Free Wall Cladding', 'Ultra High Strength'],
    description: 'Continuous 8×4 FT porcelain slab delivering seamless floor-to-ceiling elegance without visible grout cuts.'
  },
  {
    id: 't-sz-1200x1800',
    name: 'Onyx Silk Slab 1200×1800',
    size: '1200 × 1800 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-1200x1800',
    appKeys: ['slab', 'living-room', 'hotel'],
    category: 'Glossy',
    finish: 'Translucent Onyx Polish',
    thickness: '9 mm',
    application: 'Executive Suites & Luxury Living Rooms',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Champagne Beige', hex: '#FDFBF7' }],
    features: ['6×4 FT Architectural Slab', 'High Reflection', 'Chemical Resistant'],
    description: 'Precision 6×4 FT vitrified slab featuring warm translucent honey onyx veining.'
  },
  {
    id: 't-sz-800x2400',
    name: 'Heavy Duty Titan Slab 800×2400',
    size: '800 × 2400 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-800x2400',
    appKeys: ['slab', 'commercial', 'kitchen-top'],
    category: 'Matt',
    finish: 'Micro-Structure Titan Matt',
    thickness: '15 mm',
    application: 'High-Traffic Public Spaces & Countertops',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Titanium Grey', hex: '#374151' }],
    features: ['Heavy Duty 15mm Body', 'Scratch & Heat Proof', 'Zero Stain Absorption'],
    description: 'Architectural 8×2.5 FT slab engineered specifically for kitchen counters, reception tops, and heavy footfall zones.'
  },
  {
    id: 't-sz-200x1200',
    name: 'Walnut Timber Plank 200×1200',
    size: '200 × 1200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-200x1200',
    appKeys: ['wooden-plank', 'bedroom', 'living-room', 'balcony'],
    category: 'Matt',
    finish: 'Natural Wood Grain Texture',
    thickness: '9 mm',
    application: 'Wooden Plank Flooring & Outdoor Decks',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Smokey Walnut', hex: '#5B4033' }],
    features: ['Authentic Wood Grain Relief', 'Waterproof Porcelain', 'Scratch Resistant'],
    description: 'Slim 200×1200mm timber plank tile replicating aged hardwood flooring with zero maintenance requirements.'
  },
  {
    id: 't-sz-1600x3200',
    name: 'Jumbo Atelier Slab 1600×3200',
    size: '1600 × 3200 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-1600x3200',
    appKeys: ['slab', 'hotel', 'living-room'],
    category: 'Glossy',
    finish: 'Ultra Gloss Jumbo Slab',
    thickness: '12 mm',
    application: 'Jumbo Architectural Slabs & Island Counters',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Statuario Alpine', hex: '#FFFFFF' }],
    features: ['10.5×5.25 FT Jumbo Format', 'Monolithic Surface', 'Zero Grout Lines'],
    description: 'Colossal 1600×3200mm porcelain slab designed for uninterrupted monolithic island counters and grand foyers.'
  },
  {
    id: 't-sz-1200x2700',
    name: 'Slim Body Wall Slab 1200×2700',
    size: '1200 × 2700 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-1200x2700',
    appKeys: ['slab', 'bathroom', 'bedroom'],
    category: 'Glossy',
    finish: 'Slim 6mm Mirror Polish',
    thickness: '6 mm',
    application: 'Ceiling-Height Bathroom Walls & Elevator Cladding',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Calacatta Snow', hex: '#FAF9F6' }],
    features: ['Slim 6mm Profile', 'Lightweight Wall Cladding', '9 FT Floor-to-Ceiling Fit'],
    description: '9 FT height continuous slim porcelain slab engineered for single-piece bathroom wall cladding.'
  },
  {
    id: 't-sz-800x1600',
    name: 'Grand Format Statuario 800×1600',
    size: '800 × 1600 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-800x1600',
    appKeys: ['slab', 'living-room', 'hotel'],
    category: 'Glossy',
    finish: 'High Polish Glazed Vitrified',
    thickness: '9 mm',
    application: 'Luxury Apartments & Villa Living Halls',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Statue Grey Vein', hex: '#E5E7EB' }],
    features: ['Proportional 1:2 Golden Ratio', 'Stain Guard', 'High Load Capacity'],
    description: 'Perfectly proportioned 800×1600mm vitrified slab providing expansive spatial feel.'
  },
  {
    id: 't-sz-600x1800',
    name: 'Wooden Slab Plank 600×1800',
    size: '600 × 1800 mm',
    sizeCategory: '600x1200',
    sizeKey: 'sz-600x1800',
    appKeys: ['wooden-plank', 'living-room', 'hotel'],
    category: 'Matt',
    finish: 'Honed Timber Texture',
    thickness: '10 mm',
    application: 'Sprawling Wood Look Floors',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'American Walnut', hex: '#4A3525' }],
    features: ['6 FT Long Timber Format', 'No Warping', 'Scratch Resistance'],
    description: '6 FT long porcelain wooden slab combining grand plank scale with rich timber grain texture.'
  },
  {
    id: 't-sz-custom-mosaic',
    name: 'Bespoke Atelier Mosaic Tile',
    size: 'Custom Mosaic',
    sizeCategory: '600x1200',
    sizeKey: 'sz-custom-mosaic',
    appKeys: ['bathroom', 'hotel', 'kitchen-top'],
    category: 'Multicolour',
    finish: 'Hand-Crafted Glass & Ceramic Mosaic',
    thickness: '8 mm',
    application: 'Feature Wall Noches, Spa Pools & Backsplashes',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=90',
    colors: [{ name: 'Gold & Emerald Flakes', hex: '#10B981' }],
    features: ['Artisanal Custom Pattern', 'Iridescent Glaze', 'Waterproof Net Backing'],
    description: 'Custom art mosaic sheets handcrafted with glass, gold foil and porcelain tesserae for bespoke feature accents.'
  }
];
