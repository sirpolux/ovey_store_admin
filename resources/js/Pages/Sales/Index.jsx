import Breadcrumbs from "@/Components/Breadcrumb";
import DashboardLayout from "../DashboardLayout";

export default function Index({breadcrumbs}) {
    return (
        <DashboardLayout>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            update this page to show sales data, with filters for date range and item name. also add pagination and sorting options.
            handle empty states and loading states appropriately. you can use the existing components and styles from the dashboard for consistency.
            handle sales summary
            <h1 className="text-2xl font-bold mb-4">Sales</h1>
            <p>This is the sales page. You can view and manage all sales here.</p>
        </DashboardLayout>
    );
}