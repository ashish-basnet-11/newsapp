import api from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  let articles = [];
  let error = false;

  try {
    const response = await api.get("/articles");
    if (response.data.status === "success") {
      articles = response.data.data.filter((item: any) => item !== null);
    }
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    error = true;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Latest Articles
          </h1>
          <p className="text-gray-500 mt-1">Stay updated with the world today.</p>
        </div>
      </div>

      {error ? (
        <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-600 font-medium">Could not load articles.</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 italic">
          No articles found.
        </div>
      )}
    </div>
  );
}