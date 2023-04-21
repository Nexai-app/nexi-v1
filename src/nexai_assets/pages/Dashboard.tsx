import React from 'react';
import { Box } from '@chakra-ui/react';
import DashNavbar from '../components/shared/Navbar3';
import MainDashboard from '../components/MainDashboard';

const Dashboard = () => {
  return (
    <Box>
        <DashNavbar/>
        <MainDashboard/>
    </Box>
  )
}

export default Dashboard;