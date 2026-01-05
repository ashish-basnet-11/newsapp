import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import LikeButton from "../LikeButton";
import { cookies } from "next/headers";
import CommentSection from "../commentSection";

async function getArticle(id: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Get cookies from the browser's request to Next.js
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      cache: 'no-store',
      headers: {
        // Forward the cookies to your Express backend
        "Cookie": cookieHeader,
      }
    });

    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
export default async function ArticleDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Header Info */}
      <div className="space-y-4 text-center mb-10">
        <Badge variant="outline" className="capitalize">
          {article.category || "General"}
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {article.author?.name || "Anonymous"}
          </span>
          <span>•</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 mb-10 border">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed">
          {article.content}
        </div>
        <div className="mt-12 pt-6 border-t">
          <div className="flex items-center justify-center mb-8">
            <LikeButton
              articleId={id}
              initialLikes={article.likesCount || 0}
              isInitiallyLiked={article.isLikedByMe || false}
            />
          </div>

          <CommentSection
            articleId={id}
            initialComments={article.comments || []}
          />
        </div>
      </div>
    </article>
  );
}