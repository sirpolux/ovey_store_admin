import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
//import { MenuIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import AdminDashboard from "../AdminDashboard";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Pagination from "@/Components/Pagination";

export default function Index({ stocks, auth, queryParams }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [keyword, setKeyword] = useState(queryParams.keyword || "");

    const handleSearch = () => {
        const newParams = { ...queryParams };
        if (keyword) {
            newParams.keyword = keyword;
        } else {
            delete newParams.keyword;
        }
        router.get(route("stock.index"), newParams, { preserveState: true });
    };

    const active = "w-4 text-gray-900";
    const inactive = "w-4 text-gray-400";

    const searchFieldChanged = (field, value) => {
        // Handle search input change
        // e.g., update query params and reload Inertia page
    };

    const onKeyPress = (field, e) => {
        if (e.key === 'Enter') {
            searchFieldChanged(field, e.target.value);
        }
    };

    const sortChanged = (field) => {
        // Handle sorting logic
    };

    return (
        <AdminDashboard toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen}>
            <Head title="Stocks" />

            {/* Mobile Toggle Button
            <div className="md:hidden mb-4">
                <button onClick={toggleSidebar}>
                    <MenuIcon className="w-6 h-6 text-gray-600" />
                </button>
            </div> */}

            {/* Page Title and Action */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-gray-800">Stock Records</h1>
                <Link
                    href={route('stock.create')}
                    className="p-2 px-4 rounded-lg bg-green-700 text-white text-sm"
                >
                    + New Stock Entry
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-auto max-h-[75vh] bg-white shadow rounded-lg mb-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Search by Author or Title..."
                          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-400"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <button
                          onClick={handleSearch}
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
                        >
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3">
                                
                            </th>
                            <th className="p-3"></th>
                            <th className="p-3">
                                {/* <SelectInput
                                    onChange={e => searchFieldChanged('category', e.target.value)}
                                    defaultValue={queryParams.category || ""}
                                >
                                    <option value="">All Categories</option>
                                    <option value="Non-Fiction">Non Fiction</option>
                                    <option value="Science">Science</option>
                                </SelectInput> */}
                            </th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                            <th className="p-3"></th>
                        </tr>
                        <tr className="text-xs text-left text-gray-700 uppercase tracking-wider">
                            <th
                                onClick={() => sortChanged('author')}
                                className="p-3 cursor-pointer"
                            >
                                <div className="flex items-center gap-1">
                                    Author
                                    <ChevronUpIcon className={queryParams.sort_field === 'author' && queryParams.sort_direction === 'asc' ? active : inactive} />
                                    <ChevronDownIcon className={queryParams.sort_field === 'author' && queryParams.sort_direction === 'desc' ? active : inactive} />
                                </div>
                            </th>
                            <th onClick={() => sortChanged('name')} className="p-3 cursor-pointer">Title</th>
                            <th className="p-3">Quantity</th>
                            <th onClick={() => sortChanged('price')} className="p-3 cursor-pointer">Price</th>
                            <th onClick={() => sortChanged('created_by')} className="p-3 cursor-pointer">Recorded By</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {stocks.data.map(stock => (
                            <tr key={stock.id} className="hover:bg-gray-50">
                                <td className="p-3">{stock.author}</td>
                                <td className="p-3">{stock.item_name}</td>
                                <td className="p-3">{stock.quantity}</td>
                                <td className="p-3">₦{Number(stock.item_price).toLocaleString()}</td>
                                <td className="p-3">{stock.recorded_by.name}</td>
                                <td className="p-3">
                                    <Link
                                        href={route('stock.show', stock.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Open
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <Pagination links={stocks.meta.links} queryParams={queryParams} />
            </div>
        </AdminDashboard>
    );
}
