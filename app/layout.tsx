import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Menu } from "@/components/common/menu";
import { MobileHeader } from "@/components/common/mobile-header";
import { BottomNav } from "@/components/common/bottom-nav";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";

// iOS splash screen sizes
const splashScreens = [
  { width: 750, height: 1334 },
  { width: 1242, height: 2208 },
  { width: 1125, height: 2436 },
  { width: 828, height: 1792 },
  { width: 1242, height: 2688 },
  { width: 1080, height: 2340 },
  { width: 1170, height: 2532 },
  { width: 1284, height: 2778 },
  { width: 1179, height: 2556 },
  { width: 1290, height: 2796 },
  { width: 1536, height: 2048 },
  { width: 1668, height: 2224 },
  { width: 1668, height: 2388 },
  { width: 2048, height: 2732 },
];

export const metadata: Metadata = {
  title: "Calendar du Duck",
  description: "Organisation familiale - Garde alternee",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Calendar du Duck",
    startupImage: splashScreens.map((s) => ({
      url: `/splash/splash-${s.width}x${s.height}.png`,
      media: `(device-width: ${Math.round(s.width / (s.width > 1500 ? 2 : s.width > 1000 ? 3 : 2))}px) and (device-height: ${Math.round(s.height / (s.width > 1500 ? 2 : s.width > 1000 ? 3 : 2))}px) and (-webkit-device-pixel-ratio: ${s.width > 1500 ? 2 : s.width > 1000 ? 3 : 2})`,
    })),
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0a1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

// Inline SVG for splash screen (same as icon.svg)
const SplashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2a0555" }} />
        <stop offset="100%" style={{ stopColor: "#1a0235" }} />
      </linearGradient>
      <linearGradient id="teal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#5eead4" }} />
        <stop offset="100%" style={{ stopColor: "#14b8a6" }} />
      </linearGradient>
      <linearGradient id="purple" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#c084fc" }} />
        <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="108" fill="url(#bg)" />
    <circle cx="150" cy="175" r="45" fill="url(#teal)" />
    <rect x="95" y="235" width="110" height="130" rx="32" fill="url(#teal)" />
    <circle cx="362" cy="175" r="45" fill="url(#purple)" />
    <rect x="307" y="235" width="110" height="130" rx="32" fill="url(#purple)" />
    <g
      fill="none"
      stroke="url(#teal)"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="220" y1="260" x2="280" y2="260" />
      <polyline points="260,242 280,260 260,278" />
    </g>
    <g
      fill="none"
      stroke="url(#purple)"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="292" y1="320" x2="232" y2="320" />
      <polyline points="252,302 232,320 252,338" />
    </g>
  </svg>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="bg-background">
      <body className="min-h-dvh antialiased">
        {/* Splash screen */}
        <div id="splash-screen">
          <SplashIcon />
        </div>

        <NextIntlClientProvider messages={messages}>
          <div className="gradient-dark min-h-dvh">
            <Menu />
            <MobileHeader />
            <main className="px-4 py-6 md:px-6 md:py-8 mt-header-safe md:mt-20 pb-nav-safe">
              <div className="mx-auto max-w-4xl animate-in">{children}</div>
            </main>
            <BottomNav />
          </div>
        </NextIntlClientProvider>

        <Script src="/splash-hide.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
