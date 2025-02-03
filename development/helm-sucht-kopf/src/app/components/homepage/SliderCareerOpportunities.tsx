"use client";

import SliderBase from "./SliderBase";
import Card from "./Card";

export default function SliderCareerOpportunities() {
  const opportunities = [
    {
      title: "Notfallsanitäter/in",
      subtitle: "Ausbildung",
      description:
        "Du rettest Leben, versorgst Menschen, begleitest Patienten ins Krankenhaus und sorgst für professionelle Unterstützung.",
      image: "/assets/home/Notsan.jpg",
      link: "https://www.berliner-feuerwehr.de/karriere/ausbildung-zur-notfallsanitaeterin-oder-zum-notfallsanitaeter/",
    },
    {
      title: "Mittlerer Dienst",
      subtitle: "Ausbildung",
      description:
        "Du arbeitest im Rettungsdienst, bekämpfst Brände, hilfst bei Notfällen und sorgst für Sicherheit in jeder Situation.",
      image: "/assets/home/BF_MD.jpg",
      link: "https://www.berliner-feuerwehr.de/karriere/ausbildung-im-mittleren-feuerwehrtechnischen-dienst/",
    },
    {
      title: "Gehobener Dienst",
      subtitle: "Ausbildung oder Studium",
      description:
        "Du planst Einsätze, führst Teams, organisierst Personal und stellst die Einsatzbereitschaft zuverlässig sicher.",
      image: "/assets/home/BF_GD.jpg",
      link: "https://www.berliner-feuerwehr.de/karriere/ausbildung-oder-studium-fuer-den-gehobenen-feuerwehrtechnischen-dienst/",
    },
    {
      title: "Höherer Dienst",
      subtitle: "Ausbildung",
      description:
        "Du leitest Einsätze, trägst Verantwortung für Personal, Technik und Organisation und entscheidest über wichtige Maßnahmen.",
      image: "/assets/home/BF_HD.jpg",
      link: "https://www.berliner-feuerwehr.de/karriere/ausbildung-im-hoeheren-feuerwehrtechnischen-dienst/",
    },
  ];

  return (
    <SliderBase
      data={opportunities}
      renderSlide={(item) => (
        <Card
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          image={item.image}
          link={item.link}
          variant="career"
        />
      )}
      slidesPerView={1.15}
    />
  );
}
