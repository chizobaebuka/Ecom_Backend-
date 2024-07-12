import jwt from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET = config.jwt_secret;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // get the token in this format Bearer token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token, access Denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token is not valid, access Denied' });
            return;
        }
        (req as any).decoded = decoded;
        next();
    });

}