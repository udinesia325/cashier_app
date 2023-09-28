import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import Transaksi from "@/Components/Transaksi";
import NavbarAdmin from "@/Components/Admin/Navbar"
import SidebarAdmin from "@/Components/Admin/Sidebar"
import { Toaster } from "@/shadcn/ui/toaster";

export default function Authenticated({ user, header, children }) {
    if (user.role == "admin") {
        return (
            <div className="w-full h-screen grid grid-cols-[250px_1fr_1fr_350px] grid-rows-[80px_1fr]">
                <NavbarAdmin user={user} />
                <SidebarAdmin />
                <div className="col-span-3 bg-gray-200">{children}</div>
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
