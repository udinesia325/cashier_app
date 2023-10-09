import MonthlyCard from "@/Components/Admin/MonthlyCard";
import ProfitCharts from "@/Components/Admin/ProfitCharts";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Head } from "@inertiajs/react";

function Dashboard({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Dahsboard" />
            <ScrollArea className="h-full">
                <MonthlyCard />
                <ProfitCharts />
            </ScrollArea>
        </Authenticated>
    );
}

export default Dashboard;
