import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import SiderBar from './SiderBar';
import NavBar from './NavBar';
import Chat from './Chat';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function ChatPage() {

  
  return (
   
<>
<NavBar />
<Grid container >

  <Grid item xs={4}>
   <SiderBar/>
  </Grid>
  <Grid item xs={8}>
  <Chat  />
  </Grid>
</Grid>
</>
  )
}

export default ChatPage