"use client";

import Hero from "./components/homepage/Hero";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Counter from "./components/homepage/Counter";
import SliderAusbildungen from "./components/homepage/SliderCareerOpportunities";
import SliderBewerbung from "./components/homepage/SliderApplicationProcess";
import FAQSection from "./components/homepage/FAQSection";


export default function Home() {
    const router = useRouter();
    /* TODO: Change to be UseState*/
    const stats = [
        { number: 8826, title: "großartige Teamitglieder" },
        { number: 514866, title: "Einsatzalamierungen" },
        { number: 57, title: "Nationen vereint in einem Team" },
        { number: 1330, title: "Fahrzeuge" },
    ];

    const Video = dynamic(() => import("./components/video/Video"), { ssr: false });

    return (
        <div>
            <Hero />

            <section className="sec container">
                <div className="numbers">
                    {stats.map((stat, index) => (
                        <Counter key={index} number={stat.number} title={stat.title} />
                    ))}
                </div>
            </section>

            <section className="sec container">
                <h2>Viele Wege führen zur Berliner Feuerwehr</h2>
                <p>
                    Wir bieten eine Vielzahl von Einstiegswegen in eine Feuerwehrlaufbahn
                    – von der Ausbildung oder dem dualen Studium direkt nach der Schule
                    bis zum Quereinstieg nach einer abgeschlossenen Berufsausbildung oder
                    nach einem Studium.
                </p>
                <SliderAusbildungen />
            </section>

            <section className="section-video">
                {/* <div className="shape-top">
          <img src="./assets/shapes/curve-top.svg" alt="Obere Kurve" />
        </div> */}
                <div className="sec red">
                    <div className="container">
                        <div
                            className="video-banner"
                            style={{
                                position: 'relative',
                                backgroundImage: 'url(/assets/video/Azubis.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '50vh',
                                maxWidth: '70%',
                                margin: '0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                marginBottom: '30px',
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                            }}
                            onClick={() => router.push("/tour")}
                        >
                            {/* Text at the top of the banner */}
                            <div className="banner-text"
                                 style={{
                                     position: 'absolute',
                                     top: '20px',
                                     left: '20px',
                                     color: '#fff',
                                     fontSize: '28px',
                                     fontWeight: 'bold',
                                     zIndex: 2,
                                     textShadow: '0 8px 16px rgba(0, 0, 0, 0.9)',
                                     maxWidth: '70%',
                                     padding: '10px',
                                 }}
                            >
                                Probiere die interaktive Tour aus!

                            </div>

                            {/* Play Button */}S
                            <div
                                className="play-button"
                                style={{
                                    fontSize: '60px',
                                    color: '#fff',
                                    zIndex: 2,
                                    transition: 'transform 0.3s ease',
                                    textShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
                                    marginTop: 'auto',
                                    marginBottom: '20px'
                                }}
                            >
                                ▶
                            </div>

                            {/* Background Image (placed below the text) */}
                            <div className="image-container"
                                 style={{
                                     position: 'absolute',
                                     bottom: '0',
                                     left: '0',
                                     right: '0',
                                     height: '100%',
                                     backgroundImage: 'url(/assets/video/Azubis.jpg)',
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center 15%',
                                     filter: 'brightness(0.5)' // Darken the image so text stands out better
                                 }}
                            ></div>
                        </div>
                        <div className="aftertext" style={{
                            maxWidth: '70%',
                            margin: '0 auto',
                            textAlign: 'left',
                            paddingLeft: '10px',
                            paddingRight: '10px'
                        }}>
                            <h2>Mehr als ein Job, eine Mission!</h2>
                            <p>
                                Neugierig, wie der Alltag eines Sanitäters in Ausbildung aussieht? Tauche ein in die Welt der Berliner Feuerwehr und erlebe hautnah, Teil eines Teams zu sein, das täglich Leben rettet.
                            </p>
                        </div>
                        </div>
                    </div>

                    {/* <div className="shape-bottom">
          <img src="./assets/shapes/curve-bottom.svg" alt="Untere Kurve" />
        </div> */}
            </section>

            <section className="sec container">
                <h2>Bewerbungsprozess</h2>
                <p>
                    Der Bewerbungsprozess für die Berliner Feuerwehr ist in mehrere
                    Schritte unterteilt. Hier erfährst du, wie du dich bewerben kannst und
                    welche Voraussetzungen du erfüllen musst.
                </p>
                <SliderBewerbung/>
            </section>
            <FAQSection/>
        </div>
);
}

