import type { Request, Response } from "express";
import AppDataSource from "../config/db.js";
import { Article } from "../Entities/Article.js";
import { User } from "../Entities/User.js";


export const createArticle = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const authorId = (req as any).user.id;

    const data = AppDataSource.getRepository(Article);

    const userExists = await User.findOneBy({ id: authorId })

    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const article = data.create({ title, content, author: userExists })

    await data.save(article)

    return res.json(article)

}

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await Article.find({
            relations: {
                author: true,
                likes: true,
                comments: true,
            },
            order: {
                id: "DESC"
            }
        })

        if (!articles) {
            return res.status(400).json("No articles found")
        }

        const articleData = articles.map(article => ({
            id: article.id,
            title: article.title,
            content: article.content,
            author: article.author,
            likesCount: article.likes.length,
            commentsCount: article.comments.length,

        }))

        return res.json(articleData)
    } catch (error) {
        res.status(401).json({ error: "Error fetching all the articles" })
    }
}

export const getArticleById = async (req: Request, res: Response) => {
    try {

        const { articleId } = req.params;

        const article = await Article.findOne({
            where: { id: Number(articleId) },
            relations: {
                author: true,
                likes: true,
                comments: true,
            },
        });

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        return res.status(201).json({
            status: "success",
            data: {
                ...article,
                likes: article.likes.length,
                Comments: article.comments.length
            }
        })

    } catch (error) {
        res.status(400).json({ error: "Error fetching the articles" })

    }
}


export const deleteArticle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { id: userId, role: userRole } = (req as any).user;

    const articleRepo = AppDataSource.getRepository(Article);

    const article = await Article.findOne({
        where: { id: Number(id) }, relations: ['author']
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
