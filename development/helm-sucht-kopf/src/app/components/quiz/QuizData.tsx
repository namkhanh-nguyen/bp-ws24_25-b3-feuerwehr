type Option = {
    prefix: string;
    text: string;
    category: 'A' | 'B' | 'C';
};

type Question = {
    id: number,
    title: string;
    type: 'options' | 'scale' | 'imageOptions';
    options?: Option[];
    images?: { src: string; label: string }[];
    minLabel?: string;
    maxLabel?: string;
    minValue?: number;
    maxValue?: number;
};

export const quizData: Question[] = [
    {
        id: 1,
        title: 'Du siehst den Unfall und bemerkst, dass Personen noch im Fahrzeug sind. Dein Adrenalin steigt. Was ist Dein erster Instinkt?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich bleibe ruhig, gehe vorsichtig zum Unfallwagen und prüfe den Zustand der Personen, ohne sie sofort zu bewegen."', category: 'A'},
            { prefix: 'B', text: '„Ich rufe sofort den Notruf an, beschreibe die Lage und folge den Anweisungen der Leitstelle."', category: 'B'},
            { prefix: 'C', text: '„Ich fordere meine Freunde auf, den Verkehr abzusichern, damit es nicht zu weiteren Unfällen kommt, und überprüfe dann die Insassen."', category: 'C'},
        ],
    },
    {
        id: 2,
        title: 'Als Du Dich dem Auto näherst, siehst Du, dass der Fahrer bei Bewusstsein ist, aber schwer verletzt wirkt. Der Beifahrer scheint bewusstlos zu sein. Wie gehst du vor?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich spreche den Fahrer ruhig an, um ihn zu beruhigen, und versuche herauszufinden, ob er sich bewegen kann, während ich den Notruf informiere."', category: 'A'},
            { prefix: 'B', text: '„Ich versuche vorsichtig, den Beifahrer aus dem Auto zu holen, da Rauch aus dem Motorraum aufsteigt, ohne zu wissen, ob das Auto Feuer fangen könnte."', category: 'B'},
            { prefix: 'C', text: '„Ich bleibe bei den Insassen, versuche, den Rauch im Auge zu behalten, und halte sie stabil, bis professionelle Hilfe eintrifft."', category: 'C'},
        ],
    },
    {
        id: 3,
        title: 'Der Motorraum beginnt gefährlich zu qualmen, und Du spürst die Hitze des Autos. Was machst Du?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich fordere meine Freunde auf, einen Feuerlöscher zu suchen oder Wasser herbeizuholen, während ich einen Sicherheitsabstand halte."', category: 'A'},
            { prefix: 'B', text: '„Ich überprüfe, ob es sicher ist, die Insassen aus dem Auto zu holen, und bringe sie so schnell wie möglich in Sicherheit."', category: 'B'},
            { prefix: 'C', text: '„Ich ziehe mich mit meinen Freunden zurück, um auf die Feuerwehr zu warten, und verhindere, dass sich andere dem Unfallfahrzeug nähern."', category: 'C'},
        ],
    },
    {
        id: 4,
        title: 'Ein anderer Passant kommt hinzu und bietet seine Hilfe an. Was ist Deine Reaktion?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich bitte ihn, sich um den Verkehr zu kümmern und zu versuchen, andere Fahrzeuge zu warnen."', category: 'A'},
            { prefix: 'B', text: '„Ich lasse ihn bei den Verletzten bleiben, während ich selbst nach einem Feuerlöscher oder einem Hilfsmittel suche."', category: 'B'},
            { prefix: 'C', text: '„Ich erkläre ihm ruhig die Situation und bitte ihn, den Notruf erneut zu informieren, falls die Lage eskaliert."', category: 'C'},
        ],
    },
    {
        id: 5,
        title: 'Während Du auf den Rettungsdienst wartest, fängt jemand an, Fotos und Videos des Unfalls zu machen. Wie reagierst Du?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich bitte die Person höflich, damit aufzuhören, und erkläre, dass es wichtiger ist, den Verletzten zu helfen."', category: 'A'},
            { prefix: 'B', text: '„Ich ignoriere es und konzentriere mich weiter auf die Unfallstelle, denn die Sicherheit der Insassen hat Priorität."', category: 'B'},
            { prefix: 'C', text: '„Ich fordere die Person energisch auf, Platz zu machen, und stelle sicher, dass der Bereich um den Unfallwagen nicht blockiert wird."', category: 'C'},
        ],
    },
    {
        id: 6,
        title: 'Die Rettungskräfte treffen endlich ein und übernehmen die Situation. Was machst Du jetzt?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich gebe den Rettungskräften alle wichtigen Informationen, die ich habe, und beschreibe, was ich beobachtet habe."', category: 'A'},
            { prefix: 'B', text: '„Ich ziehe mich zurück, lasse die Profis arbeiten, und beruhige meine Freunde, die noch unter Schock stehen."', category: 'B'},
            { prefix: 'C', text: '„Ich bleibe in der Nähe und biete an, weiter zu helfen, wenn noch etwas benötigt wird."', category: 'C'},
        ],
    },
    {
        id: 7,
        title: "Nach dem Unfall sind deine Freunde aufgewühlt, und die Ereignisse gehen dir nicht aus dem Kopf. Wie gehst du damit um?",
        type: 'options',
        options: [
            {prefix: 'A', text: 'Ich fühle mich überwältigt und emotional stark betroffen', category: 'A'},
            {prefix: 'A', text: 'Ich bin emotional, aber ich kann mich einigermaßen gut beruhigen', category: 'A'},
            {prefix: 'B', text: 'Ich fühle eine Mischung aus Betroffenheit und einem Bedürfnis, das Erlebte zu erarbeiten', category: 'B'},
            {prefix: 'B', text: 'Ich bin nach dem Vorfall zwar bewegt, aber auch motiviert, mich zu verbessern.', category: 'B'},
            {prefix: 'C', text: 'Ich fühle mich motiviert und voller Tatendrang, um meine Fähigkeiten zu erweitern und in Zukunft noch besser zu reagieren', category: 'C'}
        ],
    },
];

