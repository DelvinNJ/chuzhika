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
    bio: "Systems architect and multi-platform engineer specializing in cross-platform mobile apps (Flutter, React Native), robust enterprise backends (.NET, PHP), and modern reactive web architectures.",
    image: getAssetPath("/images/founders/professional-founder-headshot.png"),
    skills: ["Flutter", "React Native", ".NET Core", "PHP", "React Js", "Angular", "Web Technologies", "TypeScript"],
    socials: [
      { platform: "GitHub", url: "https://github.com/DelvinNJ", label: "Delvin N J on GitHub" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/delvin-n-j-1b72a221b", label: "Delvin N J on LinkedIn" }
    ],
  },
  {
    id: "co-founder",
    name: "Swathy Krishna",
    role: "Co-Founder & Product Lead",
    bio: "Product strategist and full-stack web engineer spearheading modern web applications, scalable design systems across React Js and Angular, and seamless mobile interfaces.",
    image: getAssetPath("/images/founders/co-founder.jpg"),
    skills: ["React Js", "Angular", "Web Technologies", "Flutter", "PHP", "UI/UX Design", "Product Strategy", "JavaScript"],
    socials: [
      { platform: "LinkedIn", url: "https://www.linkedin.com", label: "Co-Founder on LinkedIn" },
      { platform: "GitHub", url: "https://github.com", label: "Co-Founder on GitHub" }
    ],
  },
];
