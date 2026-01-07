import type { Request, Response } from "express";
import { Article } from "../Entities/Article.js";
import { Like } from "../Entities/Like.js";

export const toggleLike = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const userId = req.user?.id; // Ensure your 'protect' middleware sets this

        const article = await Article.findOneBy({ id: Number(articleId) });
        if (!article) {
            return res.status(404).json({ error: "Article doesn't exist" });
        }

        const existingLike = await Like.findOne({
            where: {
                user: { id: Number(userId) },
                article: { id: Number(articleId) }
            }
        });

        if (existingLike) {
            await existingLike.remove();
            return res.json({ status: "success", message: "Unliked", isLiked: false });
        } else {
            const newLike = Like.create({
                user: { id: Number(userId) },
                article: { id: Number(articleId) }
            });
            await newLike.save();
            return res.status(201).json({ status: "success", message: "Liked", isLiked: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getLikeStatus = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.json({ isLiked: false });
        }

        const existingLike = await Like.findOne({
            where: {
                user: { id: Number(userId) },
                article: { id: Number(articleId) }
            }
        });

        return res.json({ isLiked: !!existingLike });
    } catch (error) {
        return res.status(500).json({ error: "Error checking status" });
    }
};

export const getAllLikes = async (req: Request, res: Response) => {
    const { articleId } = req.params;

    const likes = await Like.find({
        where: { article: { id: Number(articleId) } }, // FILTERED!
        relations: ["user"],
        order: { id: "DESC" }
    });

    res.json({
        status: "Success",
        data: {
            likes: likes.map(like => ({
                userName: (like.user as any).name,
            })),
            count: likes.length
        }
    });
};