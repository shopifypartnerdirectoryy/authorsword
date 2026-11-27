import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { MAIN_NAV, SERVICE_MENU } from "./nav-data";

const linkCls =
  "whitespace-nowrap px-2 py-2 text-[0.72rem] uppercase tracking-[0.1em] text-ivory/80 transition-colors hover:text-gold-bright data-[status=active]:text-gold";

function ServiceLink({ slug, label, onClick }: { slug: string; label: string; onClick?: () => void }) {
  if (slug === "book-to-film") {
    return (
      <Link to="/book-to-film" onClick={onClick} className="block py-1.5 text-sm text-ivory/75 transition-colors hover:text-gold-bright">
        {label}
      </Link>
    );
  }
  return (
    <Link
      to="/services/$slug"
      params={{ slug }}
      onClick={onClick}
      className="block py-1.5 text-sm text-ivory/75 transition-colors hover:text-gold-bright"
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-ink">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="Author's Word home" className="shrink-0">
          <Logo />
        </Link>

        <NavigationMenu className="hidden xl:flex" viewportClassName="rounded-sm border-line-dark bg-ink">
          <NavigationMenuList className="gap-0">
            {MAIN_NAV.map((item) =>
              item.to === "/services" ? (
                <NavigationMenuItem key={item.to}>
                  <NavigationMenuTrigger className="h-auto whitespace-nowrap bg-transparent px-2 py-2 text-[0.72rem] font-normal uppercase tracking-[0.1em] text-ivory/80 hover:bg-transparent hover:text-gold-bright focus:bg-transparent focus:text-gold-bright data-[state=open]:bg-transparent data-[state=open]:text-gold data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[64rem] bg-ink p-8 text-ivory md:w-[64rem]">
                    <div className="grid grid-cols-5 gap-6">
                      {SERVICE_MENU.map((group) => (
                        <div key={group.heading}>
                          <Link to="/services/category/$department" params={{ department: group.slug }} className="eyebrow mb-3 block text-[0.62rem] leading-snug hover:text-gold-bright">{group.heading}</Link>
                          {group.items.map((it) => (
                            <ServiceLink key={it.slug} slug={it.slug} label={it.label} />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-line-dark pt-5">
                      <p className="text-sm text-ivory/60">Every service, with clear pricing where available.</p>
                      <Link to="/services" className="text-sm text-gold hover:text-gold-bright">
                        View all services →
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.to}>
                  <Link to={item.to} className={linkCls} activeOptions={{ exact: item.to === "/" }}>
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center xl:flex">
          <Button asChild variant="gold" size="sm" className="h-10 px-4 text-xs uppercase tracking-[0.12em]">
            <Link to="/submit">Get Your Book Discovered</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line-dark text-ivory xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm overflow-y-auto border-line-dark bg-ink text-ivory">
            <SheetHeader>
              <SheetTitle className="text-left">
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col px-4" aria-label="Mobile">
              {MAIN_NAV.map((item) =>
                item.to === "/services" ? (
                  <details key={item.to} className="group border-b border-line-dark">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl">
                      Services
                      <ChevronDown className="h-4 w-4 text-gold transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pb-4">
                      <Link to="/services" onClick={close} className="block py-1.5 text-sm text-gold">
                        All services →
                      </Link>
                      {SERVICE_MENU.map((g) => (
                        <Link key={g.slug} to="/services/category/$department" params={{ department: g.slug }} onClick={close} className="block py-1.5 text-sm text-ivory/75 hover:text-gold-bright">
                          {g.heading}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={close}
                    activeOptions={{ exact: item.to === "/" }}
                    className="border-b border-line-dark py-4 font-display text-2xl text-ivory data-[status=active]:text-gold"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link to="/blog" onClick={close} className="border-b border-line-dark py-4 font-display text-2xl">
                Author Resources
              </Link>
              <div className="mt-8 flex flex-col gap-3 pb-8">
                <Button asChild variant="gold" size="lg">
                  <Link to="/submit" onClick={close}>Get Your Book Discovered</Link>
                </Button>
                <Button asChild variant="ivoryOutline" size="lg">
                  <Link to="/consultation" onClick={close}>Book a Consultation</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
