"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export const Navbar = () => {
    const { user, logout, loading } = useAuth();

    return (
        <nav className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6">
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center">

                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">T</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">
                        The<span className="text-blue-600">Post</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Explore
                    </Link>

                    {loading && !user ? (
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg"></div>
                        </div>
                    ) : user ? (
                        <div className="flex items-center gap-6">
                            {user.role === "admin" && (
                                <Link href="/create" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                    Write Article
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
                                <button
                                    onClick={logout}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition-all shadow-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900">
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-100"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};