import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/SideBar.css'

function Sidebar() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <li key={chat._id}>
            <div></div>
            <img src={chat.users[1].profileImageUrl} alt="Profile" className="profile-image" />
            <span>{chat.users[1].fullName}</span>
            <span>{chat.latestMessage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
