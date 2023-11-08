import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const ActiveMenuContext = createContext(null);

function ActiveMenuProvider({ children }) {
    const [activeMenu, setActiveMenu] = useState("");

    return (
        <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
            {children}
        </ActiveMenuContext.Provider>
    );
}

export default ActiveMenuProvider;
