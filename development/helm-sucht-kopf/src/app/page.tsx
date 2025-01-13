"use client";

import Hero from "./components/homepage/Hero";
import Counter from "./components/homepage/Counter";
import SliderAusbildungen from "./components/homepage/SliderCareerOpportunities";
import SliderBewerbung from "./components/homepage/SliderApplicationProcess";
import FAQSection from "./components/homepage/FAQSection";

export default function Home() {
  /* TODO: Change to be UseState*/
  const stats = [
    { number: 8826, title: "großartige Teamitglieder" },
    { number: 514866, title: "Einsatzalamierungen" },
    { number: 57, title: "Nationen vereint in einem Team" },
    { number: 1330, title: "Fahrzeuge" },
  ];

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
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/Y7CIIu9kPzY"
              title="Berliner Feuerwehr Karriere Video"
              loading="lazy"
              style={{ border: "none" }}
              allow="autoplay; encrypted-media;"
              allowFullScreen
            ></iframe>
          </div>

          <h2>Mehr als ein Job, eine Mission!</h2>
          <p>
            Bei uns wird Teamgeist großgeschrieben. Action, Verantwortung und
            echte Kameradschaft erwarten dich. Werde Teil der Feuerwehr – der
            beste Job der Welt, bei dem du Leben rettest, Brände bekämpfst und
            echte Heldenmomente erlebst. Gemeinsam für mehr Sicherheit und eine
            starke Gemeinschaft!
          </p>
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
        <SliderBewerbung />
      </section>
      <FAQSection />
    </div>
  );
}
