"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.createProduct);
router.get('/', product_controller_1.ProductController.getAllProducts);
router.get('/:productId', authMiddleware_1.authMiddleware, product_controller_1.ProductController.getSingleProduct);
router.put('/:productId', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.updateProduct);
router.delete('/:productId', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
