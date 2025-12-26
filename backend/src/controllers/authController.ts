import type { Request, Response } from "express";
import AppDataSource from "../config/db.js";
import { User } from "../Entities/User.js";
import bcrypt from "bcrypt";
import { json } from "node:stream/consumers";


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

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

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = AppDataSource.getRepository(User);

    //check if the user exists

    const user = await data.findOneBy({ email });

    if (!user) {
        return res.status(400).json({ error: "Invalid email or password" })
    }

    // verify password

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" })

    }

    res.status(201).json({
        status: "success",
        data: {
            user: user.id,
            name: user.name,
            email: user.email
        }
    })

}