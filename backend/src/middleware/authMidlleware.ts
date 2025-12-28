import jwt from "jsonwebtoken"

export const protect = async (req: any, res: any, next: any) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "No token, please login" });
    }

    const JWT_SECRET = process.env.JWT_SECRET_KEY;

    try {

        const decoded = jwt.verify(token, JWT_SECRET!) as any


        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }

}

export const authorize = (...allowedRoles: string[]) => {
    return (req: any, res: any, next: any) => {

        if (!req.user) {
            return res.status(401).json({ error: "Not authorized" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: `Role (${req.user.role}) is not allowed to access this resource` 
            });
        }

        next();
    };
};
