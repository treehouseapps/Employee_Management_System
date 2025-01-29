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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { Email as EmailIcon, LocalPhone, InboxOutlined, Fingerprint, Wc, CalendarToday, BusinessCenter, WorkHistory } from '@mui/icons-material';
import { useMessage } from '../components/MessageContext';

const EMPLOYMENT_STATUS = {
    1: 'Full Time',
    2: 'Part Time',
    3: 'Contract',
    4: 'Internship'
};
const EMPLOYMENT_DEPARTEMENT = {
    1: 'Human Resources (HR)',
    2: 'Finance & Accounting',
    3: 'Marketing & Sales',
    4: 'Operations',
    5: 'IT/Engineering'
};

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
    const [editErrors, setEditErrors] = useState({});

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTempEmpData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validateEditForm = () => {
        const newErrors = {};

        if (!tempEmpData) {
            return false;
        }

        if (!tempEmpData.name || tempEmpData.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        }

        if (!tempEmpData.email || !validateEmail(tempEmpData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!tempEmpData.phoneNumber || !validatePhone(tempEmpData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        if (!tempEmpData.gender || tempEmpData.gender === '') {
            newErrors.gender = 'Please select a gender';
        }

        if (!tempEmpData.age || tempEmpData.age < 18 || tempEmpData.age > 55) {
            newErrors.age = 'Age must be between 18 and 55';
        }

        if (!tempEmpData.department || tempEmpData.department === '') {
            newErrors.department = 'Please select a department';
        }

        if (!tempEmpData.position || tempEmpData.position === '') {
            newErrors.position = 'Please select a position';
        }

        if (!tempEmpData.employmentStatus || tempEmpData.employmentStatus === '') {
            newErrors.employmentStatus = 'Please select an employment status';
        }

        setEditErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const refreshEmployeeList = async () => {
        try {
            const response = await fetch('/api/service');
            const { data } = await response.json();
            if (Array.isArray(data)) {
                setEmployees(data);
            }
        } catch (error) {
            console.error('Error refreshing employee list:', error);
            showMessage('Error refreshing list', 'error');
        }
    };

    const handleSave = async () => {
        if (!validateEditForm()) {
            showMessage('Please input the correct data before saving', 'error');
            return;
        }
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

            const { message } = await response.json();
            showMessage(message, 'success');

            // Refresh the list using the new function
            await refreshEmployeeList();

            setTempEmpData(null);
            setEditErrors({});
        } catch (error) {
            console.error('Error updating employee:', error);
            showMessage('Error updating employee', 'error');
        }
    };

    const handleDeleteClick = (employee) => {
        setDeleteConfirmation({
            open: true,
            employeeId: employee._id,
            employeeName: employee.name
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
        setEditErrors({});
    };

    // Inside your component, add this helper function
    const getEmploymentStatusText = (statusCode) => EMPLOYMENT_STATUS[statusCode] || 'Unknown';
    const getEmploymentDepartementText = (statusCode) => EMPLOYMENT_DEPARTEMENT[statusCode] || 'Unknown';

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
                                    position: 'relative',
                                }}
                            >
                                {employee.empStatus === 'edited' && (
                                    <EditIcon sx={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        color: 'primary.main',
                                        fontSize: '20px'
                                    }} />
                                )}
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
                                    {employee.name}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                    {employee.position}
                                </Typography>
                                {/* Additional Details */}
                                <Box sx={{ textAlign: 'left', marginTop: '1rem' }}>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Fingerprint sx={{ marginRight: '0.5rem' }} /> {employee._id}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <EmailIcon sx={{ marginRight: '0.5rem' }} /> {employee.email}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Wc sx={{ marginRight: '0.5rem' }} /> {employee.gender}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarToday sx={{ marginRight: '0.5rem' }} /> {employee.age}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocalPhone sx={{ marginRight: '0.5rem' }} /> {employee.phoneNumber}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <BusinessCenter sx={{ marginRight: '0.5rem' }} /> {getEmploymentDepartementText(employee.department)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <WorkHistory sx={{ marginRight: '0.5rem' }} />
                                        {getEmploymentStatusText(employee.employmentStatus)}
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
                            width: 600,
                            bgcolor: 'white',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" component="h2" mb={2}>
                            Edit Employee
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Full Name"
                                name="name"
                                value={tempEmpData.name}
                                onChange={handleInputChange}
                                fullWidth
                                error={!!editErrors.name}
                                helperText={editErrors.name}
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={tempEmpData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!editErrors.email}
                                    helperText={editErrors.email}
                                />
                                <TextField
                                    label="Phone"
                                    name="phoneNumber"
                                    value={tempEmpData.phoneNumber}
                                    onChange={handleInputChange}
                                    sx={{ width: '200px' }}
                                    error={!!editErrors.phoneNumber}
                                    helperText={editErrors.phoneNumber}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <FormControl
                                    sx={{ width: '200px' }}
                                    error={!!editErrors.gender}
                                >
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        value={tempEmpData.gender}
                                        label="Gender"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                    {editErrors.gender && (
                                        <FormHelperText>{editErrors.gender}</FormHelperText>
                                    )}
                                </FormControl>
                                <TextField
                                    label="Age"
                                    name="age"
                                    type="number"
                                    value={tempEmpData.age}
                                    onChange={handleInputChange}
                                    sx={{ width: '150px' }}
                                    error={!!editErrors.age}
                                    helperText={editErrors.age}
                                    InputProps={{ inputProps: { min: 18, max: 100 } }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <FormControl
                                    sx={{ width: '50%' }}
                                    error={!!editErrors.department}
                                >
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        name="department"
                                        value={tempEmpData.department || ''}
                                        label="Department"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1}>Human Resources (HR)</MenuItem>
                                        <MenuItem value={2}>Finance & Accounting</MenuItem>
                                        <MenuItem value={3}>Marketing & Sales</MenuItem>
                                        <MenuItem value={4}>Operations</MenuItem>
                                        <MenuItem value={5}>IT/Engineering</MenuItem>
                                    </Select>
                                    {editErrors.department && (
                                        <FormHelperText>{editErrors.department}</FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl
                                    sx={{ width: '50%' }}
                                    error={!!editErrors.position}
                                >
                                    <InputLabel>Position</InputLabel>
                                    <Select
                                        name="position"
                                        value={tempEmpData.position}
                                        label="Position"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Team Leader">Team Leader</MenuItem>
                                        <MenuItem value="Assistant">Assistant</MenuItem>
                                        <MenuItem value="Member">Member</MenuItem>
                                    </Select>
                                    {editErrors.position && (
                                        <FormHelperText>{editErrors.position}</FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <FormControl
                                fullWidth
                                error={!!editErrors.employmentStatus}
                            >
                                <InputLabel>Employment Status</InputLabel>
                                <Select
                                    name="employmentStatus"
                                    value={getEmploymentStatusText(tempEmpData.employmentStatus)}
                                    label="Employment Status"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                                    <MenuItem value={'Part Time'}>Part Time</MenuItem>
                                    <MenuItem value={'Contract'}>Contract</MenuItem>
                                    <MenuItem value={'Internship'}>Internship</MenuItem>
                                </Select>
                                {editErrors.employmentStatus && (
                                    <FormHelperText>{editErrors.employmentStatus}</FormHelperText>
                                )}
                            </FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                <Button onClick={handleClose} variant="outlined" color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        padding: '0.8rem 2rem',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Box>
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
