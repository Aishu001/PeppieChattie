import React, { useState, useEffect } from 'react';
import '../Style/Chat.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5173/";

function ChatBox({ chatId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Disconnect socket on component unmount
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Socket connected");
        socket.emit("setup", user);
      });

      socket.on("connected", () => {
        console.log("Socket setup complete");
        setSocketConnected(true);
      });

      socket.on("message received", (newMessageReceived) => {
        if (!chatId || chatId !== newMessageReceived.chat._id) {
          return;
        }
        setMessages(prevMessages => [...prevMessages, newMessageReceived]);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connected");
        socket.off("message received");
      }
    };
  }, [chatId, socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const authToken = localStorage.getItem('accessToken');
        const apiUrl = `http://localhost:3000/message/fetchMessage/${chatId}`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setMessages(response.data);
        setLoading(false);
        socket.emit("join chat", chatId);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId, socket]);

const sendMessage = async () => {
  try {
    if (!message || !chatId) {
      console.error('Invalid data passed into request');
      return;
    }

    if (!socket) {
      console.error('Socket is not initialized');
      return;
    }

    const messageToSend = selectedEmoji ? message + selectedEmoji.native : message;
    const authToken = localStorage.getItem('accessToken');
    const apiUrl = 'http://localhost:3000/message/sendMessage';
    const requestData = {
      message: messageToSend,
      chatId: chatId
    };
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    console.log('Message sent successfully:', response.data);

    // Emit the new message to the server
    socket.emit("new message", response.data);

    setMessage('');
    setSelectedEmoji(null);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

  

  return (
    <>
      <div className='box-container'>
        <div className='box-message-container'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender.email.trim() === localStorage.getItem('email')?.trim() ? 'sender' : 'receiver'
              }`}
            >
              <p>{msg.message}</p>
              <div>
                <img src={msg.sender.profileImageUrl} alt='Profile' className='profile-image' />
              </div>
            </div>
          ))}
        </div>

        <div className='box-typing-container '>
          <Box sx={{ '& > :not(style)': { m: 1, width: '1000px' } }}>
            {showEmojiPicker && (
              <Picker
                set='twitter'
                onSelect={(emoji) => {
                  setSelectedEmoji(emoji);
                  setMessage(prevMessage => prevMessage + emoji.native);
                  setShowEmojiPicker(false);
                }}
              />
            )}

            <TextField
              label="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span>
              <Fab variant='extended' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                Emoji
              </Fab>
            </span>
            <span>
              <Fab variant="extended" onClick={sendMessage}>
                Send
                <SendIcon />
               
              </Fab>
            </span>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
