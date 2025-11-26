import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";

export default function Index({ items, auth, queryParams = {} }) {
  const [keyword, setKeyword] = useState(queryParams.keyword || "");

  const handleSearch = () => {
    const newParams = { ...queryParams };
    if (keyword) {
      newParams.keyword = keyword;
    } else {
      delete newParams.keyword;
    }
    router.get(route("item.index"), newParams, { preserveState: true });
  };

  const handleSort = (field) => {
    const newParams = { ...queryParams };
    newParams.sort_field = field;
    newParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    router.get(route("item.index"), newParams, { preserveState: true });
  };

  const active = "w-4 text-indigo-600";
  const inactive = "w-4 text-gray-400";

  return (
    <AdminDashboard>
      <Head title="Inventory Items" />

      <div className="p-6 space-y-6 ">
        <div className="flex items-center justify-between">
          <Link
            href={route("item.create")}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
           <span className="text-2xl md:text:md">+</span>  <span className="hidden  md:inline-block"> Add New Item</span>
          </Link>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search by Author or Title..."
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in max-h-[80vh] overflow-auto">
          {items.data.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                <div className={`text-lg font-semibold ${item.stock < 0? "text-red-600": item.stock === 0? "text-amber-500" : item.stock<5?"text-green-400":"text-green-700"} `}  >{item.stock}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Author: {item.author}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Price: ₦{item.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Added by: {item.created_by.name}</p>

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

        <div className="flex justify-center mt-6">
          <Pagination links={items.meta.links} queryParams={queryParams} />
        </div>

        {items.data.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No items found.</div>
        )}

       
      </div>
    </AdminDashboard>
  );
}
