import { Box, Typography } from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { Air } from '@mui/icons-material';
const Logout = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            backgroundColor: '#f5f5f5',
            textAlign: 'center'
        }}>
            <Box sx={{ marginBottom: '2rem' }}>
                <SentimentSatisfiedIcon sx={{
                    fontSize: '80px',
                    color: '#666',
                    opacity: 0.8
                }} />
            </Box>
            <Typography variant="h4" component="h1" sx={{
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '1rem',
            }}>
                Just Get out of here
            </Typography>
            <Typography variant="h4" sx={{
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
            }}>
                Sho Sho <Air />
            </Typography>
        </Box>
    );
}

export default Logout; 