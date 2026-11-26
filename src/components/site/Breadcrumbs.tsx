import { Link } from "@tanstack/react-router";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.18em] text-ivory/55">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="hover:text-gold-bright">Home</Link></li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {it.href ? <a href={it.href} className="hover:text-gold-bright">{it.name}</a> : <span aria-current="page" className="text-ivory/80">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
