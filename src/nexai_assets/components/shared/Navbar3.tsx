import React from 'react';
import { Box, ButtonGroup, Flex, Heading, Spacer, IconButton, useMediaQuery, Image } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { BiLogOut } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const DashNavbar = () => {


  const [isLargerThan750] = useMediaQuery("(max-width: 750px)");

  return (

    <Box bg={'#341A41'}>
      {
        isLargerThan750 ?
          (
            <Flex minWidth='max-content' py='50px' px='30px' alignItems='center' gap='2'>
              <Spacer />
              <ButtonGroup gap='2'>
                <IconButton variant='solid' colorScheme='white' aria-label='Call Sage' fontSize='20px' icon={<SearchIcon />} _hover={{ backgroundColor: 'white', color: '#341A41' }} />
                <IconButton aria-label='logout' icon={<BiLogOut />} color='#b44e4e' border={`#b44e4e`} fontSize='20px' fontWeight="bold" variant='outline' _hover={{ backgroundColor: '#b44e4e', color: '#341A41' }} />
              </ButtonGroup>
            </Flex>
          ) :
          (
            <Flex minWidth='max-content' py='50px' px='80px' alignItems='center' gap='2'>
              <Spacer />
              <ButtonGroup gap='2'>
                <IconButton variant='solid' colorScheme='white' aria-label='Call Sage' fontSize='20px' icon={<SearchIcon />} _hover={{ backgroundColor: 'white', color: '#341A41' }} />
                <IconButton aria-label='logout' icon={<BiLogOut />} color='#b44e4e' border={`#b44e4e`} fontSize='20px' fontWeight="bold" variant='outline' _hover={{ backgroundColor: '#b44e4e', color: '#341A41' }} />
              </ButtonGroup>
            </Flex>

          )
      }
    </Box>

  )
}

export default DashNavbar;