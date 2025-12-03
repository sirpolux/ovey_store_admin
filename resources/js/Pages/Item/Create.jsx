import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Head, useForm, usePage } from "@inertiajs/react";
import { UploadCloud, Boxes } from 'lucide-react';
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DashboardLayout from "../DashboardLayout";

export default function Create({ response = null }) {
    const { cloudinary } = usePage().props; // gets cloudName from Laravel
    const cloudName = cloudinary.cloudName;
    
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, errors, reset } = useForm({
        item_name: '',
        price: '',
        item_description: '',
        manufacturer: '',
        status: '',
    });

    const handleFileUpload = async (e) => {
        console.log("File upload triggered");
    
        const file = e.target.files[0];
        if (!file) {
            console.log("No file selected");
            return;
        }
    
        // Preview
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    
        // Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ave_mater"); // unsigned preset name in Cloudinary
    
        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );
            console.log("Cloudinary response:", res.data);
    
            const url = res.data.secure_url;
            setData("image", url); // ✅ only send URL to backend
        } catch (error) {
            console.error("Cloudinary upload failed:", error.response || error);
        }
    };


    const onSubmit = (e) => {
        e.preventDefault();
    
        post(route("item.store"), {
            data,
            onSuccess: () => {
                reset();
                toast.success("Item successfully added to inventory");
    
                // Optional: scroll to top or focus a ref
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            onError: (errors) => {
                toast.error("Failed to add item. Please check your input.");
                console.error(errors);
            },
        });
    };
    return (
        <DashboardLayout>
            <Head title="New Inventory Item" />
            <div className="p-4 md:p-8">
                <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 md:p-10 overflow-auto max-h-[90vh]">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Add New Inventory Item</h2>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Author */}
                            <div>
                                <InputLabel htmlFor="item_name" value="Item Name *" />
                                <TextInput name="item_name" value={data.item_name} onChange={e => setData('item_name', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.item_name} className="mt-1 text-red-600" />
                            </div>

                            {/* Title */}
                            <div>
                                <InputLabel htmlFor="manufacturer" value="Manufacturer *" />
                                <TextInput name="title" value={data.manufacturer} onChange={e => setData('manufacturer', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.manufacturer} className="mt-1 text-red-600" />
                            </div>

                            {/* ISBN */}
                            <div>
                                <InputLabel htmlFor="isbn" value="ISBN *" />
                                <TextInput name="isbn" value={data.isbn} onChange={e => setData('isbn', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.isbn} className="mt-1 text-red-600" />
                            </div>

                            {/* Edition */}
                            <div>
                                <InputLabel htmlFor="edition" value="Edition" />
                                <TextInput name="edition" value={data.edition} onChange={e => setData('edition', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.edition} className="mt-1 text-red-600" />
                            </div>

                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price *" />
                                <TextInput type="number" name="price" value={data.price} onChange={e => setData('price', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.price} className="mt-1 text-red-600" />
                            </div>

                            {/* Stock */}
                            <div>
                                <InputLabel htmlFor="stock" value="Stock *" />
                                <TextInput type="number" name="stock" value={data.stock} onChange={e => setData('stock', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.stock} className="mt-1 text-red-600" />
                            </div>

                            {/* Pages */}
                            <div>
                                <InputLabel htmlFor="pages" value="Pages" />
                                <TextInput name="pages" value={data.pages} onChange={e => setData('pages', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.pages} className="mt-1 text-red-600" />
                            </div>

                            {/* Chapters */}
                            <div>
                                <InputLabel htmlFor="chapters" value="Chapters" />
                                <TextInput name="chapters" value={data.chapters} onChange={e => setData('chapters', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.chapters} className="mt-1 text-red-600" />
                            </div>

                            {/* Publisher */}
                            <div>
                                <InputLabel htmlFor="publisher" value="Publisher" />
                                <TextInput name="publisher" value={data.publisher} onChange={e => setData('publisher', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.publisher} className="mt-1 text-red-600" />
                            </div>

                            {/* Published Date */}
                            <div>
                                <InputLabel htmlFor="published_date" value="Published Date" />
                                <TextInput type="date" name="published_date" value={data.published_date} onChange={e => setData('published_date', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.published_date} className="mt-1 text-red-600" />
                            </div>

                            {/* Language */}
                            <div>
                                <InputLabel htmlFor="language" value="Language" />
                                <SelectInput name="language" value={data.language} onChange={e => setData('language', e.target.value)} className="mt-1 block w-full">
                                    <option value="English">English</option>
                                    <option value="Igbo">Igbo</option>
                                    <option value="Yoruba">Yoruba</option>
                                    <option value="Hausa">Hausa</option>
                                    <option value="French">French</option>
                                    <option value="Greek">Greek</option>
                                </SelectInput>
                                <InputError message={errors.language} className="mt-1 text-red-600" />
                            </div>

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <SelectInput name="status" value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full">
                                    <option value="Available">Available</option>
                                    <option value="Not Available">Not Available</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-1 text-red-600" />
                            </div>

                            {/* Category */}
                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <TextInput name="category" value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 block w-full" />
                                <InputError message={errors.category} className="mt-1 text-red-600" />
                            </div>

                            {/* Format */}
                            <div>
                                <InputLabel htmlFor="format" value="Format" />
                                <SelectInput name="format" value={data.format} onChange={e => setData('format', e.target.value)} className="mt-1 block w-full">
                                    <option value="Hard Copy">Hard Copy</option>
                                    <option value="Electronic">Electronic</option>
                                </SelectInput>
                                <InputError message={errors.format} className="mt-1 text-red-600" />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <div className="mt-1 flex items-center gap-4">
                                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition">
                                        <UploadCloud className="w-4 h-4 mr-2" />
                                        Upload Image
                                        <input
                                            type="file"
                                            name="image"
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
                            <TextAreaInput name="description" rows={5} value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.description} className="mt-1 text-red-600" />
                        </div>

                        {/* Summary */}
                        <div>
                            <InputLabel htmlFor="summary" value="Summary" />
                            <TextAreaInput name="summary" rows={6} value={data.summary} onChange={e => setData('summary', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.summary} className="mt-1 text-red-600" />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-sm transition-all">
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
