import React, { useState } from 'react';
import { Menu, Input, Dropdown, Avatar, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';

// Function to handle menu item click
const handleClick = (e) => {
  console.log('Clicked on item:', e.key);
};

// Dropdown menu content
const menu = (
  <Menu>
    <Menu.Item key="1">
      Logout
    </Menu.Item>
  </Menu>
);

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search
 // Function to handle search
const handleSearch = async (value) => {
    try {
      // Add your authentication token to the request headers
      const authToken = localStorage.getItem('accessToken');
      // Replace 'your-authentication-token' with your actual token
      const response = await axios.get(`http://localhost:3000/user/search?search=${value}`, {
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
  

  // Function to handle input change
  const handleChange = (value) => {
    setSearchQuery(value);
    // Trigger search when input changes
    handleSearch(value);
  };

  // Function to handle user selection from dropdown
  const handleSelect = (value) => {
    console.log('Selected user:', value);
    // Do something with the selected user, like navigating to their profile
  };

  return (
    <div>
      <Menu onClick={handleClick} mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', border: 'none' }}>
        {/* Left side of navbar */}
        <Menu.Item key="logo" style={{ marginRight: 'auto' }}>
          <img src="logo.png" alt="Logo" style={{ height: '80px', width: 'auto' }} />
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

        {/* Dropdown menu */}
        <Menu.Item key="dropdown" style={{ marginRight: '20px', marginTop: '20px' }}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar src="https://avatar.iran.liara.run/public/boy?username=female" />
              <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>

      {/* Display search results */}
      <div>
  {Array.isArray(searchResults) ? (
    searchResults.map(result => (
      <div key={result._id} onClick={() => handleSelect(result)}>
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
