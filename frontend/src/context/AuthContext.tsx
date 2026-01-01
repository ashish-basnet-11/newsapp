"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

interface User {
    id: number,
    name: string,
    email: string,
    role: string
}

interface AuthContextType {
    user: User | null,
    loading: boolean,
    checkAuth: () => Promise<void>
    logout: () => Promise<void>
    login: (userData: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)

    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {

            const response = await api.get("/auth/me");

            if (response.data.status === "success") {
                setUser(response.data.user)
            }

        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null)
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    const login = (userData: User) => {
        setUser(userData);
    };

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, checkAuth, logout, login }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};