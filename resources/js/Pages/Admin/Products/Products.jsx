import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { FaSearch } from "react-icons/fa";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Link } from "@inertiajs/react";
import { useToast } from "@/shadcn/ui/use-toast";

function Products({ auth, data, flash }) {
    const { data: products, links, meta } = data;
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search") || "";
    const [searchParams, setSearchParams] = useState(search);
    const { toast } = useToast();
    useEffect(() => {
        if (flash != false) {
            toast({
                description: flash,
            });
        }
    }, []);
    return (
        <Authenticated user={auth.user}>
            <h1 className=" mb-5 text-3xl text-slate-800 pl-2 font-semibold">
                Products
            </h1>
            <form action="" method="get" className="flex">
                <Input
                    placeholder="Cari Nama ..."
                    name="search"
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    className="max-w-[200px] rounded-r-none border-r-0 focus-visible:ring-0"
                />
                <Button className="bg-white border text-gray-600 text-1xl hover:bg-gray-70 rounded-l-none border-l-0">
                    <FaSearch />
                </Button>
                <Link
                    href={route("products.add")}
                    className="px-6 py-1 ml-3 bg-slate-900 text-white flex items-center rounded-md"
                >
                    Tambah Produk
                </Link>
            </form>
            <ScrollArea className="h-[60vh] min-h-[400px]">
                <DataTable data={products} />
            </ScrollArea>
            <div className="flex gap-4 mt-8">
                {links.prev != null ? (
                    <a
                        href={`${links.prev}&search=${search}`}
                        className="bg-gray-800 py-1 px-5 text-white rounded-md"
                    >
                        Prev
                    </a>
                ) : null}
                {links.next != null ? (
                    <a
                        href={`${links.next}&search=${search}`}
                        className="bg-gray-800 py-1 px-5 text-white rounded-md"
                    >
                        Next
                    </a>
                ) : null}
            </div>
        </Authenticated>
    );
}

export default Products;
