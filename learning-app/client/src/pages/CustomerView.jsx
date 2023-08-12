import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
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
                Charging Stations Available
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
            </Box>

            <Grid container spacing={2}>
                {tutorialList.map((tutorial, i) => {
                    if (tutorial.status !== 'Offline') { // Check if the status is not 'Offline'
                        const statusColor = tutorial.status === 'Online' ? 'green' : 'red';

                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {tutorial.area}
                                            </Typography>
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
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    } else {
                        return null; // Return null for offline stations
                    }
                })}
            </Grid>
        </Box>
    );
}

export default Tutorials;