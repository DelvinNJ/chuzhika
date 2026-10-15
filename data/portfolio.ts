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
    roleTag: "Software Architect & Creative Technologist",
    bio: "Crafting hyper-responsive mobile ecosystems and next-generation web applications. Focused on bleeding-edge design systems, high-throughput backend integrations, and butter-smooth user experiences that captivate at first contact.",
    location: "Global / Remote",
    status: "Available for Q3/Q4 contracts & full-stack architectures",
    email: "hello@chuzhika.dev",
    heroHeading: {
      line1: "Architecting",
      line2: "Digital Horizons",
      line3: "For Web & Mobile",
    },
    heroSubtitle: "High-performance native iOS/Android applications and modern reactive web architectures engineered with surgical precision, fluid micro-interactions, and dark futuristic aesthetics.",
  },

  stats: [
    { label: "Completed Projects", value: 38, suffix: "+", description: "Production deployments across iOS, Android & Cloud Web" },
    { label: "Native Mobile Apps", value: 16, suffix: "", description: "Published on App Store & Google Play Store" },
    { label: "Years Experience", value: 6, suffix: "+", description: "Continuous evolution across full-stack engineering" },
    { label: "Performance Score", value: 99, suffix: "%", description: "Average Lighthouse & frame-rate stability (60/120fps)" },
  ] as StatItem[],

  services: [
    {
      id: "mobile-apps",
      number: "01",
      title: "Mobile Engineering",
      shortDesc: "High-performance iOS & Android native apps engineered for 120Hz responsiveness.",
      description: "From architecture to App Store submission. Building cross-platform and native mobile solutions using React Native, Expo, SwiftUI, and Kotlin with offline-first local databases, real-time sync, and fluid gestures.",
      deliverables: ["iOS & Android Apps", "Biometrics & Sensor APIs", "Push Notification Pipelines", "Store Publishing & CI/CD"],
      techStack: ["React Native", "Expo", "SwiftUI", "Kotlin", "WatermelonDB", "Reanimated"],
      icon: "mobile",
    },
    {
      id: "web-apps",
      number: "02",
      title: "Modern Web Applications",
      shortDesc: "Lightning-fast web platforms with Next.js, TypeScript, and micro-frontend agility.",
      description: "Developing scalable, SEO-optimized web applications with modern rendering patterns (SSR, SSG, edge compute). Built with extreme visual polish, interactive 3D/canvas elements, and rock-solid state management.",
      deliverables: ["SaaS Dashboards", "Interactive Web Portals", "Static & Dynamic Deployments", "WebGL & 3D Interactive UIs"],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
      icon: "web",
    },
    {
      id: "ui-ux",
      number: "03",
      title: "UI/UX & Design Systems",
      shortDesc: "Futuristic dark mode design languages, modular tokens, and micro-interactions.",
      description: "Bridging the chasm between raw engineering and high-end visual luxury. Designing unified design tokens, accessible components, glassmorphism layers, and responsive interactive prototypes.",
      deliverables: ["Figma Component Libraries", "Design Token Architecture", "Interactive Micro-Animations", "Accessibility (WCAG AA)"],
      techStack: ["Figma", "Design Tokens", "Glassmorphism", "CSS Houdini", "Storybook"],
      icon: "design",
    },
    {
      id: "backend-api",
      number: "04",
      title: "Backend & Cloud Architecture",
      shortDesc: "Scalable REST & GraphQL microservices, serverless functions, and real-time streaming.",
      description: "Architecting backend engines that power frontends with zero latency. Distributed caches, Postgres/Prisma persistence, edge authentication, WebSockets, and resilient containerized pipelines.",
      deliverables: ["GraphQL & REST APIs", "Serverless Edge Functions", "Database Schema & Migration", "CI/CD & DevOps Automation"],
      techStack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Redis"],
      icon: "backend",
    },
  ] as ServiceItem[],

  projects: [
    {
      id: "pulse-vault",
      title: "PulseVault Fintech",
      tagline: "Next-gen crypto & biometric banking platform",
      category: "Mobile App",
      description: "Cross-platform mobile wallet supporting biometric authorization, real-time crypto ticker websockets, localized encrypted keys, and instant multi-chain transfers.",
      image: getAssetPath("/images/proj-fintech.jpg"),
      tags: ["React Native", "TypeScript", "Reanimated", "WebSockets", "FaceID"],
      metrics: "< 80ms interaction latency • 150k active wallets",
      role: "Lead Mobile Architect",
      year: "2025",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "neuralis-ai",
      title: "Neuralis AI Cloud",
      tagline: "High-density neural network telemetry & inference visualizer",
      category: "Web App",
      description: "Interactive SaaS cloud dashboard providing real-time telemetry into distributed LLM pipelines, model accuracy graphs, token consumption, and edge latency heatmaps.",
      image: getAssetPath("/images/proj-ai-platform.jpg"),
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "GSAP", "Turbopack"],
      metrics: "99.98% uptime • 2.1M daily inferences monitored",
      role: "Full Stack Engineer",
      year: "2025",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "vital-sync",
      title: "VitalSync Health & Biometrics",
      tagline: "Cyber-minimal personal bio-telemetry tracker",
      category: "Mobile App",
      description: "Real-time health telemetry application syncing with Apple Watch and wearable rings. Features circadian rhythm analytics, heart-rate variability forecasting, and sleek dark visuals.",
      image: getAssetPath("/images/proj-health.jpg"),
      tags: ["React Native", "HealthKit", "Expo", "FastAPI", "Tailwind"],
      metrics: "4.9 App Store rating • 60fps animations",
      role: "Mobile Developer & UI Designer",
      year: "2024",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "nebula-devops",
      title: "Nebula Microservice Topology",
      tagline: "WebGL real-time cloud infrastructure architect",
      category: "Web App",
      description: "Visual cloud orchestration platform displaying interconnected microservices in an interactive 3D node graph. Live health metrics, distributed traces, and one-click rollback triggers.",
      image: getAssetPath("/images/proj-devops.jpg"),
      tags: ["Next.js", "Three.js", "Docker", "GraphQL", "Tailwind CSS"],
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
    { label: "Founders", href: "#founders" },
    { label: "Services", href: "#services" },
    { label: "Builder", href: "#builder" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Lab", href: "#build-lab" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github", handle: "@chuzhika" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", handle: "chuzhika-dev" },
    { name: "Twitter / X", url: "https://twitter.com", icon: "twitter", handle: "@chuzhika_tech" },
    { name: "Email", url: "mailto:hello@chuzhika.dev", icon: "mail", handle: "hello@chuzhika.dev" },
  ],
};
