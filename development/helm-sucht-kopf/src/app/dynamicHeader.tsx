// Header.tsx (Client-Side)
'use client';

import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsShrunk(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 1000,
                backgroundColor: "white",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                padding: isShrunk ? "5px 0" : "10px 0",
                height: isShrunk ? "50px" : "80px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease",
            }}
        >
            <a href="/" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <img
                    src="https://res.cloudinary.com/dassgyrzu/image/upload/v1733327873/Berliner-Feuerwehr-Logo_wgpm1l.png"
                    alt="Berliner Feuerwehr Logo"
                    style={{
                        width: isShrunk ? "80px" : "100px",
                        height: "auto",
                        padding: "15px",
                        verticalAlign: "middle",
                        transition: "width 0.3s ease",
                    }}
                />
            </a>
            <span
                style={{
                    color: "red",
                    marginLeft: "0px",
                    fontSize: isShrunk ? "150%" : "200%",
                    padding: "5px 10px",
                    verticalAlign: "middle",
                    fontWeight: "bold",
                    fontFamily: "Inter, sans-serif",
                    transition: "font-size 0.3s ease",
                }}
            >
        Karriere
      </span>
        </header>
    );
};

export default Header;
