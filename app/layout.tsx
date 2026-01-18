import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Menu } from "@/components/common/menu";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Léo et Lucky",
  description: "Organisation des enfants",
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
      <body className="min-h-screen gradient-dark">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Menu />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="mx-auto max-w-4xl animate-in">{children}</div>
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
