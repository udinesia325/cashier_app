import Navbar from '@/Components/Navbar';
import Sidebar from '@/Components/Sidebar';
import Transaksi from '@/Components/Transaksi';
import { useState } from 'react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="w-full h-screen grid grid-cols-[300px_1fr_1fr_300px] grid-rows-[80px_1fr]">
            <Navbar user={user} />
            <Transaksi />
            <Sidebar />
            <div className="col-span-2 bg-gray-200">{children}</div>
        </div>
    )
}
