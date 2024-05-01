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
import '../Style/ChatBox.css';
import { CiFaceSmile } from "react-icons/ci";

const socket = io('http://localhost:3000'); // Connect to your backend Socket.io

function ChatBox({ chatId }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
      setMessages((prevMessages) => [...prevMessages, { ...messageData, alignment }]);
    });

    // Cleanup function to remove event listener
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // Emit 'joinChat' event when the component mounts or when navigating to a different chat
  useEffect(() => {
    socket.emit('joinChat', chatId);
  }, [chatId]);

  useEffect(() => {
    socket.on('typing', ({ chatId, username }) => {
      // Check if the typing event is for the current chat
      if (chatId === chatId) {
        setIsTyping(true);
        setTypingUser(username);
        // Clear typing indicator after 3 seconds (adjust as needed)
        setTimeout(() => {
          setIsTyping(false);
          setTypingUser('');
        }, 3000);
      }
    });
  }, [chatId]); // Make sure to include chatId in the dependencies array

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const authToken = localStorage.getItem('accessToken');
        const apiUrl = `http://localhost:3000/message/fetchMessage/${chatId}`;

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
       
        setError(true);
      } finally {
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
        chatId: chatId,
      };
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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
    setIsTyping(e.target.value !== '');
    // Emit a 'typing' event to the server with the correct chatId
    socket.emit('typing', { chatId, username: localStorage.getItem('email') });
  };

  return (
    <><div className="box-container">
      
        {loading ? (
          <div className="box-message-container-loading">
              <div className="box-message-container">
    <div>
      <div>
    
        <p className="profile-msg-chat-loading-sender"></p>
        <p className="profile-msg-chat-loading-recevier"></p>
        <p className="profile-msg-chat-loading-sender"></p>
        <p className="profile-msg-chat-loading-recevier"></p>
        <p className="profile-msg-chat-loading-sender"></p>
        <p className="profile-msg-chat-loading-recevier"></p>
        <p className="profile-msg-chat-loading-recevier"></p>
      </div>

       
   
    </div>

  {/* Typing indicator */}
  {isTyping && <p>{typingUser} is typing...</p>}
</div>
            
            </div>
        ) : error ? (
          // Error state
          <div className="box-message-container-error">
            {/* Display error message */}
            <img src="/error.jpeg" alt="" />
            <p>OOPS! Something Went Wrong <br /> 
                  Please try again later</p>
          </div>
        ) : (
          <>
      <div className="box-message-container">
  {/* Messages */}
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`message ${
        msg.sender?.email === localStorage.getItem('email')?.trim() ? 'sender' : 'receiver'
      }`}
    >
      <div>
        <p className="profile-msg-chat">{msg.message}</p>
      </div>
      <div>
        {msg.sender?.profileImageUrl ? (
          <img src={msg.sender.profileImageUrl} alt="Profile" className="profile-image-chat" />
        ) : (
          <div className="default-profile-image">No Profile Image</div>
        )}
      </div>
    </div>
  ))}
  {/* Typing indicator */}
  {isTyping && <p>{typingUser} is typing...</p>}
</div>

{/* Emoji Picker */}
{showEmojiPicker && (
  <div className="emoji-picker">
    <Picker
      set="twitter"
      onSelect={(emoji) => {
        setSelectedEmoji(emoji);
        setMessage((prevMessage) => prevMessage + emoji.native);
        setShowEmojiPicker(false);
      }}
    />
  </div>
)}

{/* Text field and send button */}
<div className="box-typing-container">
  <Box sx={{ '& > :not(style)': { m: 1, width: '1000px' } }}>
    <TextField
      label="Type your message"
      value={message}
      onChange={handleTyping}
      InputProps={{
        className: 'input-box',
        style: {
          color: '#0c3483',
          border: '2px solid white',
        },
        placeholder: 'Type your message',
        endAdornment: (
          <span className='emoji'>
            <CiFaceSmile variant="extended" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
          </span>
        ),
      }}
    />
    <span className='send'>
      <SendIcon variant="extended" onClick={sendMessage} />
    </span>
  </Box>
</div>

          </>
        )}
      </div>
    </>
  );
}

export default ChatBox;
