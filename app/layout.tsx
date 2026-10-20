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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chuzhika | Mobile & Web Engineer Portfolio",
  description:
    "Portfolio of Chuzhika — Senior Mobile & Web Engineer specializing in iOS, Android, Next.js, reactive web architectures, and dark futuristic design systems.",
  keywords: [
    "Chuzhika",
    "Mobile Developer",
    "Web Developer",
    "iOS Developer",
    "Android Developer",
    "React Native",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Creative Developer",
    "Frontend Architect",
  ],
  authors: [{ name: "Chuzhika" }],
  creator: "Chuzhika",
  openGraph: {
    title: "Chuzhika | Mobile & Web Engineer Portfolio",
    description:
      "Crafting high-performance native mobile apps and next-generation web architectures with dark futuristic aesthetics and fluid kinetic experiences.",
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
    title: "Chuzhika | Mobile & Web Engineer Portfolio",
    description:
      "High-performance native mobile apps and next-generation web architectures.",
    images: ["/images/hero-fallback.jpg"],
    creator: "@chuzhika_tech",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
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
