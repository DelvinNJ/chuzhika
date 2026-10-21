import { getAssetPath } from "@/utils/paths";

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "Mobile App" | "Web App";
  description: string;
  image: string;
  tags: string[];
  metrics: string;
  role: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  icon: "mobile" | "web" | "design" | "backend";
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Chuzhika",
    title: "Mobile & Web Engineer",
    roleTag: "Flutter • React Native • .NET • PHP • React Js • Angular",
    bio: "Specializing in multi-platform mobile applications (Flutter, React Native), enterprise backend runtimes (.NET, PHP), and responsive, modern web technologies (React Js, Angular). Engineered with surgical precision, strict typing, and high visual luxury.",
    location: "Global / Remote",
    status: "Available for Q3/Q4 contracts & full-stack architectures",
    email: "hello@chuzhika.dev",
    heroHeading: {
      line1: "Architecting",
      line2: "Digital Horizons",
      line3: "Mobile & Web",
    },
    heroSubtitle: "High-performance mobile apps with Flutter & React Native, enterprise backends in .NET & PHP, and modern web platforms built on React Js & Angular.",
  },

  stats: [
    { label: "Completed Projects", value: 38, suffix: "+", description: "Production deployments across Flutter, React Native, .NET & Web" },
    { label: "Multi-Platform Apps", value: 12, suffix: "+", description: "Shipped across iOS, Android, and responsive Web" },
    { label: "Core Technologies", value: 7, suffix: "★", description: "Flutter, React Native, .NET, PHP, React Js, Angular & Web" },
    { label: "Performance Score", value: 98, suffix: "%", description: "Average Lighthouse & 60/120fps frame-rate stability" },
  ] as StatItem[],

  services: [
    {
      id: "mobile-apps",
      number: "01",
      title: "Mobile App Development",
      shortDesc: "High-performance iOS & Android mobile apps engineered with Flutter and React Native.",
      description: "From concept to store submission. Crafting fluid, cross-platform mobile experiences utilizing Flutter and React Native with offline caching, native sensor integrations, biometrics, and 120Hz micro-interactions.",
      deliverables: ["Flutter iOS & Android Apps", "React Native Cross-Platform Apps", "Native Hardware Bridges & APIs", "App Store & Play Store CI/CD"],
      techStack: ["Flutter", "React Native", "Dart", "TypeScript", "Bloc", "Redux"],
      icon: "mobile",
    },
    {
      id: "web-apps",
      number: "02",
      title: "React Js & Angular Web Apps",
      shortDesc: "Enterprise-grade web platforms and reactive SPAs built with React Js and Angular.",
      description: "Engineering scalable Single Page Applications (SPAs) and dynamic web platforms. Leverages component-driven architectures, reactive state management (RxJS, Redux, Zustand), and modern web standards for optimal speed.",
      deliverables: ["React Js & Next.js Platforms", "Angular Enterprise Applications", "Responsive Web Architectures", "Interactive SaaS Dashboards"],
      techStack: ["React Js", "Angular", "Next.js", "TypeScript", "RxJS", "Tailwind CSS"],
      icon: "web",
    },
    {
      id: "backend-api",
      number: "03",
      title: ".NET & PHP Backend Systems",
      shortDesc: "Secure, high-throughput backend APIs and services powered by .NET and PHP.",
      description: "Architecting scalable enterprise servers, RESTful microservices, and GraphQL APIs using .NET (ASP.NET Core / C#) and modern PHP (Laravel / Symfony). Built for high concurrency, security, and clean database integration.",
      deliverables: [".NET Core REST & Web APIs", "PHP & Laravel Microservices", "Database Architecture & Optimization", "Authentication, OAuth & Cloud CI/CD"],
      techStack: [".NET Core", "C#", "PHP", "Laravel", "MySQL / SQL Server", "Docker"],
      icon: "backend",
    },
    {
      id: "ui-ux",
      number: "04",
      title: "Modern Web Technologies & UI",
      shortDesc: "Cutting-edge web technologies, interactive design systems, and fluid ergonomics.",
      description: "Bridging architectural discipline with visual luxury. Designing unified design tokens in Figma, cross-framework components for React Js and Angular, and smooth kinetic micro-interactions that engage users.",
      deliverables: ["Figma Design Systems", "Web Standards & WCAG AA Compliance", "Micro-Interactions & Spring Physics", "Cross-Platform UI Libraries"],
      techStack: ["Web Technologies", "HTML5 / CSS3", "Tailwind CSS", "Figma", "GSAP", "Framer Motion"],
      icon: "design",
    },
  ] as ServiceItem[],

  projects: [
    {
      id: "pulse-vault",
      title: "PulseVault Fintech",
      tagline: "High-throughput banking ecosystem built on React Native & .NET",
      category: "Mobile App",
      description: "Cross-platform mobile wallet built with React Native and powered by a high-concurrency .NET Core backend. Features biometric auth, instant transfers, and real-time ledger sync.",
      image: getAssetPath("/images/proj-fintech.jpg"),
      tags: ["React Native", ".NET Core", "C#", "TypeScript", "WebSockets"],
      metrics: "< 80ms interaction latency • 150k active wallets",
      role: "Lead Architect",
      year: "2025",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "neuralis-ai",
      title: "Neuralis Enterprise Portal",
      tagline: "Dynamic SaaS telemetry platform engineered with Angular & PHP",
      category: "Web App",
      description: "Full-scale enterprise management portal designed with Angular and powered by a robust PHP Laravel REST architecture. Real-time telemetry, RBAC permissions, and reactive dashboard views.",
      image: getAssetPath("/images/proj-ai-platform.jpg"),
      tags: ["Angular", "PHP", "Laravel", "TypeScript", "Tailwind CSS"],
      metrics: "99.98% uptime • 2.1M operations monitored",
      role: "Full Stack Engineer",
      year: "2025",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "vital-sync",
      title: "VitalSync Health & Biometrics",
      tagline: "Multi-platform telemetry application engineered with Flutter",
      category: "Mobile App",
      description: "Fluid cross-platform mobile tracker built with Flutter and Dart, backed by .NET microservices. Features circadian analytics, device telemetry, and smooth 120Hz gesture interfaces.",
      image: getAssetPath("/images/proj-health.jpg"),
      tags: ["Flutter", "Dart", ".NET Core", "Bloc", "REST APIs"],
      metrics: "4.9 App Store rating • 120fps animations",
      role: "Mobile Developer & UI Architect",
      year: "2024",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "nebula-devops",
      title: "Nebula Cloud Visualizer",
      tagline: "Modern web application created with React Js & Web Technologies",
      category: "Web App",
      description: "Interactive cloud infrastructure visualizer built with React Js and modern Web Technologies. Provides live node graphing, sub-second topology sync, and instant rollback controls.",
      image: getAssetPath("/images/proj-devops.jpg"),
      tags: ["React Js", "Web Technologies", "Next.js", "Docker", "Tailwind CSS"],
      metrics: "60fps WebGL canvas • Sub-second topology sync",
      role: "Frontend Architect",
      year: "2024",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
  ] as ProjectItem[],

  process: [
    {
      number: "01",
      title: "Discover & Blueprint",
      subtitle: "Deconstructing constraints into competitive advantages",
      description: "We deep-dive into user journeys, architectural prerequisites, data structures, and edge-cases. Every screen, state transition, and API endpoint is mapped before writing code.",
      deliverables: ["Product Specification", "System Architecture Blueprint", "Component Hierarchy", "Performance Targets"],
      duration: "Week 1 - 2",
    },
    {
      number: "02",
      title: "Design & Micro-Interactions",
      subtitle: "Dark, futuristic minimalism with tactile feedback",
      description: "Crafting bespoke design systems, high-fidelity prototypes, and fluid kinetic choreographies. We obsess over 120Hz spring physics, glass layering, and neon accent ergonomics.",
      deliverables: ["Figma Design Library", "Micro-interaction Prototypes", "Design Token Config", "Accessibility Specs"],
      duration: "Week 2 - 4",
    },
    {
      number: "03",
      title: "Build & Harden",
      subtitle: "Type-safe, test-driven, performance-critical implementation",
      description: "Writing clean, modular TypeScript with zero compromises. Implementing responsive viewports, native bridges, offline caching, and sub-100ms API communication pipelines.",
      deliverables: ["Clean Modular Source Code", "Automated Test Suites", "Optimized Asset Bundles", "Telemetry & Logging"],
      duration: "Week 4 - 8",
    },
    {
      number: "04",
      title: "Launch & Accelerate",
      subtitle: "Flawless deployment, store approval, and edge distribution",
      description: "Coordinating App Store / Play Store review compliance, CI/CD pipeline verification, CDN edge caching, and real-time monitoring to ensure immediate stability and viral momentum.",
      deliverables: ["App Store & Play Store Release", "Global Edge Deployment", "Post-Launch Performance Audit", "Documentation"],
      duration: "Week 8+",
    },
  ] as ProcessStep[],

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Founders", href: "#founders" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github", handle: "@chuzhika" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", handle: "chuzhika-dev" },
    { name: "Twitter / X", url: "https://twitter.com", icon: "twitter", handle: "@chuzhika_tech" },
    { name: "Email", url: "mailto:hello@chuzhika.dev", icon: "mail", handle: "hello@chuzhika.dev" },
  ],
};
