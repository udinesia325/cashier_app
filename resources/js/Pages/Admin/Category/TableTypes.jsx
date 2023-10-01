import DataTable from "@/Components/DataTable";
import { Button } from "@/shadcn/ui/button";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
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
import AddAlert from "./AddAlert";

import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

function TableTypes({ type }) {
    const [typeSort, setTypeSort] = useState();
    const [columnFilters, setColumnFilters] = useState([]);
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const { data, setData, errors, processing, post, reset, clearErrors } =
        useForm({
            name: "",
        });
    const handleEdit = (id, name) => {
        setTargetId(id);
        setTitle("Edit Type");
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
    const typeColumns = [
        {
            accessorKey: "id",
            header: () => {
                return (
                    <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => setTypeSort([])}
                    >
                        No <ArrowUpDown className=" h-4 w-4" />
                    </div>
                );
            },
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
                                del(route("type.delete"), {
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

    const tableTypes = useReactTable({
        data: type,
        columns: typeColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setTypeSort,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: typeSort,
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
            post(route("type.update", { id: targetId }), {
                onSuccess: () => {
                    onSuccess("Berhasil memperbarui tipe");
                },
            });
            return;
        }
        post(route("type.store"), {
            onSuccess: () => {
                onSuccess("Berhasil menambahkan tipe baru");
            },
        });
    };

    return (
        <>
            <h1 className="text-xl font-semibold">Tipe</h1>
            <div className="flex gap-x-5 my-5 px-1">
                <Input
                    placeholder="Filter Name..."
                    value={tableTypes.getColumn("name")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        tableTypes
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <AddAlert
                    open={open}
                    setOpen={setOpen}
                    title={title || "Tambahkan Tipe Baru"}
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
                            <Button disabled={processing}>Simpan</Button>
                        </div>
                    </form>
                </AddAlert>
            </div>
            <DataTable table={tableTypes} columns={typeColumns} />
        </>
    );
}

export default TableTypes;

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
                        Tindakan ini akan menghapus Tipe dari sistem dan
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
