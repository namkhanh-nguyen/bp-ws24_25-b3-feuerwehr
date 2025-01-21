"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question:
        "Wie viele Ausbildungsstellen werden jährlich bei der Berliner Feuerwehr ausgeschrieben?",
      answer:
        "Insgesamt stellt die Berliner Feuerwehr mehrere Hundert Nachwuchskräfte pro Jahr ein. Die Einstellungszahlen unterscheiden sich je nach Einstiegsweg.",
    },
    {
      question: "Ist es möglich sich außerhalb der Fristen zu bewerben?",
      answer:
        "Nein, Bewerbungen außerhalb der Fristen können leider nicht berücksichtigt werden.",
    },
    {
      question: "Wie kann ich mich bewerben?",
      answer:
        "Sie können sich über unser Online-Portal bewerben. Folgen Sie einfach den Anweisungen in der Stellenausschreibung.",
    },
    {
      question:
        "Besteht die Möglichkeit, sich zeitgleich für mehrere Stellenausschreibungen zu bewerben?",
      answer:
        "Ja. Über das Online-Portal ist es möglich sich zeitgleich auf weitere Laufbahnen zu bewerben. Bei mehreren Bewerbungen im gleichen Zeitraum müssen Sie nur an einem strukturierten Auswahlverfahren teilnehmen.",
    },
    {
      question:
        "Warum müssen Bewerberinnen bei der Sportprüfung die gleichen Anforderungen wie Bewerber erfüllen?",
      answer:
        "Die Arbeit im Einsatzdienst der Berliner Feuerwehr ist körperlich sehr anstrengend. Einsatzkräfte aller Geschlechter müssen in der Lage sein, gleichermaßen Verantwortung für in Not geratene Personen zu übernehmen. Aufgrund der hohen Anforderungen an den Beruf müssen alle Bewerbenden die gleiche Grundfitness vorweisen.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section container">
      <h2 className="faq-title">Häufig gestellte Fragen</h2>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="faq-question"
              aria-expanded={activeIndex === index}
            >
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </li>
        ))}
      </ul>
      <h3>Hast du noch weitere Fragen?</h3>
      <p>
        Schau gerne auf unserer&nbsp;
        <a href="https://www.berliner-feuerwehr.de/karriere/faq/">FAQ-Seite</a>
        &nbsp;vorbei, dort findest du ausführliche Antworten zu vielen weiteren
        Themen.
      </p>
    </section>
  );
}
