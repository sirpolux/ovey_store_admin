import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import { motion } from "framer-motion";
import { FaMoneyBill, FaCheck, FaTimes, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Show() {
    const { transaction } = usePage().props;
    const txn = transaction.data;
    const customer  = transaction.data.customer;

    const [modal, setModal] = useState(null);

    const form = useForm({
        id: txn.id,
        comment: "",
    });
    const handleSubmit = () => {
        form.post(route("confirm.transaction"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Action completed successfully");
                setModal(null);
                form.reset();
            },
        });
    };

    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        PAID: "bg-blue-100 text-blue-800",
        COMPLETED: "bg-gray-100 text-gray-800",
    };

    return (
        <AdminDashboard>
            <Head title={`Transaction #${txn.order_id ?? txn.id}`} />

            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Back Button */}
                <Link
                    href={route("transactions.index")}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
                >
                    ← Back to Transactions
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Transaction Details
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Review full details of this transaction
                    </p>
                </motion.div>

                {/* Transaction Card */}
                <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-gray-500 text-sm">Purpose</h3>
                            <p className="font-medium">{txn.purpose}</p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-sm">Amount</h3>
                            <p className="font-medium">
                                ₦{parseInt(txn.amount).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-sm">Status</h3>
                            <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[txn.transaction_status] ||
                                    "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {txn.transaction_status}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-sm">Channel</h3>
                            <p className="capitalize">{txn.transaction_channel}</p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-sm">Sender</h3>
                            <p className="font-medium">
                                {txn.sender_account_name} <br />
                                <span className="text-gray-600 text-sm">
                                    {txn.sender_bank} • {txn.sender_account_number}
                                </span>
                            </p>
                        </div>

                        {txn.recipient_account && (
                            <div>
                                <h3 className="text-gray-500 text-sm">Recipient</h3>
                                <p className="font-medium">
                                    {txn.recipient_account.account_name} <br />
                                    <span className="text-gray-600 text-sm">
                                        {txn.recipient_account.bank_name} •{" "}
                                        {txn.recipient_account.account_number}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>

                    <hr/>
                    {/* customer section */}
                    <div className="">

                   
                    <h1 className="text-lg font-semibold ">Client data</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-gray-500 text-sm">Name</h3>
                            <p className="text-sm">{customer.name}</p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-sm">email</h3>
                            <p className="font-medium">
                                {customer.email}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-gray-500 text-sm">Phone number</h3>
                            <p className="capitalize">{customer.contact_number}</p>
                        </div>
                    </div>
                    </div>
                    <hr/>
                    {/* end of customer section */}

                    <div className="font-semibold">
                        {txn.order_id && <span>Order Id: ORD-0{txn.order_id}</span>}
                        {txn.event_id && <span>Retreat Id: RET-0{txn.event_id}</span>}
                    </div>


                    {/* Proof of Payment */}
                    <div>
                        <h3 className="text-gray-500 text-sm mb-2">Proof of Payment</h3>
                        <a
                            href={
                                txn.evidence_of_payment
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={
                                    txn.evidence_of_payment
                                }
                                alt="Proof of Payment"
                                className="max-h-64 rounded-lg border"
                            />
                        </a>
                    </div>

                    {/* Confirmed By */}
                    {txn.payment_confirmed_by && (
                        <div>
                            <h3 className="text-gray-500 text-sm mb-1">Confirmed By</h3>
                            <p className="font-medium">
                                {txn.payment_confirmed_by.name} <br />
                                <span className="text-gray-600 text-sm">
                                    {txn.payment_confirmed_by.email}
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-gray-500 text-sm">Created At</h3>
                            <p>{new Date(txn.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-sm">Updated At</h3>
                            <p>{new Date(txn.updated_at).toLocaleString()}</p>
                        </div>
                    </div>

                    {txn.transaction_status === "PENDING" &&
                        <button
                            onClick={() => {
                                form.setData({ ...form.data, action: "confirm_payment" });
                                setModal("confirm");
                            }}
                            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            <FaCheck /> Confirm Payment
                        </button>
                    }
                </div>
            </div>
                  {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[40%]">
            <h2 className="text-lg font-bold mb-4">
              Confirm Payment
            </h2>
            <textarea
              placeholder="Comment"
              className="w-full border p-2 mb-4 rounded"
              value={form.data.comment}
              onChange={(e) => form.setData("comment", e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={form.processing}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {form.processing ? "Processing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
    )}

        </AdminDashboard>
    );
}
