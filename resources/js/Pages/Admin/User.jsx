import Authenticated from "@/Layouts/AuthenticatedLayout";
import DataTable from "./DataTable/index";
import { useToast } from "@/shadcn/ui/use-toast";
import { useEffect } from "react";

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
            <div className="rounded-md border">
                <div className="container">
                    <DataTable data={data} />
                </div>
            </div>
        </Authenticated>
    );
}

export default User;
