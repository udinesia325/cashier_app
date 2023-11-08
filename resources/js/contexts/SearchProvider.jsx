import { params } from "@/lib/utils";
import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { ActiveMenuContext } from "./ActiveMenuProvider";
import { useState } from "react";
import { useEffect } from "react";

export const SearchContext = createContext(null);

function SearchProvider({ children }) {
    const [search, setSearch] = useState(params().get("search")||"");
    const { setActiveMenu } = useContext(ActiveMenuContext);
    const category = params().get("category");
    useEffect(() => {
        if (category) {
            setActiveMenu(category);
        }
    }, []);
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchProvider;
