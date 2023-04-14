import { Box, Button, ButtonGroup, Flex, Heading, Spacer,IconButton } from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {BiLogOut} from 'react-icons/bi';
import React from 'react';

const DashNavbar = () => {
  return (
    <Flex minWidth='max-content' py='50px' px='80px' alignItems='center' gap='2'>
        <Box>
            <Heading size='md' color="white" >Nexai</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
            <IconButton aria-label='Search database' icon={<SearchIcon />} bg="transparent" color="white" fontWeight="bold" />
            <IconButton aria-label='logout' icon={<BiLogOut />} bg="transparent" color="white" fontSize='20px' fontWeight="bold" />
        </ButtonGroup>
    </Flex>
  )
}

export default DashNavbar;