import React from 'react';
import Header from './Header';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../Style/LandingPage.css'; // Corrected import statement

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function LandingPage() {
  return (
    <>
      <Header /> {/* Nav Bar*/}
      <Box sx={{ flexGrow: 1 , backgroundImage: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)' }}>
        <Grid container spacing={2}>
        
          <Grid item xs={8} className="center-content">
          <div className="card-img1">
          <img src="Peppie.png" alt=""  className="company-img"/>
          <div  className="text-img1">
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            <br />
            <Button size="small" color="primary">
          Get Start
        </Button>
          </Typography>
          </div>
          
              </div>    
          
    
         
          </Grid>
          <Grid item xs={4} className="center-content">
         
          <img src="landingPGG.png" alt="" className="landing-img"/>
 
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LandingPage;
