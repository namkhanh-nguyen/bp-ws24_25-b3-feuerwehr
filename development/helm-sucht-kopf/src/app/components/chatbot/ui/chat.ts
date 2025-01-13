export type Message = {
    id: string
    text: string
    sender: 'bot' | 'user'
    options?: Option[]
}

export type Option = {
    text: string
    value: string
}

export type Category = {
    name: string
    value: string
    keywords: string[]
}

