import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/SideBar.css';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      const response = await axios.get('https://peppie-chat.onrender.com/chat/fetchChats', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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
    return (
      <div className="sidebar-loading">
        <div className="sidebar-navbar-loading"></div>
        <div className="chat-list-loading"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="box-message-container-error-sidebar">
        {/* Display error message */}
        <img src="/error.jpeg" alt="" />
        <p>
          OOPS! Something Went Wrong <br />
          Please try again later
        </p>
      </div>
    );
  }

  const handleHover = () => {
    const hoverIcons = document.querySelector('.hover-icons');
    hoverIcons.style.marginLeft = '0px';
  };

  const handleLeave = () => {
    const hoverIcons = document.querySelector('.hover-icons');
    hoverIcons.style.marginLeft = '-200px'; // Adjust the value based on the width of hover-icons
  };

  const currentUser = localStorage.getItem('userId');

  return (
    <div className="sidebar" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="sidebar-navbar">
        <div className="hover-icons">
          <RiContactsBook3Fill />
          <TiGroupOutline />
        </div>
        <div className="icons">
          <IoIosArrowBack className="arrow-icon" />
          <CiCirclePlus />
        </div>
      </div>
      <div className="chat-list">
        <ul>
        {chats.map((chat) => {
          // Find the other user in the chat
          const otherUser = chat.users.find((user) => user._id !== currentUser);

          // Ensure otherUser is not null or undefined
          if (otherUser) {
            return (
              <li key={chat._id} onClick={() => handleUserClick(otherUser._id)} className="list">
                <div></div>
                <img src={otherUser.profileImageUrl} alt="Profile" className="profile-image" />
                <span className="profile-name">{otherUser.fullName}</span>
                <div>
                  {chat.latestMessage ? (
                    <p className="latest-message">{chat.latestMessage.message}</p>
                  ) : (
                    <p className="latest-message">No message</p>
                  )}
                </div>
              </li>
            );
          } else {
            return null;
          }
        })}

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
