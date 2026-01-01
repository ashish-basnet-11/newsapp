"use client";


import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")

        try {

            const response = await api.post("/auth/register", {name, email, password});

            if(response.data.status === "success") {
                router.push("/login");
                router.refresh();
            }

        } catch (error) {
            setError("Sign Up failed. Please check your credentials.");
        }
    }

    return (
        <div>
            <div>Register page</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter your name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />

                    <input type="email" placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                    <input type="password" placeholder='Enter your password' 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default page