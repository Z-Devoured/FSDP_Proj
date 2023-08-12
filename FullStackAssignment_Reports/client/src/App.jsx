import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Reports from './pages/Reports(Admin)';
import AddTutorial from './pages/AddReport';
import EditTutorial from './pages/EditReport';
import UserAddReport from './pages/UserAddReport'
import ContactUs from './pages/ContactUs'


function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                EVPcharge
              </Typography>
            </Link>
            <Link to="/reports" ><Typography>Reports</Typography></Link>
            <Link to="/contactus"><Typography>Contact Us</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Reports />} />
          <Route path={"/reports"} element={<Reports />} />
          <Route path={"/addtutorial"} element={<AddTutorial />} />
          <Route path={"/edittutorial/:id"} element={<EditTutorial />} />
          <Route path={"/useraddreport"} element={<UserAddReport />} />
          <Route path={"/contactus"} element={<ContactUs />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
