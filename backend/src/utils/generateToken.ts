import jwt from 'jsonwebtoken';
import type { Response } from 'express'; 

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = (res: Response, userId: number, role: string) => {
  const token = jwt.sign({ id: userId, role: role }, JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export default generateToken;