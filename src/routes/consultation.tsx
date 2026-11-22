import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Mail, MessageSquareText } from "lucide-react";
import { PageHero } from "@/components/site/blocks";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { CONSULTATION_INTERESTS } from "@/data/services";

export const Route = createFileRoute("/consultation")({
  validateSearch: (search: Record<string, unknown>): { interest?: string } => {
    const i = search["interest"];
    return typeof i === "string" && (CONSULTATION_INTERESTS as readonly string[]).includes(i) ? { interest: i } : {};
  },
  head: () => ({
    meta: [
      { title: "Book a Consultation — Author's Word" },
      {
        name: "description",
        content:
          "Request a consultation with Author's Word to discuss your book, your goals and the services or package that would suit you best.",
      },
      { property: "og:title", content: "Book a Consultation — Author's Word" },
      { property: "og:description", content: "Request a time to talk about your book and your goals." },
    ],
  }),
  component: ConsultationPage,
});

function ConsultationPage() {
  const { interest } = Route.useSearch();
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Let’s talk about your book."
        intro={<p>Choose a preferred date and time. We&rsquo;ll confirm by email — nothing is booked until we do.</p>}
      />
      <section className="bg-background">
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="space-y-8 lg:col-span-4">
            {[
              { icon: MessageSquareText, title: "Share your goals", text: "Tell us about your book and what you’d like to achieve." },
              { icon: CalendarClock, title: "Pick a preferred time", text: "Choose a date, time and time zone that suit you." },
              { icon: Mail, title: "Receive confirmation", text: "We reply by email to confirm the time or suggest an alternative." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-2xl text-ink">{title}</h2>
                  <p className="mt-1 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </aside>
          <div className="rounded-sm border bg-card/60 p-6 shadow-card md:p-10 lg:col-span-8">
            <ConsultationForm initialInterest={interest} />
          </div>
        </div>
      </section>
    </>
  );
}
