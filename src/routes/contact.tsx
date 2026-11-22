import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/blocks";
import { ContactForm } from "@/components/forms/ContactForm";
import { BRAND } from "@/data/services";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Author's Word" },
      {
        name: "description",
        content: "Get in touch with Author's Word by email at authorswordofficial@gmail.com or through our contact form.",
      },
      { property: "og:title", content: "Contact Author's Word" },
      { property: "og:description", content: "Questions about your book or our services? We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We’d love to hear from you."
        intro={<p>Questions about a service, a package or your book? Send us a message and we&rsquo;ll reply by email.</p>}
      />
      <section className="bg-background">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="rounded-sm bg-ink p-8 text-ivory shadow-card">
              <Mail className="h-6 w-6 text-gold" />
              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-ivory/50">Email</p>
              <a href={`mailto:${BRAND.email}`} className="mt-2 block break-all font-display text-2xl text-gold-bright hover:underline">
                {BRAND.email}
              </a>
              <div className="my-8 h-px bg-line-dark" />
              <p className="text-ivory/70">Ready to share your book?</p>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild variant="gold">
                  <Link to="/submit">Submit Your Book</Link>
                </Button>
                <Button asChild variant="ivoryOutline">
                  <Link to="/consultation">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </aside>
          <div className="rounded-sm border bg-card/60 p-6 shadow-card md:p-10 lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
