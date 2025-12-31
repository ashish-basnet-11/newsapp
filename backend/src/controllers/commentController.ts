import type { Request, Response } from "express";
import { Article } from "../Entities/Article.js";
import AppDataSource from "../config/db.js";
import { Comment } from "../Entities/Comment.js";


export const commentArticle = async (req: Request, res: Response) => {
    try {

        const { articleId } = req.params;

        const userId = req.user?.id

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
            user: { id: Number(userId) },
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
    try {
        const comments = await Comment.find({
            relations: {
                user: true,
                article: true
            },
            order: {
                id: "DESC"
            }
        });

        return res.json({
            status: "Success",
            count: comments.length,
            data: comments.map(comment => ({
                id: comment.id,
                user: {
                    id: comment.user.id,
                    name: comment.user.name
                },
                message: comment.message,
                articleTitle: comment.article?.title || "Deleted Article"
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching comments" });
    }
}

export const updateComment = async (req: Request, res: Response) => {

    try {
        const { commentId } = req.params;
        const { message } = req.body;
        const userId = req.user?.id;

        const commentExists = await Comment.findOne({
            where: { id: Number(commentId) },
            relations: {
                user: true
            }
        })

        if (!commentExists) {
            return res.status(400).json({ error: "comment doesn't exist" })
        }

        if (commentExists.user.id !== userId) {
            return res.status(403).json({
                error: "You don't have permission to update this post"
            });
        }


        commentExists.message = message;

        await commentExists.save();

        res.status(200).json({
            message: "Comment updated successfully",
            article: commentExists
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }

}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;

        // const { id: userId, role: userRole } = (req as any).user;

        const userId = req.user?.id;
        const userRole = req.user?.role

        const commentRepo = AppDataSource.getRepository(Comment);

        const comment = await Comment.findOne({
            where: { id: Number(commentId) }, relations: ['user']
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
        return res.status(400).json({ error: "Error deleting a comment" })
    }

}