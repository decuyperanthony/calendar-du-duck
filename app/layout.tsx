import type { Metadata } from "next";

import "./globals.css";
import { Menu } from "@/components/common/menu";
// import { Header } from "@/components/common/header";

export const metadata: Metadata = {
  title: "Léo et Lucky",
  description: "Organisation des enfants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-gray-100">
        <div className="flex flex-col h-screen">
          {/* <Header /> */}
          <Menu />
          <main className="flex-1 p-6 bg-white shadow-sm">{children}</main>
        </div>
      </body>
    </html>
  );
}
