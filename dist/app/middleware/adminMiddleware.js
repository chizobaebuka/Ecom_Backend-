"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    const userRole = req.decoded.role;
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access Denied, you are not an admin' });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
