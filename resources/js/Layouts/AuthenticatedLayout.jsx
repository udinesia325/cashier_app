import NavbarAdmin from "@/Components/Admin/Navbar";
import SidebarAdmin from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import Transaksi from "@/Components/Transaksi";
import { Toaster } from "@/shadcn/ui/toaster";
import { useToast } from "@/shadcn/ui/use-toast";
import { useEffect } from "react";

export default function Authenticated({
    user,
    header,
    children,
    flash = false,
}) {
    if (user.role == "admin") {
        const { toast } = useToast();
        useEffect(() => {
            if (flash != false) {
                toast({
                    description: flash,
                });
            }
        }, []);
        return (
            <div className="w-full h-screen grid grid-cols-[250px_1fr_1fr_350px] grid-rows-[80px_1fr]">
                <NavbarAdmin user={user} />
                <SidebarAdmin />
                <div className="col-span-3 bg-gray-200 p-5">
                    <div className="h-[85vh] w-[100%] min-w-[400px] min-h-[300px] mt-5 rounded bg-white p-5">
                        {children}
                    </div>
                </div>
                <Toaster />
            </div>
        );
    }
    return (
        <div className="w-full h-screen grid grid-cols-[250px_1fr_1fr_350px] grid-rows-[80px_1fr]">
            <Navbar user={user} />
            <Transaksi />
            <Sidebar />
            <div className="col-span-2 bg-gray-200">{children}</div>
        </div>
    );
}
