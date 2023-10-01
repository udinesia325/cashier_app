import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import DataTable from "@/Components/DataTable";
import { Button } from "@/shadcn/ui/button";
import { ArrowUpDown } from "lucide-react";

import InputError from "@/Components/InputError";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Input } from "@/shadcn/ui/input";
import { useToast } from "@/shadcn/ui/use-toast";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import AddAlert from "./AddAlert";

function TableCategory({ category }) {
    const [categories, setCategories] = useState(category);
    const [categorySort, setCategorySort] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const { data, setData, errors, processing, post, reset, clearErrors } =
        useForm({
            name: "",
        });
    const handleDelete = (id) => {};
    const handleEdit = (id, name) => {
        setTargetId(id);
        setTitle("Edit Kategori");
        setOpen(true);
        setData("name", name);
    };
    const closeAlert = () => {
        setOpen(false);
        reset("name", "");
        clearErrors("name", "");
        setTitle("");
        setTargetId(null);
    };
    const categoryColumns = [
        {
            accessorKey: "id",
            header: "#",
            cell: ({ row }) => {
                return row.index + 1;
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
        },
        {
            accessorKey: "#",
            header: "Aksi",
            cell: ({ row }) => {
                const { delete: del } = useForm({ id: row.getValue("id") });

                return (
                    <div className="flex gap-3 text-xl">
                        <AlertDelete
                            title="Konfirmasi"
                            deleteFn={() => {
                                del(route("category.delete"), {
                                    onSuccess: () =>
                                        toast({
                                            description: "Berhasil dihapus",
                                        }),
                                });
                            }}
                        />
                        <FaEdit
                            onClick={handleEdit.bind(
                                this,
                                row.getValue("id"),
                                row.getValue("name")
                            )}
                            className="text-green-500 hover:text-green-400"
                        />
                    </div>
                );
            },
        },
    ];
    const tableCategories = useReactTable({
        data: category,
        columns: categoryColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setCategorySort,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: categorySort,
            columnFilters,
        },
    });
    const onSuccess = (description) => {
        reset("name", "");
        setOpen(false);
        toast({
            description,
        });
        clearErrors("name", "");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (targetId != null) {
            post(route("category.update", { id: targetId }), {
                onSuccess: () => {
                    onSuccess("berhasil memperbarui kategori");
                },
            });
            return;
        }
        post(route("category.store"), {
            onSuccess: () => {
                onSuccess("berhasil menambahkan kategori baru");
            },
        });
    };

    return (
        <>
            <h1 className="text-xl font-semibold">Kategori</h1>
            <div className="flex gap-x-5 my-5">
                <Input
                    placeholder="Filter Name..."
                    value={
                        tableCategories.getColumn("name")?.getFilterValue() ??
                        ""
                    }
                    onChange={(event) =>
                        tableCategories
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <AddAlert
                    open={open}
                    setOpen={setOpen}
                    title={title || "Tambahkan Kategori Baru"}
                >
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder="Masukkan Nama Kategori ..."
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} />
                        <div className="mt-3 flex justify-end gap-x-3 items-center rounded">
                            <span
                                className="py-2 px-3 font-semibold bg-red-500 text-white hover:bg-red-400 rounded cursor-pointer"
                                onClick={closeAlert}
                            >
                                Batal
                            </span>
                            <Button>Simpan</Button>
                        </div>
                    </form>
                </AddAlert>
            </div>

            <DataTable table={tableCategories} columns={categoryColumns} />
        </>
    );
}

export default TableCategory;

function AlertDelete({ title = "", deleteFn }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <BsFillTrashFill className="text-red-500 hover:text-red-400" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini akan menghapus kategori dari sistem dan
                        tidak dapat di kembalikan, pastikan sudah merekap data
                        jika ada
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteFn}>
                        Lanjut
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
