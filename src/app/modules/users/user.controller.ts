import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../../config";
import { userServices } from "./user.services";

const JWT_SECRET = config.jwt_secret;

const registerUser = async(req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await userServices.findUserByEmail(email)
        if(existingUser) {
            res.status(409).json({
                success: false,
                message: "Email already exists"
            });
            return;
        }

        const userRole = role || 'user'
        const newUser = await userServices.createUser(email, password, role);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "User registration failed",
            error: err
        });
    }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    try {
        const user = await userServices.findUserByEmail(email);
        if(!user) {
            res.status(400).send({ message: 'Invalid email or password' });
            return;
        }

        const isValidPassword = await userServices.validatePassword(password, user.password)

        if(!isValidPassword) {
            res.status(400).send({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign({email: user?.email, role: user.role}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).send({ message: 'User logged in successfully', token });

    } catch (error) {
        res.status(500).send({ message: 'User resgistration failed!', error });
    }
}

export const userController = {
    registerUser,
    loginUser
}