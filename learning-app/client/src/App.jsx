import './App.css';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tutorials from './pages/Tutorials';
import AddTutorial from './pages/AddTutorial';
import EditTutorial from './pages/EditTutorial';
import Mapping from './pages/Mapping';

function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                Learning
              </Typography>
            </Link>
            <Link to="/tutorials" ><Typography>Chargers</Typography></Link>
            <Link to="/mapping" ><Typography>Map</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Container>
        <Routes>
          <Route path={"/"} element={<Tutorials />} />
          <Route path={"/tutorials"} element={<Tutorials />} />
          <Route path={"/addtutorial"} element={<AddTutorial />} />
          <Route path={"/edittutorial/:id"} element={<EditTutorial />} />
          <Route path={"/mapping"} element={<Mapping />} />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
