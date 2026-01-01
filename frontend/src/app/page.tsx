"use client";

import ArticleCard from "@/components/ArticleCard";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const page = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {

    const fetchArticles = async () => {

      try {

        const response = await api.get("/articles")

        if (response.data.status === "success" || response.status === 200) {
          setArticles(response.data.data)
        }
      } catch (error) {

        console.error("Failed to fetch articles");

      } finally {
        setLoading(false);
      }
    }

    fetchArticles();

  }, [])

  const handleLogout = async () => {
    try {

      await api.post("/auth/logout");

      router.push("/login");

      router.refresh();

    } catch (err) {
      console.error("Logout failed");
    }
  }

  if (loading) return <div className="p-10 text-center">Loading news feed...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Latest Articles</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {articles?.length > 0 ? (
          articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="text-gray-500">No articles available yet.</p>
        )}
      </div>
    </div>
  );
}

export default page