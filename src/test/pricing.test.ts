import { describe, expect, it } from "vitest";
import { emailCampaignPrice, FEATURED, getService, SERVICES } from "@/data/services";
import { applyOverride } from "@/lib/service-overrides";

const svc = (slug: string) => {
  const s = getService(slug);
  if (!s) throw new Error(`missing service ${slug}`);
  return s;
};

describe("Author's Word published prices (USD)", () => {
  it("TikTok Book Feature is $25 per book", () => {
    expect(svc("tiktok-book-feature").price).toBe("$25 per book");
  });

  it("Instagram Book Feature is $35 per book", () => {
    expect(svc("instagram-book-feature").price).toBe("$35 per book");
  });

  it("Professional Book Cover Design starts from $40", () => {
    expect(svc("book-cover-design").price).toBe("From $40");
  });

  it("Editorial 3D Book Mock-up Design starts from $50", () => {
    expect(svc("3d-book-mockup-design").price).toBe("From $50");
  });

  it("3D Book Mock-up Video is a custom quote", () => {
    expect(svc("3d-book-mockup-video").priceKind).toBe("quote");
  });

  it("Cinematic Book Trailers are $65 / $125 / $265 for 15 / 30 / 60 seconds", () => {
    const t = svc("cinematic-book-trailers").tiers ?? [];
    expect(t.map((x) => x.price)).toEqual(["$65", "$125", "$265"]);
    expect(t.map((x) => x.details?.[0])).toEqual([
      "15-second cinematic book trailer",
      "30-second cinematic book trailer",
      "60-second cinematic book trailer",
    ]);
  });

  it("Reader email campaigns cost $0.50 per contact", () => {
    expect(emailCampaignPrice(1000)).toBe(500);
    expect(emailCampaignPrice(10000)).toBe(5000);
    expect((svc("targeted-reader-email-campaigns").tiers ?? []).map((t) => t.price)).toEqual([
      "$500",
      "$1,000",
      "$1,500",
      "$2,500",
      "$5,000",
    ]);
  });

  it("Goodreads Listopia is $95 / $145 / $357 for 2 / 5 / 10 lists", () => {
    expect((svc("goodreads-listopia-placement").tiers ?? []).map((t) => `${t.name}=${t.price}`)).toEqual([
      "2 Lists=$95",
      "5 Lists=$145",
      "10 Lists=$357",
    ]);
  });

  it("Reader challenges are $150 / $275 / $395", () => {
    expect((svc("interactive-reader-book-challenges").tiers ?? []).map((t) => t.price)).toEqual(["$150", "$275", "$395"]);
  });

  it("Social media management is $45 / $85 / $155", () => {
    expect((svc("social-media-management").tiers ?? []).map((t) => t.price)).toEqual(["$45", "$85", "$155"]);
  });

  it("Author website is $845 and redesign is $455", () => {
    expect(svc("author-website-design").price).toBe("$845");
    expect(svc("author-website-redesign").price).toBe("$455");
  });

  it("Book-to-Film is a custom quote and featured on the homepage", () => {
    expect(svc("book-to-film").priceKind).toBe("quote");
    expect(FEATURED.some((f) => f.slug === "book-to-film")).toBe(true);
  });

  it("custom-quote services never carry a dollar figure", () => {
    for (const s of SERVICES.filter((x) => x.priceKind === "quote")) {
      expect(s.price).not.toMatch(/\$/);
    }
  });

  it("an admin price override replaces the displayed price, and an empty one keeps the original", () => {
    const base = svc("tiktok-book-feature");
    expect(applyOverride(base, { price_label: "$30 per book", summary: null }).price).toBe("$30 per book");
    expect(applyOverride(base, { price_label: "  ", summary: null }).price).toBe("$25 per book");
  });
});
