import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ArticleCard = ({ article }: { article: any }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Article Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-xs italic">No cover image</span>
          </div>
        )}
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="capitalize text-[10px]">
            {article.category || "General"}
          </Badge>
          <span className="text-[10px] text-gray-400">
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
              : "No date"}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-lg leading-tight">
          {article.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0 mt-auto">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {article.content}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
            {article.author?.name?.charAt(0) || "A"}
          </div>
          <span className="text-xs font-medium text-gray-700">
            {article.author?.name || "Unknown Author"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;