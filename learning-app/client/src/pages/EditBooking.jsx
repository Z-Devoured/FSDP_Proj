import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    name: '',
    amount: 0,
    bookingStatus: '',
  });

  useEffect(() => {
    http.get(`/booking/${id}`).then((res) => {
      setBooking(res.data);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: booking,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      bookingStatus: yup.string().required('Booking status is required'),
    }),
    onSubmit: (data) => {
      data.bookingStatus = data.bookingStatus.trim();
      http.put(`/booking/${id}`, data).then((res) => {
        console.log(res.data);
        navigate('/bookings');
      });
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CancelBooking = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Edit Booking
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          ID
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="id"
          value={"#" + booking.id}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Name
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="name"
          value={formik.values.name}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Location
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="location"
          value={formik.values.location}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Date
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="chosendate"
          type="date"
          value={formik.values.chosendate}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Timeslot
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="timeslot"
          type="timeslot"
          value={formik.values.timeslot}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Amount
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="amount"
          value={formik.values.amount}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Status
        </Typography>
        <Select
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="bookingStatus"
          value={formik.values.bookingStatus}
          onChange={formik.handleChange}
          error={formik.touched.bookingStatus && Boolean(formik.errors.bookingStatus)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select an option
          </MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="On-going">On-going</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
        {formik.touched.bookingStatus && formik.errors.bookingStatus && (
          <Typography color="error">{formik.errors.bookingStatus}</Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" type="submit">
            Update
          </Button>
          <Button variant="contained" sx={{ ml: 2 }} color="warning" onClick={handleOpen}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Your changes have not been saved</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to leave this page?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" color="error" onClick={CancelBooking}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditBooking;
