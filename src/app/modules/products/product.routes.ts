import express from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { adminMiddleware } from '../../middleware/adminMiddleware';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, ProductController.createProduct);
router.get('/',  ProductController.getAllProducts);
router.get('/:productId', authMiddleware, ProductController.getSingleProduct);
router.put('/:productId', authMiddleware, adminMiddleware, ProductController.updateProduct);
router.delete('/:productId', authMiddleware, adminMiddleware, ProductController.deleteProduct);

export const ProductRoutes = router;