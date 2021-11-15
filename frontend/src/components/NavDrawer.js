import React, { useState } from 'react';
import Axios from 'axios';
import { Drawer, IconButton, List, ListItem, Typography } from "@mui/material/";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory } from "react-router-dom";
import { navLinks } from './Navbar';
import { useUserContext } from './UserContext.js';

const linkStyle = {
    textDecoration: "none",
};

export default function NavDrawer() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { user, setUser } = useUserContext();
    const history = useHistory();

    const handleMenuClick = () => {
        setOpenDrawer(!openDrawer)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false)
    }

    const handleLogout = () => {
        try {
            const res = Axios.get(`https://pet-shelter-api.uw.r.appspot.com/logout?accesstoken=${user.accesstoken}`)
            setUser(null)
            setOpenDrawer(false)
            sessionStorage.clear()
            //localStorage.clear()
            history.push("/")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <Drawer open={openDrawer} onClose={handleDrawerClose}>
            <List>
                {user && <Typography variant="h6" sx={{paddingLeft: 1}}>{user.alias}</Typography>}
                {navLinks.map((navLink) => (
                    navLink.auth === "all" ? 
                        (user ? (navLink.path === "/signUp" || navLink.path === "/login" ? null : 
                            <ListItem key={navLink.id}>
                                <Link to={navLink.path} style={linkStyle}>
                                    <Typography variant="h6" color="teal" onClick={handleDrawerClose}>{navLink.title}</Typography>
                                </Link>
                            </ListItem>)
                        :   <ListItem key={navLink.id}>
                                <Link to={navLink.path} style={linkStyle}>
                                    <Typography variant="h6" color="teal" onClick={handleDrawerClose}>{navLink.title}</Typography>
                                </Link>
                            </ListItem>)
                    :
                    (navLink.auth === "admin" && user && user.is_admin) ? 
                        <ListItem key={navLink.id}>
                            <Link to={navLink.path} style={linkStyle}>
                                <Typography variant="h6" color="teal" onClick={handleDrawerClose}>{navLink.title}</Typography>
                            </Link>
                        </ListItem> : null
                ))}
                {user ?
                    <ListItem>
                        <Typography variant="h6" color="teal" onClick={handleLogout} sx={{cursor: "pointer"}}>Logout</Typography>
                    </ListItem>
                : null}
            </List>
        </Drawer>
        <IconButton onClick={handleMenuClick}>
            <MenuIcon sx={{color:"white"}}/>
        </IconButton>
        </>
    );
}