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
    name: "Delvin N J",
    role: "Founder & Lead Architect",
    bio: "Systems architect and mobile engineer specializing in reactive full-stack runtimes, high-throughput backend pipelines, and low-latency native iOS/Android ecosystems.",
    image: getAssetPath("/images/founders/professional-founder-headshot.png"),
    skills: ["Architecture", "React Native", "Next.js", "TypeScript", "Distributed Systems", "React native"],
    socials: [
      { platform: "GitHub", url: "https://github.com/DelvinNJ", label: "Delvin N J on GitHub" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/delvin-n-j-1b72a221b", label: "Delvin N J on LinkedIn" }
    ],
  },
  {
    id: "co-founder",
    name: "Swathy Krishna",
    role: "Co-Founder & Product Lead",
    bio: "Product strategist and interface designer driving scalable design systems, user experience research, and high-conversion web & mobile product journeys.",
    image: getAssetPath("/images/founders/co-founder.jpg"),
    skills: ["Product Strategy", "UI/UX Design", "Design Systems", "User Research", "Frontend Engineering", "Agile Leadership"],
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com", label: "Co-Founder on LinkedIn" },
      { platform: "GitHub", url: "https://github.com", label: "Co-Founder on GitHub" }
    ],
  },
];
