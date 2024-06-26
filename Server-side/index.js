import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { dataBaseConnection } from './dataBase.js';
import { userRouter } from './routes/user.js';
import { chatRouter } from './routes/chat.js';
import { messageRouter } from './routes/message.js';

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = new Server(server, {
  cors: {
    origin:  'https://sparkly-flan-b6600b.netlify.app',
    methods: ['GET', 'POST'],
    credentials: true // allow credentials (cookies, authorization headers, etc.)
  }
});

const PORT = process.env.PORT;

dataBaseConnection();

app.use(cors({
  origin: 'https://sparkly-flan-b6600b.netlify.app',
  methods: ['GET', 'POST'],
  credentials: true // If you need to allow credentials
}));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

// Socket.io logic
io.on('connection', (socket) => {
    socket.on('joinChat', (chatId) => {
      socket.join(chatId); // Join the chat room identified by chatId
    });
  
    // Handle events such as message sending
    socket.on('sendMessage', (messageData) => {
      // Handle message data and emit it to relevant clients
      io.to(messageData.chatId).emit('receiveMessage', messageData);
    });
  
    // Handle typing event from clients
    socket.on('typing', ({ chatId, username }) => {
      // Emit typing event to all other users in the same chat room
      socket.to(chatId).emit('typing', { chatId, username });
    });
  });
  
server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
