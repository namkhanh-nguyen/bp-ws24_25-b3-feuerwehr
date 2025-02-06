"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/chatbot/ui/Button";
import { Card } from "@/app/components/chatbot/ui/Card";
import {
    MessageCircle,
    X,
    ChevronRight,
    Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    rankQuestions,
    highlightText,
} from "@/app/components/chatbot/ui/text-processing";

import BotIcon from "@/app/components/chatbot/ui/Bot.svg";
import UserIcon from "@/app/components/chatbot/ui/User.svg";
import { Message, Option } from "@/app/components/chatbot/ui/chat";

/* -----DATA: CATEGORIES, QUESTIONS, ANSWERS------ */
const CATEGORIES: Option[] = [
    { text: "Bewerbung", value: "category_bewerbung" },
    {
        text: "Formale, körperliche und gesundheitliche Voraussetzungen",
        value: "category_voraussetzungen",
    },
    { text: "Auswahlverfahren", value: "category_auswahlverfahren" },
];

const QUESTIONS_BY_CATEGORY: Record<string, Option[]> = {
    bewerbung: [
        {
            text: "Wie viele Ausbildungsstellen werden jährlich bei der Berliner Feuerwehr ausgeschrieben?",
            value: "bewerbung_stellen",
        },
        {
            text: "Ist es möglich sich außerhalb der Fristen zu bewerben?",
            value: "bewerbung_fristen",
        },
        {
            text: "Wo lade ich meine Unterlagen hoch, wenn kein passendes Anlagefeld existiert?",
            value: "bewerbung_unterlagen",
        },
        {
            text: "Was passiert bei unvollständigen Bewerbungsunterlagen und wie reiche ich nach?",
            value: "bewerbung_unvollstaendig",
        },
        {
            text: "Kann ich mich zeitgleich für mehrere Stellenausschreibungen bewerben?",
            value: "bewerbung_mehrfach",
        },
        {
            text: "Bringt mir eine Mitgliedschaft bei der Freiwilligen Feuerwehr Pluspunkte?",
            value: "bewerbung_freiwillig",
        },
        {
            text: "Werden Lehrgänge der Freiwilligen Feuerwehr anerkannt (Ausbildungszeit verkürzen)?",
            value: "bewerbung_lehrgaenge",
        },
    ],
    voraussetzungen: [
        {
            text: "Werden nur handwerkliche/technische Berufsausbildungen (112 Classic) anerkannt?",
            value: "voraussetzungen_berufsausbildung",
        },
        {
            text: "Kann ich mich für 112 Dual auch mit einem Fachabitur bewerben?",
            value: "voraussetzungen_fachabitur",
        },
        {
            text: "Kann ich das Zeugnis nachreichen, wenn ich erst später abschließe?",
            value: "voraussetzungen_zeugnis",
        },
        {
            text: "Was ist, wenn mein Schwimmabzeichen älter ist als zwei Jahre?",
            value: "voraussetzungen_schwimmen",
        },
        {
            text: "Was ist, wenn mein Sportabzeichen älter ist als ein Jahr?",
            value: "voraussetzungen_sport",
        },
        {
            text: "Benötige ich den Auszug aus dem Fahreignungsregister, wenn ich keinen Führerschein habe?",
            value: "voraussetzungen_fuehrerschein",
        },
        {
            text: "Brauche ich ein polizeiliches Führungszeugnis?",
            value: "voraussetzungen_fuehrungszeugnis",
        },
        {
            text: "Warum gelten für Bewerberinnen die gleichen Sportanforderungen?",
            value: "voraussetzungen_sportanforderungen",
        },
    ],
    auswahlverfahren: [
        {
            text: "Wie geht es nach dem Einreichen der Bewerbung weiter?",
            value: "auswahl_ablauf",
        },
        {
            text: "Was mache ich, wenn ich am Auswahltag krank bin?",
            value: "auswahl_krankheit",
        },
        {
            text: "Kann ich mich erneut bewerben, wenn ich das Auswahlverfahren nicht bestehe?",
            value: "auswahl_wiederholung",
        },
    ],
};

// Answers
const ANSWERS: Record<string, string> = {
    // Bewerbung
    bewerbung_stellen:
        "Insgesamt stellt die Berliner Feuerwehr mehrere Hundert Nachwuchskräfte pro Jahr ein. Die Einstellungszahlen unterscheiden sich je nach Einstiegsweg.",
    bewerbung_fristen: "Nein, das ist nicht möglich.",
    bewerbung_unterlagen:
        'Wenn für eines der geforderten Dokumente kein eigenes Anlagefeld vorhanden ist, fügen Sie bitte alle Unterlagen in einem Dokument zusammen und laden es unter dem Feld „Anschreiben / Komplette Unterlagen“ hoch.',
    bewerbung_unvollstaendig:
        "Sie erhalten einen Hinweis per E-Mail mit einer Erinnerung an die fehlenden Unterlagen. Bis zum Ende der Bewerbungsfrist müssen alle Unterlagen vollständig vorliegen. Falls Dokumente später eingereicht werden müssen, weisen Sie uns bitte in Ihrer Bewerbung darauf hin und nennen uns das Datum. Zum Nachreichen antworten Sie auf die automatische Eingangsbestätigung Ihrer Bewerbung und fügen die fehlenden Unterlagen an.",
    bewerbung_mehrfach:
        "Ja. Über das Online-Portal ist es möglich, sich zeitgleich auf weitere Laufbahnen zu bewerben. Bei mehreren Bewerbungen im gleichen Zeitraum nehmen Sie nur an einem strukturierten Auswahlverfahren teil.",
    bewerbung_freiwillig:
        "Pluspunkte bringt eine Mitgliedschaft im Ehrenamt nicht. Im Auswahlverfahren kann Ihnen Ihre Erfahrung jedoch helfen, Ihre Motivation darzustellen.",
    bewerbung_lehrgaenge: "Nein, diese Möglichkeit besteht nicht.",

    // Formale, körperliche und gesundheitliche Voraussetzungen
    voraussetzungen_berufsausbildung:
        "Alle staatlich anerkannten Ausbildungsberufe mit mindestens zweijähriger Dauer werden anerkannt. Bundeswehrzeit ab vier Dienstjahren kann ebenfalls gleichwertig sein.",
    voraussetzungen_fachabitur:
        "Nein. Für 112 Dual ist die allgemeine Hochschulreife erforderlich. Fachabitur reicht leider nicht.",
    voraussetzungen_zeugnis:
        "Ja, bitte vermerken Sie in Ihrem Anschreiben, bis wann das Zeugnis nachgereicht werden kann. Reichen Sie sonst ein letztes Zeugnis oder ein Schreiben Ihrer Schule/Hochschule ein.",
    voraussetzungen_schwimmen:
        "Wenn Ihr Schwimmabzeichen älter als zwei Jahre ist, benötigen Sie einen neuen Schwimmtest. Ein Bademeister kann das Schwimmabzeichen abnehmen. Es darf bei Einstellung nicht älter als zwei Jahre sein.",
    voraussetzungen_sport:
        "Für den höheren Dienst darf das Deutsche Sportabzeichen in Silber zum Einstellungstermin nicht älter als ein Jahr sein. Sonst ist ein neues zu machen.",
    voraussetzungen_fuehrerschein:
        "Ja, wir benötigen die Auskunft aus dem Fahreignungsregister auch ohne Führerschein. Sie können sie unentgeltlich unter https://www.kba.de/... beantragen.",
    voraussetzungen_fuehrungszeugnis:
        "Nein, ein polizeiliches Führungszeugnis ist nicht nötig. Bei ausgewählten Bewerbenden fordern wir den Auszug aus dem Zentralregister selbst an.",
    voraussetzungen_sportanforderungen:
        "Der Einsatzdienst ist körperlich sehr anstrengend. Einsatzkräfte aller Geschlechter müssen gleichermaßen Verantwortung übernehmen können. Daher gelten gleiche Sportanforderungen.",

    // Auswahlverfahren
    auswahl_ablauf:
        "Wenn Sie kein Sportzertifikat eingereicht haben, laden wir Sie zu einem der Sportprüfungstermine ein. Nach der Frist erhalten Sie einen Onlinetest-Link. Wir prüfen Ihre Bewerbung auf Vollständigkeit und versenden Einladungen ca. 4–6 Wochen nach Fristende.",
    auswahl_krankheit:
        "Bitte informieren Sie uns sofort per E-Mail (z. B. bewerbungsbuero@berliner-feuerwehr.de) oder Antwort auf die Einladungsmail. Wir können ggf. einen neuen Termin vereinbaren.",
    auswahl_wiederholung:
        "Ja, eine erneute Bewerbung ist zum nächstmöglichen Termin über das Online-Portal möglich.",
};

/* --------- Chatbot Component ------- */
export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isChatIconVisible, setIsChatIconVisible] = useState(true);

    // The chat message list
    const [messages, setMessages] = useState<Message[]>([]);
    // For user text input
    const [userInput, setUserInput] = useState("");
    // For showing the "..." typing indicator
    const [isTyping, setIsTyping] = useState(false);

    const messageIdCounter = useRef(0);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* --------- Bot Typing ------- */
    async function simulateTyping() {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsTyping(false);
    }

    /* --------- Add a new message to the chat ------- */
    async function addMessage(
        text: string,
        sender: "bot" | "user",
        options?: Option[]
    ) {
        if (sender === "bot") {
            await simulateTyping();
        }
        const newId = messageIdCounter.current++;
        setMessages((prev) => [
            ...prev,
            { id: newId.toString(), text, sender, options },
        ]);
    }

    /* --------- Toggle chat ------- */
    async function handleToggle() {
        setIsOpen((prev) => !prev);
        setIsChatIconVisible((prev) => !prev);

        // Greet user if first time open
        if (!isOpen && messages.length === 0) {
            await addMessage(
                "Hallo! Wie kann ich Dir helfen? Stelle deine Frage oder wähle eine Kategorie.",
                "bot"
            );
        }
    }

    /* --------- CLose Chat ------- */
    function handleClose() {
        setIsOpen(false);
        setIsChatIconVisible(true);
    }

    /* --------- When user types and submits a question ------- */
    async function handleUserInput() {
        const query = userInput.trim();
        if (!query) return;

        // Add user's question
        await addMessage(query, "user");

        // Combine all questions from all categories
        const allQuestions = [
            ...QUESTIONS_BY_CATEGORY.bewerbung,
            ...QUESTIONS_BY_CATEGORY.voraussetzungen,
            ...QUESTIONS_BY_CATEGORY.auswahlverfahren,
        ];
        // Rank them
        const ranked = rankQuestions(query, allQuestions);

        if (ranked.length === 0) {
            // No relevant matches => fallback to 3 categories
            await addMessage(
                "Ich konnte keine passenden Fragen finden. Bitte wähle eine Kategorie:",
                "bot",
                CATEGORIES
            );
        } else {
            // Show relevant questions
            await addMessage("Ich habe folgende relevante Fragen gefunden:", "bot");
            const topMatches: Option[] = ranked.map((r) => ({
                text: highlightText(r.text, r.highlights),
                value: r.value,
            }));
            await addMessage(
                "Wähle eine aus, um mehr Informationen zu erhalten:",
                "bot",
                topMatches
            );
        }

        setUserInput("");
    }

    /* --------- Handle user clicking on an Option ------- */
    async function handleOptionClick(option: Option) {
        // Display the selected text as user message
        await addMessage(option.text.replace(/<[^>]*>/g, ""), "user");

        // Check if user picked a category
        if (option.value.startsWith("category_")) {
            const catValue = option.value.replace("category_", "");
            const catQuestions = QUESTIONS_BY_CATEGORY[catValue];
            if (catQuestions) {
                await addMessage(
                    `Du hast die Kategorie "${option.text}" ausgewählt. Hier sind die Fragen:`,
                    "bot"
                );

                const questionOptions = catQuestions.map((q) => ({
                    text: q.text,
                    value: q.value,
                }));

                await addMessage("Bitte wähle eine Frage aus:", "bot", questionOptions);
            } else {
                await addMessage(
                    "Entschuldigung, ich konnte diese Kategorie nicht finden.",
                    "bot"
                );
            }
            return;
        }

        // If user picked a question => show the answer
        if (ANSWERS[option.value]) {
            // Show answer
            const answerText = ANSWERS[option.value];
            await addMessage(answerText, "bot");

            // After giving the answer, ask for feedback
            await addMessage("War diese Information hilfreich?", "bot", [
                { text: "Ja", value: "feedback_yes" },
                { text: "Nein", value: "feedback_no" },
            ]);
            return;
        }

        // If user clicked "Yes/No" feedback
        if (option.value === "feedback_yes") {
            await addMessage(
                "Das freut mich sehr! Wie kann ich Dir sonst noch helfen?",
                "bot"
            );
        } else if (option.value === "feedback_no") {
            await addMessage(
                "Es tut mir leid, dass die Information nicht hilfreich war. Bitte kontaktiere uns für weitere Unterstützung.",
                "bot"
            );
            // Provide contact info
            await addMessage("E-Mail: info@berliner-feuerwehr.de\nTelefon: +49 30 12345678", "bot");
            await addMessage(
                "Kann ich Dir sonst noch weiterhelfen?",
                "bot"
            );
        } else {
            // No recognized value => fallback
            await addMessage(
                `Ich habe keine Antwort für "${option.value}".`,
                "bot"
            );
        }
    }

    /* --------- Auto-scroll & focus input ------- */
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isOpen]);

    /* --------- Render ------- */
    return (
        <>
            {isOpen && (
                <div className="fixed top-20 sm:top-40 inset-0 sm:inset-auto sm:bottom-24 sm:right-4 w-full sm:w-[400px] h-[calc(100%-5rem)] sm:h-auto z-50">
                    <Card className="flex flex-col h-full rounded-none sm:rounded-xl border-0 sm:border shadow-2xl bg-zinc-50">
                        {/* HEADER */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#e40422] text-white rounded-none sm:rounded-t-xl border-b border-red-700">
                            <div className="flex items-center gap-3">
                                <img
                                    src={BotIcon.src || "/placeholder.svg"}
                                    alt="Chatbot Avatar"
                                    className="w-10 h-10 rounded-full bg-white p-2 [&>path]:fill-red-600"
                                />
                                <div>
                                    <h2 className="font-semibold text-white text-base whitespace-nowrap m-0">Feuerwehr Support</h2>
                                    <p className="text-xs text-white/80">Immer für Dich da</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleClose}
                                className="text-white hover:text-white hover:bg-white/20"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* MESSAGES */}
                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 transition-all",
                                        msg.sender === "user" && "flex-row-reverse"
                                    )}
                                >
                                    <img
                                        src={msg.sender === "bot" ? BotIcon.src : UserIcon.src}
                                        alt={msg.sender === "bot" ? "Bot Avatar" : "User Avatar"}
                                        className="w-8 h-8 rounded-full mt-1 bg-white p-1.5 [&>path]:fill-red-600"
                                    />
                                    <div
                                        className={cn(
                                            "flex flex-col gap-2 max-w-[80%]",
                                            msg.sender === "user" ? "items-end" : "items-start"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "rounded-2xl px-4 py-2 text-sm",
                                                msg.sender === "user"
                                                    ? "bg-[#e40422] text-white"
                                                    : "bg-white shadow-sm border"
                                            )}
                                        >
                                            <p
                                                className="break-words whitespace-pre-line"
                                                dangerouslySetInnerHTML={{ __html: msg.text }}
                                            />
                                        </div>

                                        {/* RENDER OPTIONS IF ANY */}
                                        {msg.options && msg.options.length > 0 && (
                                            <div className="w-full space-y-2 max-w-full animate-in slide-in-from-bottom-3">
                                                {msg.options.map((option) => (
                                                    <Button
                                                        key={option.value}
                                                        variant="outline"
                                                        className="w-full justify-between text-left h-auto text-sm py-3 px-4 bg-white hover:bg-zinc-50"
                                                        onClick={() => handleOptionClick(option)}
                                                    >
                            <span
                                className="mr-2 whitespace-normal"
                                dangerouslySetInnerHTML={{
                                    __html: option.text,
                                }}
                            />
                                                        <ChevronRight className="h-4 w-4 flex-shrink-0 opacity-50 ml-2" />
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* TYPING INDICATOR */}
                            {isTyping && (
                                <div className="flex gap-2">
                                    <img
                                        src={BotIcon.src || "/placeholder.svg"}
                                        alt="Bot Avatar"
                                        className="w-6 h-6 rounded-full mt-1 bg-white p-1 [&>path]:fill-red-600"
                                    />
                                    <div className="bg-white rounded-2xl px-3 py-1 text-xs shadow-sm border">
                                        <div className="flex gap-1">
                                            <span className="animate-bounce">●</span>
                                            <span className="animate-bounce [animation-delay:0.2s]">
                        ●
                      </span>
                                            <span className="animate-bounce [animation-delay:0.4s]">
                        ●
                      </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* INPUT / FORM */}
                        <div className="p-4 bg-gray-100 border-t rounded-t-[2rem]">
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    await handleUserInput();
                                }}
                                className="flex items-center gap-2"
                            >
                                <div className="relative flex-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Stelle deine Frage..."
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        className="w-full px-4 py-3 rounded-full bg-zinc-100 border-0 focus:ring-0 placeholder:text-zinc-400 text-[16px]"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="rounded-full w-10 h-10 bg-[#e40422] hover:bg-[#c9031d] flex-shrink-0"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            )}

            {/* FLOATING CHAT ICON (when chat is closed) */}
            {isChatIconVisible && (
                <Button
                    size="icon"
                    onClick={handleToggle}
                    className={cn(
                        "fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg transition-all duration-200",
                        "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
                        "z-50 animate-in slide-in-from-bottom-3"
                    )}
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}
        </>
    );
}
