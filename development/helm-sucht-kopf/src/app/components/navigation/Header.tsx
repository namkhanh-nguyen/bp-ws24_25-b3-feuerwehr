"use client";
import Link from "next/link";

import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link href="/" className="logo">
          <img src="/assets/header/BF-Logo.svg" alt="Berliner Feuerwehr Logo" />
          <span className="logo-title">Karriere</span>
        </Link>
      </div>
      <button
        className="menu-button"
        onClick={toggleMenu}
        aria-label="Menu öffnen/schließen"
      >
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
      </button>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link href="/" className="nav-link">
          Startseite
        </Link>
        <Link href="/ausbildungen" className="nav-link">
          Jobs
        </Link>
        <Link href="/kontakt" className="nav-link">
          Kontakt
        </Link>
      </nav>
    </header>
  );
};

export default Header;
