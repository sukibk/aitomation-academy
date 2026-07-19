import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  ogImage?: string;
  body: ReactNode;
};

// Import all posts here — add a line per new post
import { post as post1 } from "@/content/blog/how-to-use-claude-for-writing";
import { post as post2 } from "@/content/blog/claude-vs-chatgpt-for-real-work";
import { post as post3 } from "@/content/blog/5-claude-workflows-for-non-technical-professionals";
import { post as post4 } from "@/content/blog/claude-prompts-for-business";
import { post as post5 } from "@/content/blog/is-claude-ai-free-pricing-guide";
import { post as post6 } from "@/content/blog/claude-pro-vs-chatgpt-plus";
import { post as post7 } from "@/content/blog/claude-vs-chatgpt-vs-gemini";
import { post as post8 } from "@/content/blog/chatgpt-vs-claude-summarizing-transcripts";
import { post as post9 } from "@/content/blog/claude-for-content-creation";
import { post as post10 } from "@/content/blog/claude-prompting-guide";
import { post as post11 } from "@/content/blog/ai-for-consultants";
import { post as post12 } from "@/content/blog/claude-for-business";
import { post as post13 } from "@/content/blog/claude-vs-chatgpt-for-writing";
import { post as post14 } from "@/content/blog/claude-for-marketers";
import { post as post15 } from "@/content/blog/what-are-claude-skills";
import { post as post17 } from "@/content/blog/how-to-build-a-claude-skill";
import { post as post18 } from "@/content/blog/claude-code-skills";
import { post as post19 } from "@/content/blog/claude-skills-marketplace";
import { post as post20 } from "@/content/blog/claude-skill-for-obsidian";
import { post as post21 } from "@/content/blog/claude-design-skills";
import { post as post22 } from "@/content/blog/claude-pdf-skill";
import { post as post23 } from "@/content/blog/claude-linkedin-skill";
import { post as post24 } from "@/content/blog/claude-skills-vs-mcp";
import { post as post25 } from "@/content/blog/claude-skill-creator";
import { post as post26 } from "@/content/blog/claude-prompt-generator";
import { post as post27 } from "@/content/blog/claude-prompt-library";
import { post as post28 } from "@/content/blog/best-claude-prompts";
import { post as post29 } from "@/content/blog/best-claude-skills";
import { post as post30 } from "@/content/blog/claude-prompt-templates";
import { post as post31 } from "@/content/blog/claude-system-prompt-guide";
import { post as post32 } from "@/content/blog/what-is-claude-cowork";
import { post as post33 } from "@/content/blog/claude-cowork-pricing";
import { post as post34 } from "@/content/blog/claude-cowork-vs-claude-code";
import { post as post35 } from "@/content/blog/claude-cowork-automations";
import { post as post36 } from "@/content/blog/claude-ai-use-cases";
import { post as post37 } from "@/content/blog/claude-for-creators";
import { post as post38 } from "@/content/blog/claude-templates";
import { post as post39 } from "@/content/blog/best-claude-courses";
import { post as post40 } from "@/content/blog/claude-certification";
import { post as post41 } from "@/content/blog/how-to-learn-claude";
import { post as post42 } from "@/content/blog/claude-code-course";
import { post as post43 } from "@/content/blog/claude-cowork-course";
import { post as post44 } from "@/content/blog/anthropic-courses";

const allPosts: BlogPost[] = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post17, post18, post19, post20, post21, post22, post23, post24, post25, post26, post27, post28, post29, post30, post31, post32, post33, post34, post35, post36, post37, post38, post39, post40, post41, post42, post43, post44].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
