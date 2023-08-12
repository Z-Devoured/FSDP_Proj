import React from 'react'
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { useNavigate } from 'react-router-dom';

function AddTutorial() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            cust_name: "",
            description: "",
            report_id: "",
            severity: "",
        },
        validationSchema: yup.object({
            cust_name: yup.string().trim()
                .min(3, 'Customer Name must be at least 3 characters')
                .max(100, 'Customer Name must be at most 100 characters')
                .required('Customer Name is required'),
            description: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),
            report_id: yup.string().trim()
                .min(3, 'Report ID must be at least 3 characters')
                .max(500, 'Report ID must be at most 500 characters'),
            severity: yup
                .string()
                .required('Severity is required')
        }),
        onSubmit: (values) => {
            const data = {
                cust_name: values.cust_name.trim(),
                description: values.description.trim(),
                report_id: values.report_id.trim(),
                severity: values.severity.trim()
            };

            http.post('/report', data)
                .then((res) => {
                    console.log(res.data);
                    navigate('/reports');
                })
                .catch((error) => {
                    console.error('Failed to add report:', error);
                });
        },
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Report
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Customer Name"
                    name="cust_name"
                    value={formik.values.cust_name}
                    onChange={formik.handleChange}
                    error={formik.touched.cust_name && Boolean(formik.errors.cust_name)}
                    helperText={formik.touched.cust_name && formik.errors.cust_name}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <Select
                    fullWidth margin="normal"
                    label="Severity"
                    name="severity"
                    value={formik.values.severity}
                    onChange={formik.handleChange}
                    error={formik.touched.severity && Boolean(formik.errors.severity)}
                    helperText={formik.touched.severity && formik.errors.severity}
                    displayEmpty
                    renderValue={(selected) => (selected ? selected : 'Severity')}
                >
                    <MenuItem value="" disabled>
                        Select a severity
                    </MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Moderate">Moderate</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </Select>
                
                {formik.touched.severity && formik.errors.severity && (
                    <Typography variant="caption" color="error">
                        {formik.errors.severity}
                    </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AddTutorial