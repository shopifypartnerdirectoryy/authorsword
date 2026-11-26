// Author's Word service catalogue. Prices are in USD and must match the business's published rates.
// "Custom Quote" services never show an invented price.

export type PriceKind = "fixed" | "from" | "quote" | "per-unit" | "tiered";

export interface Tier {
  name: string;
  price: string;
  details?: string[];
}

export interface Service {
  slug: string;
  category: CategoryId;
  name: string;
  summary: string;
  description: string[];
  price: string;
  priceKind: PriceKind;
  tiers?: Tier[];
  tiersHeading?: string;
  includes?: string[];
  includesHeading?: string;
  notes?: string[];
  /** Matching option in the Submit Your Book form. */
  formService: FormService;
}

export type CategoryId =
  | "reader-outreach"
  | "social-media"
  | "design"
  | "trailers"
  | "audiobook"
  | "websites"
  | "amazon-kdp"
  | "amazon-ads"
  | "seo"
  | "ai-search"
  | "backlist"
  | "film";

export interface Category {
  id: CategoryId;
  letter: string;
  name: string;
  intro: string;
}

export const CATEGORIES: Category[] = [
  { id: "reader-outreach", letter: "A", name: "Reader Outreach & Book Publicity", intro: "Introduce your book to readers who are likely to love it — through email, curated features and reader communities." },
  { id: "social-media", letter: "B", name: "Social Media Growth & Management", intro: "Consistent, well-crafted content that keeps your books visible, planned and published for you." },
  { id: "design", letter: "C", name: "Book Cover & Visual Design", intro: "Covers and mock-ups that communicate your genre, atmosphere and identity at a glance." },
  { id: "trailers", letter: "D", name: "Cinematic Book Trailers", intro: "Short, atmospheric trailers that introduce your story the way film introduces a world." },
  { id: "audiobook", letter: "E", name: "Audiobook Production", intro: "Bring your book to listeners, from a single title to an entire catalogue." },
  { id: "websites", letter: "F", name: "Author Website Design", intro: "A professional home for your author identity, books and readers." },
  { id: "amazon-kdp", letter: "G", name: "Amazon SEO & KDP Optimization", intro: "Help readers find your book where they already shop for it." },
  { id: "amazon-ads", letter: "H", name: "Amazon Advertising & PPC Management", intro: "Carefully planned, monitored advertising on Amazon." },
  { id: "seo", letter: "I", name: "Search Engine Optimization for Authors & Books", intro: "Make your name, titles and website easier to discover through search." },
  { id: "ai-search", letter: "J", name: "AI Search Visibility & Generative Engine Optimization", intro: "Present your author and book information clearly for AI-powered search." },
  { id: "backlist", letter: "K", name: "Backlist, Series & Reader Outreach", intro: "Give every book in your catalogue — new or older — a fresh chance to be discovered." },
  { id: "film", letter: "L", name: "Book-to-Film & Screen Adaptation", intro: "Professionally assess, position and prepare your story for potential film and television adaptation." },
];

export const FORM_SERVICES = [
  "TikTok Book Feature",
  "Instagram Book Feature",
  "Book Cover Design",
  "3D Book Mock-up Design",
  "3D Book Mock-up Video",
  "Cinematic Book Trailer",
  "Audiobook Production",
  "Author Website Design",
  "Amazon & KDP Optimization",
  "Social Media Management",
  "Email Marketing",
  "Goodreads Placement",
  "SEO",
  "AI Search Visibility",
  "Backlist & Series Marketing",
  "Book-to-Film & Screen Adaptation",
  "Book Club & Influencer Promotion",
  "Promotional Graphics & Character Visualization",
  "Author Branding & Positioning",
  "Long-Term Author Growth",
  "Other / Not Sure Yet",
] as const;
export type FormService = (typeof FORM_SERVICES)[number];

/** $0.50 per contact for Targeted Reader Email Campaigns. */
export const EMAIL_PRICE_PER_CONTACT = 0.5;
export function emailCampaignPrice(contacts: number): number {
  return Math.round(contacts * EMAIL_PRICE_PER_CONTACT * 100) / 100;
}
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

const QUOTE = "Custom Quote";
const quoteNote = "Pricing depends on your book, goals and scope. Request a custom quote and we'll prepare a clear proposal.";

export const SERVICES: Service[] = [
  // A. Reader outreach & book publicity
  {
    slug: "targeted-reader-email-campaigns",
    category: "reader-outreach",
    name: "Targeted Reader Email Campaigns",
    summary: "Professionally prepared email promotions that introduce your book to relevant reading audiences.",
    description: [
      "We prepare a polished email feature for your book — cover, story hook, author introduction and a clear link — and send it to readers whose interests match your genre.",
      "Campaigns only use permission-based lists that include proper unsubscribe options. We never use private databases or unsolicited lists.",
    ],
    price: "$0.50 per contact",
    priceKind: "per-unit",
    tiersHeading: "Pricing examples",
    tiers: [1000, 2000, 3000, 5000, 10000].map((n) => ({
      name: `${n.toLocaleString("en-US")} contacts`,
      price: formatUSD(emailCampaignPrice(n)),
    })),
    notes: ["Campaigns introduce your book to readers; they do not guarantee purchases."],
    formService: "Email Marketing",
  },
  {
    slug: "reader-acquisition-email-automation",
    category: "reader-outreach",
    name: "Reader Acquisition & Email Automation",
    summary: "Build your own reader list and keep readers engaged with automated, thoughtful emails.",
    description: [
      "Your own mailing list is one of the most valuable assets an author can have. We set up the systems that invite readers in and keep the relationship warm between releases.",
    ],
    price: QUOTE,
    priceKind: "quote",
    includes: [
      "Lead magnet setup",
      "Sample chapter setup",
      "Automated welcome sequences",
      "Reader nurturing emails",
      "Re-engagement campaigns",
      "Audience segmentation",
      "Campaign performance tracking",
    ],
    notes: [quoteNote],
    formService: "Email Marketing",
  },
  {
    slug: "goodreads-listopia-placement",
    category: "reader-outreach",
    name: "Goodreads Discovery & Listopia Placement",
    summary: "Help readers discover your book through relevant, curated Goodreads reading lists.",
    description: [
      "Goodreads Listopia lists are where many readers browse for their next book. We identify lists that genuinely suit your book and add it where it belongs, so readers already searching your genre can find it.",
    ],
    price: "From $95",
    priceKind: "tiered",
    tiers: [
      { name: "2 Lists", price: "$95" },
      { name: "5 Lists", price: "$145" },
      { name: "10 Lists", price: "$357" },
    ],
    notes: ["Listopia rankings and placement approval are decided by Goodreads and its readers, so we cannot guarantee ranking, approval or sales."],
    formService: "Goodreads Placement",
  },
  {
    slug: "interactive-reader-book-challenges",
    category: "reader-outreach",
    name: "Interactive Reader Book Challenges",
    summary: "Structured reading challenges that invite readers to take part, engage and discover your book.",
    description: [
      "A reader challenge turns discovery into an experience: readers are invited to read, respond and share as part of a structured event built around your book.",
    ],
    price: "From $150",
    priceKind: "tiered",
    tiers: [
      { name: "Basic", price: "$150" },
      { name: "Standard", price: "$275" },
      { name: "Premium", price: "$395" },
    ],
    notes: ["Participation levels vary and are not guaranteed."],
    formService: "Goodreads Placement",
  },
  {
    slug: "tiktok-book-feature",
    category: "reader-outreach",
    name: "Curated TikTok Book Feature",
    summary: "A short, engaging TikTok presentation of your book with story highlights and a direct link.",
    description: [
      "We create a curated TikTok feature that presents your book attractively to short-form video audiences.",
      "Before anything is published, you receive the proposed feature details and promotional wording to review and approve.",
    ],
    price: "$25 per book",
    priceKind: "fixed",
    includes: [
      "Book cover presentation",
      "Book title and author name",
      "Two to three engaging story highlights",
      "Short promotional presentation",
      "Direct book purchase or discovery link",
      "Proposed promotional wording for your review",
      "Clean closing screen",
    ],
    notes: ["This is a curated promotional feature, not a guaranteed sales campaign."],
    formService: "TikTok Book Feature",
  },
  {
    slug: "instagram-book-feature",
    category: "reader-outreach",
    name: "Curated Instagram Book Feature",
    summary: "An elegant Instagram feature introducing your book, its story and you as the author.",
    description: [
      "We design a polished Instagram feature that introduces your book with an attractive cover presentation, story highlights and a clear link.",
      "You review the promotional wording before publication.",
    ],
    price: "$35 per book",
    priceKind: "fixed",
    includes: [
      "Attractive book cover presentation",
      "Title and author introduction",
      "Story highlights",
      "Short promotional copy",
      "Direct book link",
      "Professional closing design",
    ],
    notes: ["This is a curated promotional feature, not a guaranteed sales campaign."],
    formService: "Instagram Book Feature",
  },
  {
    slug: "author-book-spotlight-campaigns",
    category: "reader-outreach",
    name: "Author & Book Spotlight Campaigns",
    summary: "Coordinated spotlight content for launches, announcements and ongoing visibility.",
    description: [
      "A spotlight campaign brings several promotional pieces together around a moment that matters — a release, an anniversary, a new edition or simply a renewed push.",
    ],
    price: QUOTE,
    priceKind: "quote",
    includes: [
      "Author spotlights",
      "Book announcements",
      "Excerpt and quote graphics",
      "Release countdowns",
      "Short-form promotional videos",
      "Book presentation campaigns",
    ],
    notes: [quoteNote],
    formService: "Social Media Management",
  },

  // B. Social media
  {
    slug: "social-media-management",
    category: "social-media",
    name: "Full-Service Social Media Management",
    summary: "Planned, designed and published content for your author accounts — in 7, 14 or 30-day packages.",
    description: [
      "We plan, design, write and publish content on the platforms we agree together, so your books stay visible while you keep writing.",
    ],
    price: "From $45",
    priceKind: "tiered",
    tiers: [
      { name: "7-Day Sprint", price: "$45", details: ["6 static posts", "4 reels", "10 total content pieces"] },
      { name: "14-Day Growth", price: "$85", details: ["12 static posts", "8 reels", "20 total content pieces"] },
      { name: "30-Day Authority", price: "$155", details: ["21 static posts", "9 reels", "30 total content pieces"] },
    ],
    includesHeading: "Every package includes",
    includes: [
      "Content planning",
      "Graphic creation",
      "Captions",
      "Scheduling and publishing on agreed platforms",
      "One revision round per content batch",
    ],
    notes: ["We do not promise followers, engagement, sales or viral reach."],
    formService: "Social Media Management",
  },

  // C. Design
  {
    slug: "book-cover-design",
    category: "design",
    name: "Professional Book Cover Design",
    summary: "Covers that communicate your book's genre, atmosphere and identity.",
    description: [
      "Your cover is the first conversation a reader has with your book. We design professional covers that feel right for your genre and true to your story.",
      "The final quote may depend on complexity and requirements, and revision arrangements are set out in your project proposal.",
    ],
    price: "From $40",
    priceKind: "from",
    includes: [
      "Front cover design",
      "Genre-appropriate visual direction",
      "Typography and title arrangement",
      "Author-name presentation",
      "Suitable publishing-format preparation",
      "Revision arrangements defined in the project proposal",
    ],
    formService: "Book Cover Design",
  },
  {
    slug: "3d-book-mockup-design",
    category: "design",
    name: "Editorial 3D Book Mock-up Design",
    summary: "Realistic 3D book mock-ups for promotional graphics, websites and social media.",
    description: [
      "A realistic 3D mock-up lets readers see your book as a physical object. We create editorial-quality mock-ups for promotional graphics, author websites, social media and marketing materials.",
    ],
    price: "From $50",
    priceKind: "from",
    formService: "3D Book Mock-up Design",
  },
  {
    slug: "3d-book-mockup-video",
    category: "design",
    name: "3D Book Mock-up Video",
    summary: "A short animated 3D presentation of your book — a dynamic alternative to a full trailer.",
    description: [
      "A short animated 3D book presentation featuring your cover, title and selected visual elements.",
      "It can be a flexible option for authors who want movement and presence without a full cinematic book trailer. The final price depends on the animation, duration and complexity you choose.",
    ],
    price: QUOTE,
    priceKind: "quote",
    notes: [quoteNote],
    formService: "3D Book Mock-up Video",
  },

  // D. Trailers
  {
    slug: "cinematic-book-trailers",
    category: "trailers",
    name: "Cinematic Book Trailers",
    summary: "Atmospheric trailers that introduce your story through visual storytelling.",
    description: [
      "Our trailers use visual storytelling, atmosphere, book details and carefully selected creative elements to introduce your story to potential readers.",
      "You share your book details, cover artwork, genre, synopsis and creative preferences, and we shape the trailer around them.",
    ],
    price: "From $65",
    priceKind: "tiered",
    tiers: [
      { name: "Basic", price: "$65", details: ["15-second cinematic book trailer"] },
      { name: "Standard", price: "$125", details: ["30-second cinematic book trailer"] },
      { name: "Premium", price: "$265", details: ["60-second cinematic book trailer"] },
    ],
    formService: "Cinematic Book Trailer",
  },

  // E. Audiobook
  {
    slug: "audiobook-production",
    category: "audiobook",
    name: "Audiobook Production Services",
    summary: "From narrator casting to retail-ready audio — for one title or a full catalogue.",
    description: [
      "We coordinate the production of your audiobook at the level that suits your goals, from essential production to complete series and catalogue projects.",
    ],
    price: QUOTE,
    priceKind: "quote",
    tiersHeading: "Production levels",
    tiers: [
      { name: "Essential Production", price: QUOTE, details: ["Narrator planning and casting", "Recording coordination", "Audio editing", "Quality assurance", "Final audio delivery"] },
      { name: "Professional Production", price: QUOTE, details: ["Narration planning", "Recording coordination", "Editing and mastering", "Retail-ready audio preparation", "Distribution preparation", "Launch support"] },
      { name: "Premium Series & Catalogue", price: QUOTE, details: ["Multi-title audiobook production", "Series coordination", "Backlist audiobook conversion", "Production planning across titles", "Audio catalogue launch support"] },
    ],
    notes: [quoteNote],
    formService: "Audiobook Production",
  },

  // F. Websites
  {
    slug: "author-website-design",
    category: "websites",
    name: "Bespoke Author Website Design",
    summary: "A professional author website with your books, story and a way for readers to reach you.",
    description: [
      "A bespoke website gives your author identity a permanent, professional home — one you control, independent of any platform.",
    ],
    price: "$845",
    priceKind: "fixed",
    includes: [
      "Homepage",
      "About the author",
      "Books and catalogue",
      "Individual book pages",
      "Media or press kit",
      "Contact page",
      "Newsletter integration where required",
      "Responsive design",
      "Search-friendly structure",
    ],
    formService: "Author Website Design",
  },
  {
    slug: "author-website-redesign",
    category: "websites",
    name: "Author Website Overhaul & Redesign",
    summary: "Refresh an existing author website with a stronger layout, identity and experience.",
    description: [
      "For authors who already have a website but need an improved layout, visual identity, user experience and professional presentation.",
    ],
    price: "$455",
    priceKind: "fixed",
    formService: "Author Website Design",
  },

  // G. Amazon SEO & KDP
  {
    slug: "kdp-keyword-category-strategy",
    category: "amazon-kdp",
    name: "KDP Keyword & Category Strategy",
    summary: "Research-led keywords and categories that help readers find your book on Amazon.",
    description: ["We research how readers search for books like yours and recommend the keywords and categories that give your book the best chance of being found."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Keyword research", "Backend keyword strategy", "Category selection", "Genre and audience research"],
    notes: [quoteNote],
    formService: "Amazon & KDP Optimization",
  },
  {
    slug: "amazon-listing-optimization",
    category: "amazon-kdp",
    name: "Amazon Listing & Description Optimization",
    summary: "A stronger product page — from title and subtitle to description and metadata.",
    description: ["We refine how your book is presented on Amazon so readers who land on your page understand quickly why it's for them."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Book title and subtitle review", "Book description editing", "Product page presentation", "Metadata optimization", "Competitor research"],
    notes: [quoteNote],
    formService: "Amazon & KDP Optimization",
  },
  {
    slug: "author-central-a-plus-content",
    category: "amazon-kdp",
    name: "Author Central & A+ Content",
    summary: "A polished Author Central profile and rich A+ Content for your book pages.",
    description: ["Present yourself and your books with the same care readers see from major publishers."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Amazon Author Central profile support", "Author biography optimization", "A+ Content planning and design", "Comparison charts", "Editorial graphics"],
    notes: [quoteNote],
    formService: "Amazon & KDP Optimization",
  },
  {
    slug: "amazon-kdp-listing-audit",
    category: "amazon-kdp",
    name: "Amazon KDP Listing Audit",
    summary: "A clear review of your current listing with practical recommendations.",
    description: ["A focused audit of your existing Amazon listing, with a clear list of improvements you can act on."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Listing review", "Cover presentation review", "Description assessment", "Keyword and category review", "Improvement recommendations"],
    notes: [quoteNote],
    formService: "Amazon & KDP Optimization",
  },

  // H. Amazon Ads
  {
    slug: "amazon-ads-campaign-setup",
    category: "amazon-ads",
    name: "Amazon Ads Campaign Setup",
    summary: "Well-structured Amazon advertising campaigns, planned around your book and budget.",
    description: ["We plan and set up your Amazon advertising so it starts on solid foundations."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Campaign planning", "Sponsored Products setup", "Eligible ad-format setup", "Keyword and targeting research", "Budget planning"],
    notes: [quoteNote, "Advertising spend is paid separately to Amazon and results are not guaranteed."],
    formService: "Amazon & KDP Optimization",
  },
  {
    slug: "ongoing-ppc-management",
    category: "amazon-ads",
    name: "Ongoing PPC Management",
    summary: "Ongoing monitoring and refinement of your Amazon advertising.",
    description: ["Advertising works best when it's watched closely. We monitor, adjust and report so your budget is used thoughtfully."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Bid optimization", "Search-term monitoring", "Negative keyword management", "Budget adjustments", "Performance reporting"],
    notes: [quoteNote],
    formService: "Amazon & KDP Optimization",
  },
  {
    slug: "amazon-advertising-audit",
    category: "amazon-ads",
    name: "Amazon Advertising Audit",
    summary: "A review of your existing campaigns with clear optimization recommendations.",
    description: ["Already running ads? We review what's in place and recommend practical improvements."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Existing campaign review", "Targeting analysis", "Budget assessment", "Keyword review", "Optimization recommendations"],
    notes: [quoteNote],
    formService: "Amazon & KDP Optimization",
  },

  // I. SEO
  {
    slug: "author-book-website-seo",
    category: "seo",
    name: "Author & Book Website SEO",
    summary: "Technical and on-page improvements so search engines understand your author website.",
    description: ["We review and improve the foundations that help search engines find, understand and present your website."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Technical SEO audit", "On-page optimization", "Mobile performance review", "Metadata optimization", "Broken-link review", "Sitemap and robots.txt review"],
    notes: [quoteNote, "Search rankings are decided by search engines and cannot be guaranteed."],
    formService: "SEO",
  },
  {
    slug: "keyword-research-content-strategy",
    category: "seo",
    name: "Keyword Research & Content Strategy",
    summary: "Understand how readers search, and plan content that meets them there.",
    description: ["Research into how readers search for you, your titles and your genre — turned into a practical content plan."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Author-name keyword research", "Book-title keyword research", "Genre-related keywords", "Search-intent research", "Blog and content planning"],
    notes: [quoteNote],
    formService: "SEO",
  },
  {
    slug: "schema-analytics-authority",
    category: "seo",
    name: "Schema, Analytics & Authority Building",
    summary: "Structured data, analytics and authority recommendations for your author presence.",
    description: ["Give search engines clear, structured information about you and your books, and measure what's working."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Structured data and schema markup", "Google Analytics integration", "Google Search Console setup", "Author and book entity optimization", "Authority-building recommendations"],
    notes: [quoteNote],
    formService: "SEO",
  },

  // J. AI search
  {
    slug: "generative-engine-optimization",
    category: "ai-search",
    name: "Generative Engine Optimization (GEO)",
    summary: "Make your author and book information easier for AI-powered search to understand and reference.",
    description: [
      "More readers now ask AI assistants for book recommendations. We help your author and book information become clearer and easier for AI-powered search systems — such as ChatGPT Search, Perplexity and Google AI Overviews — to understand and reference.",
    ],
    price: QUOTE,
    priceKind: "quote",
    includes: ["AI-search visibility assessment", "Structured content optimization", "Conversational search optimization", "Entity clarity", "Content organization"],
    notes: [quoteNote, "Inclusion or citation in AI search results is decided by each platform and cannot be guaranteed."],
    formService: "AI Search Visibility",
  },
  {
    slug: "entity-author-authority",
    category: "ai-search",
    name: "Entity & Author Authority Optimization",
    summary: "Consistent, structured author and book information across your presence.",
    description: ["We structure your author identity and book information so it is consistent and clearly understood wherever it appears."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Author identity structuring", "Book entity information", "Structured data", "Author website authority", "Consistent author and book information"],
    notes: [quoteNote, "Inclusion or citation in AI search results cannot be guaranteed."],
    formService: "AI Search Visibility",
  },

  // K. Backlist & series
  {
    slug: "backlist-catalogue-marketing",
    category: "backlist",
    name: "Backlist & Catalogue Marketing",
    summary: "Renewed visibility for the books you've already published.",
    description: ["Older books deserve attention too. We create campaigns that introduce your existing catalogue to new readers and help them move from one of your books to the next."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Existing book catalogue promotion", "Backlist visibility campaigns", "Multi-title presentation", "Cross-book discovery", "Reader outreach"],
    notes: [quoteNote],
    formService: "Backlist & Series Marketing",
  },
  {
    slug: "book-series-marketing",
    category: "backlist",
    name: "Book Series Marketing",
    summary: "Present your series as a whole and guide readers from book one onwards.",
    description: ["A series is a promise of a longer journey. We present it as one, with cross-promotion and campaigns designed for series readers."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Series presentation", "Cross-promotion between titles", "Series-page optimization", "Reader acquisition campaigns", "Promotional graphics and videos"],
    notes: [quoteNote],
    formService: "Backlist & Series Marketing",
  },
  {
    slug: "reviews-arc-media-outreach",
    category: "backlist",
    name: "Reviews, ARC & Media Outreach",
    summary: "Advance reader copies, blogger, book club, podcast and media outreach.",
    description: ["We plan and coordinate outreach to the readers, reviewers and hosts who can help introduce your book to wider audiences."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Advance Reader Copy campaign planning", "Book blogger outreach", "Book club outreach", "Podcast outreach", "Media outreach", "Virtual launch event support", "Interview and giveaway coordination"],
    notes: [quoteNote, "We do not promise positive reviews or guaranteed media coverage."],
    formService: "Backlist & Series Marketing",
  },

  // Added services (custom quote)
  {
    slug: "book-club-promotion",
    category: "reader-outreach",
    name: "Book Club Promotion",
    summary: "Introduce your book to reading groups with discussion-ready materials and thoughtful outreach.",
    description: ["Book clubs read together, talk together and recommend together. We prepare the materials that make your book an easy, appealing choice for a group, and reach out to communities whose tastes suit your genre."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Reading-group discussion guide", "Book club pitch materials", "Outreach to suitable reading groups and communities", "Author Q&A preparation", "Virtual session coordination where available"],
    notes: [quoteNote, "Book clubs choose their own titles, so selection is never guaranteed."],
    formService: "Book Club & Influencer Promotion",
  },
  {
    slug: "influencer-marketing",
    category: "social-media",
    name: "Book Influencer Marketing",
    summary: "Coordinated outreach to BookTok, Bookstagram and book-blog creators whose audiences suit your genre.",
    description: ["Readers trust the creators they follow. We research creators whose audiences match your book, prepare a clear pitch and coordinate review copies and content briefs."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Creator research by genre and audience", "Pitch and outreach materials", "Review copy coordination", "Content brief preparation", "Campaign tracking"],
    notes: [quoteNote, "Creators decide independently whether and how to feature a book. Paid partnerships are disclosed according to each platform's rules, and coverage is not guaranteed."],
    formService: "Book Club & Influencer Promotion",
  },
  {
    slug: "promotional-graphics",
    category: "design",
    name: "Promotional Graphics",
    summary: "Social posts, quote cards, launch graphics and ad creatives designed around your cover and brand.",
    description: ["Consistent, well-designed graphics make every announcement look intentional. We create a set of visuals built from your cover, typography and story."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Social media graphics", "Quote and teaser cards", "Launch and countdown graphics", "Website and profile header images", "Ad creative sizes"],
    notes: [quoteNote],
    formService: "Promotional Graphics & Character Visualization",
  },
  {
    slug: "character-visualization",
    category: "design",
    name: "Character Creation & Visualization",
    summary: "Visual interpretations of your characters for promotion, reader engagement and pitch materials.",
    description: ["Readers love meeting characters. We turn your descriptions into visual interpretations you can use in social content, trailers and pitch decks."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Character concept visuals based on your descriptions", "Character cards for social media", "Visual mood boards", "Artwork for trailers and pitch decks"],
    notes: [quoteNote, "You approve every character interpretation before it is used."],
    formService: "Promotional Graphics & Character Visualization",
  },
  {
    slug: "author-branding-positioning",
    category: "websites",
    name: "Author Branding & Digital Positioning",
    summary: "A clear, consistent author identity across your website, social profiles, retailer pages and search.",
    description: ["Readers, reviewers and search engines should all understand who you are and what you write. We define that identity and make it consistent everywhere you appear."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Brand positioning review", "Author bio and tagline writing", "Visual identity guidance", "Profile consistency across platforms", "Reader audience definition"],
    notes: [quoteNote],
    formService: "Author Branding & Positioning",
  },
  {
    slug: "long-term-author-growth",
    category: "backlist",
    name: "Long-Term Author Growth Campaigns",
    summary: "Ongoing, planned visibility work across your catalogue, platforms and reader list.",
    description: ["Visibility compounds when it is consistent. We plan and run coordinated promotion over months rather than days, reviewing progress with you and adjusting as your catalogue grows."],
    price: QUOTE,
    priceKind: "quote",
    includes: ["Monthly or quarterly campaign planning", "Coordinated promotion across services", "Reader list growth", "Progress reviews and reporting", "Release planning for future titles"],
    notes: [quoteNote, "Results vary and are never guaranteed."],
    formService: "Long-Term Author Growth",
  },

  // L. Book-to-Film (full page lives at /book-to-film)
  {
    slug: "book-to-film",
    category: "film",
    name: "Book-to-Film & Screen Adaptation",
    summary: "Assess, position and prepare your story for potential film and television adaptation.",
    description: [
      "Some stories have the potential to reach audiences beyond the pages of a book. Author's Word helps authors professionally assess, position and prepare their literary works for potential film and television adaptation opportunities.",
    ],
    price: QUOTE,
    priceKind: "quote",
    includes: [
      "Book-to-Screen Assessment",
      "Story Positioning",
      "Adaptation Synopsis Preparation",
      "Pitch Deck Development",
      "Screen Adaptation Presentation Materials",
      "Industry Introductions, where available and authorised",
    ],
    notes: ["We do not promise representation, producer interest, financing, production, distribution or a film or television deal."],
    formService: "Book-to-Film & Screen Adaptation",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesInCategory(id: CategoryId): Service[] {
  return SERVICES.filter((s) => s.category === id);
}

/** Homepage featured categories, each linking to a lead service detail page. */
export interface FeaturedCategory {
  title: string;
  description: string;
  price: string;
  slug: string;
}

export const FEATURED: FeaturedCategory[] = [
  { title: "Book Marketing & Reader Outreach", description: "Permission-based email campaigns and curated features that put your book in front of relevant readers.", price: "$0.50 per contact", slug: "targeted-reader-email-campaigns" },
  { title: "Social Media Book Features", description: "Curated TikTok and Instagram features with story highlights and a direct link.", price: "From $25", slug: "tiktok-book-feature" },
  { title: "Book Cover & Visual Design", description: "Professional covers that communicate your genre, atmosphere and identity.", price: "From $40", slug: "book-cover-design" },
  { title: "Cinematic Book Trailers", description: "15, 30 and 60-second trailers that introduce your story through atmosphere and visuals.", price: "From $65", slug: "cinematic-book-trailers" },
  { title: "3D Book Mock-ups & Videos", description: "Realistic editorial mock-ups and animated 3D book presentations.", price: "From $50", slug: "3d-book-mockup-design" },
  { title: "Author Branding & Websites", description: "Bespoke author websites and redesigns that give your identity a professional home.", price: "From $455", slug: "author-website-design" },
  { title: "Amazon & KDP Optimization", description: "Keywords, categories, listings and A+ Content that help readers find you on Amazon.", price: "Custom Quote", slug: "kdp-keyword-category-strategy" },
  { title: "Goodreads & Reader Challenges", description: "Listopia placements and interactive reading challenges for genuine reader engagement.", price: "From $95", slug: "goodreads-listopia-placement" },
  { title: "Email Marketing", description: "Lead magnets, welcome sequences and automation to grow a reader list you own.", price: "Custom Quote", slug: "reader-acquisition-email-automation" },
  { title: "Search Engine Optimization", description: "Technical SEO, keyword research and structured data for your author website.", price: "Custom Quote", slug: "author-book-website-seo" },
  { title: "AI Search Visibility", description: "Clear, structured author and book information for AI-powered search.", price: "Custom Quote", slug: "generative-engine-optimization" },
  { title: "Audiobook Production", description: "Narrator casting, recording coordination and retail-ready audio for one title or many.", price: "Custom Quote", slug: "audiobook-production" },
  { title: "Book-to-Film & Screen Adaptation", description: "Assessment, positioning and pitch materials for potential film and television adaptation.", price: "Custom Quote", slug: "book-to-film" },
];

export const CONSULTATION_INTERESTS = [
  "Book promotion & reader outreach",
  "Social media features or management",
  "Book cover or 3D mock-up design",
  "Cinematic book trailer",
  "Audiobook production",
  "Author website",
  "Amazon, KDP & advertising",
  "SEO & AI search visibility",
  "Backlist & series marketing",
  "Book-to-Film & Screen Adaptation",
  "Packages / custom combination",
  "Other / Custom Project",
] as const;

export const BRAND = {
  name: "Author's Word",
  tagline: "Where Your Silent Voice Is Heard, And Your Unseen Burden Is Lifted.",
  short: "Heard & Lifted",
  email: "authorswordofficial@gmail.com",
} as const;
