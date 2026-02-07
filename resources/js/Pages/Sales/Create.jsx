import Breadcrumbs from "@/Components/Breadcrumb";
import DashboardLayout from "../DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Create({breadcrumbs}) {
    return (
        <DashboardLayout>
            <Head title="Create Sale" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1 className="text-2xl font-bold mb-4">Create Sale</h1>
            <p>This is the create sale page. You can create a new sale here.</p>
            // implement the form to create a new sale, with fields for item, quantity, total price, and captured by. also handle form submission and validation. you can use the existing components and styles from the dashboard for consistency.
        </DashboardLayout>
    );

}