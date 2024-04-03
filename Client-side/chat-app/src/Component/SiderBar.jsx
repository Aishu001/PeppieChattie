import React from 'react';
import { Box, ThemeProvider } from '@mui/material';

function SiderBar() {
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
        {/* Place the input inside the Box */}
        <div className='siderbar-content'>
          <input type="text" placeholder="Search for anything..." /><br/><br/>
          <div>
            
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default SiderBar;
