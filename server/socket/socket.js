// import express from 'express';
// import http from 'http'
// import {Server} from 'socket.io'

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server,{
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//         credentials: true,
//         allowedHeaders: ['Content-Type', 'Authorization']
//     }
// });

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Listening for events from the client
//     socket.on('message', (msg) => {
//         console.log('Message from client:', msg);
        
//         // Sending a message back to the client
//         socket.broadcast.emit('response', `Server received: ${msg}`);
//     });

//     // Handle disconnect
//     socket.on('disconnect', () => {
//         console.log('A user disconnected:', socket.id);
//     });
// });

// server.listen(3000, () => {
//     console.log('Server is running on 3000');
// });
