import React from "react";
import { router } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import { ArrowLeft, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function BankList({ bankList }) {
    const banks = bankList;

    const handleSetPrimary = (bank_id) => {
        router.post(
            route("bank.setup.primary"),
            { bank_id },
            {
                onSuccess: () => {
                    toast.success("Primary bank account updated successfully.");
                },
                onError: () => {
                    toast.error("Failed to update primary account. Please try again.");
                },
            }
        );
    };

    return (
        <AdminDashboard>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">Bank Accounts</h1>
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-sm text-gray-600 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </button>
            </div>

            {banks.length === 0 ? (
                <p>No banks found.</p>
            ) : (
                <div className="space-y-4 max-h-[80vh] overflow-auto">
                    {banks.map((bank, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-md shadow-sm ${
                                bank.primary_account
                                    ? "bg-green-50 border-green-500"
                                    : "bg-white"
                            }`}
                        >
                            <p>
                                <strong>Bank Name:</strong> {bank.bank_name}
                            </p>
                            <p>
                                <strong>Account Name:</strong> {bank.account_name}
                            </p>
                            <p>
                                <strong>Account Number:</strong> {bank.account_number}
                            </p>

                            {bank.primary_account ? (
                                <span className="inline-flex items-center mt-2 text-green-600 font-medium text-sm">
                                    <Star className="w-4 h-4 mr-1" /> Primary Account
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleSetPrimary(bank.id)}
                                    className="mt-4 text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                                >
                                    Set as Primary Account
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </AdminDashboard>
    );
}
