import { Option } from "@/app/components/chatbot/ui/chat";

// Expanded German stemming dictionary
const germanStems: Record<string, string[]> = {
    'bewerbung': ['bewerbung', 'bewerben', 'bewerber', 'bewirbt'],
    'ausbildung': ['ausbildung', 'ausgebildet', 'bildung', 'ausbilden'],
    'voraussetzung': ['voraussetzung', 'vorausgesetzt', 'voraussetzungen', 'bedingung'],
    'sport': ['sport', 'sportlich', 'sporttest', 'sportabzeichen'],
    'führerschein': ['führerschein', 'führen', 'fahrer', 'fahren'],
    'zeugnis': ['zeugnis', 'zeugnisse', 'zeugnisnote', 'abschluss'],
    'gesundheit': ['gesundheit', 'gesundheitlich', 'gesund', 'medizinisch'],
    'körperlich': ['körperlich', 'körper', 'körperliche', 'physisch'],
    'test': ['test', 'testen', 'getestet', 'prüfung', 'prüfen'],
    'schwimmen': ['schwimmen', 'schwimmt', 'schwimmtest', 'schwimmabzeichen'],
    'frist': ['frist', 'fristen', 'fristgerecht', 'termin'],
    'unterlagen': ['unterlagen', 'dokumente', 'papiere', 'formulare'],
    'auswahl': ['auswahl', 'auswahlverfahren', 'auswählen', 'selektieren'],
};

// Expanded stop words list
const stopWords = new Set([
    'der', 'die', 'das', 'den', 'dem', 'ein', 'eine', 'einer', 'eines', 'ich',
    'du', 'er', 'sie', 'es', 'wir', 'ihr', 'und', 'oder', 'aber', 'wenn',
    'was', 'wer', 'wie', 'wo', 'wann', 'warum', 'welche', 'welcher', 'welches',
    'für', 'mit', 'bei', 'seit', 'von', 'aus', 'nach', 'zu', 'zur', 'zum',
    'ist', 'sind', 'war', 'waren', 'wird', 'werden', 'wurde', 'wurden',
    'kann', 'können', 'könnte', 'könnten', 'muss', 'müssen', 'musste', 'müsste',
    'hat', 'haben', 'hatte', 'hatten', 'ein', 'eine', 'eines', 'einem', 'einen',
    'über', 'unter', 'vor', 'nach', 'während', 'durch', 'wegen', 'ohne', 'gegen',
    'um', 'herum', 'zwischen', 'innerhalb', 'außerhalb', 'neben', 'gegenüber',
]);

export function extractKeywords(text: string): { word: string; weight: number }[] {
    const words = text.toLowerCase()
        .replace(/[.,?!]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word));

    const keywordWeights = new Map<string, number>();

    words.forEach(word => {
        let stemFound = false;

        for (const [stem, variations] of Object.entries(germanStems)) {
            if (variations.includes(word)) {
                keywordWeights.set(stem, (keywordWeights.get(stem) || 0) + 1);
                stemFound = true;
                break;
            }
        }

        if (!stemFound) {
            keywordWeights.set(word, (keywordWeights.get(word) || 0) + 1);
        }
    });

    return Array.from(keywordWeights.entries())
        .map(([word, count]) => ({
            word,
            weight: count
        }))
        .sort((a, b) => b.weight - a.weight);
}

export function calculateSimilarity(keywords: { word: string; weight: number }[], question: string): number {
    const questionWords = new Set(
        question.toLowerCase()
            .replace(/[.,?!]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2 && !stopWords.has(word))
    );

    let similarity = 0;
    let maxPossibleScore = keywords.reduce((sum, k) => sum + k.weight, 0);

    keywords.forEach(({ word, weight }) => {
        if (questionWords.has(word)) {
            similarity += weight;
            return;
        }

        const variations = germanStems[word] || [];
        if (variations.some(variant => questionWords.has(variant))) {
            similarity += weight * 0.8;
        }
    });

    return maxPossibleScore > 0 ? similarity / maxPossibleScore : 0;
}

export function rankQuestions(userQuery: string, questions: Option[]): {
    text: string;
    value: string;
    score: number;
    highlights: string[];
}[] {
    const keywords = extractKeywords(userQuery);

    return questions.map(question => {
        const score = calculateSimilarity(keywords, question.text);
        const highlights = keywords
            .map(k => k.word)
            .filter(keyword =>
                question.text.toLowerCase().includes(keyword) ||
                (germanStems[keyword]?.some(variant =>
                    question.text.toLowerCase().includes(variant)) ?? false)
            );

        return {
            ...question,
            score,
            highlights
        };
    })
        .filter(q => q.score > 0.2)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

export function highlightText(text: string, highlights: string[]): string {
    let highlightedText = text;
    highlights.forEach(highlight => {
        const regex = new RegExp(`\\b${highlight}\\b`, 'gi');
        highlightedText = highlightedText.replace(regex, match => `<span class="bg-yellow-200 rounded px-1">${match}</span>`);
    });
    return highlightedText;
}

