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
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(401).json({ error: "Error logging in" })
    }
};