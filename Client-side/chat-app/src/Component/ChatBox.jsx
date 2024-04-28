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
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('receiveMessage', (messageData) => {
      // Check if the message is sent (from this client)
      const isSent = messageData.sent || false;
      // Set the alignment based on the sent flag
      const alignment = isSent ? 'sender' : 'receiver';
      // Add the message with the alignment to the state
      setMessages(prevMessages => [...prevMessages, {...messageData, alignment}]);
    });
  
    // Cleanup function to remove event listener
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    socket.on('typing', ({ chatId, username }) => {
      // Check if the typing event is for the current chat
      if (chatId === currentChatId) {
        setIsTyping(true);
        setTypingUser(username);
        // Clear typing indicator after 3 seconds (adjust as needed)
        setTimeout(() => {
          setIsTyping(false);
          setTypingUser('');
        }, 3000);
      }
    });
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

  const handleTyping = (e) => {
    setMessage(e.target.value);
    // Set typing status to true if message is not empty
    setIsTyping(e.target.value !== '');
  };

  return (
    <>
      <div className='box-container'>
        <div className='box-message-container'>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender?.email === localStorage.getItem('email')?.trim() ? 'sender' : 'receiver'}`}
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
          {isTyping && <p>{typingUser} is typing...</p>}

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
              onChange={handleTyping} // Update message and typing status
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
          {isTyping && <div className="typing-indicator">Typing...</div>}
        </div>
      </div>
    </>
  );
}

export default ChatBox;
