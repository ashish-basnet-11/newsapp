import type { Request, Response } from "express";
import { Article } from "../Entities/Article.js";
import AppDataSource from "../config/db.js";
import { User } from "../Entities/User.js";
import { Comment } from "../Entities/Comment.js";

import { subDays, format } from "date-fns";


export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const userRepo = AppDataSource.getRepository(User);
        const commentRepo = AppDataSource.getRepository(Comment);

        // Promise.all runs these concurrently, saving time
        const [totalArticles, totalUsers, totalComments] = await Promise.all([
            articleRepo.count(),
            userRepo.count(),
            commentRepo.count()
        ]);

        return res.status(200).json({
            status: "success",
            data: {
                totalArticles,
                totalUsers,
                totalComments,
                engagementRate: totalArticles > 0
                    ? ((totalComments / totalArticles) * 1).toFixed(1) + "%"
                    : "0%"
            }
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ status: "error", message: "Failed to fetch dashboard stats" });
    }
};

export const getGrowthStats = async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const userRepo = AppDataSource.getRepository(User);

        const startDate = subDays(new Date(), 90);

        const articles = await articleRepo
            .createQueryBuilder("a")
            .select('a."createdAt"::DATE', "date")
            .addSelect("COUNT(*)", "count")
            .where('a."createdAt" >= :startDate', { startDate })
            .groupBy('a."createdAt"::DATE')
            .getRawMany();

        const users = await userRepo
            .createQueryBuilder("u")
            .select('u."createdAt"::DATE', "date")
            .addSelect("COUNT(*)", "count")
            .where('u."createdAt" >= :startDate', { startDate })
            .groupBy('u."createdAt"::DATE')
            .getRawMany();

        const chartMap: Record<string, { date: string; articles: number; users: number }> = {};

        for (let i = 0; i <= 90; i++) {
            const d = format(subDays(new Date(), i), "yyyy-MM-dd");
            chartMap[d] = { date: d, articles: 0, users: 0 };
        }

        articles.forEach((a) => {
            const d = format(new Date(a.date), "yyyy-MM-dd");
            if (chartMap[d]) chartMap[d].articles = Number(a.count);
        });

        users.forEach((u) => {
            const d = format(new Date(u.date), "yyyy-MM-dd");
            if (chartMap[d]) chartMap[d].users = Number(u.count);
        });

        const sortedData = Object.values(chartMap).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return res.json({ status: "success", data: sortedData });
    } catch (error) {
        console.error("DETAILED GROWTH STATS ERROR:", error);
        return res.status(500).json({ status: "error", message: "Error fetching growth stats" });
    }
};