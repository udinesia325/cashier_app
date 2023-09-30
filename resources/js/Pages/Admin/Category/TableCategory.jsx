import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";

import DataTable from "@/Components/DataTable";
import { Button } from "@/shadcn/ui/button";
import { ArrowUpDown } from "lucide-react";

import React, { useState } from "react";
import { Input } from "@/shadcn/ui/input";
import { Link, useForm } from "@inertiajs/react";
import AddAlert from "./AddAlert";
import InputError from "@/Components/InputError";

function TableCategory({ category }) {
    const [categories, setCategories] = useState(category);
    const [categorySort, setCategorySort] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
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
    ];
    const tableCategories = useReactTable({
        data: categories,
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
    const [open, setOpen] = useState(false);
    const { data, setData, errors, processing, post, reset, clearErrors } =
        useForm({
            name: "",
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("category.store"), {
            onSuccess: () => {
                setOpen(false);
                reset("name", "");
                clearErrors("name", "");
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
                    title="Tambahkan Kategori Baru"
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
                                onClick={() => {
                                    setOpen(false);
                                    reset("name", "");
                                    clearErrors("name", "");
                                }}
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
