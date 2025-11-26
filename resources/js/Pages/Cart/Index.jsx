import { Head, Link } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import { EyeIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import Card from "@/Components/ui/Card";
import CardContent from "@/Components/ui/CardContent";

export default function Index({ cart }) {
    return (
        <AdminDashboard>
            <Head title="Customer Carts" />

            {/* Page Title */}
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <ShoppingCartIcon className="w-6 h-6" /> Customer Carts
            </h1>

            {/* If no carts found */}
            {(!cart.data || cart.data.length === 0) && (
                <div className="flex items-center justify-center py-20">
                    <p className="text-gray-500 text-lg italic">
                        No customer carts found.
                    </p>
                </div>
            )}

            {/* Cart list */}
            <div className="grid gap-6 overflow-auto max-h-[75vh]">
                {cart.data?.map((entry) => (
                    <Card
                        key={entry.cart_id}
                        className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <CardContent className="p-4">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b pb-3 mb-3">
                                <div className="text-lg font-semibold flex items-center gap-2">
                                    <UserIcon className="w-5 h-5 text-gray-500" />
                                    {entry.user.name}{" "}
                                    <span className="text-sm text-gray-500">
                                        ({entry.user.email})
                                    </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Cart ID:{" "}
                                    <span className="font-medium">
                                        #{entry.cart_id}
                                    </span>
                                </div>
                            </div>

                            {/* Cart items */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {entry.cart_item.map((ci, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={ci.item.image_url}
                                            alt={ci.item.title}
                                            className="h-40 w-full object-cover"
                                        />
                                        <div className="p-3">
                                            <h2 className="font-semibold text-base truncate">
                                                {ci.item.title}
                                            </h2>
                                            <p className="text-sm text-gray-600">
                                                {ci.item.author}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                ₦{ci.item.price.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Format: {ci.item.format}
                                            </p>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs text-gray-400">
                                                    Qty: {ci.quantity} | Total: ₦
                                                    {ci.total_cost.toLocaleString()}
                                                </span>
                                                <Link
                                                    href={route("cart.show", entry.cart_id)}
                                                    className="inline-flex items-center rounded-md bg-gray-800 px-3 py-1 text-xs font-semibold text-white hover:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
                                                >
                                                    <EyeIcon className="w-4 h-4 mr-1" /> View
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-4 flex justify-between items-center border-t pt-3 text-sm">
                                <div>
                                    Created:{" "}
                                    <span className="text-gray-500">
                                        {entry.user.created_at}
                                    </span>
                                </div>
                                <div className="font-medium text-right">
                                    Total Cost: ₦
                                    {parseFloat(entry.total_cost).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {cart.meta?.links && (
                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                    {cart.meta.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            className={`px-3 py-1 text-sm rounded-md border ${
                                link.active
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminDashboard>
    );
}
