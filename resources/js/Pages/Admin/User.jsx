import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useToast } from "@/shadcn/ui/use-toast";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import DataTable from "@/Components/DataTable";
import { Button } from "@/shadcn/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";


function User({ data, auth, flash }) {
    const { toast } = useToast();
    useEffect(() => {
        if (flash != false) {
            toast({
                description: flash,
            });
        }
    }, []);
    const [sorting, setSorting] = useState([]);
    const columns = [
        {
            accessorKey: "#",
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
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="lowercase">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
        },

        {
            id: "actions",
            header: "actions",
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
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
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
        <Authenticated user={auth.user}>
            <Head title="All User" />
           <DataTable table={table} />
        </Authenticated>
    );
}

export default User;
