import { ActiveSidebarContext } from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { useGetCategoryQuery } from "@/services/categoryApi";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

function Sidebar() {
    const { data: types, isLoading } = useGetCategoryQuery();
    const { activeMenu, setActiveMenu } = useContext(ActiveSidebarContext);

    useEffect(() => {
        // jika belum ada menu terpilih maka jadikan kategori teratas sebagai yang aktif
        if (!activeMenu && !isLoading) {
            setActiveMenu(types.data[0]?.category[0]?.name || "");
        }
    }, [activeMenu,isLoading]);
    if (isLoading) {
        return <span> Memuat ...</span>;
    }

    return (
        <div className="col-span-1 pt-2">
            <ScrollArea className="h-[95%] w-[100%]">
                {types.data.map((type, _) => {
                    return (
                        <React.Fragment key={_}>
                            <h1 className="font-semibold text-2xl mt-10 pl-4 mb-3">
                                {type.name}
                            </h1>
                            <ul>
                                {type.category.map((c, i) => (
                                    <li
                                        key={i}
                                        className={cn(
                                            "mb-4 pl-4 py-2 text-slate-700  font-light cursor-pointer hover:text-primary",
                                            activeMenu == c.name
                                                ? "text-primary border-l-4 border-l-primary bg-gray-100"
                                                : ""
                                        )}
                                        onClick={() => setActiveMenu(c.name)}
                                    >
                                        {c.name}
                                    </li>
                                ))}
                            </ul>
                        </React.Fragment>
                    );
                })}
            </ScrollArea>
            <p className="text-center text-xs text-gray-500">
                {new Date().toLocaleDateString("id", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
            </p>
        </div>
    );
}

export default Sidebar;

// active menu

// {data.type == "Makanan" ?<li className="mb-4 pl-4 py-2 text-primary border-l-4 border-l-primary bg-gray-100 font-light">
// Spesial
// </li>:null}
