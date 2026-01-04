"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get("/articles");

      if (response.data.status === "success") {
        const cleanArticles = response.data.data.filter((item: any) => item !== null);
        setArticles(cleanArticles);
      }
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 animate-pulse">Loading latest news...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Latest Articles
          </h1>
          <p className="text-gray-500 mt-1">Stay updated with the world today.</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchArticles}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Grid Section */}
      {error ? (
        <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-600 font-medium">Could not load articles. Please try again later.</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 italic">
          No articles found. Start publishing!
        </div>
      )}
    </div>
  );
};

export default HomePage;