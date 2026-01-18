import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Menu } from "@/components/common/menu";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Léo et Lucky",
  description: "Organisation familiale - Garde alternée",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Léo & Lucky",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2a0555",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="gradient-dark">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-svh flex-col">
            <Menu />
            <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
              <div className="mx-auto max-w-4xl animate-in">{children}</div>
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
