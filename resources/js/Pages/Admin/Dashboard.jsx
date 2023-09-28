import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

function Dashboard({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Dahsboard" />
            ini dashboard admin
        </Authenticated>
    );
}

export default Dashboard;
