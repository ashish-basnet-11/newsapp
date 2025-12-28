import type { Request, Response } from "express";
import AppDataSource from "../config/db.js";
import { Article } from "../Entities/Article.js";
import { User } from "../Entities/User.js";

export const createArticle = async (req: Request, res: Response) => {
    const {title, content, authorId} = req.body;

    const data = AppDataSource.getRepository(Article);

    const userExists = await User.findOneBy({id: authorId})

    if(!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    const article = data.create({title, content, author: userExists})

    await data.save(article)

    return res.json(article)

}

export const getAllArticles = async (req: Request, res: Response) => {
    const articles = await Article.find({
        relations: {
            author: true
        },
        order: {
            id: "DESC"
        }
    })

    if(!articles) {
        return res.json("No articles found")
    }

    return res.json(articles)
}