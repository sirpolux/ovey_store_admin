import React from "react";
import AdminDashboard from "../AdminDashboard";
import { Eye } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Index({ orders }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case "PAID":
                return "bg-green-100 text-green-800 border border-green-300";
            case "PENDING_PAYMENT":
                return "bg-yellow-100 text-yellow-800 border border-yellow-300";
            case "PROCESSING":
                return "bg-blue-100 text-blue-800 border border-blue-300";
            case "CANCELED":
                return "bg-red-100 text-red-800 border border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-300";
        }
    };

    return (
        <AdminDashboard>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Orders</h1>
                <p className="text-sm text-gray-500">Manage all customer orders</p>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Cart ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total Items</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total Cost</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.data.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.data.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                        ORD-0{order.id}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {order.cart.user.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            {order.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {order.cart.total_items}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        ₦{order.total_cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">
                                        {new Date(order.cart.user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/order/${order.cart.cart_id}`}
                                            className="inline-flex items-center px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition"
                                        >
                                            <Eye className="w-4 h-4 mr-1" /> View More
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {orders.meta?.links?.length > 3 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {orders.meta.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            className={`px-3 py-1 text-sm rounded-lg ${
                                link.active
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } ${!link.url && "pointer-events-none opacity-50"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminDashboard>
    );
}
