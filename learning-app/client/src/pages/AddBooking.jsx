import React from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';

function AddBooking() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      amount: 0,
      bookingStatus: '',
      location: '',
      timeslot: '',
      chosendate: '',
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .max(500, 'Name must be at most 500 characters')
        .required('Name is required'),
      amount: yup
        .number()
        .min(1, 'Amount must be at least 1')
        .max(500, 'Amount must be at most 500')
        .required('Amount is required'),
      location: yup
        .string()
        .trim()
        .min(3, 'Location must be at least 3 characters')
        .max(500, 'Location must be at most 500 characters')
        .required('Location is required'),
      timeslot: yup.string().required('Timeslot is required'),
      bookingStatus: yup.string().required('Booking status is required'),
      chosendate: yup.date().required('Date is required'),
    }),
    onSubmit: (data) => {
      data.name = data.name.trim();
      data.amount = data.amount;
      http
        .post('/booking', data)
        .then((res) => {
          console.log(res.data);
          navigate('/bookings');
        });
    },
  });

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Add Booking
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          multiline
          minRows={2}
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          multiline
          minRows={2}
          label="Location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label=""
          name="chosendate"
          type="date"
          value={formik.values.chosendate}
          onChange={formik.handleChange}
          error={formik.touched.chosendate && Boolean(formik.errors.chosendate)}
          helperText={formik.touched.chosendate && formik.errors.chosendate}
        />
        <Select
          fullWidth
          margin="normal"
          label="Timeslot"
          name="timeslot"
          value={formik.values.timeslot}
          onChange={formik.handleChange}
          error={formik.touched.timeslot && Boolean(formik.errors.timeslot)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a timeslot
          </MenuItem>
          <MenuItem value="00:00 - 03:59">00:00 - 03:59</MenuItem>
          <MenuItem value="04:00 - 07:59">04:00 - 07:59</MenuItem>
          <MenuItem value="08:00 - 11:59">08:00 - 11:59</MenuItem>
          <MenuItem value="12:00 - 15:59">12:00 - 15:59</MenuItem>
          <MenuItem value="16:00 - 19:59">16:00 - 19:59</MenuItem>
          <MenuItem value="20:00 - 23:59">20:00 - 23:59</MenuItem>
        </Select>
        {formik.touched.timeslot && formik.errors.timeslot && (
          <Typography color="error">{formik.errors.timeslot}</Typography>
        )}
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          label="Amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <Select
          fullWidth
          margin="normal"
          label="Booking Status"
          name="bookingStatus"
          value={formik.values.bookingStatus}
          onChange={formik.handleChange}
          error={formik.touched.bookingStatus && Boolean(formik.errors.bookingStatus)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select the status
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
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddBooking;
