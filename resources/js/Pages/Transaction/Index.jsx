import { Head, Link, usePage } from "@inertiajs/react";

import { motion } from "framer-motion";
import DashboardLayout from "../DashboardLayout";

export default function Index() {
    const { transactions } = usePage().props;

    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        PAID: "bg-blue-100 text-blue-800",
        COMPLETED: "bg-gray-100 text-gray-800",
    };

    return (
        <DashboardLayout>
            <Head title="Transactions" />

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mt-6 mb-4">
                        Transactions
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Manage and review all transactions.
                    </p>
                </motion.div>

                {/* Transactions Table */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="overflow-x-auto shadow-lg rounded-lg"
                >
                    <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left">Purpose</th>
                                <th className="px-4 py-3 text-left">Amount</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Channel</th>
                                <th className="px-4 py-3 text-left" colSpan="2">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {transactions.data.map((txn) => (
                                <tr
                                    key={txn.id}
                                    className="border-t hover:bg-gray-50 transition-all duration-200"
                                >
                                    <td className="px-4 py-3">{txn.purpose}</td>
                                    <td className="px-4 py-3 font-medium">
                                        ₦{parseInt(txn.amount).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                statusColors[txn.transaction_status] ||
                                                "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {txn.transaction_status}
                                         </span>
                                    </td>
                                    <td className="px-4 py-3 capitalize">
                                        {txn.transaction_channel}
                                    </td>
                                    {/* <td className="px-4 py-3">
                                        <a
                                            href={
                                                txn.evidence_of_payment.startsWith("http")
                                                    ? txn.evidence_of_payment
                                                    : `/storage/${txn.evidence_of_payment}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                           fetch data
                                        </a>
                                    </td> */}
                                    <td className="px-4 py-3">
                                        <Link
                                            href={route(
                                                "transactions.show",
                                                 txn.id
                                            )}
                                            className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                                        >
                                            fetch data
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {transactions.meta.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`px-3 py-1 text-sm rounded-md border ${
                                link.active
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
