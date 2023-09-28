import Authenticated from "@/Layouts/AuthenticatedLayout";
import DataTable from "./DataTable/index";
import { useToast } from "@/shadcn/ui/use-toast";
import { useEffect } from "react";
import { Head } from "@inertiajs/react";

function User({ data, auth, flash }) {
    const { toast } = useToast();
    useEffect(() => {
        if (flash != false) {
            toast({
                description: flash,
            });
        }
    }, []);
    return (
        <Authenticated user={auth.user}>
            <Head title="All User" />
            <DataTable data={data} />
        </Authenticated>
    );
}

export default User;
