import React from 'react'
import '../Style/Chat.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';


function ChatBox() {
  return (
   <>
   <div className='box-container'>
    
    <div className='box-message-container '>
    <h1 className="text-center"></h1>
    </div>  
      
    <div className='box-typing-container '>
    <Box sx={{  '& > :not(style)': { m: 1, width: '1000px' }, }} >
      <TextField label="Enter your message"  />  <span><Fab variant="extended"><SendIcon/></Fab></span>   
    </Box>
    </div>
   </div>
  
   </>
  )
}

export default ChatBox