import type { Request, Response } from "express";
import { Article } from "../Entities/Article.js";
import AppDataSource from "../config/db.js";
import { Comment } from "../Entities/Comment.js";


export const commentArticle = async (req: Request, res: Response) => {
    try {

        const { articleId } = req.params;

        const userId = (req as any).user.id;

        const { message } = req.body;


        const article = await Article.findOneBy({
            id: Number(articleId)
        })

        if (!article) {
            res.status(404).json({ error: "Article doesn't exist" })
        }

        const commentRepo = AppDataSource.getRepository(Comment);


        const newComment = commentRepo.create({
            message,
            user: { id: userId },
            article: { id: Number(articleId) }
        })

        await commentRepo.save(newComment)

        return res.status(201).json({
            status: "success",
            data: {
                authorId: { id: userId },
                comment: newComment.message
            }
        })


    } catch (error) {
        res.status(400).json({ error: "Error creating a comment" })
    }
}

export const getAllComments = async (req: Request, res: Response) => {
    const comments = await Comment.find({
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
        data: {
            comments: comments.map(comment => ({
                userName: { name: (comment.user as any).name },
                comment: comment.message,
                Articletitle: (comment.article as any)?.title
            })),
            count: comments.length
        }
    })
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { id: userId, role: userRole } = (req as any).user;

        const commentRepo = AppDataSource.getRepository(Comment);

        const comment = await Comment.findOne({
            where: { id: Number(id) }, relations: ['user']
        })

        if (!comment) {
            return res.status(404).json({ error: "Comment doesn't exist" })
        }

        const isOwner = comment.user.id === userId;
        const isAdmin = userRole === "admin"

        if (isOwner || isAdmin) {
            await commentRepo.remove(comment)
            return res.json({ message: "Comment deleted successfully" });

        } else {
            return res.status(403).json({ error: "You are not authorized to delete this article" })

        }
    } catch (error) {
        return res.status(400).json({error: "Error deleting a comment"})
    }

}   