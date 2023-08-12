import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';

function Coupons() {
    const [couponList, setCouponList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getCoupons = () => {
        http.get('/coupon').then((res) => {
            setCouponList(res.data);
        });
    };

    const searchCoupons = () => {
        http.get(`/coupon?search=${search}`).then((res) => {
            setCouponList(res.data);
        });
    };

    useEffect(() => {
        getCoupons();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchCoupons();
        }
    };

    const onClickSearch = () => {
        searchCoupons();
    }

    const onClickClear = () => {
        setSearch('');
        getCoupons();
    };


    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Coupons
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addcoupon" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {
                    couponList.map((coupon, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={coupon.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {coupon.couponCode} - {coupon.points}
                                            </Typography>
                                            <Link to={`/editcoupon/${coupon.id}`}>
                                                <IconButton color="primary" sx={{ padding: '4px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccountCircle sx={{ mr: 1 }} />
                                            <Typography>
                                                {coupon.user.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(coupon.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <Typography>
                                                Points: {coupon.points}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <Typography>
                                                Remarks: {coupon.remarks}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <Typography>
                                                Redeemed: {coupon.isRedeemed ? "Yes" : "No"}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default Coupons;