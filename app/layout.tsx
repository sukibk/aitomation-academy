import type { Metadata } from "next";
import { Barlow, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { organizationSchema } from "@/lib/schema";
import { StructuredData } from "@/components/structured-data";
import { PostHogProvider } from "@/components/posthog-provider";
import { AnalyticsEvents } from "@/components/analytics-events";
import { EntryPopup } from "@/app/components/entry-popup";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-barlow" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`font-sans ${geist.variable}`}>
      <body className={`${barlow.variable} ${barlow.className}`} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CWZ738MZYH"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18023480264"
          strategy="afterInteractive"
        />
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CWZ738MZYH');
            gtag('config', 'AW-18023480264');
          `}
        </Script>
        {/* Brevo tracker: identifies contacts on-site so Brevo Automations can
            trigger on page visits (e.g. visited /vault, no purchase -> email). */}
        <Script id="brevo-tracker" strategy="afterInteractive">
          {`
            (function() {
              window.sib = { equeue: [], client_key: "bu1hf4790qcjdznj0vp1gkym" };
              window.sendinblue = {};
              for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
                (function(k) {
                  window.sendinblue[k] = function() {
                    var arg = Array.prototype.slice.call(arguments);
                    (window.sib[k] || function() {
                      var t = {}; t[k] = arg; window.sib.equeue.push(t);
                    })(arg[0], arg[1], arg[2], arg[3]);
                  };
                })(j[i]);
              }
              var n = document.createElement("script"),
                  s = document.getElementsByTagName("script")[0];
              n.type = "text/javascript"; n.id = "sendinblue-js"; n.async = true;
              n.src = "https://sibautomation.com/sa.js?key=bu1hf4790qcjdznj0vp1gkym";
              s.parentNode.insertBefore(n, s);
              window.sendinblue.page();
            })();
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '927037097064152');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=927037097064152&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <EntryPopup />
        <StructuredData data={organizationSchema()} />
        <PostHogProvider />
        <AnalyticsEvents />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
