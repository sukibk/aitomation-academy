import Image from "next/image";

// THE standard free-kit promo card. Same visual as the entry popup: the wide
// banner render of the Starter System cover, edge-to-edge on black, with the
// standardized "Download for free" CTA pointing at /free. Use this everywhere
// the free kit is pitched (blog boxes, landing sections) — don't hand-roll
// variants per page.
export function FreeKitCta({
  title,
  children,
  dataCta = "free_kit_cta",
}: {
  title: string;
  children: React.ReactNode;
  dataCta?: string;
}) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-40 bg-black">
        <Image
          src="/images/free-kit-banner.jpg"
          alt="The Claude Starter System — free PDF kit"
          fill
          sizes="720px"
          className="object-cover object-center"
        />
      </div>
      <div className="p-6">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-2 text-slate-700">{children}</p>
        <a
          href="/free"
          data-cta={dataCta}
          className="mt-4 inline-block rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600"
        >
          Download for free
        </a>
      </div>
    </div>
  );
}
