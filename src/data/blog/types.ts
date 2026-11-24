// Blog content model. Paragraph and list text may contain inline links written as [label](/path) or [label](https://...).

export type BlogImageKey =
  | "hero-book"
  | "writers-desk"
  | "book-mockups"
  | "book-to-film"
  | "trailer-editing"
  | "author-laptop"
  | "reading-community";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title?: string; text: string };

export interface BlogPost {
  slug: string;
  /** Visible H1. */
  title: string;
  /** <title> tag, under 60 characters, ends with " — Author's Word" only if it fits. */
  seoTitle: string;
  /** Meta description, 140–160 characters. */
  description: string;
  /** Short card excerpt, 1–2 sentences. */
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string; // ISO date YYYY-MM-DD
  readingMinutes: number;
  image: BlogImageKey;
  imageAlt: string;
  keywords: string[];
  body: Block[];
  related: string[];
  sources?: { label: string; url: string }[];
}
