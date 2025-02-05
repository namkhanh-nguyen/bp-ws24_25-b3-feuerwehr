"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DynamicHeader from "./DynamicHeader";

const DynamicHeaderWrapper: React.FC = () => {
    const pathname = usePathname();

    if (pathname.includes("tour")) {
        return null;
    }

    return <DynamicHeader />;
};

export default DynamicHeaderWrapper;
