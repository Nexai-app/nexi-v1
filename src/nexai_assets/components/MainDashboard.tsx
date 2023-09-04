import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer, useMediaQuery, MenuButton, Menu } from '@chakra-ui/react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { ChevronDownIcon } from '@chakra-ui/icons';



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
                            <Button colorScheme='white' variant='outline'  _hover={{ backgroundColor: 'white', color: '#341A41' }}>
							Train your bot
						    </Button>
                        </Link>
                        <Link to="/my-questions">
                            <Button bg='white' color={`#341A41`} border={`1px white solid`} _hover={{ backgroundColor: 'transparent', color: 'white' }}>
							My Trainings
							</Button>
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
                        <Box display="flex" flexDirection="row" gap={4}>
                        <Link to="/train-bot">
                            <Button colorScheme='white' variant='outline'  _hover={{ backgroundColor: 'white', color: '#341A41' }} >
							    Train your bot
						    </Button>
                        </Link>
                        <Link to="/my-questions">
                            <Button bg='white' color={`#341A41`} border={`1px white solid`} _hover={{ backgroundColor: 'transparent', color: 'white' }}>
							    My Trainings
						    </Button>
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