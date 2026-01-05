"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const categories = [
    "Home", "General", "Sport", "Business", "Innovation", "Health",
    "Culture", "Arts", "Travel",
];

export const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const pathname = usePathname();

    return (
        <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
            {/* Top Row: Branding and Auth */}
            <div className="h-16 px-6">
                <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link href="/" className="flex justify-center items-center gap-2">
                        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                            <span className="text-white font-bold">T</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">
                            The<span className="text-gray-600">Post</span>
                        </span>
                    </Link>

                    {/* Navigation Actions */}
                    <div className="flex items-center gap-8">
                        {loading ? (
                            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg"></div>
                        ) : user ? (
                            <div className="flex items-center gap-6">
                                {user.role === "admin" && (
                                    <Link href="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <div className="h-6 w-px bg-gray-200"></div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-900 leading-none">{user.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                                            {user.role}
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={logout}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-4 py-2 transition"
                                    >
                                        Log Out
                                    </Button>

                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900">
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-md"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Row: BBC Style Category Links */}
            <div className="border-t border-gray-100 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex justify-center">
                    <ul className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                        {categories.map((cat) => {
                            const href = cat === "Home" ? "/" : `/category/${cat.toLowerCase()}`;
                            const isActive = pathname === href;

                            return (
                                <li key={cat} className="group relative">
                                    <Link
                                        href={href}
                                        className={`block py-3 text-sm font-bold whitespace-nowrap transition-colors ${isActive
                                            ? "text-gray-600"
                                            : "text-gray-800 hover:text-gray-600"
                                            }`}
                                    >
                                        {cat}
                                    </Link>

                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-black transition-transform origin-left ${isActive
                                        ? "scale-x-100"
                                        : "scale-x-0 group-hover:scale-x-100"
                                        }`} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </header>
    );
};