import { Option } from "@/app/components/chatbot/ui/chat";


export const germanStems: Record<string, string[]> = {
    // ---- BEWERBUNG & RELATED TERMS ----
    bewerbung: [
        "bewerbung",
        "bewerbungen",
        "bewerben",
        "bewerber",
        "bewirbt",
        "bewerbungsunterlagen",
        "bewerbungsfrist",
        "bewerbungsfristen",
        "bewirbst",
    ],
    frist: [
        "frist",
        "fristen",
        "deadline",
        "zeitraum",
        "fristenregelung",
        "fristerweiterung",
    ],
    unterlagen: [
        "unterlagen",
        "dokumente",
        "papiere",
        "anträge",
        "antraege",
        "formulare",
    ],
    unvollstaendig: [
        "unvollständig",
        "unvollstaendig",
        "fehlend",
        "lückenhaft",
        "lueckenhaft",
    ],
    nachreichen: [
        "nachreichen",
        "nachreicht",
        "nachgereicht",
        "nachreichung",
    ],
    mehrfach: [
        "mehrfach",
        "mehrere",
        "gleichzeitig",
        "parallel",
        "zeitgleich",
    ],
    ehrenamt: [
        "ehrenamt",
        "ehrenamtlich",
        "freiwillig",
        "ehrem",
    ],
    freiwillige_feuerwehr: [
        "freiwillige feuerwehr",
        "ffw",
        "freiwillige",
        "ehrenamt",
    ],
    lehrgaenge: [
        "lehrgänge",
        "lehrgang",
        "fortbildungen",
        "fortbildung",
        "kurse",
        "weiterbildung",
    ],

    // ---- AUSBILDUNG & VORAUSSETZUNGEN ----
    ausbildung: [
        "ausbildung",
        "ausgebildet",
        "ausbilden",
        "ausbildungszeit",
        "berufsausbildung",
        "studium",
    ],
    bundeswehr: [
        "bundeswehr",
        "bundeswehrzeit",
        "zeit soldat",
        "dienstzeit",
        "zivildienst",
    ],
    fachabitur: [
        "fachabitur",
        "fos",
        "fachoberschule",
        "fachhochschulreife",
    ],
    zeugnis: [
        "zeugnis",
        "zeugnisse",
        "abschluss",
        "abschlusszeugnis",
    ],

    // ---- SPORT, SCHWIMMEN, FITNESS ----
    schwimmen: [
        "schwimmen",
        "schwimmabzeichen",
        "schwimmtest",
        "jugendschwimmpass",
        "bademeister",
        "schwimmt",
    ],
    sportabzeichen: [
        "sportabzeichen",
        "sportschein",
        "sportausweis",
        "sporturkunde",
        "silber",
        "sportabzeichen in silber",
    ],
    sportanforderungen: [
        "sportanforderungen",
        "grundfitness",
        "sportlich",
        "sporttest",
        "sportprüfung",
        "sportzertifikat",
    ],

    // ---- FÜHRERSCHEIN, FÜHRUNGSZEUGNIS, REGISTER ----
    fuehrerschein: [
        "führerschein",
        "fuehrerschein",
        "fahrerlaubnis",
        "fahren",
        "fahrer",
        "fahreignungsregister",
        "registerauszug",
    ],
    fuehrungszeugnis: [
        "führungszeugnis",
        "polizeiliches führungszeugnis",
        "zentralregister",
    ],

    // ---- ABLAUF, AUSWAHLVERFAHREN, KRANKHEIT, WIEDERHOLUNG ----
    ablauf: [
        "ablauf",
        "abläufe",
        "ablaufen",
        "läuft",
        "laeuft",
        "prozess",
        "vorgehen",
    ],
    auswahlverfahren: [
        "auswahlverfahren",
        "auswahl",
        "verfahren",
        "auswählen",
        "auswaehlen",
    ],
    krankheit: [
        "krankheit",
        "krankheitsbedingt",
        "erkrankung",
        "krank",
    ],
    wiederholung: [
        "wiederholung",
        "erneut",
        "noch einmal",
        "wiederbewerbung",
        "neu versuchen",
    ],

    // ---- TERMIN, ONLINE, EMAIL ----
    termin: [
        "termin",
        "termine",
        "zeitpunkt",
        "zeitraum",
        "endtermin",
    ],
    onlinetest: [
        "onlinetest",
        "online-test",
        "internettest",
        "test zu hause",
    ],
    email: [
        "email",
        "e-mail",
        "emailadresse",
        "mail",
    ],

    // ---- MISC / SUPPORTING ----
    classic_112: [
        "112 classic",
        "classic 112",
        "112classic",
    ],
    dual_112: [
        "112 dual",
        "dual 112",
        "112dual",
    ],
};


// filler words to ignore
const stopWords = new Set<string>([
    "der","die","das","den","dem","ein","eine","einer","eines","ich","du","er",
    "sie","es","wir","ihr","und","oder","aber","wenn","was","wer","wie","wo",
    "wann","warum","welche","welcher","welches","für","mit","bei","seit","von",
    "aus","nach","zu","zur","zum","ist","sind","war","waren","wird","werden",
    "wurde","wurden","kann","können","könnte","könnten","muss","müssen","musste",
    "müsste","hat","haben","hatte","hatten","ein","eine","eines","einem","einen",
    "über","unter","vor","nach","während","durch","wegen","ohne","gegen","um",
    "herum","zwischen","innerhalb","außerhalb","neben","gegenüber","hier","auch",
    "mal","doch","nur","immer","noch","schon","da","dann","dort","diese","dieser",
]);

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        // Remove punctuation (expand as needed)
        .replace(/[.,?!;:()[\]"'“”]/g, "")
        // Split on spaces
        .split(/\s+/)
        // Filter out stop words & short tokens
        .filter((t) => t.length >= 3 && !stopWords.has(t));
}

function canonicalize(tokens: string[]): string[] {
    return tokens.map((token) => {
        for (const [stem, variants] of Object.entries(germanStems)) {
            if (variants.includes(token)) {
                return stem;
            }
        }
        return token;
    });
}

export function extractKeywords(text: string): Set<string> {
    const tokens = tokenize(text);
    const canon = canonicalize(tokens);
    return new Set(canon);
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
    const intersection = new Set([...a].filter((x) => b.has(x)));
    const union = new Set([...a, ...b]);
    if (union.size === 0) return 0;
    return intersection.size / union.size;
}

export function rankQuestions(userQuery: string, questions: Option[]): {
    text: string;
    value: string;
    score: number;
    highlights: string[];
}[] {
    const userKw = extractKeywords(userQuery);

    const scored = questions.map((q) => {
        const questionKw = extractKeywords(q.text);
        const score = jaccardSimilarity(userKw, questionKw);

        // We'll highlight the overlapping tokens (intersection).
        const highlights = [...userKw].filter((kw) => questionKw.has(kw));

        return {
            text: q.text,
            value: q.value,
            score,
            highlights,
        };
    });

    const THRESHOLD = 0.2;
    return scored
        .filter((item) => item.score >= THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

export function highlightText(text: string, highlights: string[]): string {
    let result = text;
    for (const kw of highlights) {
        // Simple word-boundary regex
        const regex = new RegExp(`\\b${kw}\\b`, "gi");
        result = result.replace(regex, (match) => {
            return `<span class="bg-yellow-200 rounded px-1">${match}</span>`;
        });
    }
    return result;
}


