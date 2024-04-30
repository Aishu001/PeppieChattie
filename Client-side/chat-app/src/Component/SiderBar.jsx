import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/SideBar.css'
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";


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
    return <div className="sidebar-loading">
    <div className="sidebar-navbar-loading">
   
    </div>
    <div className='chat-list-loading'>
     
    </div>
  </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleHover = () => {
    const hoverIcons = document.querySelector('.hover-icons');
    hoverIcons.style.marginLeft = '0px';
  }
  
  const handleLeave = () => {
    const hoverIcons = document.querySelector('.hover-icons');
    hoverIcons.style.marginLeft = '-200px'; // Adjust the value based on the width of hover-icons
  }
  

  return (
    <div className="sidebar" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="sidebar-navbar">
      <div className="hover-icons">
    <RiContactsBook3Fill />
    <TiGroupOutline />

    </div>
      <div className="icons">

    <IoIosArrowBack className="arrow-icon"/>
    <CiCirclePlus />
   
  </div>
      </div>
      <div className='chat-list'>
        <ul>
          {chats.map(chat => (
            <li key={chat._id} onClick={() => handleUserClick(chat.users[1]._id)} className='list'>
              <div></div>
              <img src={chat.users[1].profileImageUrl} alt="Profile" className="profile-image" />
              <span className="profile-name">{chat.users[1].fullName}</span>
              <div>
                <p className="latest-message">{chat.latestMessage.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
