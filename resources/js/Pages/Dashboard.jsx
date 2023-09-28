import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import teh from "../../assets/esteh.jpg";
import kopi from "../../assets/kopi.jpg";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="w-full mx-auto p-3 ">
                <div className="flex flex-wrap gap-4">
                    <div className="w-[20%] basis-1/5 p-2 bg-white rounded-xl cursor-pointer text-center">
                        <img src={teh} alt="esteh" className="rounded-md w-full aspect-square" />
                        <h1 className="text-slate-700 font-bold truncate">Es Teh</h1>
                        <p className="text-sm text-slate-500">Rp. 8.000</p>
                    </div>
                    <div className="w-[20%] basis-1/5 p-2 bg-white rounded-xl cursor-pointer text-center">
                        <img src={kopi} alt="esteh" className="rounded-md w-full aspect-square" />
                        <h1 className="text-slate-700 font-bold truncate">Kopi Americano</h1>
                        <p className="text-sm text-slate-500">Rp. 8.000</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
