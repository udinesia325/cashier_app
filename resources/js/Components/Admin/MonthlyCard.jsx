import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/shadcn/ui/calendar";
import { CalendarIcon } from "lucide-react";
import moment from "moment"

function MonthlyCard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = React.useState(new Date());
    const controller = new AbortController();
    useEffect(() => {
        if (!date) return () => {};
        axios
            .get(
                route("dashboard.admin.monthly", {
                    date:moment(date).format("DD-M-YYYY"),
                }),
                { signal: controller.signal }
            )
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
        return () => {
            controller.abort();
        };
    }, [date]);
    // console.log(`${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}`);
    return (
        <div className="flex flex-wrap justify-evenly gap-x-2 gap-y-5 w-full mb-10">
            <div className="basis-full my-2 text-2xl font-bold flex gap-5 items-center">
                <h1>Oktober 2023</h1>
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
            </div>
            <div className="basis-1/5 min-w-[200px] rounded-lg shadow-lg p-5 transition-all bg-red-50 shadow-slate-200 hover:scale-105">
                <h1 className="text-xl font-light mb-5">
                    Produk Terjual (sebulan)
                </h1>
                <h3 className="text-2xl font-bold">
                    {loading ? "memuat" : data?.productSold}
                </h3>
            </div>
            <div className="basis-1/4 min-w-[230px] max-w-[250px] rounded-lg shadow-lg p-5 transition-all bg-green-50 shadow-slate-200 hover:scale-105">
                <h1 className="text-xl font-light mb-5">Uang Masuk</h1>
                <h3 className="text-2xl font-bold">
                    Rp.{" "}
                    {loading
                        ? "memuat"
                        : Number(data?.monthlyMoney).toLocaleString("id")}
                </h3>
            </div>
            <div className="basis-1/4 min-w-[230px] max-w-[250px] rounded-lg shadow-lg p-5 transition-all bg-violet-50 shadow-slate-200 hover:scale-105">
                <h1 className="text-xl font-light mb-5">Dalam seminggu</h1>
                <h3 className="text-2xl font-bold">
                    Rp.{" "}
                    {loading
                        ? "memuat"
                        : Number(data?.weeklyMoney).toLocaleString("id")}
                </h3>
            </div>
            <div className="basis-1/4 min-w-[230px] max-w-[250px] rounded-lg shadow-lg p-5 transition-all bg-blue-50 shadow-slate-200 hover:scale-105">
                <h1 className="text-xl font-light mb-5">Sehari</h1>
                <h3 className="text-2xl font-bold">
                    Rp.{" "}
                    {loading
                        ? "memuat"
                        : Number(data?.dailyMoney).toLocaleString("id")}
                </h3>
            </div>
        </div>
    );
}

export default MonthlyCard;
