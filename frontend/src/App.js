import React from 'react';
import Navbar from './components/Navbar.js';
import Admin from './pages/Admin.js';
import Adopt from './pages/Adopt.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import { CssBaseline } from '@mui/material/';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/admin' component={Admin} />
        <Route path='/adopt' component={Adopt} />
        <Route path='/login' component={Login} />
        <Route path='/signUp' component={SignUp} />
      </Switch>
    </>
  );
}

export default App;
