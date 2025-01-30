"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Chatbot from "@/app/components/chatbot/Chatbot";

const ChatbotWrapper: React.FC = () => {
    const pathname = usePathname();

    // Conditionally render the Chatbot
    if (pathname.includes("quiz")) {
        return null;
    }

    return <Chatbot />;
};

export default ChatbotWrapper;
