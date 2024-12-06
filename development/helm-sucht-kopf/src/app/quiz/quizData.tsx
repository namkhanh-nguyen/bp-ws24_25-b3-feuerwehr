type Option = {
  prefix: string;
  text: string;
};

type Question = {
  title: string;
  type: 'options' | 'scale' | 'imageOptions';
  options?: Option[]; // Only for 'options' type questions
  images?: { src: string; label: string }[]; // For imageOptions type questions
  minLabel?: string; // For scale questions
  maxLabel?: string; // For scale questions
  minValue?: number; // For scale questions
  maxValue?: number; // For scale questions
};

export const quizData: Question[] = [

    {
    title: 'Du siehst den Unfall und bemerkst, dass Personen noch im Fahrzeug sind. Dein Adrenalin steigt. Was ist Dein erster Instinkt?',
    type: 'options',
    options: [
      { prefix: 'A', text: '„lch bleibe ruhig, gehe vorsichtig zum Unfallwagen und prufe den Zustand der Personen, ohne sie sofort zu bewegen.“'},
      { prefix: 'B', text: '„lch rufe sofort den Notruf an, beschreibe die Lage und folge den Anweisungen der Leitstelle.“'},
      { prefix: 'C', text: '„lch fordere meine Freunde auf, den Verkehr abzusichern, damit es nicht zu weiteren Unfällen kommt, und Oberprufe dann die Insassen.“'},
    ],
  },
  {
    title: 'Als Du Dich dem Auto naherst, siehst Du, dass der Fahrer bei Bewusstsein ist, aber schwer verletzt wirkt. Der Beifahrer scheint bewusstlos zu sein. Wie gehst du vor?',
    type: 'options',
    options: [
      { prefix: 'A', text: '„lch spreche den Fahrer ruhig an, um ihn zu beruhigen, und versuche herauszufinden, ob er sich bewegen kann, während ich den Notruf informiere.“'},
      { prefix: 'B', text: '„lch versuche vorsichtig, den Beifahrer aus dem Auto zu holen, da Rauch aus dem Motorraum aufsteigt, ohne zu wissen, ob das Auto Feuer fangen könnte.“'},
      { prefix: 'C', text: '„lch bleibe bei den lnsassen, versuche, den Rauch im Auge zu behalten, und halte sie stabil, bis professionelle Hilfe eintrifft.“'},
    ],
  },
  {
    title: 'Der Motorraum beginnt gefahrlich zu qualmen, und Du spürst die Hitze des Autos. Was machst Du?',
    type: 'options',
    options: [
        { prefix: 'A', text: '„lch fordere meine Freunde auf, einen Feuerlöscher zu suchen oder Wasser herbeizuholen, wahrend ich einen Sicherheitsabstand halte.“'},
        { prefix: 'B', text: '„lch überprufe, ob es sicher ist, die lnsassen aus dem Auto zu holen, und bringe sie so schnell wie moglich in Sicherheit.“'},
        { prefix: 'C', text: '„lch ziehe mich mit meinen Freunden zurück, um auf die Feuerwehr zu warten, und verhindere, dass sich andere dem Unfallfahrzeug nahern.“'},
    ],
  },
  {
    title: 'Ein anderer Passant kommt hinzu und bietet seine Hilfe an. Was ist Deine Reaktion?',
    type: 'options',
    options: [
        { prefix: 'A', text: '„lch bitte ihn, sich um den Verkehr zu kümmern und zu versuchen, andere Fahrzeuge zu warnen.“'},
        { prefix: 'B', text: 'lch lasse ihn bei den Verletzten bleiben, während ich selbst nach einem Feuerlöscher oder einem Hilfsmittel suche.“'},
        { prefix: 'C', text: '„lch erkläre ihm ruhig die Situation und bitte ihn, den Notruf erneut zu informieren, falls die Lage eskaliert.“'},
    ],
  },
  {
    title: 'Während Du auf den Rettungsdienst wartest, fängt jemand an, Fotos und Videos des Unfalls zu machen. Wie reagierst Du?',
    type: 'options',
    options: [
        { prefix: 'A', text: '„lch bitte die Person hoflich, damit aufzuhoren, und erkläre, dass es wichtiger ist, den Verletzten zu helfen.“'},
        { prefix: 'B', text: 'lch ignoriere es und konzentriere mich weiter auf die Unfallstelle, denn die Sicherheit der lnsassen hat Prioritat.“'},
        { prefix: 'C', text: '„lch fordere die Person energisch auf, Platz zu machen, und stelle sicher, dass der Bereich um den Unfallwagen nicht blockiert wird.“'},
    ],
  },
  {
    title: 'Die Rettungskrafte treffen endlich ein und übernehmen die Situation. Was machst Du jetzt?',
    type: 'options',
    options: [
    { prefix: 'A', text: '„lch gebe den Rettungskraften alle wichtigen lnformationen, die ich habe, und beschreibe, was ich beobachtet habe.“'},
      { prefix: 'B', text: 'lch ziehe mich zuruck, lasse die Profis arbeiten, und beruhige meine Freunde, die noch unter Schock stehen.“'},
      { prefix: 'C', text: '„lch bleibe in der Nahe und biete an, weiter zu helfen, wenn noch etwas benötigt wird.“'},
    ],
  },

  {
    title: 'Welches Werkzeug würdest du zuerst auswählen?',
    type: 'imageOptions',
    images: [
      {
        src: '/tools/axe.png',
        label: 'Axt',
      },
      {
        src: '/tools/fire_extinguisher.png',
        label: 'Feuerlöscher',
      },
      {
        src: '/tools/ladder.png',
        label: 'Leiter',
      },
    ],
  },

];
