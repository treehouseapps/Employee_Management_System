// components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Home, PersonAdd, Reorder } from '@mui/icons-material';
import Link from 'next/link';

function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', width: '90%', margin: '0 auto' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
                    THa Employee Management System
                </Typography>
                <Link href="/" passHref>
                    <Button color="inherit" startIcon={<Home />} sx={{ color: 'black' }}>
                        Home
                    </Button>
                </Link>
                <Link href="/register" passHref>
                    <Button color="inherit" startIcon={<PersonAdd />} sx={{ color: 'black' }}>
                        Register
                    </Button>
                </Link>
                <Link href="/display" passHref>
                    <Button color="inherit" startIcon={<Reorder />} sx={{ color: 'black' }}>
                        Display
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;