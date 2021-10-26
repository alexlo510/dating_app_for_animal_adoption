import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, Typography } from "@mui/material/";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { navLinks } from './Navbar';
import { useUserContext } from './UserContext.js';

const linkStyle = {
    textDecoration: "none",
};

export default function NavDrawer() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { user, setUser } = useUserContext();

    const handleMenuClick = () => {
        setOpenDrawer(!openDrawer)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false)
    }

    const handleLogout = () => {
        // handle logout
        setUser(null)
        setOpenDrawer(false)
    }

    return (
        <>
        <Drawer open={openDrawer} onClose={handleDrawerClose}>
            <List>
                {navLinks.map((navLink) => (
                    user ? (navLink.path === "/signUp" || navLink.path === "/login" ? null : <ListItem key={navLink.id}>
                        <Link to={navLink.path} style={linkStyle}>
                            <Typography variant="h6" color="teal" onClick={handleDrawerClose}>{navLink.title}</Typography>
                        </Link>
                    </ListItem>)
                    :   <ListItem key={navLink.id}>
                            <Link to={navLink.path} style={linkStyle}>
                                <Typography variant="h6" color="teal" onClick={handleDrawerClose}>{navLink.title}</Typography>
                            </Link>
                        </ListItem>
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