import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect(config.mongodb_uri as string);
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
        console.log('Mongodb is connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

main();