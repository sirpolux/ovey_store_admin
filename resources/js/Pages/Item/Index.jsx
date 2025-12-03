import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Pagination from "@/Components/Pagination";
import DashboardLayout from "../DashboardLayout";

export default function Index({ items, auth, queryParams = {} }) {
  const [keyword, setKeyword] = useState(queryParams.keyword || "");

  const handleSearch = () => {
    const params = { ...queryParams };
    keyword ? (params.keyword = keyword) : delete params.keyword;
    router.get(route("item.index"), params, { preserveState: true });
  };

  const handleSort = (field) => {
    const params = { ...queryParams };
    params.sort_field = field;
    params.sort_direction =
      queryParams.sort_direction === "asc" ? "desc" : "asc";
    router.get(route("item.index"), params, { preserveState: true });
  };

  return (
    <DashboardLayout>
      <Head title="Inventory Items" />

      <div className="p-6 space-y-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            href={route("item.create")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition flex items-center space-x-2"
          >
            <span className="text-2xl">+</span>
            <span className="hidden md:inline-block">Add New Item</span>
          </Link>

          {/* Search */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by author or title..."
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
        </div>

        {/* Items Found */}
        {items.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in max-h-[80vh] overflow-auto pt-2">
              {items.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {item.title}
                    </h3>

                    <div
                      className={`text-lg font-bold ${
                        item.stock < 0
                          ? "text-red-600"
                          : item.stock === 0
                          ? "text-amber-500"
                          : item.stock < 5
                          ? "text-green-400"
                          : "text-green-700"
                      }`}
                    >
                      {item.stock}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Author: {item.author}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Price: ₦{item.price}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Added by: {item.created_by.name}
                  </p>

                  <div className="flex justify-between mt-4 text-sm">
                    <Link
                      href={route("item.show", item.id)}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      href={route("item.edit", item.id)}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <Pagination links={items.meta.links} queryParams={queryParams} />
            </div>
          </>
        )}

        {/* Empty State */}
        {items.data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500 space-y-4 animate-fade-in">
            <div className="bg-gray-100 rounded-full p-6 shadow-sm">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No items found
            </h2>

            <p className="text-gray-500 max-w-sm">
              Your inventory is empty or no records match your search.
              <br /> You can add a new item to get started.
            </p>

            <Link
              href={route("item.create")}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Add New Item
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
