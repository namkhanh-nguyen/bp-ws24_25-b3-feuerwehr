// routes/jobs.js

const express = require('express');
const router = express.Router();

// Data for jobs
/**
 * Array containing data related to various job opportunities in the fire service sector.
 * Each element in the array represents a specific job opportunity with detailed information.
 *
 * Properties:
 * @property {number} id - Unique identifier for each job.
 * @property {string} name - The name/title of the job.
 * @property {string} slug - A URL-friendly version of the job name.
 * @property {string} requirements - A description of the qualifications required for the job.
 * @property {string} shortDesc - A brief description of the job.
 * @property {string} longDesc - A detailed description of the job, including duration, remuneration, and critical dates.
 * @property {Array<string>} tags - An array of tags categorizing each job.
 * @property {string} imageUrl - A URL to an image that visually represents the job.
 * @property {string} jobUrl - A URL link to the job's posting for application or more information.
 * IMPORTANT: leave this empty if no job posting is available, the frontend will show users a placeholder text instead.
 */
const jobsData = [
    {
        id: 1,
        name: '112 Bachelor',
        slug: '112-bachelor',
        requirements: 'Sie haben einen Bachelor-Abschluss nach einem mindestens dreijährigen Bachelor-Studium an einer Universität oder Fachhochschule. ',
        shortDesc: 'Ausbildung in der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.',
        longDesc: ' Ausbildung in der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.\n' +
            '(24 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.414 €\n' +
            '\n' +
            'Einstellungstermin: 01.10.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.03.2025 ',
        tags: ['bachelor'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Bachelor_stctf9.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Bachelor-Fhrungsnachwuchskrfte-mwd-Beamtenlaufbahn-Feu-de-j53544.html'
    },
    {
        id: 2,
        name: '112 Classic',
        slug: '112-classic',
        requirements: 'Sie haben mindestens einen Hauptschulabschluss und eine Berufsausbildung von mindestens zweijähriger Dauer abgeschlossen.',
        shortDesc: 'Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes.',
        longDesc: ' Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes\n' +
            '(18 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.318 €\n' +
            '\n' +
            'Einstellungstermin: 01.03.2025\n' +
            'oder 01.05. oder 01.07.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['hsa2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Classic_ijwtzv.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Classic-1242024-Ausbildung-Feuerwehrfrau-Feuerwehrmann-de-j52296.html'
    },
    {
        id: 3,
        name: '112 Direkt',
        slug: '112-direkt',
        requirements: 'Sie haben mindestens einen Mittleren Schulabschluss und keine abgeschlossene Berufsausbildung.',
        shortDesc: 'Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes',
        longDesc: ' Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes ' +
            'inklusive handwerklich-technischer Grundqualifizierung\n' +
            '(36 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 1.468 €\n' +
            '\n' +
            'Einstellungstermin: 01.09.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.03.2025 ',
        tags: ['msa'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Direkt_qisdvo.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Direkt-1522024-Ausbildung-Feuerwehrfrau-Feuerwehrmann--de-j51736.html'
    },
    {
        id: 4,
        name: '112 Direkt Plus',
        slug: '112-direkt-plus',
        requirements: 'Sie haben mindestens die Berufsbildungsreife und keine abgeschlossene Berufsausbildung.',
        shortDesc: 'Nach Abschluss der Berufsausbildung absolvieren Sie den Vorbereitungsdienst ' +
            'in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes',
        longDesc: ' Die Ausbildung erfolgt in zwei Teilen. Sie erlernen zunächst einen staatlich anerkannten Handwerksberuf. ' +
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
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Direkt_Plus_rtn7ak.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Direkt-Plus-092025-de-j48800.html'
    },
    {
        id: 5,
        name: '112 Dual',
        slug: '112-dual',
        requirements: 'Sie haben die Schule mit der allgemeinen Hochschulreife abgeschlossen.',
        shortDesc: ' Bachelor-Studium Brandschutz und Sicherheitstechnik (Vertiefungsrichtung Brandschutz) mit Ausbildung in ' +
            'der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.',
        longDesc: ' Bachelor-Studium Brandschutz und Sicherheitstechnik (Vertiefungsrichtung Brandschutz) mit Ausbildung ' +
            'in der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.\n' +
            '(7 Semester)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 1.527 €',
        tags: ['aghr'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Dual_fbwvd3.png',
        jobUrl: ''
    },
    {
        id: 6,
        name: '112 Master',
        slug: '112-master',
        requirements: 'Sie haben ein Studium an einer Universität mit einer Hochschulprüfung (Diplom-Hauptprüfung, Master) oder einer ersten Staatsprüfung abgeschlossen.',
        shortDesc: 'Brandreferendariat für die Beamtenlaufbahn des höheren feuerwehrtechnischen Dienstes.',
        longDesc: ' Brandreferendariat für die Beamtenlaufbahn des höheren feuerwehrtechnischen Dienstes.\n' +
            '(24 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.795 €\n',
        tags: ['master'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Master_edesfv.png',
        jobUrl: ''
    },
    {
        id: 7,
        name: '112 Medic',
        slug: '112-medic',
        requirements: 'Sie haben mindestens einen Mittleren Schulabschluss und keine abgeschlossene Berufsausbildung, oder\n\n' +
            'Sie haben mindestens einen Hauptschulabschluss und eine Berufsausbildung von mindestens zweijähriger Dauer abgeschlossen.',
        shortDesc: 'Ausbildung zur Notfallsanitäterin oder zum Notfallsanitäter auch als Kombiausbildung zur Feuerwehrfrau / ' +
            'zum Feuerwehrmann (m/w/d)',
        longDesc: ' Ausbildung zur Notfallsanitäterin oder zum Notfallsanitäter auch als Kombiausbildung ' +
            'zur Feuerwehrfrau / zum Feuerwehrmann (m/w/d)\n' +
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
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Medic_ikoxuv.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Medic-1342024-Ausbildung-Notfallsanitterin-Notfallsani-de-j52313.html'
    },
    {
        id: 8,
        name: '112 Medic Expert',
        slug: '112-medic-expert',
        requirements: 'Sie sind Notfallsanitäterin bzw. Notfallsanitäter',
        shortDesc: 'Feuerwehrtechnische Verbeamtung für Notfallsanitäterinnen / Notfallsanitäter',
        longDesc: ' Feuerwehrtechnische Verbeamtung für Notfallsanitäterinnen / Notfallsanitäter\n' +
            '(6 Monate)\n' +
            '\n' +
            'Anwärterbezüge (brutto)\n' +
            'ca. 2.318 €\n' +
            '\n' +
            'Einstellungstermin: 01.03.2025\n' +
            '\n' +
            'Ende der Bewerbungsfrist: 31.12.2024 ',
        tags: ['arb'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818443/112_Medic_Expert_vttej2.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Medic-Expert-1442024-feuerwehrtechnische-Verbeamtung-f-de-j52393.html'
    },
    {
        id: 9,
        name: 'Notfallsanitäterausbildung',
        slug: 'nsa',
        requirements: 'Sie haben mindestens einen Mittleren Schulabschluss und keine abgeschlossene Berufsausbildung, oder\n\n' +
            'Sie haben mindestens einen Hauptschulabschluss und eine Berufsausbildung von mindestens zweijähriger Dauer abgeschlossen.',
        shortDesc: 'Berufsausausbildung im Beschäftigtenverhältnis',
        longDesc: ' Berufsausausbildung im Beschäftigtenverhältnis\n' +
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
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818443/Notfallsanit%C3%A4terausbildung_q7tepy.png',
        jobUrl: 'https://www.karriereportal-stellen.berlin.de/112-Medic-1342024-Ausbildung-Notfallsanitterin-Notfallsani-de-j52313.html'
    }
];

// Route for getting jobs
router.get('/', (req, res) => {
    res.status(200).json(jobsData);
});

module.exports = router;