import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

const berlinTypeWebRegular = localFont({
    src: "./fonts/BerlinTypeWeb-Regular.woff",
    variable: "--font-berlin-type-regular",
    weight: "400 400",
});

const berlinTypeWebBold = localFont({
    src: "./fonts/BerlinTypeWeb-Bold.woff",
    variable: "--font-berlin-type-bold",
    weight: "700 700",
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
      <body className={`${berlinTypeWebRegular.variable} ${berlinTypeWebBold.variable} antialiased`}>


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
          <a href="/">
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
          </a>
      </header>

      {children}

      </body>
      </html>
  );
}
