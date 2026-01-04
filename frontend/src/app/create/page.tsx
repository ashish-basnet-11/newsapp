"use client";

import { useState, useRef } from "react"; // Added useRef
import { useRouter } from "next/navigation";
import { RoleGuard } from "@/components/guards/RoleGuard";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PenLine, ImageIcon, X } from "lucide-react"; // Added Icons
import { toast } from "sonner";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null); // New state for file
    const [preview, setPreview] = useState<string | null>(null); // New state for preview
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle image selection and create preview URL
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Create local URL for preview
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // IMPORTANT: Use FormData for file uploads
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (image) {
                formData.append("image", image); // Name must match upload.single('image')
            }

            const response = await api.post("/articles", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.status === "success") {
                toast.success("Article published successfully!");
                router.push("/");
                router.refresh();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <PenLine className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Story</h1>
                            <p className="text-gray-500 text-sm">Draft and publish your latest news article.</p>
                        </div>
                    </div>

                    <Card className="border-none shadow-xl shadow-blue-900/5">
                        <CardHeader>
                            <CardTitle>Article Details</CardTitle>
                            <CardDescription>
                                Give your article a compelling title, cover image, and content.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Image Upload Field */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Cover Image</Label>
                                    
                                    {preview ? (
                                        <div className="relative group rounded-lg overflow-hidden border-2 border-dashed border-gray-200 aspect-video">
                                            <img 
                                                src={preview} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover" 
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg py-12 cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload a header image</p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                                        </div>
                                    )}
                                    <Input 
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-semibold">Headline</Label>
                                    <Input 
                                        id="title"
                                        placeholder="e.g., Breaking: Major Tech Breakthrough in 2026"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="focus-visible:ring-blue-600 py-6 text-lg font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-sm font-semibold">Content Body</Label>
                                    <Textarea 
                                        id="content"
                                        placeholder="Tell your story here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="min-h-[300px] focus-visible:ring-blue-600 resize-none leading-relaxed"
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-4 pt-4 border-t">
                                    <Button type="button" variant="ghost" onClick={() => router.back()}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="text-white bg-blue-600 hover:bg-blue-800 px-8" 
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Publishing...
                                            </>
                                        ) : (
                                            "Publish Article"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </RoleGuard>
    );
};

export default CreateArticle;