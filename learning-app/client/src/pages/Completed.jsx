import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import http from '../http';
import { useNavigate } from 'react-router-dom';

function Completed() {
  const handleReturn = () => {
    window.location = '/'; // Redirect to the home page
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          width: '100%', // Set the width of the container to 100%
          maxWidth: '500px', // Limit the maximum width of the container
          padding: '0 1rem', // Add padding to the container
          boxSizing: 'border-box', // Include padding in the width calculation
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '2rem',
          }}
        >
          <div
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              backgroundColor: '#6C757D',
              marginRight: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFF',
              fontWeight: 'bold',
            }}
          >
            1
          </div>
          <Typography variant="subtitle1">Booking</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '2rem',
          }}
        >
          <div
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              backgroundColor: '#6C757D',
              marginRight: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFF',
              fontWeight: 'bold',
            }}
          >
            2
          </div>
          <Typography variant="subtitle1">Payment</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              backgroundColor: '#007BFF',
              marginRight: '0.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFF',
              fontWeight: 'bold',
            }}
          >
            3
          </div>
          <Typography variant="subtitle1">Completed</Typography>
        </div>
      </Box>
      <hr style={{ width: '100%', margin: '2rem 0' }} />
      <Box>
        <img src="src/images/1.png" alt="React Image" />
        <Typography variant="h6" sx={{ my: 2 }}>
          An email confirmation has been sent to you!
        </Typography>
        <img src="src/images/2.png" alt="React Image" />
        <br></br>
        <Typography variant="h10" sx={{ my: 2, textAlign: 'left' }}>
          *Please end the booking on time to prevent late charges
        </Typography>
        <br></br>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleReturn}>
          Return to homepage
        </Button>
      </Box>
    </Box>
  );
}

export default Completed;
