import React from 'react';
import { Box, Typography, Slide } from '@mui/material';
import Alert from '@mui/material/Alert';

const MessageBox = ({ isOpen, message = '', type = 'info', onClose }) => {
  const bgColor = ['success', 'error', 'info', 'warning'].includes(type) ? type : 'info';

  return (
    <Slide in={isOpen} direction="down" mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: '20px',
          left: '0',
          right: '0',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          pointerEvents: 'none'
        }}
      >
        <Alert
          severity={bgColor}
          onClose={onClose}
          sx={{
            maxWidth: '400px',
            width: '90%',
            pointerEvents: 'auto',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            '& .MuiAlert-message': {
              flex: 1,
              textAlign: 'center'
            }
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {message}
          </Typography>
        </Alert>
      </Box>
    </Slide>
  );
};

export default MessageBox;