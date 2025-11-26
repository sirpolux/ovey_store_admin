import { Head, Link } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import Detail from "../Detail";
import { BiArrowBack } from "react-icons/bi";

export default function Details({ itemData }) {
  const item = itemData.data;

  return (
    <AdminDashboard>
      <Head title={`Item: ${item.title}`} />

      <div className="w-full min-h-screen  py-8 px-4 md:px-8">
        {/* Back Button */}
        <div className="">
          <Link
            href={route("item.index")}
            className="inline-flex items-center gap-2 text-brand-brown-dark  hover:text-white bg-white hover:bg-brand-brown-dark border border-brand-brown-dark px-4 py-2 rounded shadow transition"
          >
            <BiArrowBack className="text-lg" />
            Back to Items
          </Link>
        </div>

        <div className=" mx-auto bg-white rounded-lg  p-6">
          {/* Image */}
          {item.image_url && (
            <div className="w-full flex justify-center mb-6">
              <img
                src={item.image_url}
                alt={item.title}
                className="rounded max-h-[300px] object-contain shadow"
              />
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Detail label="Title" value={item.title} />
            <Detail label="Author" value={item.author} />
            <Detail label="Price" value={`₦${item.price}`} />
            <Detail label="ISBN" value={item.isbn} />
            <Detail label="Publisher" value={item.publisher} />
            <Detail label="Published Date" value={item.published_date} />
            <Detail label="Language" value={item.language} />
            <Detail label="Category" value={item.category} />
            <Detail label="Chapters" value={item.chapters} />
            <Detail label="Keywords" value={item.keywords} />
            <Detail label="Format" value={item.format} />
            <Detail label="Edition" value={item.edition} />
            <Detail label="Status" value={item.status} />
            <Detail label="Captured By" value={item.created_by.name} />
            <Detail label="Updated By" value={item.updated_by?.name || "-"} />
          </div>

          {/* Summary & Description */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
            <p className="mt-2 text-gray-700">{item.summary}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <p className="mt-2 text-gray-700">{item.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-end">
            <Link
              href={route("add.stock", item.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Add Stock
            </Link>
            <Link
              href={route("stock.edit", item.id)}
              className="bg-brand-red-light text-white px-4 py-2 rounded hover:bg-brand-red-dark transition"
            >
              Edit Item
            </Link>
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
}
