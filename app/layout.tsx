import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { LoadingProvider } from "@/components/providers/LoadingContext";
import PageLoader from "@/components/ui/PageLoader";
import WebsiteFadeWrapper from "@/components/ui/WebsiteFadeWrapper";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import Navbar from "@/components/layout/Navbar";
import BackToTopButton from "@/components/ui/BackToTopButton";
import Footer from "@/components/layout/Footer";
import { getAssetPath } from "@/utils/paths";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chuzhika | Mobile & Web Engineering (Flutter, React Native, .NET, PHP, React Js, Angular)",
  description:
    "Engineering high-performance mobile apps with Flutter & React Native, enterprise backends in .NET & PHP, and modern reactive web platforms with React Js & Angular.",
  keywords: [
    "Chuzhika",
    "Flutter",
    "React Native",
    ".NET",
    "PHP",
    "React Js",
    "Angular",
    "Web Technologies",
    "Mobile Developer",
    "Full Stack Engineer",
    "TypeScript",
    "Dart",
    "C#",
    "Laravel",
    "Next.js",
  ],
  authors: [{ name: "Chuzhika" }],
  creator: "Chuzhika",
  openGraph: {
    title: "Chuzhika | Mobile & Web Engineering",
    description:
      "Specialized in Flutter, React Native, .NET, PHP, React Js, Angular, and modern web technologies.",
    url: "https://chuzhika.dev",
    siteName: "Chuzhika Portfolio",
    images: [
      {
        url: "/images/hero-fallback.jpg",
        width: 1920,
        height: 1080,
        alt: "Chuzhika Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chuzhika | Mobile & Web Engineering",
    description:
      "Flutter, React Native, .NET, PHP, React Js, Angular, and modern web architectures.",
    images: ["/images/hero-fallback.jpg"],
    creator: "@chuzhika_tech",
  },
  icons: {
    icon: [
      { url: getAssetPath("/images/logo-transparent.png?v=2"), type: "image/png" },
      { url: getAssetPath("/images/logo-transparent.png?v=2"), sizes: "32x32", type: "image/png" },
      { url: getAssetPath("/images/logo-transparent.png?v=2"), sizes: "192x192", type: "image/png" },
      { url: getAssetPath("/images/logo-transparent.png?v=2"), sizes: "512x512", type: "image/png" },
    ],
    shortcut: [getAssetPath("/images/logo-transparent.png?v=2")],
    apple: [
      { url: getAssetPath("/images/logo-transparent.png?v=2"), sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="icon" type="image/png" href={getAssetPath("/images/logo-transparent.png?v=2")} />
        <link rel="icon" type="image/png" sizes="32x32" href={getAssetPath("/images/logo-transparent.png?v=2")} />
        <link rel="icon" type="image/png" sizes="192x192" href={getAssetPath("/images/logo-transparent.png?v=2")} />
        <link rel="icon" type="image/png" sizes="512x512" href={getAssetPath("/images/logo-transparent.png?v=2")} />
        <link rel="shortcut icon" type="image/png" href={getAssetPath("/images/logo-transparent.png?v=2")} />
        <link rel="apple-touch-icon" sizes="180x180" href={getAssetPath("/images/logo-transparent.png?v=2")} />
      </head>
      <body className="min-h-screen bg-[#05050a] text-zinc-100 antialiased selection:bg-violet-600/30 selection:text-white flex flex-col">
        <SmoothScrollProvider>
          <LoadingProvider>
            <PageLoader />
            <ScrollProgressBar />
            <CustomCursor />
            <Navbar />
            <BackToTopButton />
            <WebsiteFadeWrapper>
              <div className="flex-1 w-full">{children}</div>
              <Footer />
            </WebsiteFadeWrapper>
          </LoadingProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
