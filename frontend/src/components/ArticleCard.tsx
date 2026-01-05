import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconArrowRight, IconCalendar } from "@tabler/icons-react";

const ArticleCard = ({ article }: { article: any }) => {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full bg-card">
      {/* Image Container with Zoom Effect */}
      <Link href={`/articles/${article.id}`} className="relative w-full h-52 overflow-hidden">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-secondary/30 text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">No Image Available</span>
          </div>
        )}
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant="outline" 
            className="rounded-full px-3 py-0 text-[10px] font-semibold uppercase tracking-tight bg-primary/5 text-primary border-primary/10"
          >
            {article.category || "General"}
          </Badge>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <IconCalendar className="size-3" />
            <span className="text-[11px] font-medium">
              {article.createdAt
                ? new Date(article.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
                : "Draft"}
            </span>
          </div>
        </div>
        <Link href={`/articles/${article.id}`}>
          <CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            {article.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="p-5 pt-2 flex flex-col flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
          {article.content}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative size-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20">
              {article.author?.image ? (
                <Image src={article.author.image} alt="Author" fill className="object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-primary">
                  {article.author?.name?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground leading-none">
                {article.author?.name || "Anonymous"}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">Staff Writer</span>
            </div>
          </div>

          <Link
            href={`/articles/${article.id}`}
            className="size-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
          >
            <IconArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;