import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import DashboardLayout from "../DashboardLayout";
import { Eye, FileImage } from "lucide-react";

export default function Index() {
    const { transactions } = usePage().props;

    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        PAID: "bg-blue-100 text-blue-800",
        COMPLETED: "bg-gray-100 text-gray-800",
    };

    const typeColors = {
        CREDIT: "text-green-600",
        DEBIT: "text-red-600",
    };

    return (
        <DashboardLayout>
            <Head title="Transactions" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Transactions
                    </h1>
                    <p className="text-gray-600">
                        Review payments, verify evidence, and confirm orders.
                    </p>
                </motion.div>

                {/* Transactions Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="overflow-x-auto bg-white shadow rounded-lg"
                >
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">User</th>
                                <th className="px-4 py-3 text-left">Order</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Channel</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Evidence</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {transactions.data.map(txn => (
                                <tr key={txn.id} className="hover:bg-gray-50">

                                    {/* USER */}
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{txn.user?.name}</div>
                                        <div className="text-xs text-gray-500">{txn.user?.email}</div>
                                    </td>

                                    {/* ORDER */}
                                    <td className="px-4 py-3">
                                        {txn.order ? (
                                            <div>
                                                <div className="font-medium">#{txn.order.id}</div>
                                                <div className="text-xs text-gray-500">
                                                    {txn.order.status}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">
                                                No order linked
                                            </span>
                                        )}
                                    </td>

                                    {/* AMOUNT */}
                                    <td className={`px-4 py-3 font-semibold ${typeColors[txn.transaction_type]}`}>
                                        ₦{Number(txn.amount).toLocaleString()}
                                        <div className="text-xs uppercase">
                                            {txn.transaction_type}
                                        </div>
                                    </td>

                                    {/* CHANNEL */}
                                    <td className="px-4 py-3 capitalize">
                                        {txn.transaction_channel}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                statusColors[txn.transaction_status]
                                            }`}
                                        >
                                            {txn.transaction_status}
                                        </span>
                                    </td>

                                    {/* EVIDENCE */}
                                    <td className="px-4 py-3">
                                        {txn.evidence_of_payment && (
                                            <a
                                                href={txn.evidence_of_payment}
                                                target="_blank"
                                                className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                                            >
                                                <FileImage size={14} />
                                                View
                                            </a>
                                        )}
                                    </td>

                                    {/* ACTION */}
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={route("transactions.show", txn.id)}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-black hover:text-white transition"
                                        >
                                            <Eye size={14} />
                                            Review
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-2">
                    {transactions.meta.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1 text-sm rounded border ${
                                link.active
                                    ? "bg-black text-white"
                                    : "bg-white hover:bg-gray-100"
                            } ${!link.url && "opacity-50 pointer-events-none"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </DashboardLayout>
    );
}
