import { User } from "./src/models/userModel.js";
import { Message } from "./src/models/messageModel.js";
import {Conversation} from "./src/models/conversationModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const deleteDBContent = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");

        // Delete all users
        await User.deleteMany();
        await Message.deleteMany();
        await Conversation.deleteMany();
        console.log("Database content deleted successfully");

        // Close the connection
        await mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error(`Failed to delete database content: ${error}`);
        process.exit(1);
    }
};

// Execute the function
deleteDBContent();
