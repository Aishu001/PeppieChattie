import React, {useState, useEffect} from 'react'
import '../Style/Chat.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';


function ChatBox({chatId}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Your API endpoint URL
        const authToken = localStorage.getItem('accessToken');
        const apiUrl = `http://localhost:3000/message/fetchMessage/${chatId}`;

        // Send GET request to fetch messages
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        // Set the messages state with the response data
        setMessages(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError(error);
        setLoading(false);
      }
    };

    // Call fetchMessages when the component mounts
    fetchMessages();
  }, [chatId]);

  // Render loading indicator if messages are loading
  if (loading) {
    return <div>Loading messages...</div>;
  }

  // Render error message if there was an error fetching messages
  if (error) {
    return <div>Error fetching messages: {error.message}</div>;
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
   <div className='box-message-container'>

   {messages.map((msg, index) => (
  <div
    key={index}
    className={`message ${
      msg.sender.email.trim() === localStorage.getItem('email')?.trim() ? 'sender' : 'receiver'
    }`}
  >
    
            <span>{msg.message}</span>
            <img src={msg.sender.profileImageUrl} alt='Profile' className='profile-image' />
   
  </div>
))}

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