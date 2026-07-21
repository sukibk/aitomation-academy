"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VAULT, MEMBER_COUNT } from "@/lib/pricing";
import Image from "next/image";

const NAV = [
  ["/", "Home"],
  ["/academy", "Academy"],
  ["/vault", "The Vault"],
  ["/blog", "Blog"],
  ["/free", "Free"],
  ["/about", "About"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  // Header CTA matches the page's job: sell on sales pages, free elsewhere.
  const cta = (() => {
    if (pathname.startsWith("/vault") && !VAULT.salesPaused)
      return { href: "#buy", label: `Get the Vault · $${VAULT.launchPrice}` };
    if (pathname.startsWith("/academy"))
      return { href: "#membership", label: "Lock $69/mo" };
    return { href: "/skool-redirect", label: "Get Free Access" };
  })();

  // Same-page hash CTAs: scroll ourselves and replace (not push) the history
  // entry, so repeated clicks don't stack #buy/#membership in the back stack.
  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cta.href.startsWith("#")) return;
    const target = document.getElementById(cta.href.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", cta.href);
  };

  const linkCls = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `text-sm font-medium transition-colors ${
      active ? "text-orange-600" : "text-slate-600 hover:text-slate-900"
    }`;
  };
  return (
    <header data-section="navbar" className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/creatives/aitomation_logo.png"
            alt="AItomation Academy"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
          <span className="hidden sm:inline text-lg font-semibold text-slate-900">AiTomation Academy</span>
        </Link>
        {/* Desktop nav — absolutely centered */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV.map(([href, label]) =>
            href === "/vault" && VAULT.salesPaused ? null : (
              <Link key={href} href={href} className={linkCls(href)}>
                {label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-slate-500">
              {MEMBER_COUNT.toLocaleString()}+ professionals already learning
            </span>
          </div>
          <a
            href={cta.href}
            onClick={handleCta}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            {cta.label}
          </a>
        </div>

        {/* Mobile — CTA only */}
        <div className="md:hidden">
          <a
            href={cta.href}
            onClick={handleCta}
            className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
