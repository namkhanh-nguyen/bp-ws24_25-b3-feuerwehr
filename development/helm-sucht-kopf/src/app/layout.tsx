import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Helm sucht kopf",
  description: "Karriereseite der Berliner Feuerwehr",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

      <a href="/">
        <header>
          <img
              src="https://res.cloudinary.com/dassgyrzu/image/upload/v1732989923/Berliner_Feuerwehr_qd9nry.png"
              alt="Berliner Feuerwehr Logo"
              style={{width: "300px", height: "auto", padding: "15px"}}
          />
        </header>
      </a>

      {children}

      </body>
      </html>
  );
}
