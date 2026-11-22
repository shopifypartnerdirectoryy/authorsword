import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/blocks";
import { BRAND } from "@/data/services";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Author's Word" },
      { name: "description", content: "The terms that apply when you use the Author's Word website and services." },
      { property: "og:title", content: "Terms & Conditions — Author's Word" },
      { property: "og:description", content: "Pricing, proposals, approvals, results and rights when working with Author's Word." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="bg-background">
        <div className="container-page prose-legal max-w-3xl py-16 md:py-24">
          <p>These terms apply when you use this website or request services from Author&rsquo;s Word. By submitting a form, you agree to them.</p>
          <h2>Pricing</h2>
          <p>All prices are shown in US dollars (USD). Where a service is marked &ldquo;Custom Quote&rdquo; or &ldquo;Custom Proposal&rdquo;, the price is set out in a written proposal before any work begins.</p>
          <h2>Proposals and payment</h2>
          <p>Final deliverables, timelines, revisions and any additional costs are stated in your proposal. Work begins only after you approve the proposal and the agreed payment arrangements. No payment is collected automatically through this website.</p>
          <h2>Approval before publication</h2>
          <p>Where a service involves publishing promotional content, you will have the opportunity to review and approve it before publication.</p>
          <h2>Results</h2>
          <p>Promotion can improve visibility, but results depend on many factors including the book, audience, market, platform and campaign execution. We do not guarantee book sales, bestseller rankings, reviews, social media followers, views, reader numbers, search rankings, AI search citations, or film or television deals.</p>
          <h2>Book-to-Film services</h2>
          <p>Book-to-Film services help present your work professionally. They do not guarantee representation, producer interest, financing, production or distribution.</p>
          <h2>Your rights</h2>
          <p>You keep full ownership of your book and its literary rights unless a separate written agreement expressly states otherwise. You confirm that you have the right to share the materials you send us.</p>
          <h2>Third-party platforms</h2>
          <p>Some services involve platforms we do not control, such as Amazon, Goodreads, TikTok and Instagram. Their own rules and decisions apply.</p>
          <h2>Contact</h2>
          <p>Questions about these terms? Email <a className="text-ink underline decoration-gold underline-offset-4" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
