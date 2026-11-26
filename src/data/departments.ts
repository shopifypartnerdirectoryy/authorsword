// Five service departments. Each lists existing service slugs from services.ts.
export type DepartmentImage = "reading-community" | "trailer-editing" | "book-mockups" | "author-laptop" | "book-to-film";

export interface Department {
  slug: string;
  number: string;
  name: string;
  headline: string;
  intro: string;
  description: string[];
  image: DepartmentImage;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  services: string[];
}

export const DEPARTMENTS: Department[] = [
  {
    slug: "book-promotion-reader-discovery",
    number: "01",
    name: "Book Promotion & Reader Discovery",
    headline: "Put your book where readers are already looking.",
    intro: "Goodreads, BookTok, Bookstagram, book clubs and reader outreach that introduce your book to readers who are likely to enjoy it.",
    description: [
      "Readers discover books through lists, recommendations, short videos and conversations with other readers. Our book promotion services meet them in those places, with honest, well-presented features that make your book easy to notice and easy to choose.",
      "Every campaign is planned around your genre and audience, and you approve promotional wording before anything is published.",
    ],
    image: "reading-community",
    imageAlt: "A book club of readers discussing hardcover books around a table in a warm bookshop",
    seoTitle: "Book Promotion Services & Reader Discovery — Author's Word",
    seoDescription: "Book promotion services for authors: Goodreads Listopia placement, BookTok and Bookstagram features, book clubs, influencer outreach and reader email campaigns.",
    services: ["goodreads-listopia-placement", "interactive-reader-book-challenges", "tiktok-book-feature", "instagram-book-feature", "book-club-promotion", "influencer-marketing", "targeted-reader-email-campaigns", "author-book-spotlight-campaigns", "reviews-arc-media-outreach"],
  },
  {
    slug: "creative-production",
    number: "02",
    name: "Creative Production",
    headline: "Visuals that make your story impossible to scroll past.",
    intro: "Cinematic book trailers, cover design, 3D book mockups, promotional graphics, character visuals and audiobook support.",
    description: [
      "A reader decides in seconds whether to look closer. Our creative production team builds the trailers, covers, mockups and graphics that give your book a confident, professional first impression across every platform.",
      "See real examples in our portfolio of cinematic book trailers and 3D book mockups.",
    ],
    image: "trailer-editing",
    imageAlt: "A video editing timeline on a monitor in a dark studio beside a hardcover book",
    seoTitle: "Cinematic Book Trailers, Covers & 3D Mockups — Author's Word",
    seoDescription: "Creative production for authors: cinematic book trailers from $65, book cover design from $40, 3D book mockups from $50, promotional graphics and audiobook support.",
    services: ["cinematic-book-trailers", "book-cover-design", "3d-book-mockup-design", "3d-book-mockup-video", "promotional-graphics", "character-visualization", "audiobook-production"],
  },
  {
    slug: "amazon-publishing-optimization",
    number: "03",
    name: "Amazon & Publishing Optimization",
    headline: "Help readers find — and choose — your book on Amazon.",
    intro: "KDP listing and description optimization, keyword and category research, A+ Content and Amazon advertising.",
    description: [
      "Most book buyers search before they buy. We refine your Amazon listing so it is easier to find and clearer to read: the right keywords and categories, a compelling description and rich A+ Content.",
      "When advertising makes sense, we plan, set up and manage Amazon Ads campaigns with careful budget control. Ad spend is paid directly to Amazon.",
    ],
    image: "book-mockups",
    imageAlt: "Hardcover book mockups in black, charcoal and gold",
    seoTitle: "Amazon KDP Optimization & Book Listing Services — Author's Word",
    seoDescription: "Amazon KDP listing optimization for authors: book description editing, keyword and category research, A+ Content, Author Central and Amazon advertising management.",
    services: ["amazon-listing-optimization", "kdp-keyword-category-strategy", "author-central-a-plus-content", "amazon-kdp-listing-audit", "amazon-ads-campaign-setup", "ongoing-ppc-management", "amazon-advertising-audit"],
  },
  {
    slug: "author-digital-growth",
    number: "04",
    name: "Author Digital Growth",
    headline: "A professional home for your author brand — online and in search.",
    intro: "Author website design and redesign, author SEO, email marketing, social media management, AI search visibility and author branding.",
    description: [
      "Your author platform should keep working between releases. We design author websites, strengthen your search presence, grow a reader list you own and present your author identity clearly — including for AI-powered search tools.",
      "Our bespoke author website ($845) and website redesign ($455) are two different services: one builds a new site from scratch, the other improves a site you already have.",
    ],
    image: "author-laptop",
    imageAlt: "A laptop showing an elegant author website beside hardcover books and a fountain pen",
    seoTitle: "Author Website Design, Author SEO & AI Search — Author's Word",
    seoDescription: "Author digital growth services: bespoke author website design ($845), website redesign ($455), author SEO, email marketing, social media and AI search visibility.",
    services: ["author-website-design", "author-website-redesign", "author-branding-positioning", "author-book-website-seo", "keyword-research-content-strategy", "schema-analytics-authority", "reader-acquisition-email-automation", "social-media-management", "generative-engine-optimization", "entity-author-authority"],
  },
  {
    slug: "advanced-author-opportunities",
    number: "05",
    name: "Advanced Author Opportunities",
    headline: "Long-term growth for your whole catalogue — and beyond the page.",
    intro: "Backlist marketing, book series promotion, long-term growth campaigns and Book-to-Film development support.",
    description: [
      "Some of the most valuable opportunities come later: an older title finding new readers, a series gathering momentum, or a story being considered for the screen.",
      "We plan longer-term campaigns and, for suitable works, help prepare Book-to-Film materials. Adaptation opportunities are selective and never guaranteed.",
    ],
    image: "book-to-film",
    imageAlt: "An open book in the beam of a vintage film projector",
    seoTitle: "Backlist, Series & Book-to-Film Support — Author's Word",
    seoDescription: "Advanced author services: backlist and catalogue marketing, book series promotion, long-term author growth campaigns and Book-to-Film adaptation support.",
    services: ["backlist-catalogue-marketing", "book-series-marketing", "long-term-author-growth", "book-to-film"],
  },
];

export function getDepartment(slug: string) {
  return DEPARTMENTS.find((d) => d.slug === slug);
}
export function departmentOfService(serviceSlug: string) {
  return DEPARTMENTS.find((d) => d.services.includes(serviceSlug));
}
