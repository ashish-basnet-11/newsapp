import type { Request, Response } from "express";
import AppDataSource from "../config/db.js";
import { User } from "../Entities/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import z from "zod";


export const register = async (req: Request, res: Response) => {
    try {

        const validatedData = registerSchema.parse(req.body)
        const { name, email, password } = validatedData;

        const data = AppDataSource.getRepository(User);

        //check if the user exists

        const userExists = await data.findOneBy({ email })

        if (userExists) {
            return res.status(400).json({ error: "User already exists with the email" })
        }

        //hashed password

        const hashedPasswords = await bcrypt.hash(password, 10)

        const newUser = data.create({ name, email, password: hashedPasswords });

        // saving the user

        await data.save(newUser)

        const token = generateToken(res, newUser.id, newUser.role)

        //  Send response 
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error });
        }
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const validatedData = loginSchema.parse(req.body)
        const { email, password } = validatedData

        const UserRepo = AppDataSource.getRepository(User);

        const user = await UserRepo.findOne({
            where: { email },
            select: ["id", "name", "email", "password", "role"]
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = generateToken(res, user.id, user.role);

        res.status(200).json({
            status: "success",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        return res.status(401).json({ error: "Error logging in" })
    }
};

export const logout = async (req: Request, res: Response) => {
    try {

        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal server error during logout" });
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await User.findOne({
            where: { id: userId },
            select: ["id", "name", "email", "role"]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            status: "success",
            user
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const UserRepo = AppDataSource.getRepository(User)

        const users = await UserRepo.find({
            select: ["id", "name", "email", "role"],
            // order: {
            //     createdAt: "DESC"
            // }
        })

        return res.status(200).json({
            status: "success",
            results: users.length,
            data: users
        })

    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}