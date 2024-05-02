import React, { useState, useEffect } from 'react';
import Header from './Header';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material'; 
import { Link } from 'react-router-dom';
import '../Style/LandingPage.css'; // Corrected import statement

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <div className={`landingpage ${isScrolled ? 'scrolled' : ''}`}>
        <Typography className='headingText' sx={{ fontSize: '1.5rem' }}>
          <h1>Speak Freely</h1>
          Say <span className='hello'>"hello"</span> to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.
          <br />
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <Button
              className='start'
              sx={{
                color: 'white',
                backgroundColor: '#007bff',
                marginLeft: '50px',
                marginTop: '30px', // Example background color
                padding: '15px',
                borderRadius: '10px',
                fontSize: '15px',
                boxShadow: '0 8px 40px rgba(0,0,0,.12)',
                backgroundColor: '#0056b3',

                '&:hover': {
                  backgroundColor: ' #007bff',
                  // Example hover background color
                },
              }}
            >
              Get Start
            </Button>
          </Link>
        </Typography>
      </div>

      <Box>
        <Grid container>
          <Grid item xs={8} className="center-content">
            <img src="subContent.jpeg" alt="" className="landing-img" />
          </Grid>
          <Grid item xs={4} className="center-content">
            <div className="card-img1">
              <div className="text-img1">
                <Typography variant="body2" color="text.secondary">
                  <h1 className='headingTextt'> Why Choose Peppie Chat?</h1>
                  <span className='subContent'>
                    User-Friendly Interface: Our intuitive interface makes it easy for users of all ages to navigate and enjoy chatting without any hassle. <br />
                    End-to-End Encryption: Your privacy and security are our top priorities. With end-to-end encryption, your messages, calls, and shared media are fully protected from unauthorized access. <br />
                    Versatile Communication Tools: From text messaging to voice and video calls, Peppie Chat offers a variety of communication tools to suit your needs. Stay connected in real-time, no matter where you are. <br />
                    Customizable Experience: Personalize your chat experience with customizable themes, stickers, and emojis. Express yourself in unique ways and make every conversation memorable. <br />
                    Cross-Platform Compatibility: Whether you're using a smartphone, tablet, or desktop computer, Peppie Chat is available on multiple platforms, ensuring seamless communication across devices. <br />
                  </span>
                  <br />
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item xs={11}>
            <Item>
              <Typography variant="body2" color="text.secondary">
                <h1 className='headingTextt'>Join the Peppie Chat Community Today!</h1>
                <span className='subContent'>
                  Ready to experience the joy of chatting with Peppie Chat? Sign up now and join our vibrant community of users who are passionate about staying connected. Whether it's a quick hello or a deep conversation, Peppie Chat is here to bring people together, one message at a time.
                  <br />
                  <br />
                  Download the Peppie Chat app or visit our website to get started. Let's chat and create meaningful connections together!
                </span>
                <br />
              </Typography>
            </Item>
          </Grid>
          <Grid xs={11}>
            <Item>
              <img src="com.jpeg" alt="" className="landing-img" />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LandingPage;
