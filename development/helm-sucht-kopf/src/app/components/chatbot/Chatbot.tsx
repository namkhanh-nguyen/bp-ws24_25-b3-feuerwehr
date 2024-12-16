'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/app/components/chatbot/ui/Button"
import { Card } from "@/app/components/chatbot/ui/Card"
import { MessageCircle, X, ChevronRight } from 'lucide-react'

type Message = {
    id: string
    text: string
    sender: 'bot' | 'user'
    options?: Option[]
}

type Option = {
    text: string
    value: string
}

const mainCategories = [
    { text: 'Bewerbung', value: 'bewerbung' },
    { text: 'Formale, körperliche und gesundheitliche Voraussetzungen', value: 'voraussetzungen' },
    { text: 'Auswahlverfahren', value: 'auswahlverfahren' },
    { text: 'Ausbildung', value: 'ausbildung' },
]

const ausbildungCategories = [
    { text: '112 Direkt', value: 'direkt' },
    { text: '112 Direkt Plus', value: 'direkt-plus' },
    { text: '112 Medic', value: 'medic' },
    { text: '112 Dual', value: 'dual' },
    { text: '112 Classic', value: 'classic' },
    { text: '112 Medic Expert', value: 'medic-expert' },
    { text: '112 Bachelor', value: 'bachelor' },
    { text: '112 Master', value: 'master' },
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

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const messageIdCounter = useRef(0)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    const addMessage = (text: string, sender: 'bot' | 'user', options?: Option[]) => {
        const newId = messageIdCounter.current++
        setMessages(prev => [...prev, { id: newId.toString(), text, sender, options }])
    }

    const handleToggle = () => {
        setIsOpen(prev => !prev);
        if (!isOpen && messages.length === 0) {
            addMessage('Hallo, ich würde mich freuen, wenn ich Dir helfen kann. In welchem Bereich brauchst Du Unterstützung?', 'bot', mainCategories);
        }
    };

    const handleOptionClick = (option: Option) => {
        addMessage(option.text, 'user')

        if (mainCategories.find(cat => cat.value === option.value)) {
            setSelectedCategory(option.value)
            if (option.value === 'ausbildung') {
                addMessage('Zu welcher Ausbildungskategorie haben Sie Fragen?', 'bot', ausbildungCategories)
            } else {
                addMessage(`Hier sind häufig gestellte Fragen zur Kategorie "${option.text}":`, 'bot', questionsByCategory[option.value])
            }
        } else if (ausbildungCategories.find(cat => cat.value === option.value)) {
            addMessage('Hier sind häufig gestellte Fragen zu dieser Ausbildungskategorie:', 'bot', questionsByCategory['ausbildung'])
        } else if (answers[option.value]) {
            addMessage(answers[option.value], 'bot')
            addMessage('War diese Information hilfreich?', 'bot', [
                { text: 'Ja', value: 'feedback_yes' },
                { text: 'Nein', value: 'feedback_no' },
            ])
        } else if (option.value === 'feedback_yes') {
            addMessage('Das freut mich! Wie kann ich Ihnen weiter helfen?', 'bot', [
                { text: 'Ich habe weitere Fragen', value: 'more_questions' },
                { text: 'Zurück zur Hauptauswahl', value: 'main_menu' },
            ])
        } else if (option.value === 'feedback_no') {
            addMessage('Es tut mir leid, dass die Information nicht hilfreich war. Bitte kontaktieren Sie uns für weitere Unterstützung:', 'bot', [
                { text: 'E-Mail: info@berliner-feuerwehr.de', value: 'contact_email' },
                { text: 'Telefon: +49 30 12345678', value: 'contact_phone' },
                { text: 'Zurück zur Hauptauswahl', value: 'main_menu' },
            ])
        } else if (option.value === 'more_questions') {
            addMessage('Gerne! Zu welchem Thema haben Sie weitere Fragen?', 'bot', mainCategories)
        } else if (option.value === 'main_menu') {
            addMessage('Alles klar, lassen Sie uns zum Hauptmenü zurückkehren. Welches Thema interessiert Sie?', 'bot', mainCategories)
        } else if (option.value === 'end_chat') {
            addMessage('Vielen Dank für Ihr Interesse an der Berliner Feuerwehr. Wenn Sie weitere Fragen haben, zögern Sie nicht, mich erneut zu kontaktieren. Auf Wiedersehen!', 'bot')
        } else if (option.value === 'contact_email' || option.value === 'contact_phone') {
            addMessage('Vielen Dank. Wir hoffen, dass Sie die benötigte Unterstützung erhalten. Kann ich Ihnen bei etwas anderem helfen?', 'bot', [
                { text: 'Ja, zurück zur Hauptauswahl', value: 'main_menu' },
                { text: 'Nein, Chat beenden', value: 'end_chat' },
            ])
        }
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-24 right-4 w-full max-w-[320px] sm:max-w-[350px] z-50">
                    <Card className="border-2">
                        <div className="p-3 border-b bg-red-600 text-white flex items-center justify-between rounded-t-lg">
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://res.cloudinary.com/dymrmcgey/image/upload/v1734362318/gztefgfor0srbezzhafq.png"
                                    alt="Chatbot Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="font-semibold text-sm">Feuerwehr Support</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-white hover:bg-red-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div ref={chatContainerRef} className="h-[350px] overflow-y-auto p-3 space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.sender === 'bot' && (
                                        <img
                                            src="https://res.cloudinary.com/dymrmcgey/image/upload/v1734362318/gztefgfor0srbezzhafq.png"
                                            alt="Bot Avatar"
                                            className="w-6 h-6 rounded-full mr-2"
                                        />
                                    )}
                                    <div
                                        className={`max-w-[85%] rounded-lg overflow-hidden text-sm ${
                                            message.sender === 'user'
                                                ? 'bg-red-600 text-white p-3'
                                                : 'bg-gray-100 text-gray-900 p-5'
                                        }`}
                                    >
                                        <p className="break-words" dangerouslySetInnerHTML={{ __html: message.text }}></p>
                                        {message.options && (
                                            <div className="mt-6 space-y-3">
                                                {message.options.map((option) => (
                                                    <Button
                                                        key={option.value}
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full justify-between text-left h-auto whitespace-normal text-xs py-3 px-4"
                                                        onClick={() => handleOptionClick(option)}
                                                    >
                                                        <span className="mr-2">{option.text}</span>
                                                        <ChevronRight className="h-3 w-3 flex-shrink-0" />
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {message.sender === 'user' && (
                                        <img
                                            src="https://res.cloudinary.com/dymrmcgey/image/upload/v1734358460/wemywqjjpgbop2ejoxfa.gif"
                                            alt="User Avatar"
                                            className="w-6 h-6 rounded-full ml-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            <div className="fixed z-10 bottom-4 right-4">
                <Button
                    size="icon"
                    className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
                    onClick={handleToggle}
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            </div>
        </>
    )
}

