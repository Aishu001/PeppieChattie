import React, { useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import axios from 'axios';

function SiderBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Function to handle search
  const handleSearch = async () => {
    try {
      // Add your authentication token to the request headers
      const authToken = localStorage.getItem('accessToken');
      // Replace 'your-authentication-token' with your actual token
      const response = await axios.get(`http://localhost:3000/user/search?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  // Function to handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 590,
          height: 850,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <div className='siderbar-content'>
          <input 
            type="" 
            placeholder="Search for anything..." 
            value={searchQuery}
            onChange={handleChange}
          />
          <br/><br/>
          <button onClick={handleSearch}>Search</button>
          <br/><br/>
          {/* Display search results */}
          {Array.isArray(searchResults) && searchResults.map(result => (
            <div key={result.id}>
              {result.title}
            </div>
          ))}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default SiderBar;
