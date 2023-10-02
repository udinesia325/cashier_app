import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/shadcn/ui/card";
import { Head } from "@inertiajs/react";
import {MdOutlineAttachMoney} from "react-icons/md"
import {BiShoppingBag} from "react-icons/bi"
import {CiShoppingTag} from "react-icons/ci"
import ProfitCharts from "@/Components/Admin/ProfitCharts";
import { ScrollArea } from "@/shadcn/ui/scroll-area";

function Dashboard({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Dahsboard" />
            <ScrollArea className="h-full">
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200 col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between font-light">Ringkasan Penjualan <MdOutlineAttachMoney /></CardTitle>
                        <CardDescription className="text-xs font-semibol">
                            Okt -  2023
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-x-2 justify-evenly ">
                        <div className="flex flex-col justify-center">
                            <h1 className="font-semibold text-2xl">Rp. 30.000.000</h1>
                            <span>Bulanan</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="font-semibold text-2xl">Rp. 4.000.000</h1>
                            <span>Mingguan</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className="font-semibold text-2xl">Rp. 699.000</h1>
                            <span>Harian</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-400">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between font-light">Ringkasan Produk<MdOutlineAttachMoney /></CardTitle>
                        <CardDescription className="text-xs font-semibold">
                            -
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-evenly px-4">
                       <div className="flex flex-col items-center">
                        <BiShoppingBag className="text-4xl p-2 text-green-500 bg-green-200 rounded-xl" />
                        <span className="font-light text-sm">2 Kategori</span>
                       </div>
                       <div className="flex flex-col items-center">
                        <CiShoppingTag className="text-4xl p-2 text-violet-500 bg-violet-200 rounded-xl" />
                        <span className="font-light text-sm">4 Tipe</span>
                       </div>
                    </CardContent>
                </Card>
            </div>
            <ProfitCharts />
            </ScrollArea>
        </Authenticated>
    );
}

export default Dashboard;
