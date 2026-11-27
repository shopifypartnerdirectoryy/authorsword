export const MAIN_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/packages", label: "Packages" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/book-to-film", label: "Book-to-Film" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

import { DEPARTMENTS } from "@/data/departments";
import { getService } from "@/data/services";

/** Services dropdown: one group per department. */
export const SERVICE_MENU = DEPARTMENTS.map((d) => ({
  heading: d.name,
  slug: d.slug,
  items: d.services.map((slug) => ({ slug, label: getService(slug)?.name ?? slug })),
}));
