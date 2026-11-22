import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/blocks";
import { SubmitBookForm } from "@/components/forms/SubmitBookForm";
import { FORM_SERVICES, type FormService } from "@/data/services";

export const Route = createFileRoute("/submit")({
  validateSearch: (search: Record<string, unknown>): { service?: FormService } => {
    const s = search["service"];
    return typeof s === "string" && (FORM_SERVICES as readonly string[]).includes(s) ? { service: s as FormService } : {};
  },
  head: () => ({
    meta: [
      { title: "Submit Your Book — Author's Word" },
      {
        name: "description",
        content:
          "Share your book with Author's Word: title, genre, synopsis, cover and the services you're interested in. We'll reply with suitable options.",
      },
      { property: "og:title", content: "Submit Your Book — Author's Word" },
      { property: "og:description", content: "Tell us about your book and the support you're looking for." },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero
        eyebrow="Submit Your Book"
        title="Let’s help more readers find your story."
        intro={<p>Share your book and the kind of support you&rsquo;re looking for. It takes about five minutes.</p>}
      />
      <section className="bg-background">
        <div className="container-page py-16 md:py-24">
          <div className="mx-auto max-w-4xl rounded-sm border bg-card/60 p-6 shadow-card md:p-12">
            <SubmitBookForm initialService={service} />
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-muted-foreground">
            Your submission is private and never shown publicly.
          </p>
        </div>
      </section>
    </>
  );
}
