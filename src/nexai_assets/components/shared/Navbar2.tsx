import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../src/App.css";
import { Box, Button, Container, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

function Navbar() {
	
	return (
		<Box className='App-header2' >
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<NavLink to={`/`}>
					<Heading bg={`transparent`}>Nexai</Heading>
				</NavLink>
			<Spacer/>
			</Flex>
		</Box>
	);
}

export default Navbar;
