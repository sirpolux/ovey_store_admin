import { Head, Link, router, usePage } from "@inertiajs/react";
import DashboardLayout from "../DashboardLayout";
import Breadcrumbs from "@/Components/Breadcrumb";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";

export default function Index({ breadcrumbs }) {
    const { savings, filters = {} } = usePage().props;

    const [keyword, setKeyword] = useState(filters.keyword || "");
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");
    const [sortField, setSortField] = useState(filters.sort_field || "id");
    const [sortDirection, setSortDirection] = useState(filters.sort_direction || "desc");

    /* -----------------------------
     * Filters (Inertia-driven)
     * ----------------------------- */
    const applyFilters = () => {
        router.get(
            route("savings.index"),
            {
                keyword,
                start_date: startDate,
                end_date: endDate,
                sort_field: sortField,
                sort_direction: sortDirection,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    /* -----------------------------
     * PDF Export (current page only)
     * ----------------------------- */
    const exportPdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text("Savings Report", 14, 15);

        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

        autoTable(doc, {
            startY: 30,
            head: [[
                "#",
                "Saving Ref",
                "User",
                "Email",
                "Amount Saved",
                "Total",
                "Balance",
                "Status",
                "Created",
            ]],
            body: savings.data.map((s, index) => ([
                index + 1,
                s.saving_reference,
                s.user?.name,
                s.user?.email,
                `₦${Number(s.amount_saved).toLocaleString()}`,
                `₦${Number(s.total).toLocaleString()}`,
                `₦${Number(s.balance).toLocaleString()}`,
                s.status,
                new Date(s.created_at).toLocaleDateString(),
            ])),
            styles: { fontSize: 9 },
            headStyles: { fillColor: [30, 30, 30] },
        });

        doc.save(`savings-${Date.now()}.pdf`);
    };

    const statusStyles = {
        active: "bg-green-100 text-green-800",
        not_started: "bg-gray-100 text-gray-700",
        completed: "bg-blue-100 text-blue-800",
    };

    return (
        <DashboardLayout>
            <Head title="Savings" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Savings</h1>
                        <p className="text-sm text-gray-500">
                            Monitor customer savings and progress
                        </p>
                    </div>

                    <button
                        onClick={exportPdf}
                        className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
                    >
                        Download PDF
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-end">
                    <div>
                        <label className="text-xs text-gray-500">Search</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Name, email or order ID"
                            className="border rounded px-3 py-2 text-sm w-56"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <button
                        onClick={applyFilters}
                        className="bg-black text-white px-4 py-2 rounded text-sm"
                    >
                        Apply
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-3 text-left">Reference</th>
                                <th className="px-4 py-3 text-left">User</th>
                                <th className="px-4 py-3 text-left">Saved</th>
                                <th className="px-4 py-3 text-left">Total</th>
                                <th className="px-4 py-3 text-left">Balance</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savings.data.map((s) => (
                                <tr key={s.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3 font-mono text-xs">
                                        {s.saving_reference}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{s.user?.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {s.user?.email}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        ₦{Number(s.amount_saved).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        ₦{Number(s.total).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        ₦{Number(s.balance).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${
                                                statusStyles[s.status]
                                            }`}
                                        >
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500">
                                        {new Date(s.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2">
                    {savings.meta.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1 border rounded text-sm ${
                                link.active
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                            } ${!link.url && "opacity-50 pointer-events-none"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
