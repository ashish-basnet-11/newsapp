// components/CommentSection.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
    id: number;
    message: string;
    createdAt: string;
    user: { name: string };
}

export default function CommentSection({
    articleId,
    initialComments
}: {
    articleId: string,
    initialComments: Comment[]
}) {
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Frontend CommentSection.tsx
    const handlePostComment = async () => {
        try {
            // If articleId is 11, this hits: http://localhost:5001/api/comments/11
            const res = await api.post(`/comments/${articleId}`, { message: content });

            if (res.status === 201) {
                setContent("");
                router.refresh();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mt-12 space-y-8">
            <h3 className="text-2xl font-bold">Comments ({initialComments.length})</h3>

            {/* Input Area */}
            {user ? (
                <div className="space-y-4">
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <Button onClick={handlePostComment}>Post Comment</Button>
                </div>
            ) : (
                <div className="p-6 border-2 border-dashed rounded-lg text-center">
                    <p className="mb-4 text-muted-foreground">Join the discussion</p>
                    <Button onClick={() => router.push("/login")}>
                        Login to Comment
                    </Button>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {initialComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 p-4 border rounded-lg">
                        <Avatar>
                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">{comment.user.name}</span>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed">{comment.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}