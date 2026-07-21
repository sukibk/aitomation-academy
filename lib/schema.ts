import { siteConfig } from "./site";
import type { BlogPost } from "./blog";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.companyName,
        url: siteConfig.url,
        email: siteConfig.email,
        sameAs: [siteConfig.social.youtube, siteConfig.social.skool],
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-US",
      },
      {
        "@type": "Course",
        name: "Claude Code Academy",
        description:
          "Practice-first Claude education for non-technical professionals: the 7-Day Claude Challenge, Claude Cowork course, Claude Code course, the 550+ recipe Claude Vault, and a weekly live call. 1,200+ member community.",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: `${siteConfig.url}/skool-redirect`,
        courseMode: "online",
        educationalLevel: "Beginner to Advanced",
        teaches: [
          "Claude",
          "Claude Cowork",
          "Claude Code",
          "AI workflows for professionals",
        ],
        offers: {
          "@type": "Offer",
          category: "Subscription",
          priceCurrency: "USD",
          price: "69",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT3H",
        },
      },
    ],
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteConfig.url,
    },
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    url: `${siteConfig.url}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags,
  };
}

export function blogIndexSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — AItomation Academy",
    description:
      "Practical guides and workflows for using Claude AI in real work. Written for non-technical professionals.",
    url: `${siteConfig.url}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function homePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: siteConfig.title,
        url: siteConfig.url,
        description: siteConfig.description,
        about: {
          "@type": "Thing",
          name: "Claude for real work for non-technical professionals",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "I'm not technical. Will this work for me?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. AItomation Academy is built for non-technical professionals. No coding is required.",
            },
          },
          {
            "@type": "Question",
            name: "I already use ChatGPT sometimes. Why Claude?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Claude is especially strong for nuanced writing, sustained complex tasks, and long-form work. The workflows are designed specifically around those strengths.",
            },
          },
          {
            "@type": "Question",
            name: "Is this really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The Claude Starter System is a free PDF with 20 copy-paste prompts, installable skills, and quick guides that turn Claude into a coworker for real work, plus an invitation to the free community.",
            },
          },
        ],
      },
    ],
  };
}
