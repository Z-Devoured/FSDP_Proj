import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
  IconButton,
  Button,
} from '@mui/material';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import http from '../http';
import dayjs from 'dayjs';
import global from '../global';

function Reports() {
  const [tutorialList, setTutorialList] = useState([]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getTutorials = () => {
    http.get('/report').then((res) => {
      setTutorialList(res.data);
    });
  };

  const searchTutorials = () => {
    http.get(`/report?search=${search}`).then((res) => {
      setTutorialList(res.data);
    });
  };

  useEffect(() => {
    getTutorials();
  }, []);

  const onSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchTutorials();
    }
  };

  const onClickSearch = () => {
    searchTutorials();
  };

  const onClickClear = () => {
    setSearch('');
    getTutorials();
  };

  useEffect(() => {
    http.get('/report').then((res) => {
      console.log(res.data);
      setTutorialList(res.data);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Reports
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Input
          value={search}
          placeholder="Search"
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
        />
        <IconButton color="primary" onClick={onClickSearch}>
          <Search />
        </IconButton>
        <IconButton color="primary" onClick={onClickClear}>
          <Clear />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Link to="/addtutorial" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Add</Button>
        </Link>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Report ID</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tutorialList.map((report, i) => (
              <TableRow key={report.id}>
                <TableCell>{report.cust_name}</TableCell>
                <TableCell>
                  {dayjs(report.createdAt).format(global.datetimeFormat)}
                </TableCell>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.severity}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>
                  <Link to={`/edittutorial/${report.id}`}>
                    <IconButton color="primary" sx={{ padding: '4px' }}>
                      <Edit />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Box>
    );
}

export default Reports;
