import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "./components/navigation/Header"; // Import the client-side header
import "./globals.css";
import React from "react";
import Image from "next/image";
import Chatbot from '@/app/components/chatbot/chatbot'
import Footer from "./components/navigation/Footer";

// Load custom fonts
const berlinTypeWebRegular = localFont({
  src: "../../public/fonts/BerlinTypeWeb-Regular.woff", // Korrigierter Pfad
  variable: "--font-berlin-type-regular",
  weight: "400",
});

const berlinTypeWebBold = localFont({
  src: "../../public/fonts/BerlinTypeWeb-Bold.woff", // Korrigierter Pfad
  variable: "--font-berlin-type-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Helm sucht Kopf",
  description: "Karriereseite der Berliner Feuerwehr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${berlinTypeWebRegular.variable} ${berlinTypeWebBold.variable}`}
    >
      <body className="antialiased">
        <Header />
        <main>
          {children}
        <Chatbot />
        </main>
        <Footer />
      </body>
      </html>
  );
}
