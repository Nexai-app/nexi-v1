import React from "react";
import { 
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Text,
    Flex,
    Button,
    Heading
 } from "@chakra-ui/react";
 import { AddIcon } from '@chakra-ui/icons'
 import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../shared/Navbar2"


const AllQuestions = ()=>{
    return(
        <Box color="white">
            <Navbar/>
            <Box >
                <Flex justify="center" direction="column" align="center"> 
                    <Flex align="center" justify="center"  direction="column" w="full">
                                    <Text mb={4} fontSize={{base:"24px", md:'40px'}} fontWeight="700" fontFamily="Poppins">Train Your Bot</Text>
                                    <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
                                     <Text fontSize={{base:"12px", md:'18px'}} fontWeight="400" fontFamily="Public Sans">Set and provide answers to questions you would like to train </Text>
                                    <Text fontSize={{base:"12px", md:'18px'}} fontWeight="400" fontFamily="Public Sans">your bot on</Text>
                                </Box>
                    
                    </Flex>
                </Flex>
                {/* card */}
                <SimpleGrid m={8} spacing="20px" minChildWidth='290px'>
                    
                    
                    
                    <Card variant="outline" border="1px solid #FFFFFF" h="280px" color="#fff"  maxW='sm'>
                        <CardHeader>
                        <Heading size='md' fontFamily="Poppins">What is Nexai ?</Heading>
                        </CardHeader>
                        <CardBody>
                        <Text fontFamily="Public Sans">
                            The first fully decentralized, autonomous ,integrateable chat-box  
                            and assistant that runs on blockchain and artificial intelligence
                        </Text>
                        </CardBody>
                    </Card>
                    <Card variant="outline" border="1px solid #FFFFFF" h="280px" color="#fff"  maxW='sm'>
                        <CardHeader>
                        <Heading size='md' fontFamily="Poppins">What is Nexai ?</Heading>
                        </CardHeader>
                        <CardBody>
                        <Text fontFamily="Public Sans">
                            The first fully decentralized, autonomous ,integrateable chat-box  
                            and assistant that runs on blockchain and artificial intelligence
                        </Text>
                        </CardBody>
                    </Card><Card variant="outline" border="1px solid #FFFFFF" h="280px" color="#fff"  maxW='sm'>
                        <CardHeader>
                        <Heading size='md' fontFamily="Poppins">What is Nexai ?</Heading>
                        </CardHeader>
                        <CardBody>
                        <Text fontFamily="Public Sans">
                            The first fully decentralized, autonomous ,integrateable chat-box  
                            and assistant that runs on blockchain and artificial intelligence
                        </Text>
                        </CardBody>
                    </Card>
                    <Card variant="outline" border="1px solid #FFFFFF" h="280px" color="#fff"  maxW='sm'>
                        <CardHeader>
                        <Heading size='md' fontFamily="Poppins">What is Nexai ?</Heading>
                        </CardHeader>
                        <CardBody>
                        <Text fontFamily="Public Sans">
                            The first fully decentralized, autonomous ,integrateable chat-box  
                            and assistant that runs on blockchain and artificial intelligence
                        </Text>
                        </CardBody>
                    </Card>
                    <NavLink to="/train-bot">

                    <Card  cursor="pointer" variant="outline" border="1px solid #FFFFFF" flexDirection="column" justifyContent="center" alignItems="center" h="280px" bgColor="white"  maxW='sm'>
                    <AddIcon boxSize={16} color="#341A41" bgColor="white"/>
                      <Text color="#341A41" fontSize="18px" bgColor="white">Add Question</Text>  
                    </Card>
                    </NavLink>


                </SimpleGrid>
                <Box m={8} display="flex" justifyContent="end">
                    <NavLink to="/dashboard">
                    <Button px={6} bgColor="white" color="#341A41" >Continue To Dashboard</Button>
                    </NavLink>
                </Box>
            </Box>
        </Box>
    );
}

export default AllQuestions;