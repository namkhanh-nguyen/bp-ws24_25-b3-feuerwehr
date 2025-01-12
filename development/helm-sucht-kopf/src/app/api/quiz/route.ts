import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const receivedData = data.answers;
        console.log('Received quiz submission:', data);
        console.log('Answers:', receivedData);

        if (!Array.isArray(receivedData) || receivedData.length === 0) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        // Abschluss speichern
        const graduationAnswer = receivedData.find((answer: any) => answer.questionId === 0)?.selectedOption;

        // Kategorieantworten zählen
        const categoryCounts = { A: 0, B: 0, C: 0 };
        receivedData.forEach((answer: any) => {
            if (!answer || typeof answer.questionId === 'undefined' || !answer.selectedOption) {
                console.error('Invalid answer format:', answer);
                return; // Skip invalid entries
            }
            if (answer.questionId === 0) return;
            if (['A', 'B', 'C'].includes(answer.selectedOption)) {
                categoryCounts[answer.selectedOption as keyof typeof categoryCounts]++;
            }
        });

        // Mehrheitliche Kategorie bestimmen
        let majorityCategory;
        if (categoryCounts.A > categoryCounts.B && categoryCounts.A > categoryCounts.C) {
            majorityCategory = 'A';
        } else if (categoryCounts.B > categoryCounts.A && categoryCounts.B > categoryCounts.C) {
            majorityCategory = 'B';
        } else {
            majorityCategory = 'C';
        }

        // Ergebnisse basierend auf Kategorie und Abschluss generieren
        let result: any = {};
        if (majorityCategory === 'A') {
            switch (graduationAnswer) {
                case "Berufsbildungsreife":
                    result = {
                        direkt: [],
                        zukünftig: ["112 Medic", "Notfallsanitäterausbildung", "112 Medic Expert"]
                    };
                    break;
                case "MSA":
                case "Abitur":
                case "Bachelor":
                case "Master":
                case "Hauptschulabschluss mit 2 Jahre Berufsausbildung/Fachabitur/mindestens 4-jährige Soldat":
                    result = {
                        direkt: ["112 Medic", "Notfallsanitäterausbildung"],
                        zukünftig: ["112 Medic Expert"]
                    };
                    break;
                case "Abgeschlossener Rettungsdienstberuf":
                    result = {
                        direkt: ["112 Medic Expert"],
                        zukünftig: []
                    };
                    break;
            }
        } else if (majorityCategory === 'B') {
            switch (graduationAnswer) {
                case "Berufsbildungsreife":
                    result = {
                        direkt: ["112 Direkt Plus"],
                        zukünftig: ["112 Classic", "112 Direkt"]
                    };
                    break;
                case "MSA":
                case "Abitur":
                    result = {
                        direkt: ["112 Direkt"],
                        zukünftig: ["112 Classic"]
                    };
                    break;
                case "Bachelor":
                case "Master":
                    result = {
                        direkt: ["112 Direkt", "112 Classic"],
                        zukünftig: []
                    };
                    break;
                case "Hauptschulabschluss mit 2 Jahre Berufsausbildung/Fachabitur/mindestens 4-jährige Soldat":
                    result = {
                        direkt: ["112 Classic"],
                        zukünftig: []
                    };
                    break;
            }
        } else if (majorityCategory === 'C') {
            switch (graduationAnswer) {
                case "Berufsbildungsreife":
                case "MSA":
                    result = {
                        direkt: [],
                        zukünftig: ["112 Dual", "112 Bachelor", "112 Master"]
                    };
                    break;
                case "Abitur":
                    result = {
                        direkt: ["112 Dual"],
                        zukünftig: ["112 Bachelor", "112 Master"]
                    };
                    break;
                case "Hauptschulabschluss mit 2 Jahre Berufsausbildung/Fachabitur/mindestens 4-jährige Soldat":
                    result = {
                        direkt: [],
                        zukünftig: []
                    };
                    break;
                case "Bachelor":
                    result = {
                        direkt: ["112 Bachelor"],
                        zukünftig: []
                    };
                    break;
                case "Master":
                    result = {
                        direkt: ["112 Bachelor", "112 Master"],
                        zukünftig: []
                    };
                    break;
            }
        }

        console.log('Quiz result:', { graduation: graduationAnswer, majorityCategory, result });
        return NextResponse.json({
            graduation: graduationAnswer,
            majorityCategory: majorityCategory,
            result: result
        });
    } catch (error) {
        console.error('Error processing quiz submission:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

