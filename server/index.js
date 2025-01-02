import express from 'express';
import 'dotenv/config';
// import dotenv from "dotenv"
import userRoutes from './src/routes/userRoutes.js';
import messageRoutes from './src/routes/messageRoute.js';
import cors from 'cors';
import DatabaseConnection from './src/db/DatabaseConnection.js';
import cookieParser from 'cookie-parser';
import {app, server} from './socketServer.js'
// dotenv.config({
//     path: './.env'
// })

// const app = express();
const port = process.env.PORT || 6000;

// For parsing application/json
app.use(express.json());
app.use(cookieParser());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


//create API
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

app.get('/', (req, res) => {
    res.send("Hello world")

});

server.listen(port, () => {
    DatabaseConnection();
    console.log(`Index server ${port}`)
})

// app.listen(4000, () => {
//     DatabaseConnection();
//     console.log(`Index server 4000`)
// })


// package.json

// "start:api": "nodemon index.js",
// "start:socket": "nodemon socketServer.js",
// "start": "concurrently \"npm run start:api\" \"npm run start:socket\""