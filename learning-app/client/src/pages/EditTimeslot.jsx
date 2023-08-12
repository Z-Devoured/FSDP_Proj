import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

const timeslotOptions = [
  { value: '00:00 - 03:59', label: '00:00 - 03:59' },
  { value: '04:00 - 07:59', label: '04:00 - 07:59' },
  { value: '08:00 - 11:59', label: '08:00 - 11:59' },
  { value: '12:00 - 15:59', label: '12:00 - 15:59' },
  { value: '16:00 - 19:59', label: '16:00 - 19:59' },
  { value: '20:00 - 23:59', label: '20:00 - 23:59' },
];

function EditTimeslot() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [timeslot, setTimeslot] = useState({
    id: '',
    location: '',
    timeslot: [],
  });

  useEffect(() => {
    http.get(`/timeslot/${id}`).then((res) => {
      setTimeslot(res.data);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: timeslot,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      timeslot: yup.array().min(1, 'Please select at least one timeslot').required('Timeslot is required'),
    }),
    onSubmit: (data) => {
      data.location = data.location.trim();
      http.put(`/timeslot/${id}`, data).then((res) => {
        console.log(res.data);
        navigate('/timeslots');
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

  const CancelTimeslot = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Edit timeslot
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
          value={"#" + timeslot.id}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Location Name
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          autoComplete="off"
          multiline
          minRows={2}
          label=""
          name="name"
          value={formik.values.location}
          disabled
        />
        <Typography variant="subtitle1" sx={{ mb: -2 }}>
          Select timeslot
        </Typography>
        <FormControl
          fullWidth
          margin="normal"
          error={formik.touched.timeslot && Boolean(formik.errors.timeslot)}
        >
          <Select
            multiple // Allow multiple selections
            value={formik.values.timeslot}
            onChange={(event) => formik.setFieldValue('timeslot', event.target.value)}
            renderValue={(selected) => selected.join(', ')} // Render the selected options as a comma-separated string
          >
            {timeslotOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.timeslot && formik.errors.timeslot && (
            <Typography color="error">{formik.errors.timeslot}</Typography>
          )}
        </FormControl>
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
          <Button variant="contained" color="error" onClick={CancelTimeslot}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditTimeslot;
