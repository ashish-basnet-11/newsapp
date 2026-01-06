"use client";

import { useState, useEffect } from "react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
import api from "@/lib/api"; 
import { toast } from "sonner";

// Updated Interface to include isInitiallyLiked
interface LikeButtonProps {
  articleId: string;
  initialLikes: number;
  isInitiallyLiked: boolean; // Add this
}

export default function LikeButton({ 
  articleId, 
  initialLikes,
  isInitiallyLiked // Destructure it here
}: LikeButtonProps) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(isInitiallyLiked); // Initialize with server data
  const router = useRouter();

  // 1. Keep state in sync if server props change (important for router.refresh)
  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(isInitiallyLiked);
  }, [initialLikes, isInitiallyLiked]);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/likes/${articleId}/status`);
        setIsLiked(res.data.isLiked);
      } catch (err) {
        console.error("Error checking like status", err);
      }
    };
    fetchLikedStatus();
  }, [user, articleId]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like articles!");
      return;
    }

    try {
      const res = await api.post(`/likes/${articleId}`);

      if (res.status === 200 || res.status === 201) {
        // Toggle local state for instant feedback
        const currentlyLiked = !isLiked;
        setIsLiked(currentlyLiked);
        setLikes(prev => currentlyLiked ? prev + 1 : prev - 1);
        
        // Refresh the server component data
        router.refresh(); 
      }
    } catch (error) {
      console.error("Like toggle failed", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        onClick={handleLike} 
        className="gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        {isLiked ? (
          <IconHeartFilled className="text-red-500 size-6" />
        ) : (
          <IconHeart className="size-6" />
        )}
        <span className={`text-lg font-semibold ${isLiked ? "text-red-600" : ""}`}>
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </span>
      </Button>
    </div>
  );
}