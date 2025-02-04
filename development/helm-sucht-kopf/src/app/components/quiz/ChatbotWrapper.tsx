"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Chatbot from "@/app/components/chatbot/Chatbot";

const ChatbotWrapper: React.FC = () => {
    const pathname = usePathname();

    if (pathname.includes("quiz")) {
        return null;
    }
    if (pathname.includes("tour")) {
        return null;
    }

    return <Chatbot />;
};

export default ChatbotWrapper;
