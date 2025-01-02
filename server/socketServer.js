import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express()
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});


export const getReceicedSocketId = (receivedId) => {

    console.log('Checking userSocketMap:', userSocketMap);
    return userSocketMap[receivedId];

};


const userSocketMap = {};  //creating objects 

// io.on('connection', (socket) => {
//     const userId = socket.handshake.query.userId;

//     console.log('userId:', userId)

//     if (userId !== undefined) {
//         userSocketMap[userId] = socket.id;
//     }

//     io.emit('getOnlineUsers', Object.keys(userSocketMap));


//     // Handle disconnect
//     socket.on('disconnect', () => {
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers', Object.keys(userSocketMap));
//         // console.log('A user disconnected:', socket.id);
//     });
// });

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    console.log('userId:', userId)

    if (userId) {
        userSocketMap[userId] = socket.id; // Map userId to socket.id
        console.log('Connected userSocketMap:', userSocketMap);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));


    socket.on('disconnect', () => {
        delete userSocketMap[userId]; // Remove mapping on disconnect
        console.log('Disconnected userSocketMap:', userSocketMap);
    });
});



export { io, server, app };