import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/blocks";
import { BRAND } from "@/data/services";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Author's Word" },
      { name: "description", content: "How Author's Word collects, uses and protects the information you share with us." },
      { property: "og:title", content: "Privacy Policy — Author's Word" },
      { property: "og:description", content: "How we handle your personal information and book details." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-background">
        <div className="container-page prose-legal max-w-3xl py-16 md:py-24">
          <p>This policy explains what information Author&rsquo;s Word collects through this website, how we use it and the choices you have.</p>
          <h2>Information we collect</h2>
          <ul>
            <li>Details you provide in our forms: your name, email address, book or project details, links, budget and any message you write.</li>
            <li>Files you choose to upload, such as a book cover image.</li>
            <li>Consultation preferences, including preferred date, time and time zone.</li>
          </ul>
          <h2>How we use it</h2>
          <p>We use your information only to review your request, reply to you, prepare proposals and deliver the services you agree to. We do not sell your information.</p>
          <h2>Who can see it</h2>
          <p>Submissions are stored securely and are visible only to authorised Author&rsquo;s Word administrators. Submissions are never displayed publicly.</p>
          <h2>Promotional content</h2>
          <p>We only publish promotional content about your book after you have reviewed and approved it.</p>
          <h2>How long we keep it</h2>
          <p>We keep your information for as long as needed to respond to you and provide our services, or as required by law. You can ask us to delete it at any time.</p>
          <h2>Your rights</h2>
          <p>You can ask to access, correct or delete the information we hold about you by emailing <a className="text-ink underline decoration-gold underline-offset-4" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>
          <h2>Changes</h2>
          <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
        </div>
      </section>
    </>
  );
}
