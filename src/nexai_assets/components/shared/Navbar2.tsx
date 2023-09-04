import React from "react";
import { NavLink } from "react-router-dom";
import "../../src/App.css";
import { Box,  Flex, Heading, Spacer,Image } from "@chakra-ui/react";

function Navbar() {
	
	return (
		<Box className='App-header2' >
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<NavLink to={`/dashboard`}>
					<Image  w="80px" h="75px" src={`nexai-logo.jpg`}/>
				</NavLink>
			<Spacer/>
			</Flex>
		</Box>
	);
}

export default Navbar;
