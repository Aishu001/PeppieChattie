import React, { useState } from 'react';
import { Menu, Input, Dropdown, Avatar, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../Style/NavBar.css'
import { useNavigate } from 'react-router-dom';



// Function to handle menu item click
const handleClick = (e) => {
  console.log('Clicked on item:', e.key);
};



function NavBar() {
  // Dropdown menu content
const menu = (
  <Menu>
   <Menu.Item key="1" onClick={() => handleLogout()}>
      Logout
    </Menu.Item>
  </Menu>
);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const navigate = useNavigate()
  
  const handleSearch = async (value) => {
    try {
      // Add your authentication token to the request headers
      const authToken = localStorage.getItem('accessToken');
      // Replace 'your-authentication-token' with your actual token
      const response = await axios.get(`https://peppie-chat.onrender.com/user/search?search=${value}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Check if the response contains the expected data structure
      if (Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else if (response.data && typeof response.data === 'object') {
        // If the response is an object, convert it to an array with a single element
        setSearchResults([response.data]);
      } else {
        // If the response does not match the expected format, handle accordingly
        console.error('Invalid search results format:', response.data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
    
  };
  const handleSelect = (user) => {
    const userId = user._id; // Get the selected user ID
    setSelectedUserId(userId); // Set the selected user ID in state
    navigate(`/chatPageD/${userId}`); // Navigate to the chat page with the selected user ID
  
  
  };

  // Function to handle input change
  const handleChange = (value) => {
    setSearchQuery(value);
    // Trigger search when input changes
    handleSearch(value);
  };
  const handleLogout = () => {
    try {
      // Clear the authentication token from local storage
      localStorage.removeItem('accessToken');
      // Navigate to the home page
      navigate('/');
      console.log('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }


  // Function to handle search


  // Function to handle user selection from dropdown


};

  return (
    <div>
      <Menu onClick={handleClick} mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', border: 'none' }}>
        {/* Left side of navbar */}
        <Menu.Item key="logo" style={{ marginRight: 'auto' }}>
          <img src="http://localhost:5173/logo.png" alt="Logo" style={{ height: '80px', width: 'auto' }} />
        </Menu.Item>

        {/* Search bar */}
        <Menu.Item key="search" style={{ marginRight: '20px', marginTop: '20px' }}>
          <Input.Search
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            onSearch={(value) => handleSearch(value)}
          />
        </Menu.Item>
      

        {/* LOGOUT */}
        <Menu.Item key="dropdown" style={{ marginRight: '20px', marginTop: '20px' }} >
          <Dropdown overlay={menu} >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar src="https://avatar.iran.liara.run/public/boy?username=female" />
              <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>

      {/* Display search results */}
      <div className="search-results">
  {Array.isArray(searchResults) ? (
    searchResults.map(result => (
      <div key={result._id} className="search-results-item" onClick={() => handleSelect(result)}>
        <Avatar src={result.profileImageUrl} />
        <span>{result.fullName}</span>
      </div>
    ))
  ) : (
    <div>No search results found</div>
  )}
</div>


    </div>

    
  );
}

export default NavBar;
