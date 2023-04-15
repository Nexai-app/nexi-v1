import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, Container, Flex, Heading, Image, List, ListItem, Spacer, Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, ButtonGroup } from "@chakra-ui/react";
import "../../src/App.css";

function Navbar() {
	const { Auth, iiAuth, changeAuthStatus } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	if (iiAuth) {
		changeAuthStatus();
		navigate("/signup");
		window.location.reload();
	}

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<Box className='App-header' mb={`80px`}>
			<Flex as="nav" py='50px' px='80px' alignItems='center' gap='30px' bg='transparent'>
				<NavLink to={`/`}>
					<Heading bg={`transparent`}>Nexai</Heading>
				</NavLink>
				<Spacer bg={`transparent`} />
				<Box display={{ base: "block", md: "none" }} onClick={handleDrawerToggle} color="white">
				<svg viewBox="0 0 100 80" width="30" height="30">
					<rect width="100" height="10" fill="white"></rect>
					<rect y="30" width="100" height="10" fill="white"></rect>
					<rect y="60" width="100" height="10" fill="white"></rect>
				</svg>
				</Box>
				<List display={{ base: "none", md: "flex" }}>
					<ButtonGroup gap='2'>
					<ListItem>
						<NavLink to={`signin`}>
							<Button colorScheme={`#341A41`}>
								Sign In
							</Button>
						</NavLink>
					</ListItem>
					<ListItem>
						<NavLink to={`signup`}>
							<Button border='1px' colorScheme={`transparent`}>
								Sign up
							</Button>
						</NavLink>
					</ListItem>
					</ButtonGroup>
				</List>
			</Flex>
			<Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerToggle}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader color={`white`}>Nexai</DrawerHeader>
					<DrawerBody>
						<List>
							<ListItem>
								<NavLink to={`signin`}>
									<Button colorScheme="tranarent">
										Sign in
									</Button>
								</NavLink>
							</ListItem>
							<ListItem>
								<NavLink to={`signup`}>
									<Button colorScheme='transparent' border='1px'>
										Sign up
									</Button>
								</NavLink>
							</ListItem>
						</List>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Container centerContent my='300px' bg={`transparent`}>
				<Heading as='h1' size='4xl' fontFamily='Optima' bg={`transparent`}>Nexai</Heading>
				<Text fontFamily='Public Sans' textAlign='center' bg={`transparent`}>The first fully decentralized, autonomous, integrateable chatbot and assistant that runs on blockchain and artificial intelligence.</Text>
				<Text fontSize={`md`} pt={`18px`} className="powered-by" bg={`transparent`}>Powered by: <Image className="logo" alt="" src={`logo.png`} bg={`transparent`} /></Text>
			</Container>
		</Box>
	);
}

export default Navbar;
