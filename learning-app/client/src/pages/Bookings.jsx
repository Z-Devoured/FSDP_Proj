import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../http';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function Bookings() {
    const [bookingList, setBookingList] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getBookings = () => {
        http.get('/booking').then((res) => {
            setBookingList(res.data);
        });
    };

    const searchBookings = () => {
        http.get(`/booking?search=${search}`).then((res) => {
            setBookingList(res.data);
        });
    };

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchBookings();
        }
    };

    const onClickSearch = () => {
        searchBookings();
    };

    const onClickClear = () => {
        setSearch('');
        getBookings();
    };

    useEffect(() => {
        getBookings();
    }, []);
    

    const deleteBooking = () => {
        http.delete(`/booking/${deleteId}`)
            .then((res) => {
                console.log(res.data);
                handleClose();
                getBookings();
            });
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Manage Bookings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <input value={search} placeholder="Search"
                    onChange={onSearchChange}
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary" onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary" onClick={onClickClear}>
                    <Clear />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addbooking" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Booking date</TableCell>
                            <TableCell>Timing</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Booking Status</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingList.map((booking) => (
                            <TableRow key={booking.chosendate}>
                                <TableCell>{booking.chosendate}</TableCell>
                                <TableCell>{booking.timeslot}</TableCell>
                                <TableCell>{booking.name}</TableCell>
                                <TableCell>{booking.amount}</TableCell>
                                <TableCell>{booking.bookingStatus}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" component={Link} to={`/editbooking/${booking.id}`}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(booking.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Tutorial</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this booking?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={deleteBooking}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Bookings;
