import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { useToast } from "@/shadcn/ui/use-toast";
import { Link, router } from "@inertiajs/react";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Products({ auth, data, flash, csrf_token }) {
    const { links, meta } = data;
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search") || "";
    const [searchParams, setSearchParams] = useState(search);
    const [products, setProducts] = useState(data.data);
    const { toast } = useToast();
    const [deleteItem, setDeleteItem] = useState({
        status: false,
        id: null,
    });
    const handleDelete = async () => {
        if (deleteItem.status == false) return;

        try {
            const filtered = products.filter(
                (product) => product.id != deleteItem.id
            );
            await axios.post(route("products.delete"), {
                id: deleteItem.id,
                _token: csrf_token,
            });
            setProducts(filtered);
            setDeleteItem({ status: false, id: null });
            toast({
                description: "Berhasil menghapus produk",
            });
        } catch (e) {
            toast({
                description: "Gagal menghapus produk",
            });
        }
    };
    const cancelDelete = () => setDeleteItem({ status: false, id: null });
    const [sorting, setSorting] = useState([]);
    const columns = [
        {
            accessorKey: "id",
            header: "#",
            cell: ({ row }) => {
                return row.index + 1;
            },
        },
        {
            accessorKey: "image",
            header: "Gambar",
            cell: ({ row }) => {
                return (
                    <img
                        className="w-[80px] rounded-lg"
                        src={`/${row.getValue("image")}`}
                        alt="gambar"
                    />
                );
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Nama
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("name")}</div>
            ),
        },

        {
            accessorKey: "price",
            header: "Harga",
            cell: ({ row }) => {
                return (
                    <span>
                        Rp. {row.getValue("price").toLocaleString("id")}
                    </span>
                );
            },
        },
        {
            accessorKey: "type",
            header: "Tipe",
            cell: ({ row }) => {
                return (
                    <span>
                        {row.getValue("type")?.name || "Tidak diketahui"}
                    </span>
                );
            },
        },
        {
            accessorKey: "category",
            header: "Kategori",
            cell: ({ row }) => {
                return (
                    <span>
                        {row.getValue("category")?.name || "Tidak diketahui"}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => {
                const payment = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    router.get(
                                        route("products.edit", {
                                            id: row.getValue("id"),
                                        })
                                    )
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="focus:bg-red-100"
                                onClick={() =>
                                    setDeleteItem({
                                        status: true,
                                        id: row.getValue("id"),
                                    })
                                }
                            >
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });
    return (
        <Authenticated user={auth.user} flash={flash}>
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
            <ScrollArea className="h-[60vh] min-h-[400px mt-4">
                <DataTable table={table} columns={columns} />
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
            {/* alert delete */}
            <div
                className={` ${
                    deleteItem.status ? "flex" : "hidden"
                } absolute top-0 bottom-0 left-0 right-0 bg-gray-800/5 backdrop-blur-sm z-50`}
                onClick={cancelDelete}
            >
                <div className="w-[500px] p-5 m-auto bg-white border rounded">
                    <h1 className="text-xl font-semibold">
                        Apakah Anda Yakin Ingin Menghapus ?
                    </h1>
                    <p className="leading-snug font-thin text-gray-800 my-3">
                        Data akan dipindahkan ke sampah dan anda masih bisa
                        mengembalikannya !
                    </p>
                    <div className="w-full flex justify-end gap-x-3">
                        <Button variant="destructive" onClick={cancelDelete}>
                            Batal
                        </Button>
                        <Button onClick={handleDelete}>Lanjutkan</Button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Products;
