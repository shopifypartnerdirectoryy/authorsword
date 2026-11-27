import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClosingCta, PageHero, SectionHeading } from "@/components/site/blocks";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Creative Portfolio | Cinematic Book Trailers & 3D Mockups — Author's Word" },
      {
        name: "description",
        content:
          "Explore Author's Word's cinematic book trailer portfolio and original 3D book mockup work. Real creative examples made to bring books and stories to life.",
      },
      { property: "og:title", content: "Creative Portfolio — Author's Word" },
      {
        property: "og:description",
        content: "Explore cinematic book trailers and 3D book mockups from Author's Word.",
      },
    ],
  }),
  component: PortfolioPage,
});

const trailers = [
  {
    title: "Cinematic Book Trailer 01",
    video: "/__l5e/assets-v1/2897ddea-74ba-428d-b462-951006e4aab4/cinematic-book-trailer-01.mp4",
    poster: "/__l5e/assets-v1/406db630-b21b-4fa2-b0a3-c5056890cbb5/cinematic-book-trailer-01-poster.jpg",
  },
  {
    title: "Cinematic Book Trailer 02",
    video: "/__l5e/assets-v1/b97e2275-c9ac-45da-97f5-6812b73d2949/cinematic-book-trailer-02.mp4",
    poster: "/__l5e/assets-v1/c9a59690-f005-48c5-9a7f-fbb9564b1142/cinematic-book-trailer-02-poster.jpg",
  },
  {
    title: "Cinematic Book Trailer 03",
    video: "/__l5e/assets-v1/41a5a217-b05f-4097-887e-114b73d0b753/cinematic-book-trailer-03.mp4",
    poster: "/__l5e/assets-v1/34e2c282-125d-47e3-8aff-54660e9dafef/cinematic-book-trailer-03-poster.jpg",
  },
  {
    title: "Cinematic Book Trailer 04",
    video: "/__l5e/assets-v1/1c36b2e9-83f5-4ea7-866e-3177862fafdc/cinematic-book-trailer-04.mp4",
    poster: "/__l5e/assets-v1/c9c2e9df-d6cb-4ffa-9278-fe533a14d900/cinematic-book-trailer-04-poster.jpg",
  },
  {
    title: "Cinematic Book Trailer 05",
    video: "/__l5e/assets-v1/ab729fc0-cd00-4710-b475-fc7f85125fa6/cinematic-book-trailer-05.mp4",
    poster: "/__l5e/assets-v1/3e7d17d2-5172-452a-a896-99c804eb8055/cinematic-book-trailer-05-poster.jpg",
  },
  {
    title: "Cinematic Book Trailer 06",
    video: "/__l5e/assets-v1/c99f8016-c43d-4449-b90f-8d8ba873bf6b/cinematic-book-trailer-06.mp4",
    poster: "/__l5e/assets-v1/f7057484-eead-4261-bea6-0e9e99115a92/cinematic-book-trailer-06-poster.jpg",
  },
  {
    title: "Cinematic Book Trailer 07",
    video: "/__l5e/assets-v1/0eb798d3-5b9b-483a-9e4f-9c57da8bc9e8/cinematic-book-trailer-07.mp4",
    poster: "/__l5e/assets-v1/5d2520e8-4e4d-42a3-9edc-df43ba914afd/cinematic-book-trailer-07-poster.jpg",
  },
];

const mockups = [
  {
    title: "A Thousand Little Cuts",
    src: "/__l5e/assets-v1/d5bc346d-a0ab-4352-b65a-e07591272928/a-thousand-little-cuts-3d-book-mockup.webp",
  },
  {
    title: "Nobel Pursuits",
    src: "/__l5e/assets-v1/66ff09c5-3829-47fc-8525-5fd4ba2d477c/nobel-pursuits-3d-book-mockup.webp",
  },
  {
    title: "Superpower",
    src: "/__l5e/assets-v1/ed59bae0-b787-49fd-ad3b-39b8c6170354/superpower-3d-book-mockup.webp",
  },
];

function TrailerCard({ title, video, poster }: (typeof trailers)[number]) {
  return (
    <article className="overflow-hidden rounded-sm border border-border bg-card shadow-card">
      <div className="relative bg-ink">
        <video
          className="aspect-video w-full object-cover"
          controls
          preload="none"
          poster={poster}
          aria-label={title}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
      <div className="flex items-center justify-between gap-4 p-5">
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="inkOutline" size="sm" aria-label={`Watch ${title} enlarged`}>
              <Play className="h-4 w-4" /> Expand
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl border-line-dark bg-ink p-4 text-ivory sm:p-6">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-ivory">{title}</DialogTitle>
              <DialogDescription className="text-ivory/65">
                Watch this cinematic book trailer.
              </DialogDescription>
            </DialogHeader>
            <video className="w-full rounded-sm" controls preload="none" poster={poster} aria-label={title}>
              <source src={video} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}

function MockupCard({ title, src }: (typeof mockups)[number]) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group block w-full overflow-hidden rounded-sm border border-border bg-card text-left shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          aria-label={`Enlarge ${title} 3D book mockup`}
        >
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-cream p-5 sm:p-8">
            <img
              src={src}
              alt={`${title} 3D book mockup`}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex items-center justify-between gap-3 p-5">
            <h3 className="font-display text-xl text-ink">{title}</h3>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">View larger</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-line-dark bg-ink p-4 text-ivory sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-ivory">{title}</DialogTitle>
          <DialogDescription className="text-ivory/65">Original 3D book mockup.</DialogDescription>
        </DialogHeader>
        <div className="flex max-h-[75vh] items-center justify-center overflow-auto">
          <img src={src} alt={`${title} 3D book mockup enlarged`} className="max-h-[70vh] max-w-full object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Creative Work"
        title="Stories, brought to life."
        intro={
          <p>
            Every story has a world worth discovering. Explore our cinematic book trailers, created to bring stories,
            characters and imagination to life, alongside our 3D book mockup work.
          </p>
        }
      >
        <Button asChild variant="gold" size="lg">
          <Link to="/submit">Get Your Book Discovered <ArrowRight /></Link>
        </Button>
        <Button asChild variant="ivoryOutline" size="lg">
          <Link to="/services">Explore Our Services</Link>
        </Button>
      </PageHero>

      <section id="cinematic-book-trailers" className="bg-background scroll-mt-24">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            eyebrow="01 / Moving stories"
            title="Cinematic Book Trailers"
            intro="Every trailer is an invitation into a story's atmosphere. Watch the original creative examples below."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trailers.map((trailer) => <TrailerCard key={trailer.title} {...trailer} />)}
          </div>
        </div>
      </section>

      <section id="3d-book-mockups" className="bg-cream scroll-mt-24">
        <div className="container-page py-20 md:py-28">
          <SectionHeading
            eyebrow="02 / Visual presentation"
            title="3D Book Mockups & Visual Presentation"
            intro="Give a book a tangible, professional presence with carefully composed 3D visuals for websites, campaigns and social platforms."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockups.map((mockup) => <MockupCard key={mockup.title} {...mockup} />)}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Have a story to share?</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl text-ink md:text-4xl">
              Let’s create a presentation that feels true to your book.
            </h2>
          </div>
          <Button asChild variant="gold" size="lg">
            <Link to="/submit">Start Your Project <ArrowRight /></Link>
          </Button>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
