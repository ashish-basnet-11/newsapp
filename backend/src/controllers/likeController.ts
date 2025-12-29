import type { Request, Response } from "express";
import { Article } from "../Entities/Article.js";
import { Like } from "../Entities/Like.js";

export const toggleLike = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;

        const userId = (req as any).user.id

        const article = await Article.findOneBy({ id: Number(articleId) })

        if (!article) {
            return res.status(400).json({ error: "Article doesn't exist" })
        }

        const existingLike = await Like.findOneBy({ user: { id: userId }, article: { id: Number(articleId) } })

        if (existingLike) {
            await existingLike.remove();
            return res.json({ message: "Unliked article" });
        } else {
            const newLike = Like.create({
                user: { id: userId },
                article: { id: Number(articleId) }
            })

            await newLike.save();
            return res.status(201).json({ Success: "Article liked" })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllLikes = async (req: Request, res: Response) => {
    
    const likes = await Like.find({
        relations: {
            user: true,
            article: true
        },

        order: {
            id: "DESC"
        }
    })


    res.json({
        status: "Success",
        data : {
            likes: likes.map(like => ({
                userName: {name: (like.user as any).name},
            })),
            count: likes.length
        }
    })
}