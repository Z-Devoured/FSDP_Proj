import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';
import http from '../http';

function Tutorials() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const areaFromLink = searchParams.get('area');

    const [tutorialList, setTutorialList] = useState([]);
    const [search, setSearch] = useState(areaFromLink || '');

    const fetchTutorials = async () => {
        try {
            const res = await http.get(`/tutorial${search ? `?search=${search}` : ''}`);
            setTutorialList(res.data);
        } catch (error) {
            // Handle the error here
            console.error('Error fetching tutorials:', error);
        }
    };

    useEffect(() => {
        fetchTutorials();
    }, []);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const onSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchTutorials();
        }
    };

    const onClickSearch = () => {
        fetchTutorials();
    };

    const onClickClear = () => {
        setSearch('');
        fetchTutorials();
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Charging Stations
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
                <Link to="/addtutorial" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>

            <Grid container spacing={2}>
                {tutorialList.map((tutorial, i) => {
                    const statusColor = tutorial.status === 'Online' ? 'green' : 'red';

                    return (
                        <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', mb: 1 }}>
                                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                            {tutorial.area}
                                        </Typography>
                                        <Link to={`/edittutorial/${tutorial.id}`}>
                                            <IconButton color="primary" sx={{ padding: '4px' }}>
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                    </Box>
                                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                        Location: {tutorial.location}
                                    </Typography>
                                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                        Station: {tutorial.stationid}
                                    </Typography>
                                    <Typography sx={{ whiteSpace: 'pre-wrap', color: statusColor }}>
                                        {tutorial.status}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} color="text.secondary">
                                        <AccessTime sx={{ mr: 1 }} />
                                        <Typography>
                                            Created Date: {dayjs(tutorial.createdAt).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                        color="text.secondary">
                                        <AccessTime sx={{ mr: 1 }} />
                                        <Typography>
                                            Last Updated: {dayjs(tutorial.updatedAt).format(global.datetimeFormat)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default Tutorials;