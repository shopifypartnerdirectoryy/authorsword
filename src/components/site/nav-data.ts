export const MAIN_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/book-to-film", label: "Book-to-Film" },
  { to: "/contact", label: "Contact" },
] as const;

/** Services dropdown groups: each links to a service detail page. */
export const SERVICE_MENU = [
  {
    heading: "Promotion & Outreach",
    items: [
      { slug: "targeted-reader-email-campaigns", label: "Reader Email Campaigns" },
      { slug: "tiktok-book-feature", label: "TikTok Book Feature" },
      { slug: "instagram-book-feature", label: "Instagram Book Feature" },
      { slug: "goodreads-listopia-placement", label: "Goodreads Listopia" },
      { slug: "social-media-management", label: "Social Media Management" },
    ],
  },
  {
    heading: "Design & Media",
    items: [
      { slug: "book-cover-design", label: "Book Cover Design" },
      { slug: "3d-book-mockup-design", label: "3D Book Mock-ups" },
      { slug: "3d-book-mockup-video", label: "3D Mock-up Video" },
      { slug: "cinematic-book-trailers", label: "Cinematic Book Trailers" },
      { slug: "audiobook-production", label: "Audiobook Production" },
    ],
  },
  {
    heading: "Visibility & Platforms",
    items: [
      { slug: "author-website-design", label: "Author Websites" },
      { slug: "kdp-keyword-category-strategy", label: "Amazon & KDP" },
      { slug: "amazon-ads-campaign-setup", label: "Amazon Advertising" },
      { slug: "author-book-website-seo", label: "SEO for Authors" },
      { slug: "generative-engine-optimization", label: "AI Search Visibility" },
    ],
  },
  {
    heading: "Catalogue & Screen",
    items: [
      { slug: "backlist-catalogue-marketing", label: "Backlist Marketing" },
      { slug: "book-series-marketing", label: "Series Marketing" },
      { slug: "reviews-arc-media-outreach", label: "Reviews & Media Outreach" },
      { slug: "book-to-film", label: "Book-to-Film" },
    ],
  },
] as const;
