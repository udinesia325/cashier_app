import { ScrollArea } from "@/shadcn/ui/scroll-area";
import React from "react";

const sidebarData = [
    {
        type: "Makanan",
        category: ["Soto", "Sate", "Bakso", "Masakan Padang"],
    },
    {
        type: "Minuman",
        category: ["Kopi", "Teh", "Machiato"],
    },
];
function Sidebar() {
    return (
        <div className="col-span-1 pt-2">
            <ScrollArea className="h-[95%] w-[100%]">
                {sidebarData.map((data) => {
                    return (
                        <>
                            <h1 className="font-semibold text-2xl mt-10 pl-4 mb-3">
                                {data.type}
                            </h1>
                            <ul>
                                    {data.type == "Makanan" ?<li className="mb-4 pl-4 py-2 text-primary border-l-4 border-l-primary bg-gray-100 font-light">
                                        Spesial
                                    </li>:null}
                                {data.category.map((i) => (
                                    <li key={i} className="mb-4 pl-4 py-2 text-slate-700  font-light">
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </>
                    );
                })}
            </ScrollArea>
        </div>
    );
}

export default Sidebar;
