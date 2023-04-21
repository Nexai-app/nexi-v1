import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../context/AuthContext";

import "./Main.css";
import { Container, Flex, Heading, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { Image } from "react-bootstrap";

function Main() {


	const [isSmallerThan1100] = useMediaQuery("(max-width: 1100px)");

	return (
			<Container as='section' maxW='90vw' color='white'>
			<Heading fontFamily='Poppins'>How it works</Heading>
			<Flex p='26px' pos="relative" >
				<Flex w={{ lg: '42%', md:'100%' }} minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text mb={`5px`} bg={`transparent`} fontWeight={`medium`} fontSize={{ lg: "16.5px", md: "md" }}>Tell us what your project is all about</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Let Nexai know what your project is about so it can assist you better.</Text>
				</Flex>
				<Flex pos="absolute" left={`42.2%`} top={`48%`} bg={`red`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
				<Image src={`gt.svg`}/>
				</Flex>

			</Flex>
			<Flex p='26px' pos="relative">
				<Spacer />
				<Flex w={{ lg: '42%', md:'100%' }} minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Set default messages and behaviours</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Customize Nexai to suit your needs by setting default messages and behavior.</Text>
				</Flex>
				<Flex pos="absolute" left={`70.3%`} top={`49%`} bg={`red`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
				<Image src={`gt.svg`}/>
				</Flex>
				<Spacer />
			</Flex>
			<Flex p='30px' pos='relative'>
				<Spacer />
				<Flex w={{ lg: '42%', md:'100%' }} minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Settings up your personal assistant</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Relax while we set up you personal assistant and your personalized dashboard.</Text>
				</Flex>
				<Flex pos="absolute" right={`42.3%`} top={`50.7%`} bg={`red`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
				<Image src={`lt.svg`}/>
				</Flex>
			</Flex>
			<Flex p='30px' pos='relative'>
				<Spacer />
				<Flex w={{ lg: '42%', md:'100%' }} minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Integrate Nexai to your app</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Follow a detailed on how to easily integrate Nexai to your app.</Text>
				</Flex>
				<Flex pos="absolute" right={`70.3%`} top={`49%`} bg={`red`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
				<Image src={`lt.svg`}/>
				</Flex>
				<Spacer />
			</Flex>
			<Flex p='30px' pos='relative'>
				<Flex w={{ lg: '42%', md:'100%' }} minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Rest while Nexai shows users the way around</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Let Nexai take over the task of guiding new users around yor site</Text>
				</Flex>
			</Flex>
			</Container>
	);
}

export default Main;
