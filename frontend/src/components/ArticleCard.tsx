interface ArticleProps {
  article: {
    id: number;
    title: string;
    content: string;
    author: { name: string };
    likes: { userId: number; userName: string }[];
    comments: { id: number; message: string; userName: string }[]; // Updated here
  };
}
export default function ArticleCard({ article }: ArticleProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Show Author instead of Date */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
          {article.author.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {article.author.name}
        </span>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
        {article.title}
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
        {article.content}
      </p>

      <div className="pt-4 border-t border-gray-100 mt-auto flex justify-between items-center">
        <button className="text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors">
          Read More →
        </button>
        
        {/* Simple Like Counter Placeholder */}
        <span className="text-gray-400 text-xs">
          {article.likes?.length || 0} Likes
        </span>
      </div>
    </div>
  );
}