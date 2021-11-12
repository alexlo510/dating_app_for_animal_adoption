import React from 'react';
import Navbar from './components/Navbar.js';
import Adopt from './pages/Adopt.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import { CssBaseline } from '@mui/material/';
import { Route, Switch } from 'react-router-dom';
import { useUserContext } from './components/UserContext.js'
import './App.css';

function App() {
  const { user } = useUserContext();

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/adopt' component={Adopt} />
        {/* <Route path='/login' component={Login} />
        <Route path='/signUp' component={SignUp} /> */}
      
        <ProtectedRoute path='/login' component={Login} isAuth={!sessionStorage.getItem("user")}/>
        <ProtectedRoute path='/signUp' component={SignUp} isAuth={!sessionStorage.getItem("user")}/>
        {/* <ProtectedRoute path='/adminNews' component={AdminNews} isAuth={user.role == "admin"}/>
        <ProtectedRoute path='/adminPets' component={AdminPets} isAuth={user.role == "admin"}/> */}
        {/* Change user.role == "admin" depending on how the backend passes the admin role*/}
      </Switch>
    </>
  );
}

export default App;
