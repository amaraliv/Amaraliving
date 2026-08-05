/**
 * Amara Living - Chatbot Local Knowledge Base
 * Stores predefined business questions, keyword mappings, quick action chips, and default responses.
 */

export const WELCOME_MESSAGE = "👋 Welcome to Amara Living.\nHow can we help you today?";

export const DEFAULT_RESPONSE = "I'm sorry, I couldn't understand that. Please contact our support team for detailed assistance.";

export const QUICK_ACTIONS = [
  "View Products",
  "Granite Collection",
  "Tiles Collection",
  "Furniture Collection",
  "Delivery",
  "Contact Us",
  "Store Location"
];

export const chatbotData = [
  {
    keywords: ["view products", "products", "product", "all products", "catalog", "range", "what do you offer", "collections"],
    answer: "Amara Living specializes in luxury Furniture, premium imported & Indian Granite, and artisan Tiles. You can explore our dedicated collection pages or visit our Chennai & Madurai experience centers to view physical samples."
  },
  {
    keywords: ["granite", "granite collection", "stone", "marble", "absolute black", "imperial gold", "kashmir white", "viscon white", "countertop", "slabs"],
    answer: "We offer premium imported and Indian granite in multiple finishes including polished, leather, matte, and flamed. Popular varieties include Absolute Black, Imperial Gold, Kashmir White, and Viscon White for countertops, feature walls, and luxury flooring."
  },
  {
    keywords: ["tiles", "tiles collection", "floor tiles", "wall tiles", "vitrified", "ceramic", "porcelain", "terrazzo", "slate"],
    answer: "We provide premium floor tiles, wall tiles, vitrified tiles, ceramic tiles, and designer collections such as Terrazzo White and Slate Grey. Engineered for high performance, moisture resistance, and architectural beauty."
  },
  {
    keywords: ["furniture", "furniture collection", "sofa", "table", "chair", "bed", "wardrobe", "console", "sideboard", "seating", "dining", "custom"],
    answer: "Our furniture collection includes luxury velvet sofas, granite & oak dining tables, stone consoles, sideboards, beds, wardrobes, executive office furniture, and custom bespoke pieces handcrafted at our Chennai studio."
  },
  {
    keywords: ["delivery", "shipping", "timeline", "dispatch", "transport", "freight", "how long", "delivery time"],
    answer: "Delivery timelines depend on product availability and location. Our team will provide an estimated delivery date after order confirmation. In-stock items dispatch in 3-7 days, while custom pieces take 2-4 weeks with white-glove setup."
  },
  {
    keywords: ["contact", "contact us", "phone", "number", "email", "call", "reach", "sales", "customer support", "support", "help"],
    answer: "You can contact our sales team using the Contact page, call +91 73976 23509, or email us at chennai@amaraliv.com / corporate@amaraliv.com."
  },
  {
    keywords: ["location", "store", "store location", "address", "showroom", "atelier", "where to buy", "visit", "chennai", "madurai"],
    answer: "Visit our showroom to explore our premium furniture, tiles, and granite collections:\n• Chennai Atelier: No. 3, Seemathamman Nagar, Maduravoyal, Chennai - 600095\n• Madurai Center: 88, Meltur Road, Near KK Nagar, Madurai - 625020"
  },
  {
    keywords: ["price", "cost", "quotation", "quote", "rate", "discount", "estimate", "budget", "pricing"],
    answer: "Pricing varies depending on product, size, material, and finish. Please contact our team for a personalized quotation."
  },
  {
    keywords: ["consultation", "design service", "architect", "interior design", "appointment", "designer", "space planning"],
    answer: "We offer 1-on-1 interior design and material consultation. Our design team helps you select matching stone surfaces, tiles, and bespoke furniture tailored to your floor plan."
  },
  {
    keywords: ["warranty", "quality", "durability", "maintenance", "care", "guarantee"],
    answer: "All Amara Living stone surfaces and handcrafted furniture come with our quality guarantee. Our granite is factory-sealed for longevity, and furniture features high-density padding and durable hardwoods."
  },
  {
    keywords: ["hours", "timings", "opening time", "open", "sunday", "working hours"],
    answer: "Our experience centers and support channels are open Monday through Saturday from 10:00 AM to 8:00 PM."
  },
  {
    keywords: ["international", "export", "dubai", "singapore", "overseas", "foreign", "shipment"],
    answer: "We export world-class granite and custom furniture globally with dedicated offices in Dubai (GCC) and Singapore (SE Asia). Reach us at exports@amaraliv.com for international logistics."
  }
];

/**
 * Finds a matching answer for a user prompt string.
 * Converts input to lowercase and matches keywords using String.prototype.includes().
 */
export function getBotResponse(userQuery) {
  if (!userQuery || !userQuery.trim()) {
    return DEFAULT_RESPONSE;
  }
  
  const queryLower = userQuery.toLowerCase().trim();
  
  for (const item of chatbotData) {
    for (const keyword of item.keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        return item.answer;
      }
    }
  }
  
  return DEFAULT_RESPONSE;
}
