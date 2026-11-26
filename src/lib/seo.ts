// Shared SEO helpers: canonical URLs, Open Graph tags and JSON-LD builders.
import { BRAND } from "@/data/services";
import { SOCIAL_LINKS } from "@/data/social";

export const SITE_URL = "https://authorsword.lovable.app";

/** Paste the codes from Google Search Console / Bing Webmaster Tools here (content value only). */
export const SEARCH_VERIFICATION = { google: "", bing: "" };

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

type Json = Record<string, unknown>;

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  image?: string | undefined;
  jsonLd?: Json[];
  noindex?: boolean;
}) {
  const url = absoluteUrl(opts.path);
  const meta: Record<string, string>[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.type ?? "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (opts.image) {
    meta.push({ property: "og:image", content: opts.image }, { name: "twitter:image", content: opts.image });
  }
  if (opts.noindex) meta.push({ name: "robots", content: "noindex" });
  return {
    meta,
    links: opts.noindex ? [] : [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([webPageJsonLd(opts.title, opts.description, url), ...(opts.jsonLd ?? [])]),
      },
    ],
  };
}

function webPageJsonLd(name: string, description: string, url: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function serviceJsonLd(s: { name: string; description: string; path: string; category?: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: absoluteUrl(s.path),
    serviceType: s.category ?? s.name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: AREAS,
  };
}

const AREAS = ["United States", "United Kingdom", "Canada", "Australia", "Ireland"].map((name) => ({ "@type": "Country", name }));

export function siteJsonLd(): Json[] {
  const sameAs = Object.values(SOCIAL_LINKS).filter((u) => u.trim() !== "");
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
      logo: absoluteUrl("/favicon.svg"),
      email: BRAND.email,
      slogan: "Heard & Lifted",
      description:
        "Author's Word is an international author marketing and publishing support agency offering book promotion, Goodreads discovery, cinematic book trailers, 3D book mockups, Amazon KDP optimization, author websites, SEO and AI search visibility, and Book-to-Film support.",
      areaServed: AREAS,
      knowsAbout: ["Book marketing", "Book promotion", "Goodreads Listopia", "Cinematic book trailers", "Amazon KDP optimization", "Author website design", "Author SEO", "Generative Engine Optimization"],
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: BRAND.email, availableLanguage: "English" },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ];
}
