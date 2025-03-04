import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Menu } from "@/components/common/menu";
import { getLocale, getMessages } from "next-intl/server";
import { isPassationEnabled } from "@/flags";

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
  const passationEnabled = await isPassationEnabled();

  return (
    <html lang={locale}>
      <body className="bg-gray-100">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col h-screen">
            <Menu passationEnabled={passationEnabled} />

            <main className="flex-1 p-6 bg-white shadow-sm">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
