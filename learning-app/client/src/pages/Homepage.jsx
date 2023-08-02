import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Homepage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <img src="/images/ss.png" alt="React Image" />
            <div>
                <Typography variant="h5" sx={{ my: 2 }}>
                    Rent a station near you 
                </Typography>
                <Typography variant="subtitle1" sx={{ my: 2 }}>
                    Anytime, anywhere with just 3 simple steps
                </Typography>
            </div>
            <img src="/images/s.png" alt="React Image" />
            <hr style={{ width: '100%', margin: '2rem 0' }} />
            <Typography variant="subtitle1" sx={{ my: 2 }}>
                Create your account and start booking now
            </Typography>
            <br></br>
            <Button variant="contained" sx={{ mt: 2 }}>
                Proceed to sign up
            </Button>
        </Box>
    );
}

export default Homepage;
