import Breadcrumbs from "@/Components/Breadcrumb";
import DashboardLayout from "../DashboardLayout";
import { Head } from "@inertiajs/react";

export default function AddImage({ item, breadcrumbs, response = null }) {

    return (
        <DashboardLayout>
            <Head title="Add Item Image" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="p-6 bg-white rounded-lg shadow"></div>
            <h2 className="text-2xl font-semibold mb-4">Add Image for {item.data.item_name}</h2>

        </DashboardLayout>
    );
}