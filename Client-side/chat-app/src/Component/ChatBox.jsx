import React, {useState, useEffect} from 'react'
import '../Style/Chat.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';


function ChatBox({chatId}) {
  const [message, setMessage] = useState('');
  //  const [chatId, setChatId] = useState(chatId); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log(chatId);
  //  FUNCTIONALITY FOR FETCHING MESSAGES
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const authToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:3000/message/fetchMessage/${chatId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
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

//  FUNCTIONALITY FOR SENDING MESSAGES
  const sendMessage = async () => {
    try {
      // Validate if both message and chatId are provided
      if (!message || !chatId) {
        console.error('Invalid data passed into request');
        return;
      }
  
      // Your API endpoint URL
      const authToken = localStorage.getItem('accessToken');
      const apiUrl = 'http://localhost:3000/message/sendMessage';
  
      // Request body
      const requestData = {
        message: message,
        chatId: chatId
      };
  
      // Send POST request to the backend
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      // Handle the response as needed
      console.log('Message sent successfully:', response.data);
  
      // Clear the message field after sending
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error
    }
  };
  
  return (
   <>
   <div className='box-container'>
    <div className='box-message-container '>
    </div>  
      
    <div className='box-typing-container '>
    <Box sx={{  '& > :not(style)': { m: 1, width: '1000px' }, }} >
    <TextField
          label="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message state on change
        /> <span><Fab variant="extended" onClick={sendMessage}> Send<SendIcon/></Fab></span>   
    </Box>
    </div>
   </div>
  
   </>
  )
}

export default ChatBox