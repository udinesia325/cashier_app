import { ActiveMenuContext } from "@/contexts/ActiveMenuProvider";
import { ProductPageContext } from "@/contexts/ProductPageProvider";
import { SearchContext } from "@/contexts/SearchProvider";
import { cn } from "@/lib/utils";
import { useGetCategoryQuery } from "@/services/categoryApi";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { router } from "@inertiajs/react";
import React, { useContext, useEffect } from "react";

function Sidebar({ openSidebar, setOpenSidebar }) {
    const { data: types, isLoading } = useGetCategoryQuery();
    const { activeMenu, setActiveMenu } = useContext(ActiveMenuContext);
    const { setSearch } = useContext(SearchContext);
    const { setPage } = useContext(ProductPageContext);

    useEffect(() => {
        // jika belum ada menu terpilih maka jadikan kategori teratas sebagai yang aktif
        if (!activeMenu && !isLoading) {
            setActiveMenu(types?.data[0]?.category[0]?.name || "");
        }
    }, [activeMenu, isLoading]);
    if (isLoading) {
        return <span> Memuat ...</span>;
    }
    const handleItemCLick = (name) => {
        setActiveMenu(name);
        setSearch("");
        setPage(1);
        router.get(
            `/dashboard`,
            {
                category: name,
                search: "",
            },
            {
                preserveState: true,
            }
        );
    };

    return (
        <>
            <div
                className={`absolute z-20 transition-all bg-white w-[300px] h-[calc(100%-110px)] ${
                    openSidebar ? "left-0" : "-left-[300px]"
                }`}
            >
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
                                            onClick={handleItemCLick.bind(
                                                this,
                                                c.name
                                            )}
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
            {/* backdrop */}
            <div
                className={`absolute z-10 top-[110px] right-0 transition-all bg-black/40 backdrop-blur-sm w-full h-[calc(100%-110px)] ${
                    openSidebar ? "left-0" : "hidden"
                }`}
                onClick={() => setOpenSidebar(false)}
            ></div>
        </>
    );
}

export default React.memo(Sidebar);
