import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Button, Flex, Heading, Spacer, useMediaQuery, MenuButton, Menu, Icon, Link as Chakralink, Image, Center, ModalOverlay, useDisclosure, Modal, ModalHeader, ModalContent, ModalCloseButton, ModalBody, ModalFooter, Text, MenuList, MenuItem, InputRightElement, Input, InputGroup } from '@chakra-ui/react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { ArrowForwardIcon, ChatIcon, ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { AiFillHome, AiOutlineBook, AiTwotoneSetting } from 'react-icons/ai'
import { BsJournalCode, BsPeopleFill } from 'react-icons/bs'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { RiChat2Fill } from 'react-icons/ri'
import DashNavbar from './shared/Navbar3';
import FirstModal from './TestBot/FirstModal';
import SecondModal from './TestBot/SecondModal';



const MainDashboard = () => {

    const [isLargerThan991] = useMediaQuery("(max-width: 991px)");


    const OverlayOne = () => (
        <ModalOverlay
            bg='#341A41.300'
            backdropFilter='blur(1px) hue-rotate(0deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

    const onCloseFirstModal = () => {
        setIsFirstModalOpen(false);
    };

    const onOpenFirstModal = () => {
        setIsFirstModalOpen(true);
    };

    const onCloseSecondModal = () => {
        setIsSecondModalOpen(false);
    };

    const onOpenSecondModal = () => {
        setIsSecondModalOpen(true);
    };

    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    return (
        <Flex>
            {isLargerThan991 ?
                <Box>
                </Box>
                :
                <Box bg={`#341A41`} w={`300px`} maxW={`269px`} minW={`250px`} minH={'1000px'} color={`white`}>
                    <Center h={`150px`}>
                        <Chakralink as={ReactRouterLink} to={`/dashboard`}>
                            <Image w="80px" h="75px" src={`nexai-logo.jpg`} />
                        </Chakralink>
                    </Center>
                    <Chakralink as={ReactRouterLink} to={`/dashboard`} >
                        <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'}
                            _hover={{ backgroundColor: 'white', color: '#341A41' }}>
                            <Icon as={AiFillHome} boxSize={4} alignSelf={`center`} mr={`15px`} />
                            <Box>Home</Box>
                        </Flex>
                    </Chakralink>
                    <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'} _hover={{ backgroundColor: 'white', color: '#341A41' }} _active={{ backgroundColor: 'white', color: '#341A41' }}>
                        <Icon as={BsPeopleFill} boxSize={4} alignSelf={`center`} mr={`15px`} />
                        <Box>Customer</Box>
                    </Flex>
                    <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'} _hover={{ backgroundColor: 'white', color: '#341A41' }} _active={{ backgroundColor: 'white', color: '#341A41' }}>
                        <Icon as={BsJournalCode} boxSize={4} alignSelf={`center`} mr={`15px`} />
                        <Box>Integration</Box>
                    </Flex>
                    <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'} _hover={{ backgroundColor: 'white', color: '#341A41' }} _active={{ backgroundColor: 'white', color: '#341A41' }}>
                        <Icon as={RiChat2Fill} boxSize={4} alignSelf={`center`} mr={`15px`} />
                        <Box>Train Assistant</Box>
                    </Flex>
                    <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'} _hover={{ backgroundColor: 'white', color: '#341A41' }} _active={{ backgroundColor: 'white', color: '#341A41' }}>
                        <Icon as={IoPersonCircleSharp} boxSize={4} alignSelf={`center`} mr={`15px`} />
                        <Box>Profile</Box>
                    </Flex>
                    <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'} _hover={{ backgroundColor: 'white', color: '#341A41' }} _active={{ backgroundColor: 'white', color: '#341A41' }}>
                        <Icon as={AiTwotoneSetting} boxSize={4} alignSelf={`center`} mr={`15px`} />
                        <Box>Settings</Box>
                    </Flex>
                    <Flex h={`45px`} my={5} ml={5} borderLeftRadius="3" pl={`15px`} alignItems={'center'} _hover={{ backgroundColor: 'white', color: '#341A41' }} _active={{ backgroundColor: 'white', color: '#341A41' }}>
                        <Icon as={AiTwotoneSetting} boxSize={4} alignSelf={`center`} mr={`15px`} />
                        <Box>Settings</Box>
                    </Flex>
                </Box>
            }
            <Box bg={"#341A41"} w={`100%`} minH={`100vh`}>
                {
                    isLargerThan991 ?
                        (
                            <>
                                <DashNavbar />
                                <Box pb="30px" px='30px' color="white" >
                                    <Heading>Dashboard</Heading>

                                    <Flex alignItems="center" py="10px" >
                                        <Box fontSize="14px" >
                                            Get access to your bot analytics and information here
                                        </Box>
                                        <Spacer />
                                        <Box display="flex" flexDirection="column" gap={4}>
                                            <Chakralink as={ReactRouterLink} to="/train-bot">
                                                <Button colorScheme='white' variant='outline' _hover={{ backgroundColor: 'white', color: '#341A41' }} leftIcon={<ChatIcon />}>
                                                    Train Bot
                                                </Button>
                                            </Chakralink>
                                            <Button bg='white' color={`#341A41`} border={`1px white solid`} _hover={{ backgroundColor: 'transparent', color: 'white' }} rightIcon={<Icon as={AiOutlineBook} boxSize={4} />} onClick={onOpenFirstModal}>
                                                Test Bot
                                            </Button>
                                            <FirstModal isOpen={isFirstModalOpen} onClose={onCloseFirstModal} />
                                        </Box>
                                    </Flex>
                                    <Box>
                                        <LineChart />
                                        <BarChart />
                                    </Box>

                                </Box>
                            </>
                        ) :

                        (
                            <>
                                <DashNavbar />
                                <Box pb="30px" px='80px' color="white" >
                                    <Heading >Dashboard</Heading>

                                    <Flex alignItems="center" py="10px" >
                                        <Box >
                                            Get access to your bot analytics and information here
                                        </Box>
                                        <Spacer />
                                        <Box display="flex" flexDirection="row" gap={4}>
                                            <Chakralink as={ReactRouterLink} to="/train-bot">
                                                <Button colorScheme='white' variant='outline' _hover={{ backgroundColor: 'white', color: '#341A41' }} leftIcon={<ChatIcon />} >
                                                    Train Bot
                                                </Button>
                                            </Chakralink>
                                            <Button bg='white' color={`#341A41`} border={`1px white solid`} _hover={{ backgroundColor: 'transparent', color: 'white' }} rightIcon={<Icon as={AiOutlineBook} boxSize={4} />} onClick={onOpenFirstModal}>
                                                Test Bot
                                            </Button>
                                            <FirstModal isOpen={isFirstModalOpen} onClose={onCloseFirstModal} />
                                        </Box>
                                    </Flex>
                                    <Box>
                                        <LineChart />
                                        <BarChart />
                                    </Box>

                                </Box>
                            </>
                        )

                }

            </Box >

        </Flex >


    )
}

export default MainDashboard;