const express = require('express');
const router = express.Router();

const quizData = [
    {
        id: 1,
        question: "Du siehst den Unfall und bemerkst, dass Personen noch im Fahrzeug sind. Dein Adrenalin steigt. Was ist dein erster Instinkt?\n",
        options: [
            {answer: "Ich bleibe ruhig, gehe vorsichtig zum Unfallwagen und prüfe den Zustand der Personen , ohne sie sofort zu bewegen.", category: "A"},
            {answer: "Ich rufe sofort den Notruf an, beschreibe die Lage und folge den Anweisungen der Leitstelle.", category: "B"},
            {answer: "Ich fordere meine Freunde auf, den Verkehr abzusichern, damit es nicht zu weiteren Unfällen kommt, und überprüfe dann die Insassen.", category: "C"}
        ]
    },
    {
        id: 2,
        question: "Als du dich dem Auto näherst, siehst du, dass der Fahrer bei Bewusstsein ist, aber schwer verletzt wirkt. Der Beifahrer scheint bewusstlos zu sein. Wie gehst du vor?\n",
        options: [
            {answer: "Ich spreche den Fahrer ruhig an, um ihn zu beruhigen, und versuche herauszufinden, ob er sich bewegen kann, während ich den Notruf informiere.", category: "A"},
            {answer: "Ich versuche vorsichtig, den Beifahrer aus dem Auto zu holen, da Rauch aus dem Motorraum aufsteigt, ohne zu wissen, ob das Auto Feuer fangen könnte.", category: "B"},
            {answer: "Ich bleibe bei den Insassen, versuche, den Rauch im Auge zu behalten, und halte sie stabil, bis professionelle Hilfe eintrifft.", category: "C"}
        ]
    },
    {
        id: 3,
        question: "Der Motorraum beginnt gefährlich zu qualmen, und du spürst die Hitze des Autos. Was machst du?",
        options: [
            {answer: "Ich fordere meine Freunde auf, einen Feuerlöscher zu suchen oder Wasser herbeizuholen, während ich einen Sicherheitsabstand halte.", category: "A"},
            {answer: "Ich überprüfe, ob es sicher ist, die Insassen aus dem Auto zu holen, und bringe sie so schnell wie möglich in Sicherheit.", category: "B"},
            {answer: "Ich ziehe mich mit meinen Freunden zurück, um auf die Feuerwehr zu warten, und verhindere, dass sich andere dem Unfallfahrzeug nähern", category: "C"}
        ]
    },
    {
        id: 4,
        question: "Ein anderer Passant kommt hinzu und bietet seine Hilfe an. Was ist deine Reaktion?\n",
        options: [
            {answer: "Ich bitte ihn, sich um den Verkehr zu kümmern und zu versuchen, andere Fahrzeuge zu warnen.", category: "A"},
            {answer: "Ich lasse ihn bei den Verletzten bleiben, während ich selbst nach einem Feuerlöscher oder einem Hilfsmittel suche.", category: "B"},
            {answer: "Ich erkläre ihm ruhig die Situation und bitte ihn, den Notruf erneut zu informieren, falls die Lage eskaliert.", category: "C"}
        ]
    },
    {
        id: 5,
        question: "Während du auf den Rettungsdienst wartest, fängt jemand an, Fotos und Videos des Unfalls zu machen. Wie reagierst du?\n",
        options: [
            {answer: "Ich bitte die Person höflich, damit aufzuhören, und erkläre, dass es wichtiger ist, den Verletzten zu helfen.", category: "A"},
            {answer: "Ich ignoriere es und konzentriere mich weiter auf die Unfallstelle, denn die Sicherheit der Insassen hat Priorität.", category: "B"},
            {answer: "Ich fordere die Person energisch auf, Platz zu machen, und stelle sicher, dass der Bereich um den Unfallwagen nicht blockiert wird.", category: "C"}
        ]
    },
    {
        id: 6,
        question: "Die Rettungskräfte treffen endlich ein und übernehmen die Situation. Was machst du jetzt?\n",
        options: [
            {answer: "Ich gebe den Rettungskräften alle wichtigen Informationen, die ich habe, und beschreibe, was ich beobachtet habe.", category: "A"},
            {answer: "Ich ziehe mich zurück, lasse die Profis arbeiten, und beruhige meine Freunde, die noch unter Schock stehen.", category: "B"},
            {answer: "Ich bleibe in der Nähe und biete an, weiter zu helfen, wenn noch etwas benötigt wird.", category: "C"}
        ]
    },
    {
        id: 7,
        question: "Nach dem Unfall sind deine Freunde aufgewühlt, und die Ereignisse gehen dir nicht aus dem Kopf. Wie gehst du damit um?\n",
        options: [
            {answer: "Ich fühle mich überwältigt und emotional stark betroffen", category: "A"},
            {answer: "Ich bin emotional, aber ich kann mich einigermaßen gut beruhigen\n", category: "A"},
            {answer: "Ich fühle eine Mischung aus Betroffenheit und einem Bedürfnis, das Erlebte zu erarbeiten", category: "B"},
            {answer: "Ich bin nach dem Vorfall zwar bewegt, aber auch motiviert, mich zu verbessern.", category: "B"},
            {answer: "Ich fühle mich motiviert und voller Tatendrang, um meine Fähigkeiten zu erweitern und in Zukunft noch besser zu reagieren\n", category: "C"},
        ]
    },
];
router.post('/data', (req, res) => {
    const receivedData = req.body.answers;
    console.log('received answers:', receivedData);

    const categoryCounts = {A:0, B:0, C:0};

    receivedData.forEach(answer => {
        if(answer.selectedOption === 'A'){
            categoryCounts.A++;
        } else if (answer.selectedOption === 'B'){
            categoryCounts.B++;
        }else {
            categoryCounts.C++;
        }
    });
    let majorityCategory;
    if(categoryCounts.A > categoryCounts.B && categoryCounts.A > categoryCounts.C){
        majorityCategory = 'A';
    } else if (categoryCounts.B > categoryCounts.A && categoryCounts.B > categoryCounts.C){
        majorityCategory = 'B';
    } else{
        majorityCategory = 'C';
    }

    let programs = [];

    switch(majorityCategory){
        case 'A':
            programs = ['112 Medic', 'Notfallsanitäterausbildung', 'Medic Expert'];
            break;
        case 'B':
            programs = ['112 Direkt', '112 Direkt Plus', 'Classic'];
            break;
        case 'C':
            programs = ['Dual', 'Bachelor', 'Master'];
            break;
    }
    res.status(200).json({
        programs: programs,
    });
});
router.get('/', (req, res) => {
    res.status(200).json(quizData);
});
module.exports = router;