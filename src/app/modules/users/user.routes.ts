import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/create-account', userController.registerUser );
router.post('/login', userController.loginUser );



export const userRoutes = router;