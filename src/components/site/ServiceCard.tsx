import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PriceTag } from "./blocks";

function ServiceHref({ slug, className, children }: { slug: string; className?: string; children: ReactNode }) {
  if (slug === "book-to-film") {
    return (
      <Link to="/book-to-film" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/services/$slug" params={{ slug }} className={className}>
      {children}
    </Link>
  );
}

export function ServiceCard({
  slug,
  title,
  summary,
  price,
  index,
  featured,
}: {
  slug: string;
  title: string;
  summary: string;
  price: string;
  index?: number | undefined;
  featured?: boolean | undefined;
}) {
  return (
    <ServiceHref
      slug={slug}
      className={cn(
        "group relative flex h-full flex-col justify-between rounded-sm border bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70",
        featured && "border-gold/50 bg-ink text-ivory",
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          {index !== undefined && (
            <span className="font-display text-sm italic text-gold">{String(index + 1).padStart(2, "0")}</span>
          )}
          <ArrowUpRight
            className={cn(
              "ml-auto h-5 w-5 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold",
              featured ? "text-ivory/50" : "text-ink/30",
            )}
            aria-hidden="true"
          />
        </div>
        <h3 className={cn("mt-4 text-2xl leading-tight", featured ? "text-ivory" : "text-ink")}>{title}</h3>
        <p className={cn("mt-3 text-[0.95rem] leading-relaxed", featured ? "text-ivory/70" : "text-muted-foreground")}>
          {summary}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <PriceTag price={price} className={featured ? "border-gold/60 bg-gold/10 text-ivory" : undefined} />
        <span className="text-xs uppercase tracking-[0.2em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
          Details
        </span>
      </div>
    </ServiceHref>
  );
}
