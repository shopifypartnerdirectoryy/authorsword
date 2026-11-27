import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Feather, HandHeart, Layers, Palette, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClosingCta, SectionHeading } from "@/components/site/blocks";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BRAND, FEATURED } from "@/data/services";
import heroImg from "@/assets/hero-book.jpg";
import filmImg from "@/assets/book-to-film.jpg";
import mockupImg from "@/assets/book-mockups.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Author's Word — Your Story Deserves to Be Heard" },
      {
        name: "description",
        content:
          "Book promotion, author branding, reader outreach, cinematic trailers and Book-to-Film support for authors of every genre. Heard & Lifted.",
      },
      { property: "og:title", content: "Author's Word — Your Story Deserves to Be Heard" },
      {
        property: "og:description",
        content: "Creative book promotion and author services that help more readers discover your book.",
      },
    ],
  }),
  component: HomePage,
});

const WHY = [
  { icon: HandHeart, title: "Author-centred approach", text: "We begin with your book, your goals and your voice — never a one-size-fits-all script." },
  { icon: Palette, title: "Creative presentation", text: "Editorial design and storytelling that present your book the way it deserves." },
  { icon: Feather, title: "Professional materials", text: "Polished covers, mock-ups, trailers and copy you can use with confidence." },
  { icon: Layers, title: "Flexible service options", text: "Choose a single feature, combine services or request a tailored package." },
  { icon: Sparkles, title: "Clear pricing where available", text: "Published prices in USD. Custom work receives a clear written proposal." },
  { icon: BadgeCheck, title: "Approval before publication", text: "You review promotional wording and content before anything goes live." },
  { icon: Users, title: "New and established authors", text: "From debut releases to long backlists, we support authors at every stage." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="surface-ink relative overflow-hidden">
        <img
          src={heroImg}
          alt="An open book glowing with golden light beside a stack of hardcover books"
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page relative flex min-h-[calc(100svh-5rem)] items-center py-20">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow">Author&rsquo;s Word · Heard &amp; Lifted</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-[5.25rem]">
              Your Story Deserves to Be Seen.{" "}
              <em className="text-gold-gradient font-normal">Let's Help the Right Readers Discover It.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ivory/75">
              From cinematic book trailers and Goodreads discovery to Amazon optimization, author branding and AI
              search visibility, Author&rsquo;s Word helps authors build a stronger presence and connect their stories
              with more readers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/submit">
                  Submit Your Book <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="ivoryOutline" size="lg">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand introduction */}
      <section className="bg-background">
        <div className="container-page grid items-center gap-14 py-24 md:py-32 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why we exist"
              title="Every Author Has a Story. Every Story Deserves an Opportunity to Be Seen."
            />
            <div className="mt-8 space-y-5 text-lg text-muted-foreground">
              <p>
                Writing a book can take months or years. Getting it noticed can feel like a second full-time job —
                whether it&rsquo;s your first release or your tenth.
              </p>
              <p>
                Author&rsquo;s Word helps you overcome the challenges of visibility, promotion and discoverability with
                professional creative and marketing support, so you have more time to write while your books receive
                the attention they deserve.
              </p>
            </div>
            <p className="mt-10 font-display text-2xl italic text-ink">&ldquo;{BRAND.tagline}&rdquo;</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-0 translate-x-6 translate-y-6 rounded-sm border border-gold/40" aria-hidden="true" />
            <img
              src={mockupImg}
              alt="Three elegant hardcover book mock-ups in black, charcoal and gold"
              loading="lazy"
              className="relative w-full rounded-sm object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Everything your book needs to be found."
              intro="Thirteen areas of creative, marketing and publishing support — with clear pricing wherever we publish a rate."
            />
            <Button asChild variant="inkOutline" size="lg" className="shrink-0">
              <Link to="/services">View all services</Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((f, i) => (
              <ServiceCard
                key={f.title}
                slug={f.slug}
                title={f.title}
                summary={f.description}
                price={f.price}
                index={i}
                featured={f.slug === "book-to-film"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Author's Word */}
      <section className="surface-charcoal">
        <div className="container-page py-24 md:py-32">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Why Author's Word"
            title="Support that feels like being understood."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-charcoal p-8">
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-5 text-2xl text-ivory">{title}</h3>
                <p className="mt-3 text-[0.95rem] text-ivory/65">{text}</p>
              </div>
            ))}
            <div className="flex flex-col justify-between bg-ink p-8">
              <p className="font-display text-2xl italic text-gold-bright">Heard &amp; Lifted.</p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm text-ivory hover:text-gold-bright">
                Our philosophy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Book-to-Film */}
      <section className="surface-ink relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-80 lg:min-h-[36rem]">
            <img
              src={filmImg}
              alt="An open book in the beam of a vintage film projector"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink" />
          </div>
          <div className="flex items-center px-6 py-20 md:px-14">
            <div className="max-w-xl">
              <p className="eyebrow">Book-to-Film &amp; Screen Adaptation</p>
              <h2 className="mt-5 text-4xl text-ivory md:text-6xl">Your Story Could Have a Life Beyond the Page.</h2>
              <p className="mt-6 text-lg text-ivory/70">
                Explore opportunities to professionally position your literary work for potential film and television
                adaptation — from assessment and synopsis to pitch deck and presentation materials.
              </p>
              <Button asChild variant="gold" size="lg" className="mt-10">
                <Link to="/book-to-film">
                  Explore Book-to-Film Services <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Original creative portfolio */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our creative work"
              title="Stories deserve to be seen — and felt."
              intro="Explore original cinematic book trailers and 3D book mockups created to give books a distinctive visual presence."
            />
            <Button asChild variant="inkOutline" size="lg" className="shrink-0">
              <Link to="/portfolio">Explore the portfolio <ArrowRight /></Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Link to="/portfolio" className="group block overflow-hidden rounded-sm bg-ink">
              <img src="/__l5e/assets-v1/406db630-b21b-4fa2-b0a3-c5056890cbb5/cinematic-book-trailer-01-poster.jpg" alt="Cinematic book trailer portfolio preview" loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <p className="p-4 text-sm text-ivory">Cinematic Book Trailers <span className="text-gold">— 7 films</span></p>
            </Link>
            <Link to="/portfolio" className="group block overflow-hidden rounded-sm bg-cream">
              <img src="/__l5e/assets-v1/d5bc346d-a0ab-4352-b65a-e07591272928/a-thousand-little-cuts-3d-book-mockup.webp" alt="A Thousand Little Cuts 3D book mockup" loading="lazy" className="aspect-video w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]" />
              <p className="p-4 text-sm text-ink">3D Book Mockups <span className="text-gold">— 3 designs</span></p>
            </Link>
            <Link to="/portfolio" className="group block overflow-hidden rounded-sm bg-cream">
              <img src="/__l5e/assets-v1/66ff09c5-3829-47fc-8525-5fd4ba2d477c/nobel-pursuits-3d-book-mockup.webp" alt="Nobel Pursuits 3D book mockup" loading="lazy" className="aspect-video w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]" />
              <p className="p-4 text-sm text-ink">Original Creative Assets <span className="text-gold">— view all</span></p>
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
