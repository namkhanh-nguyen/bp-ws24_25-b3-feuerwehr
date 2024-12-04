import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import Image from "next/image";

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


      <header>
          <a href="/" style={{display: "inline-block", verticalAlign: "middle"}}>
              <img
                  src="https://res.cloudinary.com/dassgyrzu/image/upload/v1733327873/Berliner-Feuerwehr-Logo_wgpm1l.png"
                  alt="Berliner Feuerwehr Logo"
                  style={{
                      width: "100px",
                      height: "auto",
                      padding: "15px",
                      verticalAlign: "middle"
                  }}
              />
          </a>
          <span style={{
              color: "red",
              marginLeft: "0px",
              fontSize: "200%",
              padding: "5px 10px",
              verticalAlign: "middle",
              fontWeight: "bold",
              fontFamily: "Inter, sans-serif"
          }}>
            Karriere
            </span>
      </header>

      {children}

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-index&utm_medium=appdir-template-tw&utm_campaign=create-next-index"
              target="_blank"
              rel="noopener noreferrer"
          >
              <Image
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
              />
              Learn
          </a>
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-index&utm_medium=appdir-template-tw&utm_campaign=create-next-index"
              target="_blank"
              rel="noopener noreferrer"
          >
              <Image
                  aria-hidden
                  src="/window.svg"
                  alt="Window icon"
                  width={16}
                  height={16}
              />
              Examples
          </a>
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-index&utm_medium=appdir-template-tw&utm_campaign=create-next-index"
              target="_blank"
              rel="noopener noreferrer"
          >
              <Image
                  aria-hidden
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
              />
              Go to nextjs.org →
          </a>
      </footer>

      </body>
      </html>
  );
}
