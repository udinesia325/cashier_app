import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import DataTable from "@/Components/DataTable";
import { Button } from "@/shadcn/ui/button";
import { ArrowUpDown } from "lucide-react";

import React, { useState } from "react";


function TableTypes({ type }) {
    const [types, setTypes] = useState(type);

    const [typeSort, setTypeSort] = useState();
    const typeColumns = [
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
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("name")}</div>
            ),
        },
    ];

    const tableTypes = useReactTable({
        data: types,
        columns: typeColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setTypeSort,
        state: {
            sorting: typeSort,
        },
    });
    return (
        <>
            <h1 className="text-xl font-semibold">Tipe</h1>
            <DataTable table={tableTypes} columns={typeColumns} />
        </>
    );
}

export default TableTypes;
