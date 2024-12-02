// routes/jobs.js

const express = require('express');
const router = express.Router();

// Data for jobs
const jobsData = [
    {
        id: 1,
        name: '112 Bachelor',
        slug: '112-bachelor',
        description: ' Ausbildung in der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.\n' +
            '(24 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.414 €\n' +
            '\n' +
            'Einstellungstermin: 01.10.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.03.2025 ',
        tags: ['bachelor'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Bachelor_stctf9.png'
    },
    {
        id: 2,
        name: '112 Classic',
        slug: '112-classic',
        description: ' Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes\n' +
            '(18 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.318 €\n' +
            '\n' +
            'Einstellungstermin: 01.03.2025\n' +
            'oder 01.05. oder 01.07.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['hsa-2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Classic_ijwtzv.png'
    },
    {
        id: 3,
        name: '112 Direkt',
        slug: '112-direkt',
        description: ' Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes inklusive ' +
            'handwerklich-technischer Grundqualifizierung\n' +
            '(36 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 1.468 €\n' +
            '\n' +
            'Einstellungstermin: 01.09.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.03.2025 ',
        tags: ['msa'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Direkt_qisdvo.png'
    },
    {
        id: 4,
        name: '112 Direkt Plus',
        slug: '112-direkt-plus',
        description: ' Die Ausbildung erfolgt in zwei Teilen. Sie erlernen zunächst einen staatlich anerkannten Handwerksberuf. ' +
            'Nach Abschluss der Berufsausbildung absolvieren Sie den Vorbereitungsdienst in der Beamtenlaufbahn des mittleren ' +
            'feuerwehrtechnischen Dienstes.\n' +
            '(54 Monate)\n' +
            '\n' +
            'Ausbildungsvergütung (brutto):\n' +
            '1. Ausbildungsjahr: ca. 1.237 €\n' +
            '2. Ausbildungsjahr: ca. 1.291 €\n' +
            '3. Ausbildungsjahr: ca. 1.341€\n' +
            'Anwärterbezüge während des Vorbereitungsdienstes (brutto):\n' +
            'ca. 2.318 €\n' +
            '\n' +
            'Einstellungstermin: 01.09.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['bbr'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Direkt_Plus_rtn7ak.png'
    },
    {
        id: 5,
        name: '112 Dual',
        slug: '112-dual',
        description: ' Bachelor-Studium Brandschutz und Sicherheitstechnik (Vertiefungsrichtung Brandschutz) mit Ausbildung in ' +
            'der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.\n' +
            '(7 Semester)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 1.527 €\n' +
            '\n' +
            'Das nächste Bewerberverfahren für diesen Zugangsweg wurde noch nicht veröffentlicht.',
        tags: ['aghr'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Dual_fbwvd3.png'
    },
    {
        id: 6,
        name: '112 Master',
        slug: '112-master',
        description: ' Brandreferendariat für die Beamtenlaufbahn des höheren feuerwehrtechnischen Dienstes.\n' +
            '(24 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.795 €\n' +
            '\n' +
            'Das nächste Bewerberverfahren für diesen Zugangsweg wurde noch nicht veröffentlicht.',
        tags: ['master'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Master_edesfv.png'
    },
    {
        id: 7,
        name: '112 Medic',
        slug: '112-medic',
        description: ' Ausbildung zur Notfallsanitäterin oder zum Notfallsanitäter auch als Kombiausbildung zur Feuerwehrfrau / ' +
            'zum Feuerwehrmann (m/w/d)\n' +
            '(41 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            '1. bis 3. Ausbildungsjahr: ca. 1.468 €\n' +
            '4. Ausbildungsjahr: ca. 2.395 €\n' +
            '\n' +
            'Einstellungstermin: 01.03.2025\n' +
            'oder 01.05. oder 01.07.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['msa', 'hsa2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Medic_ikoxuv.png'
    },
    {
        id: 8,
        name: '112 Medic Expert',
        slug: '112-medic-expert',
        description: ' Feuerwehrtechnische Verbeamtung für Notfallsanitäterinnen / Notfallsanitäter\n' +
            '(6 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.318 €\n' +
            '\n' +
            'Einstellungstermin: 01.03.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['arb'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818443/112_Medic_Expert_vttej2.png'
    },
    {
        id: 9,
        name: 'Notfallsanitäterausbildung',
        slug: 'nsa',
        description: ' Berufsausausbildung im Beschäftigtenverhältnis\n' +
            '(36 Monate)\n' +
            '\n' +
            'Ausbildungsvergütung (brutto)\n' +
            '1. Ausbildungsjahr: ca. 1.381 €\n' +
            '2. Ausbildungsjahr: ca. 1.447 €\n' +
            '3. Ausbildungsjahr: 1.553 €\n' +
            '\n' +
            'Einstellungstermin: 01.03.2025\n' +
            'oder 01.05. oder 01.07.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['msa', 'hsa2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818443/Notfallsanit%C3%A4terausbildung_q7tepy.png'
    }
];

// Route for getting jobs
router.get('/', (req, res) => {
    res.status(200).json(jobsData);
});

module.exports = router;