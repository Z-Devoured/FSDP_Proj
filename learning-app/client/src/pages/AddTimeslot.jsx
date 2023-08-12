import React from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';

const timeslotOptions = [
    { value: '', label: 'Select a timeslot' },
    { value: '00:00 - 03:59', label: '00:00 - 03:59' },
    { value: '04:00 - 07:59', label: '04:00 - 07:59' },
    { value: '08:00 - 11:59', label: '08:00 - 11:59' },
    { value: '12:00 - 15:59', label: '12:00 - 15:59' },
    { value: '16:00 - 19:59', label: '16:00 - 19:59' },
    { value: '20:00 - 23:59', label: '20:00 - 23:59' },
];

function AddTimeslot() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            location: '',
            timeslot: [], // Change to an array
        },
        validationSchema: yup.object().shape({
            location: yup
                .string()
                .trim()
                .min(3, 'Location must be at least 3 characters')
                .max(500, 'Location must be at most 500 characters')
                .required('Location is required'),
            timeslot: yup.array().required('Timeslot is required'), // Validate as an array
        }),
        onSubmit: (data) => {
            data.location = data.location.trim();
            http.post('/timeslot', data).then((res) => {
                console.log(res.data);
                navigate('/timeslots');
            });
        },
    });

    const handleTimeslotChange = (event) => {
        const selectedTimeslots = event.target.value;
        formik.setFieldValue('timeslot', selectedTimeslots);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Timeslot
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
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
                <FormControl fullWidth margin="normal" error={formik.touched.timeslot && Boolean(formik.errors.timeslot)}>
                    <InputLabel>Timeslot</InputLabel>
                    <Select
                        multiple // Allow multiple selections
                        value={formik.values.timeslot}
                        onChange={handleTimeslotChange}
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
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddTimeslot;
