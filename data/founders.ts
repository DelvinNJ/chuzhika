import { getAssetPath } from "@/utils/paths";

export interface FounderSocial {
  platform: string;
  url: string;
  label: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  socials: FounderSocial[];
}

export const FOUNDERS_DATA: Founder[] = [
  {
    id: "founder",
    name: "Alex Vance",
    role: "Founder & Lead Architect",
    bio: "Systems architect and mobile engineer specializing in reactive full-stack runtimes, high-throughput backend pipelines, and low-latency native iOS/Android ecosystems.",
    image: getAssetPath("/images/founders/founder-1.webp"),
    skills: ["Architecture", "React Native", "Next.js", "TypeScript", "Distributed Systems", "Swift"],
    socials: [
      { platform: "GitHub", url: "https://github.com", label: "Alex Vance on GitHub" },
      { platform: "LinkedIn", url: "https://linkedin.com", label: "Alex Vance on LinkedIn" },
      { platform: "Twitter / X", url: "https://twitter.com", label: "Alex Vance on Twitter" },
    ],
  },
  {
    id: "co-founder",
    name: "Elena Rostova",
    role: "Co-Founder & Head of Product Design",
    bio: "Creative technologist and design engineer fusing dark futuristic minimalism with ergonomic micro-interactions, bespoke design tokens, and fluid kinetic choreographies.",
    image: getAssetPath("/images/founders/cofounder-1.webp"),
    skills: ["Design Systems", "UI/UX Architecture", "Creative Direction", "Figma", "Framer Motion", "Design Tokens"],
    socials: [
      { platform: "GitHub", url: "https://github.com", label: "Elena Rostova on GitHub" },
      { platform: "LinkedIn", url: "https://linkedin.com", label: "Elena Rostova on LinkedIn" },
      { platform: "Dribbble", url: "https://dribbble.com", label: "Elena Rostova on Dribbble" },
    ],
  },
];
