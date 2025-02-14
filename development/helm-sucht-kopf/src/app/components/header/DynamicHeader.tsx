"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/dynamicHeader.module.css";

const DynamicHeader: React.FC = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={`${styles.header} ${isShrunk ? styles.shrunk : ""}`}>
      <div className={styles.container}>
        <a
          href="/"
          className={`${styles.logo} ${
            isShrunk ? styles.shrunk : styles.large
          }`}
        >
          <img src="/assets/header/BF-Logo.svg" alt="Berliner Feuerwehr Logo" />
        </a>
        <a
          href="/"
          className={`${styles.title} ${isShrunk ? styles.shrunk : ""}`}
        >
          Karriere
        </a>
        <nav className={styles.nav}>
          {/* Öffnen- und Schließen-Buttons übereinander */}
          <div className={styles["menu-toggle-container"]}>
            {/* Öffnen-Button */}
            <div
              ref={toggleRef}
              onClick={toggleMenu}
              className={`${styles["menu-toggle"]} ${
                isShrunk ? styles.shrunk : ""
              }`}
            >
              <svg
                width="35"
                height="18"
                viewBox="0 0 35 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.68127H35" stroke="#E40422" strokeWidth="2" />
                <path d="M0 16.6813H35" stroke="#E40422" strokeWidth="2" />
              </svg>
            </div>

            {/* Schließen-Button */}
            {isMenuOpen && (
              <button
                className={styles.closeButton}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.12561 0.806885L25.8743 25.5556"
                    stroke="#E40422"
                    strokeWidth="2"
                  />
                  <path
                    d="M1.12561 25.5557L25.8743 0.806928"
                    stroke="#E40422"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            )}
          </div>

          <div
            ref={menuRef}
            className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}
          >
            <ul className={styles["menu-item"]}>
              {[
                {
                  href: "/ausbildungen",
                  text: "Ausbildungen",
                  isExternal: false,
                },
                {
                  href: "https://www.berliner-feuerwehr.de/karriere/benefits/",
                  text: "Warum wir?",
                  isExternal: true,
                },
                {
                  href: "https://www.berliner-feuerwehr.de/technik",
                  text: "Technik",
                  isExternal: true,
                },
                {
                  href: "https://www.berliner-feuerwehr.de/ueber-uns",
                  text: "Über uns",
                  isExternal: true,
                },
                {
                  href: "https://www.berliner-feuerwehr.de/karriere/faq/",
                  text: "Häufige Fragen",
                  isExternal: true,
                },
                {
                  href: "https://www.berliner-feuerwehr.de/kontakt/",
                  text: "Kontakt",
                  isExternal: true,
                },
              ].map(({ href, text, isExternal }, index) => (
                <li key={`nav-${text}`}>
                  <a
                    href={href}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DynamicHeader;
