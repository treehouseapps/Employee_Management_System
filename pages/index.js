import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Sidebar from '../components/sidebar';
export default function Home() {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
        }}>
            <Sidebar />
            <Container
                component="main"
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                    padding: '2rem',
                    marginTop: '-5rem',
                    position: 'relative',
                    top: '-2rem',
                }}
            >
                <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem', color: 'black' }}>
                    Welcome to Employee Management System
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '2rem', color: 'gray' }}>
                    Easily manage and view your employee details with just a few clicks.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForward />}
                    sx={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
                    href="/register"
                >
                    Get Started
                </Button>
            </Container>
        </Box>
    );
}
