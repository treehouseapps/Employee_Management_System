import {
    Avatar,
    Box,
    Typography,
    Container,
    Grid,
    Divider,
    Button,
    Modal,
    TextField,
    CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Email as EmailIcon, GpsFixed, LocalPhone, Apartment, InboxOutlined } from '@mui/icons-material';
import { useMessage } from './components/MessageContext';

export default function DisplayEmployee() {
    const [employees, setEmployees] = useState([]);
    const [tempEmpData, setTempEmpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showMessage } = useMessage();
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        employeeId: null,
        employeeName: ''
    });

    useEffect(() => {
        fetch('/api/service')
            .then((response) => response.json())
            .then(({ message, data }) => {
                if (Array.isArray(data)) {
                    setEmployees(data);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch((error) => console.error('Error fetching employees:', error))
            .finally(() => setLoading(false));
    }, []);

    const handleEditClick = (employee) => {
        setTempEmpData(employee);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempEmpData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/service?id=${tempEmpData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tempEmpData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { message, data } = await response.json();
            showMessage(message, 'success')
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp._id === tempEmpData._id ? { ...data, _id: emp._id } : emp
                )
            );
            setTempEmpData(null);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleDeleteClick = (employee) => {
        setDeleteConfirmation({
            open: true,
            employeeId: employee._id,
            employeeName: employee.fullName
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/service?id=${deleteConfirmation.employeeId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                showMessage("Data Deleted Successfully", 'success')
            }
            setEmployees((prevEmployees) =>
                prevEmployees.filter((emp) => emp._id !== deleteConfirmation.employeeId)
            );
            handleCloseDeleteModal();
        } catch (error) {
            showMessage('Error deleting employee:', error);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteConfirmation({
            open: false,
            employeeId: null,
            employeeName: ''
        });
    };

    const handleClose = () => {
        setTempEmpData(null);
    };

    return (
        <Container
            component="main"
            sx={{
                boxShadow: '1px 2px 10px 0.5px lightblue',
                marginTop: '2rem',
                padding: '1rem !important',
                borderRadius: '.5rem',
                backgroundColor: 'white',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography align="center" variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                Displayed Results
            </Typography>
            <Divider sx={{ marginBottom: '1rem', width: '100%' }} />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <CircularProgress />
                </Box>
            ) : employees.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    minHeight: '200px'
                }}>
                    <InboxOutlined sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        No employees found
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {employees.map((employee) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={employee._id}>
                            {/* Employee Card */}
                            <Box
                                sx={{
                                    boxShadow: '1px 2px 10px 0.5px lightblue',
                                    padding: '1rem',
                                    borderRadius: '.5rem',
                                    textAlign: 'center',
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <Avatar
                                    src={employee.img || '/placeholder.png'} // Fallback for missing images
                                    alt={employee.name}
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        margin: '0 auto 1rem',
                                        border: '.3rem solid lightblue',
                                    }}
                                />
                                <Typography variant="h6" fontWeight="bold">
                                    {employee.fullName}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    {employee.position}
                                </Typography>
                                {/* Additional Details */}
                                <Box sx={{ textAlign: 'left', marginTop: '1rem' }}>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <GpsFixed sx={{ marginRight: '0.5rem' }} /> {employee._id}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <EmailIcon sx={{ marginRight: '0.5rem' }} /> {employee.email}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocalPhone sx={{ marginRight: '0.5rem' }} /> {employee.phone}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Apartment sx={{ marginRight: '0.5rem' }} /> {employee.department}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{ fontWeight: 'bold' }}
                                        onClick={() => handleEditClick(employee)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ fontWeight: 'bold' }}
                                        onClick={() => handleDeleteClick(employee)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
            {tempEmpData && (
                <Modal open={Boolean(tempEmpData)} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'white',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2" mb={2}>
                            Edit Employee
                        </Typography>
                        <TextField
                            label="Name"
                            name="fullName"
                            value={tempEmpData.fullName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={tempEmpData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={tempEmpData.phone}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Position"
                            name="position"
                            value={tempEmpData.position}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Department"
                            name="department"
                            value={tempEmpData.department}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
                            <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginRight: '1rem' }}>
                                Save
                            </Button>
                            <Button onClick={handleClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            )}
            <Modal
                open={deleteConfirmation.open}
                onClose={handleCloseDeleteModal}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        Confirm Delete
                    </Typography>
                    <Typography mb={3}>
                        Are you sure you want to delete {deleteConfirmation.employeeName}? This action cannot be undone.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            onClick={handleCloseDeleteModal}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}
