import React from "react";
import { 
    Textarea,
    FormControl,
    FormLabel,
    Input,
    Text,
    Flex,
    Button,
    Stack
 } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Navbar from "../shared/Navbar2"

const AddQuestions = ()=>{
    return(
        <Box color="white">
            <Navbar/>
            <Box>
                <Flex  justify="center" direction="column" align="center"> 
                        <Flex align="center" justify="center"  direction="column" w="full">
                                    <Text mb={4} fontSize={{base:"24px", md:'40px'}} fontWeight="700" fontFamily="Poppins">Train Your Bot</Text>
                                    <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
                                     <Text fontSize={{base:"12px", md:'18px'}} fontWeight="400" fontFamily="Public Sans">Set and provide answers to questions you would like to train </Text>
                                    <Text fontSize={{base:"12px", md:'18px'}} fontWeight="400" fontFamily="Public Sans">your bot on</Text>
                                </Box>
                        </Flex>
                        <Box>
                            <FormControl >
                                <FormLabel>Question</FormLabel>
                                <Input mb={2} />
                                <FormLabel>Answer</FormLabel>
                                <Textarea placeholder='Type your answer here' width={{base:"350px", md:"600px"}} height={{base:"350px", md:"200px"}} />
                                <Stack my={5} direction="row" justify="end">
                                    <Button color="white" bgColor="#341A41">Cancel</Button>
                                    <Button color="#341A41" >Save</Button>
                                </Stack>
                            </FormControl>
                        </Box>
            </Flex>
            </Box>
        </Box>
    );
}

export default AddQuestions;