"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { VAULT, MEMBER_COUNT } from "@/lib/pricing";
import { BuyLink } from "@/app/components/buy-link";
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
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Header CTA matches the page's job: sell on sales pages, free elsewhere.
  // Priced CTAs open Stripe checkout directly — a click on a price is intent.
  const cta = (() => {
    if (pathname.startsWith("/vault") && !VAULT.salesPaused)
      return { product: "vault" as const, label: `Get the Vault · $${VAULT.launchPrice}` };
    if (pathname.startsWith("/academy"))
      return { product: "membership" as const, label: "Lock $69/mo" };
    return { product: null, href: "/skool-redirect", label: "Get Free Access" };
  })();

  const linkCls = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `text-sm font-medium transition-colors ${
      active ? "text-orange-600" : "text-slate-600 hover:text-slate-900"
    }`;
  };

  const ctaButton = (className: string, dataCta: string) =>
    cta.product ? (
      <BuyLink product={cta.product} dataCta={dataCta} className={className}>
        {cta.label}
      </BuyLink>
    ) : (
      <a href={cta.href} className={className}>
        {cta.label}
      </a>
    );

  return (
    <header data-section="navbar" className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/images/creatives/aitomation_logo.png"
            alt="AItomation Academy"
            width={160}
            height={40}
            className="h-8 w-auto shrink-0"
            priority
          />
          <span className="hidden xl:inline whitespace-nowrap text-lg font-semibold text-slate-900">
            AiTomation Academy
          </span>
        </Link>

        {/* Nav links — in normal flex flow so they can never overlap the CTA */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map(([href, label]) =>
            href === "/vault" && VAULT.salesPaused ? null : (
              <Link key={href} href={href} className={linkCls(href)}>
                {label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <div className="hidden xl:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="whitespace-nowrap text-sm text-slate-500">
              {MEMBER_COUNT.toLocaleString()}+ professionals learning
            </span>
          </div>
          {ctaButton(
            "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors",
            "navbar_buy",
          )}
        </div>

        {/* Below lg — compact CTA + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {ctaButton(
            "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors",
            "navbar_buy_mobile",
          )}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2 sm:px-6">
            {NAV.map(([href, label]) =>
              href === "/vault" && VAULT.salesPaused ? null : (
                <Link
                  key={href}
                  href={href}
                  className={`${linkCls(href)} border-b border-slate-100 py-3 text-base last:border-0`}
                >
                  {label}
                </Link>
              )
            )}
            <p className="py-3 text-sm text-slate-500">
              {MEMBER_COUNT.toLocaleString()}+ professionals already learning
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
