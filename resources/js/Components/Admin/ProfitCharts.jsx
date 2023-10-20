import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import { useState } from "react";
import Chart from "react-apexcharts";

import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import moment from "moment"

function ProfitCharts() {
    const [date, setDate] = useState(new Date());
    const [series, setSeries] = useState({
        name: "Rp.",
        data: [0, 0, 0, 0, 0],
    });
    const [terlaris, setTerlaris] = useState([]);
    const options = {
        options: {
            chart: {
                id: "basic-bar",
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                categories: [
                    "minggu 1",
                    "minggu 2",
                    "minggu 3",
                    "minggu 4",
                    "minggu 5",
                ],
            },
            // samakan dengan warna default tailwind config
            colors: ["#00ADB5"],
        },
        series: [series],
    };
    useEffect(() => {
        let formattedDate = moment(date||null).format("DD-M-YYYY");
        axios
            .get(
                route("dashboard.admin.monthlychart", {
                    date: date && formattedDate,
                })
            )
            .then((response) => {
                let result = [0, 0, 0, 0, 0];
                response.data.data.forEach((data) => {
                    result[data.week - 1] = data.total_sales;
                });
                setSeries({ ...series, data: result });
            });
        axios
            .get(
                route("dashboard.admin.productTerlaris", {
                    date: date && formattedDate,
                })
            )
            .then((response) => {
                setTerlaris(response.data.data);
            });
    }, [date]);

    return (
        <div className="mt-10">
            <h1 className="text-3xl text-gray-800 font-semibold mb-2">
                Profit{" "}
            </h1>
            <div className="flex justify-between">
                <div className="flex-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal ml-8 self-center border-primary translate-y-[2px]",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    new Date(date).toLocaleDateString("id", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                ) : (
                                    <span>
                                        {new Date().toLocaleDateString("id", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Chart
                        options={options.options}
                        series={options.series}
                        type="line"
                        width="100%"
                        height="300px"
                    />
                </div>

                <div className="basis-1/3">
                    <h1 className="text-xl mb-4">Top 3 Produk Terlaris {moment(date).format("MMM")}</h1>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {terlaris.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {product.nama_barang}
                                    </TableCell>
                                    <TableCell>{product.terjual}</TableCell>
                                    <TableCell>
                                        {product.total.toLocaleString("id")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default ProfitCharts;
