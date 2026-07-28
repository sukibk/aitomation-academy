import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { MEMBER_COUNT_LABEL } from "@/lib/pricing";

// THE standard Academy promo card for blog posts (routes to /academy). Real person (Marko),
// dynamic member count, what-you-get checklist, CTA bottom-right. Same
// family as VaultCta/FreeKitCta — don't hand-roll per-page variants.
const GETS = [
  `${MEMBER_COUNT_LABEL} non-technical professionals learning together`,
  "Claude, Claude Cowork & Claude Code training",
  "The full 550+ prompt & skill Vault included with Premium",
  "A weekly live call to get unstuck",
];

export function CommunityCta({
  title = "Want the courses, the Vault, and a weekly live call in one place?",
  dataCta = "community_cta",
}: {
  title?: string;
  dataCta?: string;
}) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-6">
      <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
        <Image
          src="/images/marko_sudar_profile_photo.png"
          alt="Marko Sudar — founder of AItomation Academy"
          width={112}
          height={112}
          className="mx-auto h-28 w-28 shrink-0 rounded-full object-cover ring-2 ring-orange-400/60"
        />
        <div>
          <p className="font-semibold text-white">{title}</p>
          <ul className="mt-4 space-y-2">
            {GETS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex sm:justify-end">
            <a
              href="/academy"
              data-cta={dataCta}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600 sm:w-auto"
            >
              Join the Academy
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
