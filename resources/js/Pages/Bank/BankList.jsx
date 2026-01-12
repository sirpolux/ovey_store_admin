import React from "react";
import { router, Link } from "@inertiajs/react";
import { ArrowLeft, Star, Banknote } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../DashboardLayout";
import Breadcrumbs from "@/Components/Breadcrumb";

export default function BankList({ bankList, breadcrumbs }) {
    const banks = bankList;

    const handleSetPrimary = (bank_id) => {
        router.post(
            route("bank.setup.primary"),
            { bank_id },
            {
                onSuccess: () => toast.success("Primary bank account updated successfully."),
                onError: () => toast.error("Failed to update primary account. Please try again."),
            }
        );
    };

    return (
        <DashboardLayout>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
           <div className="p-8">

          

            {banks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-gray-50">
                    <Banknote className="w-14 h-14 text-gray-400 mb-3" />
                    <h2 className="text-lg font-semibold text-gray-700">
                        No Bank Accounts Found
                    </h2>
                    <p className="text-gray-500 mt-1 mb-5 text-sm">
                        Add a bank account to proceed with transactions.
                    </p>

                    <Link
                        href={route("bank.create")}
                        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                        Add Bank Account
                    </Link>
                </div>
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
                            <p><strong>Bank Name:</strong> {bank.bank_name}</p>
                            <p><strong>Account Name:</strong> {bank.account_name}</p>
                            <p><strong>Account Number:</strong> {bank.account_number}</p>

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

 </div>

        </DashboardLayout>
    );
}
