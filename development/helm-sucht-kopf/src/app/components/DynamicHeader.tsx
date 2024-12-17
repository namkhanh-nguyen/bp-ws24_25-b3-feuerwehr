'use client';

import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/dynamicHeader.module.css";

const dynamicHeader: React.FC = () => {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsShrunk(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <header className={`${styles.header} ${isShrunk ? styles.shrunk : ""}`}>
            <a href="/" className={`${styles.logo} ${isShrunk ? styles.shrunk : styles.large}`}>
                <img
                    src="https://res.cloudinary.com/dassgyrzu/image/upload/v1733327873/Berliner-Feuerwehr-Logo_wgpm1l.png"
                    alt="Berliner Feuerwehr Logo"
                />
            </a>
            <a href="/" className={`${styles.title} ${isShrunk ? styles.shrunk : ""}`}>
                Karriere
            </a>
            <nav className={styles.nav}>
                <div
                    ref={toggleRef}
                    onClick={toggleMenu}
                    className={styles["menu-toggle"]}
                >
                    ☰
                </div>

                <div
                    ref={menuRef}
                    className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}
                >
                    <ul className={styles["menu-item"]}>
                        {[
                            { href: "https://www.berliner-feuerwehr.de/aktuelles/", text: "Aktuelles" },
                            { href: "https://www.berliner-feuerwehr.de/ihre-sicherheit/", text: "Ihre Sicherheit" },
                            { href: "https://www.berliner-feuerwehr.de/ueber-uns", text: "Über Uns" },
                            { href: "https://www.berliner-feuerwehr.de/technik", text: "Technik" },
                            { href: "https://www.berliner-feuerwehr.de/forschung", text: "Forschung" },
                            { href: "https://www.berliner-feuerwehr.de/service", text: "Service" },
                        ].map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default dynamicHeader;
