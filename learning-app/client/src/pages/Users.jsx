import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import { AccountCircle, Search, Clear, Delete } from '@mui/icons-material';
import http from '../http';

function Users() {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');


    const getUsers = () => {
        http.get('/user/all-users').then((res) => {
            setUserList(res.data);
        });
    };


    const removeUser = (userId) => {
        http.delete(`/user/remove/${userId}`)
        .then(() => {
            getUsers(); 
        })
        .catch(error => {
            console.error('Failed to remove user:', error);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Users
            </Typography>


            <Grid container spacing={2}>
                {
                    userList.map((user, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={user.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {user.name} - {user.email}
                                            </Typography>
                                            <IconButton color="secondary" onClick={() => removeUser(user.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <Typography>
                                                Points: {user.points}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <Typography>
                                                Discount: {user.discount}%
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

export default Users;