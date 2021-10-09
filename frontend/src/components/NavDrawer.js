import React, { useState } from 'react';
import {Drawer, IconButton, List, ListItem, Typography} from "@mui/material/";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { navLinks } from './Navbar';

const linkStyle = {
    textDecoration: "none",
};

export default function NavDrawer() {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleMenuClick = () => {
        setOpenDrawer(!openDrawer)
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false)
    }

    return (
        <>
        <Drawer open={openDrawer} onClose={handleDrawerClose}>
            <List>
                {navLinks.map((navLink) => (
                    <ListItem key={navLink.id}>
                        <Link to={navLink.path} style={linkStyle}>
                            <Typography variant="h6" color="teal" onClick={handleDrawerClose}>{navLink.title}</Typography>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
        <IconButton onClick={handleMenuClick}>
            <MenuIcon sx={{color:"white"}}/>
        </IconButton>
        </>
    );
}