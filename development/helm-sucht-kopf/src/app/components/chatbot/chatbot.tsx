'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/app/components/chatbot/ui/button"
import { Card } from "@/app/components/chatbot/ui/card"
import { MessageCircle, X, ChevronRight, Send, ArrowLeft } from 'lucide-react'
import Image from "next/image"
import { Input } from "@/app/components/chatbot/ui/input"
import { cn } from "@/lib/utils"
import { extractKeywords, rankQuestions, highlightText } from "@/app/components/chatbot/ui/text-processing"
import { Message, Option, Category } from "@/app/components/chatbot/ui/chat"



const categories: Category[] = [
    { name: 'Bewerbung', value: 'bewerbung', keywords: ['bewerbung', 'bewerben', 'stelle', 'ausschreibung'] },
    { name: 'Formale, körperliche und gesundheitliche Voraussetzungen', value: 'voraussetzungen', keywords: ['voraussetzung', 'anforderung', 'bedingung', 'körperlich', 'gesundheitlich'] },
    { name: 'Auswahlverfahren', value: 'auswahlverfahren', keywords: ['auswahl', 'verfahren', 'test', 'prüfung'] },
    { name: 'Ausbildung', value: 'ausbildung', keywords: ['ausbildung', 'lernen', 'studium', 'kurs'] },
]

const questionsByCategory: Record<string, Option[]> = {
    'bewerbung': [
        { text: 'Wie viele Ausbildungsstellen werden jährlich ausgeschrieben?', value: 'stellen' },
        { text: 'Ist eine Bewerbung außerhalb der Fristen möglich?', value: 'fristen' },
        { text: 'Wo lade ich Unterlagen hoch, für die es kein passendes Anlagefeld gibt?', value: 'unterlagen' },
        { text: 'Was passiert bei unvollständigen Bewerbungsunterlagen?', value: 'unvollstaendig' },
        { text: 'Kann ich mich für mehrere Stellenausschreibungen gleichzeitig bewerben?', value: 'mehrfach' },
        { text: 'Bringt eine Mitgliedschaft bei der Freiwilligen Feuerwehr Vorteile?', value: 'freiwillig' },
        { text: 'Werden Lehrgänge der Freiwilligen Feuerwehr anerkannt?', value: 'lehrgaenge' },
    ],
    'voraussetzungen': [
        { text: 'Welche Berufsausbildungen werden bei 112 Classic berücksichtigt?', value: 'berufsausbildung' },
        { text: 'Kann ich mich mit Fachabitur für 112 Dual bewerben?', value: 'fachabitur' },
        { text: 'Kann ich das Abschlusszeugnis nachreichen?', value: 'zeugnis' },
        { text: 'Was, wenn mein Schwimmabzeichen älter als zwei Jahre ist?', value: 'schwimmen' },
        { text: 'Was, wenn mein Sportabzeichen älter als ein Jahr ist?', value: 'sport' },
        { text: 'Muss ich ohne Führerschein einen Auszug aus dem Fahreignungsregister beantragen?', value: 'fuehrerschein' },
        { text: 'Brauche ich ein polizeiliches Führungszeugnis?', value: 'fuehrungszeugnis' },
        { text: 'Warum gelten für Bewerberinnen die gleichen Sportanforderungen?', value: 'sportanforderungen' },
    ],
    'auswahlverfahren': [
        { text: 'Wie geht es nach dem Einreichen der Bewerbung weiter?', value: 'ablauf' },
        { text: 'Was tun bei Krankheit am Auswahltag?', value: 'krankheit' },
        { text: 'Kann ich mich nach Nichtbestehen erneut bewerben?', value: 'wiederholung' },
    ],
    'ausbildung': [
        { text: 'Fragen zur Ausbildung', value: 'ausbildung_fragen' },
    ],
}

const answers: Record<string, string> = {
    'stellen': 'Insgesamt stellt die Berliner Feuerwehr mehrere Hundert Nachwuchskräfte pro Jahr ein. Die Einstellungszahlen unterscheiden sich je nach Einstiegsweg.',
    'fristen': 'Nein, das ist nicht möglich.',
    'unterlagen': 'Wenn für eines der geforderten Dokumente kein eigenes Anlagefeld zum Hochladen der Datei vorhanden ist, fügen Sie bitte alle Unterlagen in einem Dokument zusammen und laden es unter dem Feld „Anschreiben / Komplette Unterlagen" hoch.',
    'unvollstaendig': 'Sie erhalten einen Hinweis per E-Mail mit einer Erinnerung an die fehlenden Unterlagen. Bis zum Ende der Bewerbungsfrist müssen alle geforderten Bewerbungsunterlagen vollständig vorliegen, da die Bewerbung sonst keine Berücksichtigung findet. Falls es einen triftigen Grund gibt, warum Sie ein Dokument erst später einreichen können, weisen Sie uns bitte in Ihrer Bewerbung darauf hin und nennen uns das Datum, zu dem Sie das Dokument nachreichen können. Zum Nachreichen antworten Sie auf die automatische Eingangsbestätigung Ihrer Bewerbung und fügen die fehlenden Unterlagen als Dateianhang bei.',
    'mehrfach': 'Ja. Über das Online-Portal ist es möglich sich zeitgleich auf weitere Laufbahnen zu bewerben. Bei mehreren Bewerbungen im gleichen Zeitraum müssen Sie nur an einem strukturierten Auswahlverfahren teilnehmen.',
    'freiwillig': 'Pluspunkte bringt eine Mitgliedschaft im Ehrenamt nicht. Im Auswahlverfahren hilft Ihnen Ihre Erfahrung sicherlich, Ihre Motivation darzustellen.',
    'lehrgaenge': 'Nein, diese Möglichkeit besteht nicht.',
    'berufsausbildung': 'Es werden alle staatlich anerkannten Ausbildungsberufe mit einer mindestens zweijährigen Berufsausbildung anerkannt. Außerdem wird auch die Zeit in der Bundeswehr als Soldatin oder Soldat auf Zeit ab einer Dienstzeit von vier Jahren als gleichwertig anerkannt.',
    'fachabitur': 'Nein. Bei der Bewerbung für den Einstiegsweg 112 Dual müssen Sie die allgemeine Hochschulreife vorweisen. Das Fachabitur reicht leider nicht aus.',
    'zeugnis': 'Ja, bitte weisen Sie in Ihrem Anschreiben darauf hin, bis wann Sie das Zeugnis nachreichen können. Mit der Bewerbung reichen Sie dann bitte das letzte Zeugnis ein, bzw. ein Schreiben der Ober-, Berufs- oder Hochschule aus dem hervorgeht, wann der voraussichtliche Abschluss erfolgt.',
    'schwimmen': 'In diesem Fall muss ein neuer Schwimmtest absolviert werden. Jeder ausgebildete Bademeister, z.B. in einem öffentlichen Schwimmbad, darf ein solches Schwimmabzeichen abnehmen. In der Regel muss der Deutsche Schwimmpass für Erwachsene vorgelegt werden. Der Jugendschwimmpass wird nur bei Bewerbenden unter 18 Jahren akzeptiert. Der Schwimmpass muss zudem unbedingt vom Passinhaber unterschrieben werden. Das gültige Schwimmabzeichen kann in der Regel bis zu drei Monate vor dem Einstellungstermin nachgereicht werden. Zu diesem Zeitpunkt darf das Schwimmabzeichen nicht älter als zwei Jahre sein.',
    'sport': 'Bewerbende des höheren feuerwehrtechnischen Diensts müssen zum Zeitpunkt der Einstellung im Besitz eines Deutschen Sportabzeichens in Silber sein. Dieses darf beim Einstellungstermin nicht älter als ein Jahr alt sein. Falls dies nicht der Fall ist, müssen Sie ein neues Sportabzeichen machen. Informationen hierzu finden Sie auf der Internetseite des Deutschen Sportabzeichens (DOSB): <a href="https://deutsches-sportabzeichen.de/service/sportabzeichen-erwerben" target="_blank" rel="noopener noreferrer">https://deutsches-sportabzeichen.de/service/sportabzeichen-erwerben</a>',
    'fuehrerschein': 'Ja. Wir benötigen die Auskunft aus dem Fahreignungsregister, auch wenn keine Eintragungen vorliegen. Das gilt auch für diejenigen Bewerbenden, die noch keinen Führerschein besitzen. Die Beantragung ist unentgeltlich möglich unter: <a href="https://www.kba.de/DE/Themen/ZentraleRegister/FAER/Auskunft/faer_auskunft_node.html" target="_blank" rel="noopener noreferrer">https://www.kba.de/DE/Themen/ZentraleRegister/FAER/Auskunft/faer_auskunft_node.html</a>',
    'fuehrungszeugnis': 'Nein, ein polizeiliches Führungszeugnis muss nicht eingereicht werden. Bei den ausgewählten Bewerbenden fordern wir auf dem Behördenweg einen Auszug aus dem Zentralregister des Bundesamtes für Justiz an.',
    'ablauf': 'Wenn Sie noch kein Sportzertifikat eingereicht haben, laden wir Sie zu einem der monatlichen Sportprüfungstermine ein. Nach dem Ende der Bewerbungsfrist verschicken wir an alle Bewerbenden einen Link zum Onlinetest, der von zu Hause aus zu bearbeiten ist. Außerdem werden alle eingegangenen Bewerbungen von uns auf ihre Vollständigkeit und die formalen Voraussetzungen geprüft. Ungefähr 4-6 Wochen nach Ende der Bewerbungsfrist werden in der Regel die Einladungen zum Auswahlverfahren verschickt.',
    'krankheit': 'In einem solchen Fall bitten wir Sie sich unverzüglich per E-Mail bei uns zu melden. Schreiben Sie bitte eine E-Mail an bewerbungsbuero@berliner-feuerwehr.de (für den mittleren feuerwehrtechnischen Dienst), an auswahlverfahren@berliner-feuerwehr.de (für den gehobenen und höheren feuerwehrtechnischen Dienst) oder benutzen Sie die Antwortfunktion der Einladungsmail. Gegebenenfalls kann zeitnah ein neuer Termin nach Maßgabe freier Plätze vereinbart werden.',
    'wiederholung': 'Ja. Zum nächstmöglichen Termin ist es möglich, sich wieder über das Online-Portal zu bewerben.',
    'ausbildung_fragen': 'Bitte wählen Sie eine spezifische Ausbildungskategorie aus, um detaillierte Informationen zu erhalten.',
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [composingEmail, setComposingEmail] = useState(false)
    const messageIdCounter = useRef(0)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleToggle = () => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
            if (messages.length === 0) {
                addMessage('Hallo! Wie kann ich Ihnen helfen? Bitte beschreiben Sie Ihr Anliegen oder stellen Sie eine Frage.', 'bot');
            }
        }
    };

    const handleUserInput = () => {
        if (userInput.trim() === '') return;

        addMessage(userInput, 'user');

        const allQuestions = Object.values(questionsByCategory).flat();
        const rankedQuestions = rankQuestions(userInput, allQuestions);

        if (rankedQuestions.length > 0) {
            addMessage('Ich habe folgende relevante Fragen gefunden:', 'bot', rankedQuestions.map(q => ({
                text: highlightText(q.text, q.highlights),
                value: q.value
            })));
        } else {
            addMessage(
                'Ich konnte keine passenden Fragen finden. Bitte versuchen Sie:' +
                '\n• Andere Schlüsselwörter zu verwenden' +
                '\n• Ihre Frage umzuformulieren' +
                '\n• Eine der Kategorien auszuwählen:',
                'bot',
                categories.map(cat => ({
                    text: cat.name,
                    value: `category_${cat.value}`
                }))
            );
        }

        setUserInput('');
    }

    const handleOptionClick = (option: Option) => {
        if (option.value.startsWith('category_')) {
            const categoryValue = option.value.replace('category_', '');
            const category = categories.find(c => c.value === categoryValue);
            if (category) {
                addMessage(`Sie haben die Kategorie "${category.name}" ausgewählt:`, 'bot');
                addMessage('Hier sind die verfügbaren Fragen:', 'bot',
                    questionsByCategory[categoryValue].map(q => ({
                        text: q.text,
                        value: q.value
                    }))
                );
            }
        } else {
            addMessage(option.text.replace(/<[^>]*>/g, ''), 'user');
            if (answers[option.value]) {
                addMessage(answers[option.value], 'bot');
                addMessage('War diese Information hilfreich?', 'bot', [
                    { text: 'Ja', value: 'feedback_yes' },
                    { text: 'Nein', value: 'feedback_no' },
                ]);
            } else if (option.value === 'feedback_yes') {
                addMessage('Das freut mich! Wie kann ich Ihnen weiter helfen?', 'bot')
            } else if (option.value === 'feedback_no') {
                addMessage('Es tut mir leid, dass die Information nicht hilfreich war. Bitte kontaktieren Sie uns für weitere Unterstützung:', 'bot', [
                    { text: 'E-Mail: info@berliner-feuerwehr.de', value: 'contact_email' },
                    { text: 'Telefon: +49 30 12345678', value: 'contact_phone' },
                ])
            } else if (option.value === 'contact_email') {
                setComposingEmail(true)
                addMessage('Bitte schreiben Sie Ihre Frage oder Ihr Anliegen. Ich werde es an info@berliner-feuerwehr.de weiterleiten.', 'bot')
            } else if (option.value === 'contact_phone') {
                addMessage('Vielen Dank. Sie können uns unter +49 30 12345678 erreichen. Kann ich Ihnen bei etwas anderem helfen?', 'bot')
            }
        }
    }

    const handleEmailSubmit = () => {
        if (userInput.trim() === '') return;

        addMessage(userInput, 'user')
        addMessage('Vielen Dank für Ihre Nachricht. Sie wird an info@berliner-feuerwehr.de weitergeleitet. Kann ich Ihnen bei etwas anderem helfen?', 'bot')
        setComposingEmail(false)
        setUserInput('')
    }

    const simulateTyping = async () => {
        setIsTyping(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setIsTyping(false)
    }

    const addMessage = async (text: string, sender: 'bot' | 'user', options?: Option[]) => {
        if (sender === 'bot') {
            await simulateTyping()
        }
        const newId = messageIdCounter.current++
        const displayText = sender === 'user' ? text : text
        setMessages(prev => [...prev, { id: newId.toString(), text: displayText, sender, options }])
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            const scrollContainer = chatContainerRef.current;
            const lastMessage = scrollContainer.lastElementChild;
            if (lastMessage && messages.length > 0) {
                const lastMessageData = messages[messages.length - 1];
                if (lastMessageData && (lastMessageData.sender === 'user' || (lastMessageData.sender === 'bot' && !lastMessageData.options))) {
                    lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }
        }
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [messages, isOpen])

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-4 w-full sm:w-[400px] h-full sm:h-auto z-50">
                    <Card className="flex flex-col h-full sm:h-[600px] rounded-none sm:rounded-xl border-0 sm:border shadow-2xl bg-zinc-50">
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-none sm:rounded-t-xl border-b border-red-700">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="md:hidden text-white hover:text-white hover:bg-white/20"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                                <img
                                    src="https://res-console.cloudinary.com/dymrmcgey/media_explorer_thumbnails/23bebe8766dc010d0c44dc3d77b42abf/detailed"
                                    alt="Chatbot Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white/20"
                                />
                                <div>
                                    <h2 className="font-semibold">Feuerwehr Support</h2>
                                    <p className="text-xs text-white/80">Immer für Sie da</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="hidden md:flex text-white hover:text-white hover:bg-white/20"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <div
                            ref={chatContainerRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-custom"
                        >
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 transition-all",
                                        message.sender === 'user' ? "flex-row-reverse" : ""
                                    )}
                                >
                                    <img
                                        src={message.sender === 'bot'
                                            ? "https://res-console.cloudinary.com/dymrmcgey/media_explorer_thumbnails/23bebe8766dc010d0c44dc3d77b42abf/detailed"
                                            : "https://res-console.cloudinary.com/dymrmcgey/media_explorer_thumbnails/864fd58883f9613abda8ec2d3bf1c43f/detailed"
                                        }
                                        alt={`${message.sender === 'bot' ? 'Bot' : 'User'} Avatar`}
                                        className="w-8 h-8 rounded-full mt-1 border-2 border-white"
                                    />
                                    <div className={cn(
                                        "flex flex-col gap-2 max-w-[80%]",
                                        message.sender === 'user' ? "items-end" : "items-start"
                                    )}>
                                        <div className={cn(
                                            "rounded-2xl px-4 py-2 text-sm",
                                            message.sender === 'user'
                                                ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                                                : "bg-white shadow-sm border"
                                        )}>
                                            <p
                                                className="break-words whitespace-pre-line"
                                                dangerouslySetInnerHTML={{ __html: message.text }}
                                            ></p>
                                        </div>
                                        {message.options && message.options.length > 0 && (
                                            <div className="w-full space-y-2 max-w-full animate-in slide-in-from-bottom-3">
                                                {message.options.map((option) => (
                                                    <Button
                                                        key={option.value}
                                                        variant="outline"
                                                        className="w-full justify-between text-left h-auto text-sm py-3 px-4 bg-white hover:bg-zinc-50"
                                                        onClick={() => handleOptionClick(option)}
                                                    >
                            <span
                                className="mr-2 whitespace-normal"
                                dangerouslySetInnerHTML={{ __html: option.text }}
                            ></span>
                                                        <ChevronRight className="h-4 w-4 flex-shrink-0 opacity-50 ml-2" />
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2">
                                    <img
                                        src="https://res-console.cloudinary.com/dymrmcgey/media_explorer_thumbnails/23bebe8766dc010d0c44dc3d77b42abf/detailed"
                                        alt="Bot Avatar"
                                        className="w-6 h-6 rounded-full mt-1 border-2 border-white"
                                    />
                                    <div className="bg-white rounded-2xl px-3 py-1 text-xs shadow-sm border">
                                        <div className="flex gap-1">
                                            <span className="animate-bounce">●</span>
                                            <span className="animate-bounce [animation-delay:0.2s]">●</span>
                                            <span className="animate-bounce [animation-delay:0.4s]">●</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-4 bg-gray-100 border-t rounded-t-[2rem]">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (composingEmail) {
                                        handleEmailSubmit();
                                    } else {
                                        handleUserInput();
                                    }
                                }}
                                className="flex items-center gap-2"
                            >
                                <div className="relative flex-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Schreiben Sie Ihre Frage..."
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        className="w-full px-4 py-3 rounded-full bg-zinc-100 border-0 focus:ring-0 placeholder:text-zinc-400 text-sm"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="rounded-full w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 flex-shrink-0"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            )}
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
        </>
    )
}