import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Loading from '../components/loading';
import { useMessage } from '../components/MessageContext';

export default function RegisterEmployee() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [text, setText] = useState('Register');
  const [errors, setErrors] = useState({});
  const { showMessage } = useMessage();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;  // Assumes 10-digit phone number
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (department.trim().length < 2) {
      newErrors.department = 'Department must be at least 2 characters long';
    }

    if (position.trim().length < 2) {
      newErrors.position = 'Position must be at least 2 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setDepartment('');
    setPosition('');
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showMessage('Please fix the errors before submitting', 'error');
      return;
    }

    setText(<Loading />);
    try {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, department, position }),
      });

      const result = await response.json();
      if (response.ok) {
        showMessage(result.message, 'success');
        clearForm();  // Clear form after successful submission
        setText('Register');
      } else {
        showMessage(result.message);
        setText('Register');
      }
    } catch (error) {
      console.error('Network error:', error);
      showMessage('Network error');
      setText('Register');
    }
  };

  return (
    <Container component="main" maxWidth="xs"
      sx={{
        boxShadow: '1px 2px 10px 0.5px lightblue',
        marginTop: '2rem',
        padding: '1rem !important',
        borderRadius: '.5rem',
        backgroundColor: 'white'
      }}>
      <CssBaseline />
      <div>
        <Box display='center' gap='1rem'>
          <Avatar m='1'>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bolder', fontFamily: '"Quicksand", "serif"' }}>
            Register Employee
          </Typography>
        </Box>
        <form noValidate onSubmit={onSubmit} >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              error={!!errors.department}
              helperText={errors.department}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              error={!!errors.position}
              helperText={errors.position}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {text}
            </Button>
          </Box>
        </form>
      </div>
    </Container>
  );
}
