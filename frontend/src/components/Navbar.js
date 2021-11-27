import React from 'react';
import Axios from 'axios';
import { Typography, AppBar, Button, List, ListItem, Toolbar, useMediaQuery } from '@mui/material/';
import { Link, useHistory } from 'react-router-dom';
import { theme } from './Theme.js';
import NavDrawer from './NavDrawer.js';
import { useUserContext } from './UserContext.js';

const linkStyle = {
    textDecoration: "none",
};

const spacerStyle = {
    flexGrow: "1",
};

const navLinksStyle = {
    display: 'flex',
    flexDirection: 'row',
}

const wordStyle = {
    width: "max-content",
    color: "white",
}

const buttonStyle = {
    backgroundColor: "#2196F3",
}

export const navLinks = [
    {
        id: 1,
        path:"/adopt",
        title:"Adopt",
        auth: "all"
    }, {
        id: 4,
        path: "/adminNews",
        title: "Manage News",
        auth: "admin"
    }, {
        id: 5,
        path: "/adminPets",
        title: "Manage Pets",
        auth: "admin"
    }, {   
        id: 2,
        path:"/signUp",
        title:"Sign Up",
        auth: "all"
    }, {
        id: 3,
        path: "/login",
        title: "Login",
        auth: "all"
    },
]

export default function Navbar() {
    const mobileView = useMediaQuery(theme.breakpoints.down("md"));
    const { user, setUser } = useUserContext();
    const history = useHistory();

    const handleLogout = () => {
        try {
            const res = Axios.get(`https://pet-shelter-api.uw.r.appspot.com/logout?accesstoken=${user.accesstoken}`)
            setUser(null)
            sessionStorage.clear()
            //localStorage.clear()
            history.push("/")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AppBar className="navbar" position ="static">
            <Toolbar sx={{backgroundColor: "teal"}}>
                <Link to="/" style={linkStyle}>
                    <Typography variant="h6" sx={{...wordStyle}}>Animal Adoption</Typography>
                </Link>
                <div style={spacerStyle}></div>
                {mobileView ? (<NavDrawer/>) : (
                <List sx={{...navLinksStyle}}>
                    {navLinks.map((navLink) => (
                        navLink.auth === "all" ? 
                        <ListItem key={navLink.id}>
                            <Link to={navLink.path} style={linkStyle}>
                                {(navLink.path === "/signUp" || navLink.path === "/login" ?
                                    (!user ? <Button variant="contained" sx={{...buttonStyle}}>
                                        <Typography variant="h6" sx={{...wordStyle}}>{navLink.title}</Typography>
                                    </Button> : null)
                                    : (<Typography variant="h6" sx={{...wordStyle}}>{navLink.title}</Typography>)
                                )}
                            </Link>
                        </ListItem> 
                        :
                        (navLink.auth === "admin" && user && user.is_admin) ? 
                        <ListItem key={navLink.id}>
                            <Link to={navLink.path} style={linkStyle}>
                                {(navLink.path === "/signUp" || navLink.path === "/login" ?
                                    (!user ? <Button variant="contained" sx={{...buttonStyle}}>
                                        <Typography variant="h6" sx={{...wordStyle}}>{navLink.title}</Typography>
                                    </Button> : null)
                                    : (<Typography variant="h6" sx={{...wordStyle}}>{navLink.title}</Typography>)
                                )}
                            </Link>
                        </ListItem> : null
                    ))}
                    {user ?
                        <>
                            <ListItem>
                                <Link to='/profile' style={linkStyle}>
                                    <Typography variant="h6" sx={{...wordStyle}}>{user.user_alias}</Typography>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" sx={{...buttonStyle}}>
                                    <Typography variant="h6" sx={{...wordStyle}} onClick={handleLogout}>Logout</Typography>
                                </Button>
                            </ListItem> 
                        </>
                    : null
                    }
                </List>
                )}
            </Toolbar>
        </AppBar>
    );
}