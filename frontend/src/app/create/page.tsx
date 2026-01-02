"use client"

import { RoleGuard } from "@/components/guards/RoleGuard"
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

const createArticle = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")
        setLoading(true)

        try {

            const response = await api.post("/articles", { title, content })

            if (response.data.status === "success" || response.status === 201) {
                router.push("/");
                router.refresh()
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "Article creation failed.")
            setLoading(false)
        }
    }

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div>
                <div>
                    Create a article
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your article title"
                            required />

                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your article content"
                            required />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </RoleGuard>
    )
}

export default createArticle