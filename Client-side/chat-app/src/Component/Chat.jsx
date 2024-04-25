import React from 'react'
import '../Style/Chat.css'
import axios from 'axios';


function Chat({ userID }) {
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
              <span>user.fullName </span>
              <img src='profileImageUrl' alt="" />
              </div>
              <div>

              </div>
          </div>
        </div>
      ) : (
        <div className="chatbar">
          <div className="container">
            {/* Apply the container class */}
            <img src="chatttieeee.jpeg" alt="Profile" />
          </div>
        </div>
      )}
 </>
  )
}

export default Chat