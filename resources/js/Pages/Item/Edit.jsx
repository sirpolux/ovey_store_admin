import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import AdminDashboard from "../AdminDashboard";
import { UploadCloud, ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Edit({ item }) {
    const { cloudinary } = usePage().props;
    const cloudName = cloudinary.cloudName;

    const [imagePreview, setImagePreview] = useState(item.data.image_url);

    const { data, setData, put, errors } = useForm({
        author: item.data.author || "",
        title: item.data.title || "",
        price: item.data.price || "",
        description: item.data.description || "",
        image: item.data.image_url || "",
        format: item.data.format || "Hard Copy",
        published_date: item.data.published_date || "",
        publisher: item.data.publisher || "",
        language: item.data.language || "English",
        category: item.data.category || "",
        chapters: item.data.chapters || "",
        keywords: item.data.keywords || "",
        pages: item.data.pages || "",
        summary: item.data.summary || "",
        edition: item.data.edition || "",
        status: item.data.status || "",
        // stock: item.data.stock || "",
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ave_mater");

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );
            const url = res.data.secure_url;
            setData("image", url);
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
            toast.error("Image upload failed. Try again.");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        put(route("item.update", item.data.id), {
            data,
            onSuccess: () => {
                toast.success("Item successfully updated!");
            },
            onError: () => {
                toast.error("Failed to update item. Please check input.");
            },
        });
    };

    return (
        <AdminDashboard>
            <Head title="Edit Item" />

            <div className="p-4 md:p-8">
                <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 md:p-10 overflow-auto max-h-[90vh]">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href={route("item.index")}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Edit Inventory Item
                        </h2>
                    </div>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Author */}
                            <div>
                                <InputLabel htmlFor="author" value="Author *" />
                                <TextInput
                                    name="author"
                                    value={data.author}
                                    onChange={(e) => setData("author", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.author} />
                            </div>

                            {/* Title */}
                            <div>
                                <InputLabel htmlFor="title" value="Title *" />
                                <TextInput
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* ISBN
                            <div>
                                <InputLabel htmlFor="isbn" value="ISBN *" />
                                <TextInput
                                    name="isbn"
                                    value={data.isbn}
                                    onChange={(e) => setData("isbn", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.isbn} />
                            </div> */}

                            {/* Edition */}
                            <div>
                                <InputLabel htmlFor="edition" value="Edition" />
                                <TextInput
                                    name="edition"
                                    value={data.edition}
                                    onChange={(e) => setData("edition", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.edition} />
                            </div>

                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price *" />
                                <TextInput
                                    type="number"
                                    name="price"
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.price} />
                            </div>

                            {/* Stock */}
                            {/* <div>
                                <InputLabel htmlFor="stock" value="Stock *" />
                                <TextInput
                                    type="number"
                                    name="stock"
                                    value={data.stock}
                                    onChange={(e) => setData("stock", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.stock} />
                            </div> */}

                            {/* Publisher */}
                            <div>
                                <InputLabel htmlFor="publisher" value="Publisher" />
                                <TextInput
                                    name="publisher"
                                    value={data.publisher}
                                    onChange={(e) => setData("publisher", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.publisher} />
                            </div>

                            {/* Published Date */}
                            <div>
                                <InputLabel htmlFor="published_date" value="Published Date" />
                                <TextInput
                                    type="date"
                                    name="published_date"
                                    value={data.published_date}
                                    onChange={(e) => setData("published_date", e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.published_date} />
                            </div>

                            {/* Language */}
                            <div>
                                <InputLabel htmlFor="language" value="Language" />
                                <SelectInput
                                    name="language"
                                    value={data.language}
                                    onChange={(e) => setData("language", e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="English">English</option>
                                    <option value="Igbo">Igbo</option>
                                    <option value="Yoruba">Yoruba</option>
                                    <option value="Hausa">Hausa</option>
                                    <option value="French">French</option>
                                    <option value="Greek">Greek</option>
                                </SelectInput>
                                <InputError message={errors.language} />
                            </div>

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                    <option value="Reserved">Reserved</option>
                                </SelectInput>
                                <InputError message={errors.status} />
                            </div>

                            {/* Format */}
                            <div>
                                <InputLabel htmlFor="format" value="Format" />
                                <SelectInput
                                    name="format"
                                    value={data.format}
                                    onChange={(e) => setData("format", e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="Hard Copy">Hard Copy</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="MOBI">MOBI</option>
                                </SelectInput>
                                <InputError message={errors.format} />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <div className="mt-1 flex items-center gap-4">
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition">
                                        <UploadCloud className="w-4 h-4 mr-2" />
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-16 w-16 object-cover rounded-md border"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <TextAreaInput
                                name="description"
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Summary */}
                        <div>
                            <InputLabel htmlFor="summary" value="Summary" />
                            <TextAreaInput
                                name="summary"
                                rows={6}
                                value={data.summary}
                                onChange={(e) => setData("summary", e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.summary} />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm transition-all"
                            >
                                Update Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminDashboard>
    );
}
