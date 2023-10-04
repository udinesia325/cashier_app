import Authenticated from "@/Layouts/AuthenticatedLayout";
import TableCategory from "./TableCategory";
import TableTypes from "./TableTypes";
import { Head } from "@inertiajs/react";

function Category({ auth, category, type,flash }) {

    return (
        <Authenticated user={auth.user} flash={flash}>
            <Head title="Category" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                <div className="basis-1/2">
                    <TableCategory category={category} type={type} />
                </div>
                <div className="basis-1/2">
                    <TableTypes type={type} />
                </div>
            </div>
        </Authenticated>
    );
}

export default Category;
