// import the several dependencies
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { dataBaseConnection } from './dataBase.js';
import { userRouter } from './routes/user.js';
import { chatRouter } from './routes/chat.js';
import { messageRouter } from './routes/message.js';
import colors from 'colors'; // Import colors package
import { Server } from 'socket.io';


//  server set-up
const app = express();
const PORT = process.env.PORT;

// dataBase Connection
dataBaseConnection();

// middlewares
app.use(bodyParser.json());
app.use(cors());

//  set-up the various router 
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

// listen the server
const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});


io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

});
