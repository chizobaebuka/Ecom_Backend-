import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcryptjs';

const findUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
}

const createUser = async (email: string, password: string, role: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new UserModel({ email: email, password: hashedPassword, role: role });
    return await user.save();
}

const validatePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const userServices = {
    findUserByEmail,
    createUser, 
    validatePassword
}