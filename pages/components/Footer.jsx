import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2C3E50',
                color: '#ECF0F1',
                py: 3,
                position: 'absolute',
                bottom: 0,
                width: '100%'
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    {/* Copyright Text */}
                    <Typography variant="body2" sx={{ fontFamily: 'Quicksand' }}>
                        © {new Date().getFullYear()} THa. All rights reserved.
                    </Typography>

                    {/* Social Links */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton
                            component={Link}
                            href="https://github.com/treehouseapps"
                            target="_blank"
                            sx={{ color: '#ECF0F1', '&:hover': { color: '#3498DB' } }}
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://www.linkedin.com/in/bereket-tsegaye-60a603202/"
                            target="_blank"
                            sx={{ color: '#ECF0F1', '&:hover': { color: '#3498DB' } }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="mailto:bbekijunior@gmail.com"
                            sx={{ color: '#ECF0F1', '&:hover': { color: '#3498DB' } }}
                        >
                            <EmailIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 