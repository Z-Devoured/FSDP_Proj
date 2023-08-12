import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCoupon() {
    const { id } = useParams();
    const [coupon, setCoupon] = useState(null);
    const [initialValues, setInitialValues] = useState({
        couponCode: '',
        points: '',
        remarks: '',
        isRedeemed: false,
    });

    useEffect(() => {
        http.get(`/coupon/${id}`)
            .then((res) => {
                setCoupon(res.data);
                setInitialValues({
                    couponCode: res.data.couponCode,
                    points: res.data.points,
                    remarks: res.data.remarks,
                    isRedeemed: res.data.isRedeemed,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: yup.object({
            couponCode: yup.string().trim()
                .min(3, 'Coupon code must be at least 3 characters')
                .max(50, 'Coupon code must be at most 50 characters')
                .required('Coupon code is required'),
            points: yup.number()
                .min(1, 'Points must be at least 1')
                .required('Points are required'),
            remarks: yup.string().trim()
                .min(3, 'Remarks must be at least 3 characters')
                .max(500, 'Remarks must be at most 500 characters')
                .required('Remarks are required'),
            isRedeemed: yup.boolean()
        }),
        onSubmit: (data) => {
            http.put(`/coupon/${id}`, data)
                .then(() => {
                    toast.success('Coupon updated successfully');
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

    if (!coupon) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h5">
                Edit Coupon
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal"
                    label="Coupon Code"
                    name="couponCode"
                    value={formik.values.couponCode}
                    onChange={formik.handleChange}
                    error={formik.touched.couponCode && Boolean(formik.errors.couponCode)}
                    helperText={formik.touched.couponCode && formik.errors.couponCode}
                />
                <TextField
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
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isRedeemed"
                            color="primary"
                            checked={formik.values.isRedeemed}
                            onChange={formik.handleChange}
                        />
                    }
                    label="Redeemed"
                />
                <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
                    Edit Coupon
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default EditCoupon;