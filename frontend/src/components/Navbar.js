import React from 'react';
import { Typography, AppBar, Button, List, ListItem, Toolbar, useMediaQuery } from '@mui/material/';
import { Link } from 'react-router-dom';
import { theme } from './Theme.js';
import NavDrawer from './NavDrawer.js';

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
    }, {
        id: 4,
        path: "/adminNews",
        title: "Manage News",
    }, {
        id: 5,
        path: "/adminPets",
        title: "Manage Pets",
    }, {   
        id: 2,
        path:"/signUp",
        title:"Sign Up",
    }, {
        id: 3,
        path: "/login",
        title: "Login",
    },
]

export default function Navbar() {
    const mobileView = useMediaQuery(theme.breakpoints.down("sm"));    
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
                        <ListItem key={navLink.id}>
                            <Link to={navLink.path} style={linkStyle}>
                                {(navLink.path === "/signUp" || navLink.path === "/login" ? 
                                    (<Button variant="contained" sx={{...buttonStyle}}>
                                        <Typography variant="h6" sx={{...wordStyle}}>{navLink.title}</Typography>
                                    </Button>)
                                    : (<Typography variant="h6" sx={{...wordStyle}}>{navLink.title}</Typography>)
                                )}
                            </Link>
                        </ListItem>
                    ))}
                </List>
                )}
            </Toolbar>
        </AppBar>
    );
}