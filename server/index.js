
import express from 'express';
import dotenv from "dotenv";
import userRoutes from './src/routes/userRoutes.js';
import messageRoutes from './src/routes/messageRoute.js';
import cors from 'cors';
import DatabaseConnection from './src/db/DatabaseConnection.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socketServer.js';
import path from 'path';

dotenv.config({
    path: './.env'
});


const port = process.env.PORT || 6000;

// Define __dirname for ES modules
const __dirname = path.resolve();
console.log('__dirname', __dirname);

// For parsing application/json
app.use(express.json());
app.use(cookieParser());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


// Create API
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
// app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(express.static(path.join(__dirname, '/client/dist')));


// Route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

server.listen(port, () => {
    DatabaseConnection();
    console.log(`Index server ${port}`);
});
