import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Divider from '@mui/material/Divider';


function Payments() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            Card: '',
            Expire: '',
            CVV: '',
            Name: '',
        },
        validationSchema: yup.object().shape({
            Name: yup
                .string()
                .trim()
                .matches(/^[a-z ,.'-]+$/i, 'Invalid name')
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required'),
            Expire: yup
                .string()
                .trim()
                .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
                .required('Expiration date is required'),
            CVV: yup
                .string()
                .trim()
                .matches(/^[0-9]+$/, 'CVV must contain only digits')
                .min(3, 'CVV must be at least 3 digits')
                .max(4, 'CVV must be at most 4 digits')
                .required('CVV is required'),
            Card: yup
                .string()
                .trim()
                .matches(/^[0-9]+$/, 'Card Number must contain only digits')
                .min(8, 'Card Number must be at least 8 digits')
                .max(19, 'Card Number must be at most 19 digits')
                .required('Card Number is required'),
        }),
        onSubmit: (data) => {
            console.log(data);
            toast.success('Payment successful');
            navigate('/completed');
        },
    });

    return (
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
                            backgroundColor: '#6C757D',
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
                            backgroundColor: '#007BFF',
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
            <hr style={{ width: '100%', margin: '2rem 0' }} />
            <Typography variant="h5" sx={{ my: 2 }}>
                Payment
            </Typography>
            <Box
                component="form"
                sx={{ maxWidth: '500px' }}
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                    label="Card Number"
                    name="Card"
                    value={formik.values.Card}
                    onChange={formik.handleChange}
                    error={formik.touched.Card && Boolean(formik.errors.Card)}
                    helperText={formik.touched.Card && formik.errors.Card}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                    label="Expiration (MM/YY)"
                    name="Expire"
                    value={formik.values.Expire}
                    onChange={formik.handleChange}
                    error={formik.touched.Expire && Boolean(formik.errors.Expire)}
                    helperText={formik.touched.Expire && formik.errors.Expire}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                    label="CVV"
                    name="CVV"
                    type="password"
                    value={formik.values.CVV}
                    onChange={formik.handleChange}
                    error={formik.touched.CVV && Boolean(formik.errors.CVV)}
                    helperText={formik.touched.CVV && formik.errors.CVV}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                    label="Name on Card"
                    name="Name"
                    value={formik.values.Name}
                    onChange={formik.handleChange}
                    error={formik.touched.Name && Boolean(formik.errors.Name)}
                    helperText={formik.touched.Name && formik.errors.Name}
                />
                <Button variant="contained" sx={{ mt: 2 }} type="submit">
                    Proceed to payment
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default Payments;
