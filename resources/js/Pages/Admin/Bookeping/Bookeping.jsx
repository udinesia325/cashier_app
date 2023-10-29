import DataTable from "@/Components/DataTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shadcn/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import exportProperties from "./exportProperties";
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from "xlsx";

function Bookeping({ auth, user }) {
    const [selectedUser, setSelectedUser] = useState(user[0]?.id || 0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const [exportData, setExportData] = useState([]);

    const [details, setDetails] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const startMemo = useMemo(() => {
        return startDate
            ? moment(startDate).format("DD-MM-YYYY")
            : moment().startOf("month").format("DD-MM-YYYY");
    }, [startDate]);
    const endMemo = useMemo(() => {
        return endDate
            ? moment(endDate).format("DD-MM-YYYY")
            : moment().endOf("month").format("DD-MM-YYYY");
    }, [endDate]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                route("api.bookeping", {
                    startDate: startMemo,
                    endDate: endMemo,
                    userId: selectedUser,
                })
            );
            const { data } = response.data;
            setData(data);
            exportProperties(data, setExportData);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData();
    }, [startMemo, endMemo, selectedUser]);
    const [sorting, setSorting] = useState([]);
    const columns = [
        {
            accessorKey: "id",
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "table_name",
            header: "Nama Meja",
            cell: ({ row }) => {
                return row.getValue("table_name") || "-";
            },
        },
        {
            accessorKey: "total",
            header: "Total Pembayaran",
            cell: ({ row }) => {
                return (
                    "Rp. " + Number(row.getValue("total")).toLocaleString("id")
                );
            },
        },
        {
            accessorKey: "created_at",
            header: "Tanggal",
            cell: ({ row }) => {
                return moment(row.getValue("created_at")).format(
                    "DD-MM-YYYY hh:mm:ss"
                );
            },
        },
        {
            accessorKey: "order_item",
            header: "Detail",
            // buat show detail order item menggunakan dialog
            cell: ({ row }) => {
                return (
                    <button
                        onClick={() => {
                            setDetails(row.getValue("order_item"));
                            setOpenDialog(true);
                        }}
                        className="text-xl p-2 bg-green-400 text-white rounded-sm hover:bg-green-500 hover:text-white/80"
                    >
                        <AiFillEye />
                    </button>
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
    const handleExport = () => {
        const selectedUserName = user[user.findIndex( user => user.id == selectedUser)].name
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, "Bookeping");
        XLSX.writeFile(
            wb,
            `Bookeping-${selectedUserName}-${moment().format(
                "DD-MM-YYYY hh:mm:ss"
            )}.xlsx`
        );
    };
    return (
        <Authenticated user={auth.user}>
            <h1 className="text-2xl font-semibold">Pembukuan</h1>
            <div className="flex justify-between mt-8">
                <div className="flex flex-col gap-y-3">
                    <span>Nama Staff</span>
                    <Select
                        defaultValue={String(selectedUser)}
                        onValueChange={(e) => setSelectedUser(e)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {user.map((user, index) => {
                                    return (
                                        <SelectItem
                                            key={index}
                                            value={String(user.id)}
                                        >
                                            {user.name}
                                        </SelectItem>
                                    );
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-y-3">
                    <span>Tanggal Awal</span>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startMemo}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-y-3">
                    <span>Tanggal Akhir</span>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endMemo}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            {/* Dialog box */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Detail Pesanan</DialogTitle>
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Nama
                                </TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Harga</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {details.map((detail) => (
                                <TableRow key={detail.id}>
                                    <TableCell className="font-medium">
                                        {detail.product[0].name}
                                    </TableCell>
                                    <TableCell>{detail.quantity}</TableCell>
                                    <TableCell>
                                        {Number(
                                            detail.product[0].price
                                        ).toLocaleString("id")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {Number(detail.subtotal).toLocaleString(
                                            "id"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button">Tutup</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* End Dialog box */}

            <ScrollArea className="h-[400px]">
                <DataTable table={table} columns={columns} />
            </ScrollArea>
            <div className="flex items-center justify-start space-x-2 py-4">
                <Button
                    variant="primary"
                    size="sm"
                    className="bg-primary text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Sebelumnya
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    className="bg-primary text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Berikutnya
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    className="bg-green-500 text-white my-3 hover:bg-green-400"
                    onClick={handleExport}
                >
                    <SiMicrosoftexcel className="mr-2" />
                    Export
                </Button>
            </div>
        </Authenticated>
    );
}

export default React.memo(Bookeping);
