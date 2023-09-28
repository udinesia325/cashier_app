import React from "react";
import { Input } from "@/shadcn/ui/input";
import { Link } from "@inertiajs/react";
import { FiPower } from "react-icons/fi";
import Logo from "../../../assets/Logo.jpg"
function Navbar({ user }) {
    return (
        <nav className="col-span-4 flex items-center border-b px-3">
            {/* Brand Name */}
            <div className="w-[250px] flex items-center gap-x-2">
                <img src={Logo} alt="Logo Cashier" width={50} className="rounded-full row-span-2" />
                <h1 className="font-semibold text-2xl col-span-1">My <span className="text-primary">Cashier</span></h1>            
            </div>
            <h1 className="font-bold text-2xl text-slate-800">Selamat Datang {user.name}</h1>
            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="ml-auto flex gap-2 items-center text-slate-500 hover:text-primary"
            >
                <FiPower />
                Logout
            </Link>
        </nav>
    );
}

export default Navbar;
