import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-ink relative overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </>
      )}
      <div className="glow-gold absolute inset-0" aria-hidden="true" />
      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-3xl animate-rise">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-5xl text-ivory md:text-6xl lg:text-7xl">{title}</h1>
          {intro && <div className="mt-6 max-w-2xl text-lg text-ivory/75">{intro}</div>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn("mt-4 text-4xl md:text-5xl", tone === "dark" ? "text-ivory" : "text-ink")}>{title}</h2>
      <span className={cn("gold-rule mt-6", align === "center" && "mx-auto")} />
      {intro && (
        <div className={cn("mt-6 text-lg", tone === "dark" ? "text-ivory/70" : "text-muted-foreground")}>{intro}</div>
      )}
    </div>
  );
}

export function PriceTag({ price, className }: { price: string; className?: string | undefined }) {
  const isQuote = /quote|proposal/i.test(price);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        isQuote ? "border-ink/20 text-ink/70" : "border-gold/60 bg-gold/10 text-ink",
        className,
      )}
    >
      {isQuote ? "Request a Custom Quote" : price}
    </span>
  );
}

export function CheckList({ items, tone = "light" }: { items: readonly string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span className={tone === "dark" ? "text-ivory/80" : "text-foreground/85"}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function ClosingCta({
  title = "Your Words Matter. Let\u2019s Help More People Find Them.",
  text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="glow-gold absolute inset-0" aria-hidden="true" />
      <div className="container-page relative py-24 text-center">
        <p className="eyebrow">Heard &amp; Lifted</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl text-ivory md:text-6xl">{title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory/70">
          {text ??
            "Your words deserve to travel further. Your stories deserve to be discovered. And you deserve support along the way."}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="lg">
            <Link to="/submit">
              Submit Your Book <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="ivoryOutline" size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Disclaimer({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("border-l-2 border-gold/60 pl-4 text-sm italic text-muted-foreground", className)}>{children}</p>
  );
}
