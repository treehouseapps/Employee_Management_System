import { Box, Typography, Divider, Backdrop, CircularProgress } from '@mui/material';
import {
    Apartment,
    BusinessCenter,
    AccountBalance,
    Engineering,
    Groups as GroupsIcon,
    Man as ManIcon,
    Memory,
    Woman as WomanIcon,
    Storefront
} from '@mui/icons-material';
import Sidebar from '../components/sidebar';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const dashboardData = {
        totalEmployees: employees?.length || 0,
        totalDepartments: new Set(employees?.map(emp => emp?.department) || []).size,
        genderDistribution: {
            male: employees?.filter(emp => emp?.gender === 'Male')?.length || 0,
            female: employees?.filter(emp => emp?.gender === 'Female')?.length || 0
        },
        departmentDistribution: {
            HR: employees?.filter(emp => emp?.department === 1)?.length || 0,
            Finance: employees?.filter(emp => emp?.department === 2)?.length || 0,
            Marketing: employees?.filter(emp => emp?.department === 3)?.length || 0,
            Operations: employees?.filter(emp => emp?.department === 4)?.length || 0,
            IT: employees?.filter(emp => emp?.department === 5)?.length || 0
        },
        employmentStatus: {
            fulltime: employees?.filter(emp => emp?.employmentStatus === 1)?.length || 0,
            parttime: employees?.filter(emp => emp?.employmentStatus === 2)?.length || 0,
            contract: employees?.filter(emp => emp?.employmentStatus === 3)?.length || 0,
            internship: employees?.filter(emp => emp?.employmentStatus === 4)?.length || 0
        }
    };

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
        }}>
            <Sidebar />
            <Box sx={{ padding: '1rem 2rem', position: 'relative' }}>
                <Backdrop
                    sx={{
                        color: '#fff',
                        position: 'absolute',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }}
                    open={loading}
                >
                    <CircularProgress color="primary" />
                </Backdrop>
                <Typography variant="h4" component="h1" sx={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '2rem',
                }}>
                    Dashboard Overview
                </Typography>
                <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={2}>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        margin={2}
                        height='max-content'
                        borderRadius={4}
                        width='max-content'>
                        <Box sx={{
                            backgroundColor: 'skyblue',
                            padding: '1rem',
                            borderTopLeftRadius: '20%',
                            borderBottomLeftRadius: '20%',
                        }}>
                            <GroupsIcon fontSize='large'
                                sx={{ color: 'white', marginTop: '0.5rem' }} />
                        </Box>
                        <Box p={2} backgroundColor='white'>
                            <Typography variant="h6" component="h2" sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                            }}>
                                Total Employees
                            </Typography>
                            <Typography>{dashboardData.totalEmployees}</Typography>
                        </Box>
                    </Box>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        margin={2}
                        height='max-content'
                        borderRadius={4}
                        width='max-content'>
                        <Box sx={{
                            backgroundColor: 'skyblue',
                            padding: '1rem',
                            borderTopLeftRadius: '20%',
                            borderBottomLeftRadius: '20%',
                        }}>
                            <Apartment fontSize='large'
                                sx={{ color: 'white', marginTop: '0.5rem' }} />
                        </Box>
                        <Box p={2} backgroundColor='white'>
                            <Typography variant="h6" component="h2" sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                            }}>
                                Total Departments
                            </Typography>
                            <Typography>{dashboardData.totalDepartments}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ margin: '.5rem' }} />
                <Box display='grid' gridTemplateColumns='2fr 3fr' gap={4}>
                    <Box p={1} borderRight={1} borderColor='black'>
                        <Typography mt={1} variant="h4" component="h1" sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: '0.9rem',
                        }}>
                            Employees Gender
                        </Typography>
                        <Box display='grid' gridTemplateColumns='repeat(2, 1fr)'  >
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ManIcon
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        Male
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.genderDistribution.male}</Typography>
                                </Box>
                            </Box>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <WomanIcon
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        Female
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.genderDistribution.female}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} >
                        <Typography mt={1} variant="h4" component="h1" sx={{
                            fontWeight: 'bold',
                            color: 'black',
                            fontSize: '0.9rem',
                        }}>
                            Employees Department
                        </Typography>
                        <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={1}>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <BusinessCenter
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        Human Resources (HR)
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.HR}</Typography>
                                </Box>
                            </Box>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <AccountBalance
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        Finance & Accounting
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.Finance}</Typography>
                                </Box>
                            </Box>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Engineering
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        Operations
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.Operations}</Typography>
                                </Box>
                            </Box>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Memory
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        IT/Engineering
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.IT}</Typography>
                                </Box>
                            </Box>
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                margin={1.5}
                                height='max-content'
                                borderRadius={2}
                                width='max-content'>
                                <Box sx={{
                                    backgroundColor: 'skyblue',
                                    padding: '0.7rem',
                                    borderTopLeftRadius: '20%',
                                    borderBottomLeftRadius: '20%',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Storefront
                                        sx={{ color: 'white', fontSize: '1.8rem' }} />
                                </Box>
                                <Box p={1.5} backgroundColor='white' sx={{
                                    height: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <Typography variant="h6" component="h2" sx={{
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem',
                                    }}>
                                        Marketing & Sales
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>{dashboardData.departmentDistribution.Marketing}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ margin: '.5rem' }} />

                <Box p={1} >
                    <Typography mt={1} variant="h4" component="h1" sx={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '1rem',
                    }}>
                        Employment Status
                    </Typography>
                    <Box display='grid' gridTemplateColumns='repeat(4, 1fr)' gap={2}>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Full Time
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.fulltime}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Part Time
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.parttime}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Internship
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.internship}</Typography>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            margin={2}
                            height='max-content'
                            borderRadius={2}
                            width='max-content'>
                            <Box sx={{
                                backgroundColor: 'skyblue',
                                padding: '1rem',
                                borderTopLeftRadius: '20%',
                                borderBottomLeftRadius: '20%',
                                height: '4rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GroupsIcon
                                    sx={{ color: 'white', fontSize: '2.2rem' }} />
                            </Box>
                            <Box p={2} backgroundColor='white' sx={{
                                height: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Typography variant="h6" component="h2" sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}>
                                    Contract
                                </Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{dashboardData.employmentStatus.contract}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;