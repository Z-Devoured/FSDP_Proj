import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCoupon() {
    const formik = useFormik({
        initialValues: {
            points: "",
            remarks: ""
        },
        validationSchema: yup.object({
            points: yup.number()
                .min(1, 'Points must be at least 1')
                .required('Points are required'),
            remarks: yup.string().trim()
                .min(3, 'Remarks must be at least 3 characters')
                .max(500, 'Remarks must be at most 500 characters')
                .required('Remarks is required'),
        }),
        onSubmit: (data) => {
            http.post("/coupon/", data)
                .then(() => {
                    toast.success('Coupon added successfully');
                    formik.resetForm();
                })
                .catch(function (err) {
                    if (err.response) {
                        toast.error(`${err.response.data.message}`);
                    } else if (err.request) {
                        toast.error('No response received from the server');
                    } else {
                        toast.error(`Error: ${err.message}`);
                    }
                });
        }
    });

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h5">
                Add Coupon
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    type="number"
                    fullWidth margin="normal"
                    label="Points"
                    name="points"
                    value={formik.values.points}
                    onChange={formik.handleChange}
                    error={formik.touched.points && Boolean(formik.errors.points)}
                    helperText={formik.touched.points && formik.errors.points}
                />
                <TextField
                    fullWidth margin="normal"
                    label="Remarks"
                    name="remarks"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                    helperText={formik.touched.remarks && formik.errors.remarks}
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                    Add Coupon
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default AddCoupon;