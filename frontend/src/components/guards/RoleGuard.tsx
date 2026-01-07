"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface RoleGuardProps {
    children: React.ReactNode,
    allowedRoles: string[],
}

export const RoleGuard = ({children, allowedRoles} : RoleGuardProps) => {
    const { user, loading} = useAuth();

    const router = useRouter();

    useEffect(() => {
        if(!loading) {
            if(!user || !allowedRoles.includes(user.role)) {
                router.push("/")
                toast.error("Unauthorized")
            }
        }
    }, [user, loading, router, allowedRoles])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if(user && allowedRoles.includes(user.role)) {
        return <>{children}</>
    }

    return null;
}