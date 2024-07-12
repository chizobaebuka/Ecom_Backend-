"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI || "mongodb+srv://martinfresh8:Qwertyuiop!23@ecombackend0.blixun6.mongodb.net/ecommerce-inventory",
    jwt_secret: process.env.JWT_SECRET || "secret-key"
};
