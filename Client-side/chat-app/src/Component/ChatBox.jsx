import React, { useState, useEffect } from 'react';
import '../Style/Chat.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { io } from 'socket.io-client'; // Import Socket.io client library

const socket = io('http://localhost:3000'); // Connect to your backend Socket.io

function ChatBox({ chatId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
 

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Cleanup function to remove event listener
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  
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
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

const sendMessage = async () => {
  try {
    if (!message || !chatId) {
      console.error('Invalid data passed into request');
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
    socket.emit('sendMessage', requestData);
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
          msg.sender?.email?.trim() === localStorage.getItem('email')?.trim() ? 'sender' : 'receiver'
        }`}
      >
        <p>{msg.message}</p>
        <div>
          {msg.sender?.profileImageUrl ? (
            <img src={msg.sender.profileImageUrl} alt='Profile' className='profile-image' />
          ) : (
            <div className="default-profile-image">No Profile Image</div>
          )}
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
