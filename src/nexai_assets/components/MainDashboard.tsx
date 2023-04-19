import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import LineChart from './LineChart';
import BarChart from './BarChart';


const MainDashboard = () => {
  return (
    <Box pb="30px" px='80px' color="white" >
        <Heading >Dashboard</Heading>   

        <Flex alignItems="center" py="10px" >
            <Box >
                Get access to your bot analytics and information here
            </Box>
            <Spacer/>
            <Link to="/">
                <Button color="#341A41" bg="white" >Train Your Bot</Button>
            </Link>
        </Flex>
        <Box>
            <LineChart/>
            <BarChart/>
        </Box>
    
    </Box>

  )
}

export default MainDashboard;