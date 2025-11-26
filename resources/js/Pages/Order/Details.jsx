import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function Details({ order, stock }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const { data, setData, post, processing } = useForm({
        action: "",
        message: "",
        order_id: order.data.id,
    });

    const cart = order.data.cart;
    const status = order.data.status;

    // Helper: get stock count for an item by title
    const getStockForItem = (title) => {
        const match = stock.find(([itemTitle]) => itemTitle === title);
        return match ? match[1] : "N/A";
    };

    const openActionModal = (action, actionType) => {
        setCurrentAction(action);
        setData("action", actionType);
        setModalOpen(true);
    };

    const submitAction = (e) => {
        e.preventDefault();
        post(route("order.perform.operation"), {
            onSuccess: () => {
                setModalOpen(false);
                toast.success("Status successfully updated");
            },
            onError: (errorsFromServer) => {
                setModalOpen(false);
                toast.error(errorsFromServer.order || "An error occurred");
            },
        });
    };

    const statusColors = {
        APPROVED: "bg-green-100 text-green-800",
        PENDING_PAYMENT: "bg-yellow-100 text-yellow-800",
        PROCESSING: "bg-blue-100 text-blue-800",
        CANCELED: "bg-red-100 text-red-800",
        default: "bg-gray-100 text-gray-800",
    };

    const handleBack = () => {
        router.visit("/order");
    };

    return (
        <AdminDashboard>
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={20} /> Back
            </button>

            {/* General Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div><strong>Cart ID:</strong> {cart.cart_id}</div>
                    <div><strong>User:</strong> {cart.user.name}</div>
                    <div><strong>Email:</strong> {cart.user.email}</div>
                    <div><strong>Total Items:</strong> {cart.total_items}</div>
                    <div><strong>Total Cost:</strong> ₦{cart.total_cost.toFixed(2)}</div>
                    <div>
                        <strong>Status:</strong>{" "}
                        <span className={`px-2 py-1 rounded text-sm ${statusColors[status] || statusColors.default}`}>
                            {status}
                        </span>
                    </div>
                </div>
            </div>

            {/* User details table */}
            <div className="bg-white shadow rounded-lg p-6 overflow-clip mb-3">
                <h3 className="text-lg font-semibold mb-4">Customer data</h3>
                <table className="w-full   border-gray-200 rounded-lg">
                    <tr className=" text-left">
                        <th className="p-3">Name</th>
                        <td className="p-3">{cart.user.name}</td>
                    </tr>
                    <tr className="text-left">
                        <th className="p-3">email</th>
                        <td className="p-3">{cart.user.email}</td>
                    </tr>
                    <tr className=" text-left">
                        <th className="p-3">Phone number</th>
                        <td className="p-3">{cart.user.contact_number}</td>
                    </tr>
                </table>
            </div>


            {/* Cart Items Table */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Cart Items</h3>
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Stock Available</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.cart_item.map((item, idx) => (
                            <tr key={idx} className="border-t hover:bg-gray-50">
                                <td className="p-3">{item.item.title}</td>
                                <td className="p-3">{item.item.author}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className={`p-3 font-medium ${getStockForItem(item.item.title) < 0 ? "text-red-600" : getStockForItem(item.item.title) === 0 ? "text-amber-900" : "text-green-600"}`}>
                                    {getStockForItem(item.item.title)}
                                </td>
                                <td className="p-3">₦{item.item.price.toFixed(2)}</td>
                                <td className="p-3">₦{item.total_cost.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Transaction Info */}
            {order.data.transaction && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>Transaction Type:</strong> {order.data.transaction.transaction_type}</div>
                        <div><strong>Amount:</strong> ₦{parseFloat(order.data.transaction.amount).toFixed(2)}</div>
                        <div><strong>Status:</strong> {order.data.transaction.transaction_status}</div>
                        <div><strong>Channel:</strong> {order.data.transaction.transaction_channel}</div>
                        <div><strong>Sender Name:</strong> {order.data.transaction.sender_account_name}</div>
                        <div><strong>Sender Bank:</strong> {order.data.transaction.sender_bank}</div>
                        <div><strong>Sender Account No.:</strong> {order.data.transaction.sender_account_number}</div>
                        {order.data.transaction.evidence_of_payment && (
                            <div className="col-span-2">
                                <strong>Evidence of Payment:</strong>
                                <div className="mt-2">
                                    <img
                                        src={order.data.transaction.evidence_of_payment}
                                        alt="Evidence of payment"
                                        className="max-w-xs border rounded shadow"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
                {!(["APPROVED", "PENDING_CONFIRMATION", "COMPLETED", "PAYMENT_COMFIRMED"].includes(status)) && (
                    <>
                        <button onClick={() => openActionModal("Move Payment to Pending", "action-1")} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Move Payment to Pending</button>
                        {!(status === "PENDING_UPDATE") &&
                            <button onClick={() => openActionModal("Move Order Back to Cart", "action-2")} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Move Back to Cart</button>
                        }
                        <button onClick={() => openActionModal("Cancel Order", "action-3")} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel Order</button>
                    </>
                )}
                {status === "PENDING_CONFIRMATION" && (
                    <button onClick={() => openActionModal("Confirm Payment", "action-4")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Confirm Payment</button>
                )}
                {status === "APPROVED" && (
                    <button onClick={() => openActionModal("Move to Completed", "action-5")} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Move to Completed</button>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">{currentAction}</h2>
                        <form onSubmit={submitAction}>
                            <textarea
                                value={data.message}
                                onChange={(e) => setData("message", e.target.value)}
                                placeholder="Enter a message..."
                                className="w-full border rounded p-2 mb-4"
                                rows="4"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    {processing ? "Processing..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminDashboard>
    );
}
