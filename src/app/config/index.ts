import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI || "mongodb+srv://martinfresh8:Qwertyuiop!23@ecombackend0.blixun6.mongodb.net/ecommerce-inventory"
}