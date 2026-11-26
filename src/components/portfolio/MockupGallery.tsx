import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Mockup } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function MockupGallery({ items, className, tone = "light" }: { items: Mockup[]; className?: string; tone?: "light" | "dark" }) {
  const [idx, setIdx] = useState<number | null>(null);
  const cur = idx === null ? null : items[idx];
  const step = (d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length));
  return (
    <>
      <ul className={cn("grid gap-6 md:grid-cols-3", className)}>
        {items.map((m, i) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setIdx(i)}
              className="group block w-full overflow-hidden rounded-sm border bg-ink text-left shadow-card focus-visible:outline-gold"
              aria-label={`Enlarge ${m.title}`}
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-ink">
                <img src={m.src} alt={m.alt} width={m.width} height={m.height} loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-sm bg-ink/70 text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </button>
            <h3 className={cn("mt-4 text-2xl", tone === "dark" ? "text-ivory" : "text-ink")}>{m.title}</h3>
            <p className={cn("mt-1 text-sm", tone === "dark" ? "text-ivory/65" : "text-muted-foreground")}>{m.caption}</p>
          </li>
        ))}
      </ul>
      <Dialog open={cur !== null} onOpenChange={(o) => !o && setIdx(null)}>
        <DialogContent
          className="max-w-6xl border-line-dark bg-ink p-3 text-ivory sm:p-4"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {cur && (
            <>
              <DialogTitle className="px-1 font-display text-2xl text-ivory">{cur.title}</DialogTitle>
              <DialogDescription className="px-1 text-ivory/65">{cur.caption}</DialogDescription>
              <div className="relative">
                <img src={cur.src} alt={cur.alt} width={cur.width} height={cur.height} className="mx-auto max-h-[78vh] w-auto object-contain" />
                {items.length > 1 && (
                  <>
                    <button type="button" onClick={() => step(-1)} aria-label="Previous mockup" className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-ink/70 text-ivory hover:text-gold">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button type="button" onClick={() => step(1)} aria-label="Next mockup" className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-ink/70 text-ivory hover:text-gold">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
