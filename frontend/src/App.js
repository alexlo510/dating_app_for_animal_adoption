import React from 'react';
import Navbar from './components/Navbar.js';
import AdminNews from './pages/AdminNews.js';
import AdminPets from './pages/AdminPets.js';
import Adopt from './pages/Adopt.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import UserProfile from './pages/UserProfile';
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
        <ProtectedRoute path='/adminNews' component={AdminNews} isAuth={sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).is_admin}/>
        <ProtectedRoute path='/adminPets' component={AdminPets} isAuth={sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).is_admin}/>
        <Route path='/adopt' component={Adopt} />
        <ProtectedRoute path='/login' component={Login} isAuth={!sessionStorage.getItem('user')}/>
        <ProtectedRoute path='/signUp' component={SignUp} isAuth={!sessionStorage.getItem('user')}/>
        <ProtectedRoute path='/profile' component={UserProfile} isAuth={sessionStorage.getItem('user')}/>
      </Switch>
    </>
  );
}

export default App;
