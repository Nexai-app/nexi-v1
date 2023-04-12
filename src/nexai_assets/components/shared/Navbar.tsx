import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../src/App.css";
import { Box, Button, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

function Navbar() {
	const { Auth, iiAuth, changeAuthStatus } = useContext(AuthContext);
	const navigate = useNavigate();

	if (iiAuth) {
		changeAuthStatus();
		navigate("/signup");
		window.location.reload();
	}

	return (
		<Box className='App-header' >
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<Heading>Nexai</Heading>
			<Spacer/>
				<Button onClick={Auth} colorScheme="tranarent">Sign in</Button>
				<Button colorScheme='transparent' border='1px'>Sign up</Button>
			</Flex>
			<Container centerContent my='300px' >
				<Heading as='h1' size='4xl' fontFamily='Poppins'>Nexai</Heading>
				<Text fontFamily='Public Sans' textAlign='center'>The first fully decentralized, autonomous, integrateable chatbot and assistant that runs on blockchain and artificial intelligence.</Text>
			</Container>
		</Box>
	);
}

export default Navbar;
