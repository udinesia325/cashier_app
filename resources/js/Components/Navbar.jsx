import React from "react";
import Dropdown from "./Dropdown";
import { Input } from "@/shadcn/ui/input";
import { Link } from "@inertiajs/react";
import { FiPower } from "react-icons/fi";
import Logo from "../../assets/Logo.jpg"
function Navbar({ user }) {
    return (
        <nav className="col-span-3 flex justify-between items-center border px-3">
            {/* Brand Name */}
            <div className="grid grid-rows-2 grid-flow-col gap-x-2">
                <img src={Logo} alt="Logo Cashier" width={50} className="rounded-full row-span-2" />
                <h1 className="font-semibold text-2xl col-span-1">My <span className="text-primary">Cashier</span></h1>
                <span className="row-span-1 col-span-1 text-sm text-gray-600 tracking-wide">{user.name}</span>
            
            </div>
            <Input
                type="text"
                placeholder="Cari ..."
                className="max-w-[300px]"
            />
            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="flex gap-2 items-center text-slate-500 hover:text-primary"
            >
                <FiPower />
                Logout
            </Link>
        </nav>
    );
}

export default Navbar;
