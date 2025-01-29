import { Box, Button } from '@mui/material';
import Link from 'next/link';
const Sidebar = () => {
    return (
        <Box sx={{
            width: '250px',
            height: '100vh',
            backgroundColor: 'white',
            boxShadow: '1px 2px 10px 0.5px lightgray',
            p: 2,
            marginTop: '0.5rem',
            borderRadius: '0.5rem'
        }}>
            <Box>
                <Button variant="contained" color="info" sx={{ width: '100%', marginBottom: '1rem' }}>
                    <Link href="/dashboard" passHref> Dashboard</Link>
                </Button>
                <Button variant="contained" color="info" sx={{ width: '100%', marginBottom: '1rem' }}>
                    <Link href="/register" passHref> Register</Link>
                </Button>
                <Button variant="contained" color="info" sx={{ width: '100%', marginBottom: '1rem' }}>
                    <Link href="/display" passHref> Display</Link>
                </Button>
            </Box>
        </Box>
    );
}

export default Sidebar;