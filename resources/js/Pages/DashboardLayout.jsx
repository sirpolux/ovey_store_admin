import { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { MdDashboard, MdOutlineShoppingCart, MdOutlineInventory, MdSettings, MdEvent } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

import { GrTransaction } from "react-icons/gr";
import { AiOutlineStock } from "react-icons/ai";
import { RiLuggageCartLine } from "react-icons/ri";
import { icons, LogOut, MenuIcon } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import AuthenticatedLayoutPlain from "@/Layouts/AuthenticatedLayoutPlain";

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    
    const { auth } = usePage().props;
console.log(auth);
    const logout = () => router.post(route('logout'));

    const menuItems = [
        { label: 'Dashboard', link: 'dashboard', icon: <MdDashboard className="text-xl" /> },
        { label: 'Inventory', link: 'item.index', icon: <MdOutlineInventory className="text-xl" /> },
        { label: 'Stock', link: 'stock.index', icon: <AiOutlineStock className="text-xl" /> },
        { label: 'Cart', link: 'cart.index', icon: <MdOutlineShoppingCart className="text-xl" /> },
        { label: 'Order', link: 'order.index', icon: <RiLuggageCartLine className="text-xl" /> },
        { label: 'Transactions', link: 'transactions.index', icon: <GrTransaction className="text-xl" /> },
        { label: 'Users', link: 'user.index', icon: <FaUsers className="text-xl" /> },

        { label: 'Settings', link: 'settings.index', icon: <MdSettings className="text-xl" /> }

    ];

    return (
        <AuthenticatedLayoutPlain>
              <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
            <Head title="Admin Dashboard" />

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <div className="flex min-h-screen bg-gray-100 text-gray-900">
                {/* Sidebar */}
                <aside
                    className={`fixed z-40 md:static top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                >
                    <div className="flex flex-col h-full p-4 space-y-4">
                        <div className="text-center">
                            <img src="/img/logo_small.jpg" alt="Logo" className="mx-auto w-20" />
                            <h2 className="mt-4 font-bold text-lg">Ave Mater Ecclesiae!</h2>
                            <p className="text-sm italic">{auth.user.name}</p>
                        </div>

                        <nav className="flex-1 mt-6 space-y-2">
                            {menuItems.map(({ label, link, icon }) => (
                                <Link
                                    key={label}
                                    href={route(link)}
                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-[#714C30] hover:text-white transition"
                                >
                                    {icon}
                                    <span className="font-medium">{label}</span>
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={logout}
                            className="flex items-center gap-2 mt-auto text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Navbar */}
                    <header className="w-full bg-white p-4 border-b shadow-sm flex justify-between items-center  md:hidden">
                        <button onClick={toggleSidebar}>
                            <MenuIcon className="w-6 h-6 text-gray-700" />
                        </button>
                    </header>


                    {/* Page Content */}
                    <section className="p-4 md:p-6 overflow-y-auto flex-1">
                        <div className="bg-white shadow-lg rounded-lg p-6 h-[95vh] overflow-scroll">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        </AuthenticatedLayoutPlain>
    );
}
