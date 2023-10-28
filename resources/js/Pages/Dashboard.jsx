import Products from "@/Components/Staff/Products";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="w-full mx-auto p-3 ">
                <p className="text-gray-600 text-sm ml-2">Klik item untuk menambahkan ke daftar pesanan.</p>
                <Products />
            </div>
        </AuthenticatedLayout>
    );
}
