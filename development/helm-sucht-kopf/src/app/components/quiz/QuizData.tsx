type Option = {
    prefix: string;
    text: string;
    category: 'A' | 'B' | 'C';
};

type Question = {
    id: number,
    title: string;
    type: 'options' | 'scale' | 'imageOptions'| 'input'| 'slider'| 'timer'|'illustration' | 'fitness';
    options?: Option[];
    questions?: { label: string; options: string[] }[];
    images?: { src: string; category: string }[];
    minLabel?: string;
    maxLabel?: string;
    minValue?: number;
    maxValue?: number;
    story?: string;
    image?: string;
    required: boolean;
};

export const quizData: Question[] = [
    {
        id: 1,
        required: false,
        title: 'Wie würdest Du dein Deutsches Sprachniveau einschätzen?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich kann mich gut verständigen, aber mein Niveau liegt unter C1."', category: 'D' },
            { prefix: 'B', text: '„Mein Sprachniveau ist C1 oder höher – ich fühle mich sicher in komplexen Gesprächen und Texten."', category: 'E' },
        ],
    },
    {
        id: 2,
        required: false,
        title: 'Wie groß bist Du?',
        type: 'input',
        minValue: 165,
        maxValue: 195
    },
    {
        id: 3,
        required: false,
        title: 'Ich interessiere mich für: ',
        type: 'imageOptions',
        images: [
            {src: '/assets/quiz/sani.jpg', category: 'A'},
            { src: '/assets/quiz/auto.jpg',  category: 'B' },
            { src: '/assets/quiz/feuerwehrauto.jpg', category: 'B' },
            { src: '/assets/quiz/brand.jpg',  category: 'C' },
            { src: '/assets/quiz/handwerk.jpg',  category: 'C' },
            { src: '/assets/quiz/schutz.jpg',  category: 'A' },
        ],
    },
    {
        id: 4,
        required: false,
        title: 'Wie wohl fühlst Du Dich im Umgang mit Blut und medizinischen Notfällen?',
        type: 'slider',
        minLabel: 'Sehr unwohl', // Label for the minimum value
        maxLabel: 'Sehr sicher', // Label for the maximum value
        minValue: 0, // Minimum value
        maxValue: 100, // Maximum value
    },

    {
        id: 5,
        required: false,
        title: 'Fitnesstest - Bist Du bereit für eine Challenge?',
        type: 'fitness',
        questions: [
            {
                label: 'Wie viele Liegestütze schaffst Du am Stück?',
                options: ['Weniger als 10', '10 - 20', '20 - 30', '30 - 40', 'Über 40'],
            },
            {
                label: 'Wie viele Sit ups schaffst Du am Stück?',
                options: ['Weniger als 10', '10 - 20', '20 - 30', '30 - 40', 'Über 40'],
            },
        ],
    },
    {
        id: 6,
        required: false,
        title: 'Ausdauertest – Wie lange kannst Du Deinen Atem anhalten?',
        type: 'timer',
    },
    {
        id: 7,
        required: false,
        title: 'Du siehst den Unfall und bemerkst, dass Personen noch im Fahrzeug sind. Dein Adrenalin steigt. Was ist Dein erster Instinkt?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich bleibe ruhig, gehe vorsichtig zum Unfallwagen und prüfe den Zustand der Personen, ohne sie sofort zu bewegen."', category: 'A'},
            { prefix: 'B', text: '„Ich rufe sofort den Notruf an, beschreibe die Lage und folge den Anweisungen der Leitstelle."', category: 'B'},
            { prefix: 'C', text: '„Ich fordere meine Freunde auf, den Verkehr abzusichern, damit es nicht zu weiteren Unfällen kommt, und überprüfe dann die Insassen."', category: 'C'},
        ],
    },
    {
        id: 8,
        required: true,
        title: 'Als Du Dich dem Auto näherst, siehst Du, dass der Fahrer bei Bewusstsein ist, aber schwer verletzt wirkt. Der Beifahrer scheint bewusstlos zu sein. Wie gehst du vor?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich spreche den Fahrer ruhig an, um ihn zu beruhigen, und versuche herauszufinden, ob er sich bewegen kann, während ich den Notruf informiere."', category: 'A'},
            { prefix: 'B', text: '„Ich versuche vorsichtig, den Beifahrer aus dem Auto zu holen, da Rauch aus dem Motorraum aufsteigt, ohne zu wissen, ob das Auto Feuer fangen könnte."', category: 'B'},
            { prefix: 'C', text: '„Ich bleibe bei den Insassen, versuche, den Rauch im Auge zu behalten, und halte sie stabil, bis professionelle Hilfe eintrifft."', category: 'C'},
        ],
    },
    {
        id:9,
        required: false,
        title: 'Der Motorraum beginnt gefährlich zu qualmen, und Du spürst die Hitze des Autos. Was machst Du?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich fordere meine Freunde auf, einen Feuerlöscher zu suchen oder Wasser herbeizuholen, während ich einen Sicherheitsabstand halte."', category: 'A'},
            { prefix: 'B', text: '„Ich überprüfe, ob es sicher ist, die Insassen aus dem Auto zu holen, und bringe sie so schnell wie möglich in Sicherheit."', category: 'B'},
            { prefix: 'C', text: '„Ich ziehe mich mit meinen Freunden zurück, um auf die Feuerwehr zu warten, und verhindere, dass sich andere dem Unfallfahrzeug nähern."', category: 'C'},
        ],
    },
    {
        id: 10,
        required: false,
        title: 'Ein anderer Passant kommt hinzu und bietet seine Hilfe an. Was ist Deine Reaktion?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich bitte ihn, sich um den Verkehr zu kümmern und zu versuchen, andere Fahrzeuge zu warnen."', category: 'A'},
            { prefix: 'B', text: '„Ich lasse ihn bei den Verletzten bleiben, während ich selbst nach einem Feuerlöscher oder einem Hilfsmittel suche."', category: 'B'},
            { prefix: 'C', text: '„Ich erkläre ihm ruhig die Situation und bitte ihn, den Notruf erneut zu informieren, falls die Lage eskaliert."', category: 'C'},
        ],
    },
    {
        id: 11,
        required: false,
        title: 'Während Du auf den Rettungsdienst wartest, fängt jemand an, Fotos und Videos des Unfalls zu machen. Wie reagierst Du?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich bitte die Person höflich, damit aufzuhören, und erkläre, dass es wichtiger ist, den Verletzten zu helfen."', category: 'A'},
            { prefix: 'B', text: '„Ich ignoriere es und konzentriere mich weiter auf die Unfallstelle, denn die Sicherheit der Insassen hat Priorität."', category: 'B'},
            { prefix: 'C', text: '„Ich fordere die Person energisch auf, Platz zu machen, und stelle sicher, dass der Bereich um den Unfallwagen nicht blockiert wird."', category: 'C'},
        ],
    },
    {
        id: 12,
        required: false,
        title: 'Die Rettungskräfte treffen endlich ein und übernehmen die Situation. Was machst Du jetzt?',
        type: 'options',
        options: [
            { prefix: 'A', text: '„Ich gebe den Rettungskräften alle wichtigen Informationen, die ich habe, und beschreibe, was ich beobachtet habe."', category: 'A'},
            { prefix: 'B', text: '„Ich ziehe mich zurück, lasse die Profis arbeiten, und beruhige meine Freunde, die noch unter Schock stehen."', category: 'B'},
            { prefix: 'C', text: '„Ich bleibe in der Nähe und biete an, weiter zu helfen, wenn noch etwas benötigt wird."', category: 'C'},
        ],
    },
    {
        id: 13,
        required: false,
        title: "Nach dem Unfall sind deine Freunde aufgewühlt, und die Ereignisse gehen dir nicht aus dem Kopf. Wie gehst du damit um?",
        type: 'options',
        options: [
            {prefix: 'A', text: 'Ich fühle mich überwältigt und emotional stark betroffen', category: 'A'},
            {prefix: 'B', text: 'Ich bin emotional, aber ich kann mich einigermaßen gut beruhigen', category: 'A'},
            {prefix: 'C', text: 'Ich fühle eine Mischung aus Betroffenheit und einem Bedürfnis, das Erlebte zu erarbeiten', category: 'B'},
            {prefix: 'D', text: 'Ich bin nach dem Vorfall zwar bewegt, aber auch motiviert, mich zu verbessern.', category: 'B'},
            {prefix: 'E', text: 'Ich fühle mich motiviert und voller Tatendrang, um meine Fähigkeiten zu erweitern und in Zukunft noch besser zu reagieren', category: 'C'}
        ],
    },
];

