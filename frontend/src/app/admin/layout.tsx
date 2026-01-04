"use client";


import { RoleGuard } from "@/components/guards/RoleGuard";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
                    <span className="font-bold uppercase tracking-widest text-sm">Admin Control Center</span>
                    <div className="flex gap-6 text-sm">
                        <Link href="/admin" className="hover:text-blue-400">Stats</Link>
                        <Link href="/admin/create" className="hover:text-blue-400">New Article</Link>
                        <Link href="/" className="text-gray-400 hover:text-white">Exit to Site</Link>
                    </div>
                </nav> */}

                <main className="p-8 flex-1">
                    {children}
                </main>
            </div>
        </RoleGuard>
    );
}