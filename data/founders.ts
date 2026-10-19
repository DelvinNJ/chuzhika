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
    image: getAssetPath("/images/founders/professional-founder-headshot.png"),
    skills: ["Architecture", "React Native", "Next.js", "TypeScript", "Distributed Systems", "Swift"],
    socials: [
      { platform: "GitHub", url: "https://github.com", label: "Alex Vance on GitHub" },
      { platform: "LinkedIn", url: "https://linkedin.com", label: "Alex Vance on LinkedIn" },
      { platform: "Twitter / X", url: "https://twitter.com", label: "Alex Vance on Twitter" },
    ],
  },
];
