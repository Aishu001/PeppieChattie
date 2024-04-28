// Import Socket.io and create a server instance
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
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true // allow credentials (cookies, authorization headers, etc.)
  }
}); // Create Socket.io server

const PORT = process.env.PORT;

dataBaseConnection();

app.use(bodyParser.json());
app.use(cors()); // This line might not be necessary since you're already configuring CORS for Socket.io

app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

// Socket.io logic

io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle events such as message sending
  socket.on('sendMessage', (messageData) => {
    // Handle message data and emit it to relevant clients
    io.emit('receiveMessage', messageData);
  });

  // Handle other events as needed
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
