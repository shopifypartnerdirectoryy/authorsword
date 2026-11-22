import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList, ClosingCta, PageHero, SectionHeading } from "@/components/site/blocks";
import { BRAND } from "@/data/services";
import deskImg from "@/assets/writers-desk.jpg";
import heroImg from "@/assets/hero-book.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Author's Word — Heard & Lifted" },
      {
        name: "description",
        content:
          "Author's Word was created to lift the burden of book promotion, so authors can keep writing while their books reach more readers.",
      },
      { property: "og:title", content: "About Author's Word — Heard & Lifted" },
      {
        property: "og:description",
        content: "Why Author's Word exists, and how we help authors strengthen their visibility and identity.",
      },
    ],
  }),
  component: AboutPage,
});

const FOCUS = [
  "Build a stronger professional presence.",
  "Present their books attractively.",
  "Improve discoverability.",
  "Reach relevant readers.",
  "Strengthen their digital presence.",
  "Promote individual titles and entire catalogues.",
  "Explore opportunities for screen adaptation.",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Author's Word"
        title={<>Where your silent voice is heard.</>}
        intro={<p>{BRAND.tagline}</p>}
        image={heroImg}
      />

      <section className="bg-background">
        <div className="container-page grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="The unseen burden" title="Finishing the book is only one part of the journey." />
            <div className="mt-8 space-y-5 text-lg text-muted-foreground">
              <p>
                Writing and publishing a book takes courage, discipline and time. But once it&rsquo;s out in the world,
                many authors discover a second, quieter challenge: getting the book noticed, attracting readers and
                keeping it visible can become another full-time responsibility.
              </p>
              <p>
                Some are new authors trying to establish themselves. Others have published several books and still
                struggle with visibility, discoverability and reader engagement. Either way, the work of promotion
                often happens alone — and it takes time away from writing.
              </p>
              <p className="text-ink">Author&rsquo;s Word was created to help lift that burden.</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={deskImg}
              alt="A writer's desk with ivory manuscript pages, a golden fountain pen and a feather quill"
              loading="lazy"
              className="w-full rounded-sm object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-page grid gap-14 py-24 md:py-28 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What we do"
            title="Our work focuses on helping authors…"
            intro="Through creative book promotion, author branding, reader outreach, digital marketing and professional publishing support."
          />
          <div className="rounded-sm border bg-card p-8 shadow-card md:p-10">
            <CheckList items={FOCUS} />
          </div>
        </div>
      </section>

      <section className="surface-ink relative overflow-hidden">
        <div className="glow-gold absolute inset-0" aria-hidden="true" />
        <div className="container-page relative py-28 text-center">
          <p className="eyebrow">Our philosophy</p>
          <p className="mx-auto mt-8 max-w-4xl font-display text-6xl text-ivory md:text-8xl">
            Heard <span className="text-gold-gradient italic">&amp;</span> Lifted.
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-xl text-ivory/75">
            Authors should have more time to write, while their books receive the attention they deserve.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link to="/services">
                See how we help <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="ivoryOutline" size="lg">
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
