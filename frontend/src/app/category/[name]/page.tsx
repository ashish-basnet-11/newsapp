"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import { Loader2 } from "lucide-react";

export default function CategoryPage() {
    const params = useParams();
    const categoryName = params.name as string;

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryArticles = async () => {
            try {
                setLoading(true);

                const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

                const response = await api.get(`/articles?category=${formattedCategory}`);

                if (response.data.status === "success") {
                    setArticles(response.data.data);
                }
            }
            catch (error) {
                console.error("Error fetching category articles:", error);
            } finally {
                setLoading(false);
            }
        };

        if (categoryName) fetchCategoryArticles();
    }, [categoryName]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold capitalize mb-2">{categoryName}</h1>
                <div className="h-1 w-20 bg-blue-600 rounded"></div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
            ) : articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article: any) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
                    <p className="text-gray-500 text-lg">No articles found in {categoryName}.</p>
                </div>
            )}
        </div>
    );
}