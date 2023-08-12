import React from 'react';
import { AppBar, Container, Toolbar, Typography, Link, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function ContactUs() {
  const boldStyle = {
    fontWeight: 'bold'
  };

  const boxStyle = {
    backgroundColor: '#f4f4f4',
    padding: '16px',
    paddingBottom: '100px',
    width: '100%',
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid black',
  };

  const marginTopStyle = {
    marginTop: '30px',
  };

  const boxesContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
  };

  const boxStyleCommon = {
    width: '45%',
    padding: '16px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    border: '1px solid black',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const buttonBoxStyle = {
    backgroundColor: 'blue',
    color: 'white',
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    width: '100%',
    textAlign: 'center',
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Contact Us
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
              About
            </Link>
            <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
              Map
            </Link>
            <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
              Booking
            </Link>
            <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
              FAQ
            </Link>
            <Link href="#" color="inherit" style={{ margin: '0 10px' }}>
              Contact Us
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={boxStyle}>
          <Typography variant="h4" style={boldStyle}>
            We'd Love to Hear From You
          </Typography>
          <Typography sx={marginTopStyle}>
            Whether you are curious about features or have problems with booking, feel free to contact us.
          </Typography>
        </Box>

        <Box sx={boxesContainerStyle}>
          <Box sx={boxStyleCommon}>
            <Typography variant='h6' style={{ textAlign: 'center' }}>Support</Typography>
            <Typography>Need a hand making a booking or managing your account?</Typography>
            <Box sx={buttonBoxStyle}>
              <RouterLink to="/helpcenter" style={{ textDecoration: 'none' }}>
                Help Center
              </RouterLink>
            </Box>
          </Box>
          <Box sx={boxStyleCommon}>
            <Typography variant='h6' style={{ textAlign: 'center' }}>Report</Typography>
            <Typography>Found a problem in our website you need to report?</Typography>
            <Box sx={buttonBoxStyle}>
              <RouterLink to="/useraddreport" style={{ textDecoration: 'none' }}>
                Report Problem
              </RouterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default ContactUs;
