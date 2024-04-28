import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/SideBar.css'
import { useNavigate } from 'react-router-dom';

function Sidebar({ onSelectUser }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:3000/chat/fetchChats', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      setChats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setError('Error fetching chats. Please try again later.');
      setLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/chatPageD/${userId}`); // Navigate to the chat page with the selected user ID

  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sidebar">
      <h2>Chat List</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat._id} onClick={() => handleUserClick(chat.users[1]._id)}>
            <div></div>
            <img src={chat.users[1].profileImageUrl} alt="Profile" className="profile-image" />
            <span>{chat.users[1].fullName}</span>
            <span>{chat.latestMessage.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
