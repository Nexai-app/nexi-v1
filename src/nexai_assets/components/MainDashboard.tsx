import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer, useMediaQuery } from '@chakra-ui/react';
import LineChart from './LineChart';
import BarChart from './BarChart';



const MainDashboard = () => {

    const [isLargerThan750] = useMediaQuery("(max-width: 750px)");

  return (
    <Box>
        {
            isLargerThan750 ?
            (
                <Box pb="30px" px='30px' color="white" >
                    <Heading >Dashboard</Heading>   
    
                    <Flex alignItems="center" py="10px" >
                        <Box fontSize="14px" >
                            Get access to your bot analytics and information here
                        </Box>
                        <Spacer/>
                        <Box display="flex" flexDirection="column" gap={4}>
                        <Link to="/train-bot">
                            <Button color="#341A41" bg="white" fontSize="14px" >Train Your Bot</Button>
                        </Link>
                        <Link to="/my-questions">
                            <Button color="#341A41" bg="white" fontSize="14px" >My Trainings</Button>
                        </Link>
                        </Box>
                    </Flex>
                    <Box>
                        <LineChart/>
                        <BarChart/>
                    </Box>
        
                </Box>
    
            ) :

            (
                <Box pb="30px" px='80px' color="white" >
                    <Heading >Dashboard</Heading>   

                    <Flex alignItems="center" py="10px" >
                        <Box >
                            Get access to your bot analytics and information here
                        </Box>
                        <Spacer/>
                        <Box display="flex" flexDirection="column" gap={4}>
                        <Link to="/train-bot">
                            <Button color="#341A41" bg="white" >Train Your Bot</Button>
                        </Link>
                        <Link to="/my-questions">
                            <Button color="#341A41" bg="white" >My Trainings</Button>
                        </Link>
                        </Box>
                    </Flex>
                    <Box>
                        <LineChart/>
                        <BarChart/>
                    </Box>
                
                </Box>
            )

        }

    </Box>



  )
}

export default MainDashboard;