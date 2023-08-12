import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import http from '../http';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function Timeslots() {
  const [timeslotList, setTimeslotList] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const getTimeslots = () => {
    http.get('/timeslot').then((res) => {
        setTimeslotList(res.data);
    });
};

const searchTimeslots = () => {
    http.get(`/timeslot?search=${search}`).then((res) => {
        setTimeslotList(res.data);
    });
};

useEffect(() => {
    getTimeslots();
}, []);

const deleteTimeslot = () => {
    http.delete(`/timeslot/${deleteId}`)
        .then((res) => {
            console.log(res.data);
            handleClose();
            getTimeslots();
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
                Manage Timeslots
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addtimeslot" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date created</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeslotList.map((timeslot) => (
                            <TableRow key={timeslot.id}>
                                <TableCell>
                                    {dayjs(timeslot.createdAt).format(global.datetimeFormat)}
                                </TableCell>
                                <TableCell>{timeslot.location}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" component={Link} to={`/edittimeslot/${timeslot.id}`}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(timeslot.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete timeslot</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this timeslot?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={deleteTimeslot}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
  )
}

export default Timeslots