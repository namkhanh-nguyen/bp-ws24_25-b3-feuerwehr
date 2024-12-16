import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import React from "react";
import Chatbot from '@/app/components/chatbot/Chatbot'
import Header from "./components/navigation/Header";
import DynamicHeader from "./components/DynamicHeader";
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
  title: "Berliner Feuerwehr: Karriere",
  description: "Karriereseite der Berliner Feuerwehr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <head>
          <title>Berliner Feuerwehr: Karriere</title>
          <link rel="icon" type="image/png" href="/icon/favicon-96x96.png" sizes="96x96"/>
          <link rel="icon" type="image/svg+xml" href="/icon/favicon.svg"/>
          <link rel="shortcut icon" href="/icon/.ico"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png"/>
          <link rel="manifest" href="/icon/site.webmanifest"/>
      </head>
      <body className={`${berlinTypeWebRegular.variable} ${berlinTypeWebBold.variable} antialiased`}>

      {/*<Header/>*/}
      <DynamicHeader/>
      <Chatbot/>
      <div style={{paddingTop: "90px"}}>
          {children}
      </div>
      <Footer/>

      </body>
      </html>
  );
}
