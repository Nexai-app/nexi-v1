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
		<Box className='App-header2' >
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<Heading>Nexai</Heading>
			<Spacer/>
			</Flex>
		</Box>
	);
}

export default Navbar;
