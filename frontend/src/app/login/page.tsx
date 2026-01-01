"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import api from "@/lib/api";

const page = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")

        try {
            const response = await api.post("/auth/login", { email, password });

            if (response.data.status === "success") {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
    }

    return (
        <div>
            <div>Login</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Enter your email'  
                    required/>
                    <input type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password' 
                    required/>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default page