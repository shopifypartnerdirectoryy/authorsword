import { Link } from "@tanstack/react-router";
import { BRAND } from "@/data/services";
import { SOCIAL_LINKS, type SocialKey } from "@/data/social";
import { Logo } from "./Logo";
import { SocialIcon, socialLabel } from "./SocialIcons";

const footerLink = "text-sm text-ivory/65 transition-colors hover:text-gold-bright";

export function SiteFooter() {
  const socials = (Object.entries(SOCIAL_LINKS) as [SocialKey, string][]).filter(([, url]) => url.trim() !== "");

  return (
    <footer className="surface-ink border-t border-line-dark">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-xl italic leading-snug text-ivory/85">&ldquo;{BRAND.tagline}&rdquo;</p>
          <a href={`mailto:${BRAND.email}`} className="mt-6 inline-block text-sm text-gold hover:text-gold-bright">
            {BRAND.email}
          </a>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabel(key)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-dark text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon name={key} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-[0.65rem]">Explore</p>
          <ul className="space-y-2.5">
            <li><Link to="/about" className={footerLink}>About</Link></li>
            <li><Link to="/services" className={footerLink}>Services</Link></li>
            <li><Link to="/packages" className={footerLink}>Packages</Link></li>
            <li><Link to="/how-it-works" className={footerLink}>How It Works</Link></li>
            <li><Link to="/book-to-film" className={footerLink}>Book-to-Film</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-[0.65rem]">Get Started</p>
          <ul className="space-y-2.5">
            <li><Link to="/submit" className={footerLink}>Submit Your Book</Link></li>
            <li><Link to="/consultation" className={footerLink}>Book a Consultation</Link></li>
            <li><Link to="/contact" className={footerLink}>Contact</Link></li>
            <li><Link to="/faq" className={footerLink}>FAQ</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-[0.65rem]">Our Promise</p>
          <p className="text-sm text-ivory/65">
            All prices are in USD. Final deliverables, timelines and revisions are confirmed in your proposal. We never
            guarantee sales, rankings or deals — we promise care, craft and honesty.
          </p>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Author&rsquo;s Word. Heard &amp; Lifted.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gold-bright">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-bright">Terms &amp; Conditions</Link>
            <Link to="/admin" className="hover:text-gold-bright">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
