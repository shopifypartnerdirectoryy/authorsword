import { cn } from "@/lib/utils";

/** Author's Word mark: an open book, a golden quill and light rising from the pages. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} aria-hidden="true" fill="none">
      <g stroke="var(--gold-bright)" strokeWidth="1.2" strokeLinecap="round" opacity="0.85">
        <path d="M32 24 V10" />
        <path d="M26 25 L20 13" />
        <path d="M38 25 L44 13" />
        <path d="M21 28 L12 20" opacity="0.6" />
        <path d="M43 28 L52 20" opacity="0.6" />
      </g>
      <path
        d="M32 50 C25 44 15 43 5 46 V25 C15 22 25 23 32 29 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M32 50 C39 44 49 43 59 46 V25 C49 22 39 23 32 29 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M32 29 V50" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M50 4 C40 10 35 21 34 35 C40 27 47 17 50 4 Z"
        fill="var(--gold)"
        stroke="var(--gold-bright)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path d="M49 6 L34.5 36" stroke="var(--ink)" strokeWidth="0.7" strokeOpacity="0.45" />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", tone === "light" ? "text-ivory" : "text-ink", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-semibold tracking-wide">Author&rsquo;s Word</span>
        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-gold">Heard &amp; Lifted</span>
      </span>
    </span>
  );
}
