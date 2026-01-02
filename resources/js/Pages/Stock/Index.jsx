import Breadcrumbs from "@/Components/Breadcrumb";
import DashboardLayout from "../DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function Index({ stocks, queryParams, breadcrumbs }) {
  const { data, setData, get, processing } = useForm({
    keyword: queryParams?.keyword || "",
    start_date: queryParams?.start_date || "",
    end_date: queryParams?.end_date || "",
    per_page: queryParams?.per_page || stocks.per_page || 20,
  });

  const submitFilters = () => {
    get(route("stock.index"), {
      preserveState: true,
      replace: true,
    });
  };

  const handleChange = (key, value) => {
    setData(key, value);
    submitFilters();
  };

  return (
    <DashboardLayout>
      <Head title="Stock Management" />

      <div className="p-6 space-y-6">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        {/* Header + Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Stock Management
          </h1>

          <div className="flex items-center gap-3">
            <Link
              href={route("stock.create")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <PlusIcon className="w-4 h-4" />
              Add Stock
            </Link>

            <Link
              href={route("stock.export", data)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export CSV
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search item, added by..."
            value={data.keyword}
            onChange={(e) => handleChange("keyword", e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={data.start_date}
            onChange={(e) => handleChange("start_date", e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={data.end_date}
            onChange={(e) => handleChange("end_date", e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          />

          <select
            value={data.per_page}
            onChange={(e) => handleChange("per_page", e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-xl overflow-hidden">
          {stocks.data.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p className="mb-4">No stock records found.</p>

              <Link
                href={route("stock.create")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <PlusIcon className="w-4 h-4" />
                Add Stock
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Added By</th>
                  <th className="px-4 py-3">Date Added</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {stocks.data.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {stock.item_name}
                    </td>
                    <td className="px-4 py-3">{stock.quantity}</td>
                    <td className="px-4 py-3">
                      ₦{Number(stock.price).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{stock.added_by}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {stock.created_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {stocks.links.length > 1 && (
          <div className="flex justify-end gap-2">
            {stocks.links.map((link, index) => (
              <Link
                key={index}
                href={link.url || ""}
                preserveState
                className={`px-3 py-1 rounded text-sm ${
                  link.active
                    ? "bg-indigo-600 text-white"
                    : "border hover:bg-gray-100"
                } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
