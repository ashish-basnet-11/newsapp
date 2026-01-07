import type { Request, Response } from "express";
import AppDataSource from "../config/db.js";
import { Article } from "../Entities/Article.js";
import { User } from "../Entities/User.js";
import { Like, type FindOptionsWhere } from "typeorm";


export const createArticle = async (req: Request, res: Response) => {
    try {
        const { title, content, category } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        const authorId = req.user?.id;

        const articleRepository = AppDataSource.getRepository(Article);

        const userExists = await User.findOne({ where: { id: Number(authorId) } });

        if (!userExists) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        const article = articleRepository.create({
            title,
            content,
            author: userExists,
            imageUrl,
            category: category || "General",
        });

        await articleRepository.save(article);

        return res.status(201).json({
            status: "success",
            data: article
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;

        let whereClause: FindOptionsWhere<Article> = {};

        if (category) {

            whereClause.category = category as Article['category'];
        }

        const articles = await Article.find({
            where: whereClause,
            relations: ["author", "likes", "likes.user", "comments", "comments.user"],
            order: { createdAt: "DESC" }
        });;

        const articleData = articles.map(article => ({
            id: article.id,
            title: article.title,
            content: article.content,
            imageUrl: article.imageUrl,
            createdAt: article.createdAt,
            category: article.category,
            author: {
                id: article.author?.id,
                name: article.author?.name || "Anonymous"
            },
            likes: article.likes?.map(like => ({
                userId: like.user?.id,
                userName: like.user?.name
            })) || [],
            comments: article.comments?.map((comment: any) => ({
                id: comment.id,
                message: comment.message,
                userName: comment.user?.name || "Anonymous",
                createdAt: comment.createdAt
            })) || []
        }));

        return res.json({
            status: "success",
            data: articleData
        });
    } catch (error) {
        console.error("Fetch Articles Error:", error);
        res.status(500).json({ status: "error", message: "Error fetching articles" });
    }
}

export const getArticleById = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const userId = req.user?.id;

        const article = await Article.findOne({
            where: { id: Number(articleId) },
            relations: ["author", "likes", "likes.user", "comments", "comments.user"],
        });

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        const isLikedByMe = article.likes.some(like => like.user?.id === Number(userId));

        return res.status(200).json({
            status: "success",
            data: {
                ...article,
                isLikedByMe: isLikedByMe, 
                likesCount: article.likes.length,
                commentsCount: article.comments.length
            }
        });
    } catch (error) {
        res.status(400).json({ error: "Error fetching the article" });
    }
}

export const updateArticles = async (req: Request, res: Response) => {

    try {
        const { articleId } = req.params;
        const { title, content } = req.body;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        const existingArticle = await Article.findOne({
            where: { id: Number(articleId) },
            relations: {
                author: true,
            },
        });


        if (!existingArticle) {
            return res.status(404).json({
                error: "Article doesn't exist"
            })
        }

        if (existingArticle.author.id !== userId && userRole !== "admin") {
            return res.status(403).json({
                error: "You don't have permission to update this post"
            });
        }

        existingArticle.title = title;
        existingArticle.content = content;

        await existingArticle.save();

        res.status(200).json({
            message: "Article updated successfully",
            article: existingArticle
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

export const deleteArticle = async (req: Request, res: Response) => {
    const { articleId } = req.params;

    const { id: userId, role: userRole } = (req as any).user;

    const articleRepo = AppDataSource.getRepository(Article);

    const article = await Article.findOne({
        where: { id: Number(articleId) }, relations: ['author']
    })

    if (!article) {
        return res.status(404).json({ error: "Article doesn't exist" })
    }

    const isOwner = article.author.id === userId;

    const isAdmin = userRole === "admin"

    if (isAdmin || isOwner) {
        await articleRepo.remove(article);
        return res.json({ message: "Article deleted successfully" });
    }

    return res.status(403).json({ error: "You are not authorized to delete this article" })
}
