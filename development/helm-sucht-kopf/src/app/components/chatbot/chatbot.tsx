'use client'

import { useState, useRef } from "react"
import { Button } from "@/app/components/chatbot/ui/button"
import { Card } from "@/app/components/chatbot/ui/card"
import { MessageCircle, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/chatbot/ui/avatar"

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

const generalQuestions = [
    { text: 'Wie kann ich die Feuerwehr kontaktieren?', value: 'contact' },
    { text: 'Was sind die Voraussetzungen für eine Bewerbung?', value: 'requirements' },
    { text: 'Wo finde ich Informationen zur Ausbildung?', value: 'training-info' },
]

const faqsByCategory: Record<string, Option[]> = {
    'direkt': [
        { text: 'Was sind die Voraussetzungen für 112 Direkt?', value: 'direkt-requirements' },
        { text: 'Wie lange dauert die Ausbildung?', value: 'direkt-duration' },
    ],
    // Add more FAQs for other categories...
}

const answers: Record<string, string> = {
    'direkt-requirements': 'Für 112 Direkt benötigen Sie einen Hauptschulabschluss und müssen mindestens 16 Jahre alt sein.',
    'direkt-duration': 'Die Ausbildung dauert 18 Monate.',
    'contact': 'Im Notfall wählen Sie die 112. Für allgemeine Anfragen erreichen Sie uns unter der Nummer XXX-XXXXX.',
    // Add more answers...
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const messageIdCounter = useRef(0)

    const addMessage = (text: string, sender: 'bot' | 'user', options?: Option[]) => {
        const newId = messageIdCounter.current++
        setMessages(prev => [...prev, { id: newId.toString(), text, sender, options }])
    }

    const handleOpen = () => {
        setIsOpen(true)
        if (messages.length === 0) {
            addMessage('Hallo, ich würde mich freuen, wenn ich Dir helfen kann. In welchem Bereich brauchst Du Unterstützung?', 'bot', [
                { text: 'Allgemeine Fragen', value: 'general' },
                { text: 'Bewerbungsprozess', value: 'application' },
                { text: 'Ausbildung', value: 'training' },
            ])
        }
    }

    const handleOptionClick = (option: Option) => {
        addMessage(option.text, 'user')

        switch (option.value) {
            case 'general':
                addMessage('Hier sind einige häufig gestellte Fragen:', 'bot', generalQuestions)
                break
            case 'application':
                window.location.href = '/application'
                break
            case 'training':
                addMessage('Mit welcher Ausbildungskategorie sind Ihre Fragen verbunden?', 'bot', ausbildungCategories)
                break
            default:
                if (ausbildungCategories.find(cat => cat.value === option.value)) {
                    setSelectedCategory(option.value)
                    addMessage('Hier sind häufig gestellte Fragen zu dieser Kategorie:', 'bot', faqsByCategory[option.value])
                } else if (answers[option.value]) {
                    addMessage(answers[option.value], 'bot', [
                        { text: 'War diese Antwort hilfreich?', value: 'feedback' },
                        { text: 'Ich habe weitere Fragen', value: 'more-questions' },
                        { text: 'Fragen zu anderen Kategorien', value: 'other-categories' },
                    ])
                }
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 right-4 w-full max-w-md"
                    >
                        <Card className="border-2">
                            <div className="p-4 border-b bg-red-600 text-white flex items-center justify-between rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Chatbot Avatar" />
                                        <AvatarFallback>BF</AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold">Support</span>
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
                            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.sender === 'bot' && (
                                            <Avatar className="mr-2">
                                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot Avatar" />
                                                <AvatarFallback>BF</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg overflow-hidden ${
                                                message.sender === 'user'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-100 text-gray-900'
                                            }`}
                                        >
                                            <p className="break-words">{message.text}</p>
                                            {message.options && (
                                                <div className="mt-4 space-y-3">
                                                    {message.options.map((option) => (
                                                        <Button
                                                            key={option.value}
                                                            variant="outline"
                                                            className="w-full justify-between text-left h-auto whitespace-normal"
                                                            onClick={() => handleOptionClick(option)}
                                                        >
                                                            <span className="mr-2">{option.text}</span>
                                                            <ChevronRight className="h-4 w-4 flex-shrink-0" />
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {message.sender === 'user' && (
                                            <Avatar className="ml-2">
                                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User Avatar" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={isOpen ? { scale: 0 } : { scale: 1 }}
                className="fixed bottom-4 right-4"
            >
                <Button
                    size="icon"
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
                    onClick={handleOpen}
                >
                    <MessageCircle className="h-8 w-8" />
                </Button>
            </motion.div>
        </>
    )
}

