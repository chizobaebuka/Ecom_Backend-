import { NextFunction, Request, Response } from "express";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).decoded.role;
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access Denied, you are not an admin' });
    }
    next();
}