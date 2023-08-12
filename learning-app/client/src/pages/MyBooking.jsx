import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { CalendarMonth, AccessTime, Place } from '@mui/icons-material';
import http from '../http';

function Mybooking() {
  const [bookingList, setBookingList] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [confirmedCancellation, setConfirmedCancellation] = useState(false);
  const [canceledBookings, setCanceledBookings] = useState([]);

  const getBookings = () => {
    http.get('/booking').then((res) => {
      setBookingList(res.data);
    });
  };

  useEffect(() => {
    getBookings();
  }, []);

  const handleConfirmCancellation = async () => {
    try {
      // Fetch the existing booking data
      const existingBookingResponse = await http.get(`/booking/${deleteId}`);
      const existingBooking = existingBookingResponse.data;

      // Update the booking status to 'cancelled'
      const updatedBooking = {
        ...existingBooking,
        bookingStatus: 'cancelled'
      };

      // Send the updated booking data
      await http.put(`/booking/${deleteId}`, updatedBooking);

      // Refresh the booking list
      getBookings();

      // Add canceled booking to the canceledBookings array
      setCanceledBookings(prevCanceledBookings => [...prevCanceledBookings, deleteId]);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      setConfirmedCancellation(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        My bookings
      </Typography>

      <Grid container spacing={2}>
        {bookingList.map((booking, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={booking.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                    <CalendarMonth sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {booking.chosendate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {booking.timeslot}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} color="text.secondary">
                    <Place sx={{ mr: 1 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {booking.location}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {!canceledBookings.includes(booking.id) && !confirmedCancellation && (
                      <Button
                        variant="contained"
                        sx={{ ml: 2 }}
                        color="warning"
                        onClick={() => {
                          setDeleteId(booking.id);
                          setOpen(true);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirmCancellation}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Mybooking;
