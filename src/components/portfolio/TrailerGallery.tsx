import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { clock, type Trailer } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function pauseOthers(current: HTMLVideoElement) {
  document.querySelectorAll<HTMLVideoElement>("video[data-trailer]").forEach((v) => {
    if (v !== current) v.pause();
  });
}

export function TrailerGallery({ items, className }: { items: Trailer[]; className?: string }) {
  const [open, setOpen] = useState<Trailer | null>(null);
  return (
    <>
      <ul className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
        {items.map((t) => (
          <li key={t.id} className="group flex flex-col overflow-hidden rounded-sm border border-line-dark bg-ink shadow-card">
            <div className="relative bg-ink" style={{ aspectRatio: `${t.width} / ${t.height}` }}>
              <video
                data-trailer
                className="h-full w-full object-contain"
                src={t.src}
                poster={t.poster}
                controls
                preload="none"
                playsInline
                aria-label={`${t.title} video player`}
                onPlay={(e) => pauseOthers(e.currentTarget)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl text-ivory">{t.title}</h3>
                <span className="shrink-0 pt-1 text-xs tracking-[0.2em] text-ivory/50">{clock(t.seconds)}</span>
              </div>
              <p className="text-sm text-ivory/65">{t.description}</p>
              <button
                type="button"
                onClick={() => {
                  document.querySelectorAll<HTMLVideoElement>("video[data-trailer]").forEach((v) => v.pause());
                  setOpen(t);
                }}
                className="mt-auto inline-flex items-center gap-2 self-start text-sm text-gold hover:text-gold-bright"
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" /> Watch enlarged
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-6xl border-line-dark bg-ink p-3 text-ivory sm:p-4">
          {open && (
            <>
              <DialogTitle className="px-1 font-display text-2xl text-ivory">{open.title}</DialogTitle>
              <DialogDescription className="px-1 text-ivory/65">{open.description}</DialogDescription>
              <video
                data-trailer
                key={open.id}
                className="w-full bg-ink object-contain"
                style={{ aspectRatio: `${open.width} / ${open.height}` }}
                src={open.src}
                poster={open.poster}
                controls
                autoPlay
                playsInline
                onPlay={(e) => pauseOthers(e.currentTarget)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
