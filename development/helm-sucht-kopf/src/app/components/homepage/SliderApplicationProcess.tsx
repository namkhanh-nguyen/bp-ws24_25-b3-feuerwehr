"use client";

import SliderBase from "./SliderBase";
import Card from "./Card";

export default function SliderApplicationProcess() {
  const processSteps = [
    {
      step: "Schritt 1",
      title: "Bewerben",
      description:
        "Reiche deine Bewerbung ein und zeige, warum du Teil des Teams werden möchtest.",
      icon: "/assets/home/Application-S1.svg",
    },
    {
      step: "Schritt 2",
      title: "Onlinetest",
      description:
        "Teste deine Fähigkeiten im Onlinetest, der dein Profil mit den Anforderungen abgleicht.",
      icon: "/assets/home/Application-S2.svg",
    },
    {
      step: "Schritt 3",
      title: "Strukturiertes Interview",
      description:
        "Überzeuge mit Selbstpräsentation, Fallbeispielen und einem offenen Gespräch.",
      icon: "/assets/home/Application-S3.svg",
    },
    {
      step: "Schritt 4",
      title: "Praxis- und Teamtest",
      description:
        "Zeige dein Können bei Übungen und handwerklich-technischen Aufgaben.",
      icon: "/assets/home/Application-S4.svg",
    },
    {
      step: "Schritt 5",
      title: "Eignungsuntersuchung",
      description:
        "Lasse deine körperliche und geistige Eignung für den Beruf prüfen.",
      icon: "/assets/home/Application-S5.svg",
    },
  ];

  return (
    <SliderBase
      data={processSteps}
      renderSlide={(item) => (
        <Card
          subtitle={item.step}
          title={item.title}
          description={item.description}
          icon={item.icon}
          variant="process"
        />
      )}
      slidesPerView={1.2}
    />
  );
}
