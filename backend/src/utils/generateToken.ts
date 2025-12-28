import jwt from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

const generateToken = (userId: number): string => {
   return jwt.sign({id: userId}, 
    JWT_SECRET, 
    {expiresIn: "7d"})
} 

export default generateToken;