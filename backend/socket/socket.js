// import { Server } from "socket.io";
// import http from 'http';
// import express from 'express';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin:['http://localhost:5173'],
//         methods:['GET', 'POST']
//     }
// });

// const userSocketMap = {};

// io.on('connection', (socket) => {
//     console.log(`a user is connected => ${socket.id}`);

//     const userId = socket.handshake.query.userId;

//     io.emit('getOnlineUsers', Object.keys(userSocketMap));

//     if (userId != 'undefined') {
//         userSocketMap[userId] = socket.id;
//     }

//     socket.on('disconnect', () => {
//         console.log(`user disconnected => ${socket.id}`);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers', Object.keys(userSocketMap));
//     });
// });



// export {app, io, server};

import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log(`a user is connected => ${socket.id}`);

    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    } else {
        // Handle the case when userId is not provided
        console.log("User connected without userId");
    }

    socket.on('disconnect', () => {
        console.log(`user disconnected => ${socket.id}`);
        // Find the userId associated with the disconnected socket
        const disconnectedUserId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (disconnectedUserId) {
            delete userSocketMap[disconnectedUserId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
