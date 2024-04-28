import React, { useState } from 'react';
import '../Style/Chat.css';
import axios from 'axios';
import ChatBox from './ChatBox';

function Chat({ userID }) {
  const [fullName, setFullName] = useState('');
  const [chatId, setChatId] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  

  const createChatWithUser = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      // Check if authToken is available
      if (!authToken) {
        console.error('Access token not found');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/chat/createChat',
        { userId: userID },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      console.log('Chat created:', response.data);
      const { _id, users } = response.data;  // Extract users array from response

      // Find the other user (the one you are chatting with)
      const otherUser = users.find(user => user._id === userID);

      // Set the name and image of the other user
      setFullName(otherUser.fullName);
      setProfileImageUrl(otherUser.profileImageUrl);
      setChatId(_id);
      console.log(chatId);
      
      // Handle success or additional logic here
    } catch (error) {
      console.error('Error creating chat:', error);
      // Handle error here
    }
  };

  return (
    <>
      {/* Conditionally render different containers based on selectedUserId */}
      {userID ? (
        <div className="chatbarr" onClick={createChatWithUser}>
          <div className="containerr">
            <div className="navbar">
              <span>{fullName}</span>
              <img src={profileImageUrl} alt="Profile" />
            </div>
            <div>
              <ChatBox chatId={chatId}/>
              {/* Additional content for the chat container */}
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbar">
          <div className="container">
            {/* Apply the container class */}
            <img src="http://localhost:5173/chatttieeee.jpeg" alt="Profile" />
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
