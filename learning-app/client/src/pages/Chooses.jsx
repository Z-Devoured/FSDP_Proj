import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';

function Chooses() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [timeslots, setTimeslots] = useState([]);
  const [filteredTimeslots, setFilteredTimeslots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch locations from the database
    http.get('/timeslot').then((res) => {
      setLocation(res.data);
    });

    // Fetch timeslots from the database
    http.get('/timeslot').then((res) => {
      setTimeslots(res.data);
    });
  }, []);

  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLocation(selectedValue);
    formik.setFieldValue('location', selectedValue); // Update formik value

    // Filter timeslots based on the selected location
    const filteredTimeslots = timeslots.filter((timeslot) => timeslot.location === selectedValue);
    setFilteredTimeslots(filteredTimeslots);

  };

  const handleTimeslotChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTimeslot(selectedValue);
    formik.setFieldValue('timeslot', selectedValue); // Update formik value
  };

  const formik = useFormik({
    initialValues: {
      name: 'Testing',
      amount: 20,
      bookingStatus: 'On-going',
      location: '',
      timeslot: '',
      chosendate: '',
    },
    validationSchema: yup.object().shape({
      location: yup.string().required('Location is required'),
      timeslot: yup.string().required('Timeslot is required'),
      chosendate: yup.date().required('Date is required').min(new Date(), 'Cannot choose a date in the past'),
    }),
    onSubmit: (data) => {
      http
        .post('/booking', data)
        .then((res) => {
          console.log(res.data);
          navigate('/payments');
        });
    },
  });

  return (
    <Box>
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
                backgroundColor: '#007BFF',
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
                backgroundColor: '#6C757D',
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
      </Box>
      <hr style={{ width: '100%', margin: '2rem 0' }} />
      <Typography variant="h5" sx={{ my: 2 }}>
        Choose date and time
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Location</InputLabel>
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
          >
            {location.map((loc) => (
              <MenuItem key={loc.id} value={loc.location}>
                {loc.location}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.location && formik.errors.location && (
            <Typography color="error">{formik.errors.location}</Typography>
          )}
        </FormControl>
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Timeslot</InputLabel>
          <Select
            value={selectedTimeslot}
            onChange={handleTimeslotChange}
            error={formik.touched.timeslot && Boolean(formik.errors.timeslot)}
          >
            {filteredTimeslots.flatMap((timeslot) => timeslot.timeslot.map((slot, index) => (
              <MenuItem key={`${timeslot.id}-${index}`} value={slot}>
                {slot}
              </MenuItem>
            )))}
          </Select>
          {formik.touched.timeslot && formik.errors.timeslot && (
            <Typography color="error">{formik.errors.timeslot}</Typography>
          )}
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" type="submit">
            Book
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Chooses;
