import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '../http';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditTutorial() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setTutorial] = useState({
        cust_name: "",
        description: "",
        report_id: "",
        severity: ""
    });

    useEffect(() => {
        http.get(`/report/${id}`).then((res) => {
            setTutorial(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: report,
        enableReinitialize: true,
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
        onSubmit: (data) => {
            data.cust_name = data.cust_name.trim();
            data.description = data.description.trim();
            data.report_id = data.report_id.trim();
            data.severity = data.severity.trim();
            http.put(`/report/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/reports")
                });
        }
    });

    const deleteTutorial = () => {
        http.delete(`/report/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/reports");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Report
            </Typography>
            <form onSubmit={formik.handleSubmit}>
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
                        labelId="normal"
                        id="severity"
                        name="severity"
                        value={formik.values.severity}
                        onChange={formik.handleChange}
                        error={formik.touched.severity && Boolean(formik.errors.severity)}
                    
                    >
                        <MenuItem value ="" disabled>
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
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={deleteTutorial}>
                        Delete
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default EditTutorial;
