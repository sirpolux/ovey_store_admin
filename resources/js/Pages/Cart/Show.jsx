import React from 'react';
//import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart, ImageIcon, UserRound } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import Card from '@/Components/ui/Card';
import CardContent from '@/Components/ui/CardContent';
import AdminDashboard from '../AdminDashboard';

const CartShow = () => {
    const { cart } = usePage().props.cart.data;
    const { cart_id, total_cost, cart_item, user } = usePage().props.cart.data;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount);
    };

    const imageUrl = (path) => {
        return path.startsWith('project') ? `/storage/${path}` : path;
    };

    return (
        <AdminDashboard>
            <div className="p-4 max-w-6xl mx-auto ">
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/cart" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        Back
                    </Link>
                </div>

                <div className='max-h-[90vh] overflow-auto'>

                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    Cart Details
                                </h2>
                                <span className="text-sm text-gray-500">Cart ID: #{cart_id}</span>
                            </div>
                            <div className="mt-2">
                                <p><UserRound className="inline-block w-4 h-4 mr-1" /> <strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Total Cost:</strong> {formatCurrency(total_cost)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cart_item.map((entry, idx) => (
                            <Card key={idx}>
                                <CardContent className="p-3">
                                    <img
                                        src={imageUrl(entry.item.image_url)}
                                        alt={entry.item.title}
                                        className="w-full h-48 object-cover rounded mb-2"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder.jpg'; // fallback image
                                        }}
                                    />
                                    <h3 className="text-lg font-semibold">{entry.item.title}</h3>
                                    <p className="text-sm text-gray-700">Author: {entry.item.author}</p>
                                    <p className="text-sm text-gray-700">Publisher: {entry.item.publisher}</p>
                                    <p className="text-sm text-gray-700">Edition: {entry.item.edition}</p>
                                    <p className="text-sm text-gray-700">Format: {entry.item.format}</p>
                                    <p className="text-sm text-gray-700">Price: {formatCurrency(entry.item.price)}</p>
                                    <p className="text-sm text-gray-700">Quantity: {entry.quantity}</p>
                                    <p className="text-sm text-gray-700">Total: {formatCurrency(entry.total_cost)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AdminDashboard>

    );
};

export default CartShow;
