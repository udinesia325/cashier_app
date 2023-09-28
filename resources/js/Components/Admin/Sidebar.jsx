import adminSidebarData from "@/data/adminSidebarData";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Link } from "@inertiajs/react";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";

function Sidebar() {
    return (
        <div className="col-span-1 pt-2 px-4">
            <ScrollArea className="h-[95%] w-[100%] mt-5 flex flex-col">
                <Accordion  type="single" collapsible>
                    {adminSidebarData.map((data, index) => {
                        if (data?.type == "collapse") {
                            return (
                                <AccordionItem key={index} value={`item-${index + 1}`} className="mb-2">
                                    <AccordionTrigger className="hover:text-primary">
                                        <span className="flex gap-2 items-center font-semibold">
                                            {data.icon} {data.name}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {data.items.map((item, index) => (
                                            <SidebarItem
                                                key={index}
                                                {...item}
                                                className="mb-5 ml-5"
                                            />
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        }
                        return <SidebarItem key={index} {...data} />;
                    })}
                </Accordion>
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

function SidebarItem({ icon, name, href, className }) {
    return (
        <Link
            href={href}
            className={`flex gap-2 items-center hover:text-primary font-semibold mb-5 ${className} ${href == document.location? "text-primary":""}`}
        >
            {icon} {name}
        </Link>
    );
}
