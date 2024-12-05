// routes/jobs.js

const express = require('express');
const router = express.Router();

// Data for jobs
const jobsData = [
    {
        id: 1,
        name: '112 Bachelor',
        slug: '112-bachelor',
        description: 'Ausbildung in der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.',
        tags: ['bachelor'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Bachelor_stctf9.png'
    },
    {
        id: 2,
        name: '112 Classic',
        slug: '112-classic',
        description: 'Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes.',
        tags: ['hsa-2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Classic_ijwtzv.png'
    },
    {
        id: 3,
        name: '112 Direkt',
        slug: '112-direkt',
        description: 'Vorbereitungsdienst in der Beamtenlaufbahn des mittleren feuerwehrtechnischen Dienstes',
        tags: ['msa'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Direkt_qisdvo.png'
    },
    {
        id: 4,
        name: '112 Direkt Plus',
        slug: '112-direkt-plus',
        description: 'Die Ausbildung erfolgt in zwei Teilen. Sie erlernen zunächst einen staatlich anerkannten Handwerksberuf. ' +
            'Nach Abschluss der Berufsausbildung absolvieren Sie den Vorbereitungsdienst in der Beamtenlaufbahn des mittleren ' +
            'feuerwehrtechnischen Dienstes',
        tags: ['bbr'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818439/112_Direkt_Plus_rtn7ak.png'
    },
    {
        id: 5,
        name: '112 Dual',
        slug: '112-dual',
        description: ' Bachelor-Studium Brandschutz und Sicherheitstechnik (Vertiefungsrichtung Brandschutz) mit Ausbildung in ' +
            'der Beamtenlaufbahn für den gehobenen feuerwehrtechnischen Dienst.',
        tags: ['aghr'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Dual_fbwvd3.png'
    },
    {
        id: 6,
        name: '112 Master',
        slug: '112-master',
        description: 'Brandreferendariat für die Beamtenlaufbahn des höheren feuerwehrtechnischen Dienstes.',
        tags: ['master'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Master_edesfv.png'
    },
    {
        id: 7,
        name: '112 Medic',
        slug: '112-medic',
        description: 'Ausbildung zur Notfallsanitäterin oder zum Notfallsanitäter auch als Kombiausbildung zur Feuerwehrfrau / ' +
            'zum Feuerwehrmann (m/w/d)',
        tags: ['msa', 'hsa2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818440/112_Medic_ikoxuv.png'
    },
    {
        id: 8,
        name: '112 Medic Expert',
        slug: '112-medic-expert',
        description: 'Feuerwehrtechnische Verbeamtung für Notfallsanitäterinnen / Notfallsanitäter',
        tags: ['arb'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818443/112_Medic_Expert_vttej2.png'
    },
    {
        id: 9,
        name: 'Notfallsanitäterausbildung',
        slug: 'nsa',
        description: 'Berufsausausbildung im Beschäftigtenverhältnis',
        tags: ['msa', 'hsa2j'],
        imageUrl: 'https://res.cloudinary.com/dassgyrzu/image/upload/v1730818443/Notfallsanit%C3%A4terausbildung_q7tepy.png'
    }
];

// Route for getting jobs
router.get('/', (req, res) => {
    res.status(200).json(jobsData);
});

module.exports = router;