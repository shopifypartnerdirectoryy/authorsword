import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClosingCta, PageHero } from "@/components/site/blocks";

const FAQS: { q: string; a: string }[] = [
  { q: "Who can work with Author's Word?", a: "Any author who wants their book to be seen by more readers — independent, self-published and traditionally published authors, across all genres, whether you have one book or a full catalogue." },
  { q: "Do you work with first-time authors?", a: "Yes. Debut authors are a big part of why Author's Word exists. We'll help you understand your options and choose the support that makes sense for your first release." },
  { q: "Do you support different book genres?", a: "Yes. We work with authors across all genres, from fiction and fantasy to memoir, non-fiction, poetry and children's books, and tailor our approach to each genre's readers." },
  { q: "How do I submit my book?", a: "Use the Submit Your Book form. Share your title, genre, synopsis, cover and links, and choose the services you're interested in. We'll reply by email." },
  { q: "Can I choose more than one service?", a: "Absolutely. You can select several services in the submission form, choose one of our packages, or ask for a custom combination." },
  { q: "How does pricing work?", a: "Services with a published rate show their price in USD — for example, a TikTok Book Feature is $25 and an Instagram Book Feature is $35. Services that depend on scope are marked Custom Quote, and we prepare a clear written proposal before any work begins." },
  { q: "Do custom-quote services require a consultation?", a: "Not always. Often the details in your submission are enough for us to prepare a proposal. For larger or more complex projects, a consultation helps us understand exactly what you need." },
  { q: "Can I review promotional content before publication?", a: "Yes. For features and promotional content, you review the proposed wording and details and give your approval before anything is published." },
  { q: "How long does a project take?", a: "It depends on the service. A single social media feature is much quicker than a website or an audiobook. Your proposal sets out the expected timeline for your project." },
  { q: "Do you guarantee book sales?", a: "No. Honest promotion can improve visibility and help readers discover your book, but results depend on the book, audience, market, platform and campaign execution. We never guarantee sales, rankings, reviews, followers, views or reader numbers." },
  { q: "Can I promote an older book?", a: "Yes. Backlist books deserve attention too. Our Backlist & Catalogue Marketing and Series Marketing services are designed for books that are already published." },
  { q: "Do you provide Book-to-Film services?", a: "Yes. Book-to-Film & Screen Adaptation is one of our core services. We help authors assess, position and prepare their stories for potential film and television adaptation." },
  { q: "What does the Book-to-Film assessment involve?", a: "We review your book's premise, storyline, characters and adaptation potential, then advise on positioning and the materials — such as an adaptation synopsis or pitch deck — that would best present your story." },
  { q: "Do you guarantee a film or television deal?", a: "No. We do not promise representation, producer interest, financing, production, distribution or a deal. Our role is to help you present your story professionally. Your literary rights remain yours." },
  { q: "Can I request a custom package?", a: "Yes. Tell us what you need — including Book-to-Film — and we'll prepare a personalised proposal." },
  { q: "Is a 3D book mock-up video different from a cinematic trailer?", a: "Yes. A 3D mock-up video is a short animation of your book as a 3D object, featuring your cover, title and visual elements. A cinematic trailer uses atmosphere and visual storytelling to introduce the story itself. A mock-up video can be a flexible alternative when a full trailer isn't the right fit." },
  { q: "What is the difference between a book cover design and a 3D book mock-up?", a: "A book cover design is the artwork for your book itself — the front cover your readers see. A 3D mock-up is a realistic image of your finished book as a physical object, used in promotional graphics, websites and social media." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Author's Word" },
      {
        name: "description",
        content: "Answers about working with Author's Word: pricing, approvals, timelines, guarantees, Book-to-Film and more.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Author's Word" },
      { property: "og:description", content: "Clear, honest answers about our author services." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered honestly." />
      <section className="bg-background">
        <div className="container-page py-16 md:py-24">
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-b">
                <AccordionTrigger className="py-6 text-left font-display text-2xl font-medium text-ink hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mx-auto mt-14 max-w-3xl text-center text-muted-foreground">
            Still have a question?{" "}
            <Link to="/contact" className="text-ink underline decoration-gold underline-offset-4">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
