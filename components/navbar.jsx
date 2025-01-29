// components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Home, Logout } from '@mui/icons-material';
import Link from 'next/link';

function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '1px 2px 10px 0.5px lightgray', color: 'black', width: '100%', margin: '0 auto' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', paddingLeft: '4rem' }}>
                    THa Employee Management System
                </Typography>
                <Link href="/" passHref>
                    <Button color="inherit" startIcon={<Home />} sx={{ color: 'black' }}>
                        Home
                    </Button>
                </Link>
                <Link href="/logout" passHref>
                    <Button color="inherit" startIcon={<Logout />} sx={{ color: 'black', marginLeft: '1rem' }}>
                        Logout
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;