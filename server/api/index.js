import express from 'express';
import dotenv from "dotenv";
import userRoutes from '../src/routes/userRoutes.js';
import messageRoutes from '../src/routes/messageRoute.js';
import cors from 'cors';
import DatabaseConnection from '../src/db/DatabaseConnection.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { app, server } from '../socketServer.js';

import path from 'path';

dotenv.config({
    path: './.env'
});

const port = process.env.PORT || 6000;

// For parsing application/json
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Hello, I am coming from backend!');
})

// Create API
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);


server.listen(port, () => {
    DatabaseConnection();
    console.log(`Index server ${port}`);
});
