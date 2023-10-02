import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { CalendarIcon } from "lucide-react";

function ProfitCharts() {
    const [date, setDate] = React.useState();
    const [options, setOptions] = useState({
        options: {
            chart: {
                id: "basic-bar",
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                categories: [
                    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                ],
            },
            // samakan dengan warna default tailwind config
            colors: ["#00ADB5"],
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91],
            },
        ],
    });
    const products = [
        {
            product: "Soto Ayam",
            total: 90000,
        },
        {
            product: "Bakso Urat",
            total: 80000,
        },
        {
            product: "Kopi americano",
            total: 30000,
        },
    ];
    return (
        <div className="mt-10">
            <h1 className="text-3xl text-gray-800 font-semibold mb-8">
                Profit{" "}
            </h1>
            <div className="flex justify-between">
                <Tabs defaultValue="bulanan" className="w-full basis-8/12">
                    <TabsList>
                        <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
                        <TabsTrigger value="mingguan">Mingguan</TabsTrigger>
                    </TabsList>
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
                                     new Date(date).toLocaleDateString("id",{day:"2-digit",month:"short","year":"numeric"})
                                    ) : (
                                        <span>{new Date().toLocaleDateString("id",{day:"2-digit",month:"short","year":"numeric"})}</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    <TabsContent value="bulanan">
                        <Chart
                            options={options.options}
                            series={options.series}
                            type="line"
                            width="100%"
                            height="300px"
                        />
                    </TabsContent>
                    <TabsContent value="mingguan">
                        <Chart
                            options={options.options}
                            series={options.series}
                            type="line"
                            width="100%"
                            height="300px"
                        />
                    </TabsContent>
                </Tabs>
                <div className="basis-4/12">
                    <h1 className="text-xl mb-4">Top 3 Produk Terlaris</h1>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.product}>
                                    <TableCell className="font-medium">
                                        {product.product}
                                    </TableCell>
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
