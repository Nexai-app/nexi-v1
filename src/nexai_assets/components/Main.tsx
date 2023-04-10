import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../context/AuthContext";

import "./Main.css";
import { Box, Button, ButtonGroup, Container, Flex, Heading, SimpleGrid, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { Image } from "react-bootstrap";

function Main() {
	// const data = [
	// 	{
	// 		icon: faPenToSquare,
	// 		title: "Tell us what your project is all about",
	// 		description:
	// 			"Let Nexai know what your project is about so it can assist you better.",
	// 		image: "image1.jpg",
	// 	},
	// 	{
	// 		icon: faComments,
	// 		title: "Set some default messages or behavior you want from Nexai",
	// 		description:
	// 			"Customize Nexai to suit your needs by setting default messages and behavior.",
	// 		image: "image2.jpg",
	// 	},
	// 	{
	// 		icon: faMugHot,
	// 		title: "Drink a cup of coffee while we finish up your personal assistant",
	// 		description:
	// 			"Relax and let Nexai do the work. Grab a cup of coffee and enjoy.",
	// 		image: "image3.jpg",
	// 	},
	// 	{
	// 		icon: faListCheck,
	// 		title: "Integrate Nexai to your app with the detailed guide",
	// 		description:
	// 			"Follow our detailed guide to easily integrate Nexai to your app.",
	// 		image: "image4.jpg",
	// 	},
	// 	{
	// 		icon: faMapLocationDot,
	// 		title: "Rest while Nexai shows new users the way around your new site",
	// 		description:
	// 			"Let Nexai take over the task of guiding new users around your site.",
	// 		image: "image5.jpg",
	// 	},
	// 	{
	// 		icon: faChartLine,
	// 		title: "Check detailed analytics on your personalized dashboard",
	// 		description:
	// 			"Monitor and analyze the performance of Nexai with our personalized dashboard.",
	// 		image: "image6.jpg",
	// 	},
	// ];

	const { Auth } = useContext(AuthContext);
	const [isSmallerThan1100] = useMediaQuery("(max-width: 1100px)");

	return (
			<Container as='section' maxW='90vw' color='white'>
			<Heading fontFamily='Optima'>How it works</Heading>
			<Flex pb='26px' pos="relative" >
				<Flex w={{ lg: '42%',['1100px']:'100%' }} minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text mb={`5px`} bg={`transparent`} fontWeight={`medium`} fontSize={{ lg: "16.5px", md: "md" }}>Tell us what your project is all about</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Let Nexai know what your project is about so it can assist you better.</Text>
				</Flex>
				<Flex pos="absolute" left={`42%`} top={`40%`} bg={`red`} zIndex={`2`} display={{ base: 'none', ['1100px']: 'flex' }}>
				<Image src={`gt.svg`}/>
				</Flex>

			</Flex>
			<Flex p='26px' pos="relative">
				<Spacer />
				<Flex w='42%' minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Set default messages and behaviours</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Customize Nexai to suit your needs by setting default messages and behavior.</Text>
				</Flex>
				<Flex pos="absolute" left={`70.3%`} top={`49%`} bg={`red`} zIndex={`2`}>
				<Image src={`gt.svg`}/>
				</Flex>
				<Spacer />
			</Flex>
			<Flex p='30px' pos='relative'>
				<Spacer />
				<Flex w='42%' minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Relax while we set up your personal assistant</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Grab a cup of coffee and relax while we set up you personal assistant and your personalized dashboard.</Text>
				</Flex>
				<Flex pos="absolute" right={`42.3%`} top={`50.7%`} bg={`red`} zIndex={`2`}>
				<Image src={`lt.svg`}/>
				</Flex>
			</Flex>
			<Flex p='30px' pos='relative'>
				<Spacer />
				<Flex w='42%' minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Integrate Nexai to your app</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Follow a detailed on how to easily integrate Nexai to your app.</Text>
				</Flex>
				<Flex pos="absolute" right={`70.3%`} top={`49%`} bg={`red`} zIndex={`2`}>
				<Image src={`lt.svg`}/>
				</Flex>
				<Spacer />
			</Flex>
			<Flex p='30px' pos='relative'>
				<Flex w='42%' minH='140' bg='#271732' p={`5`} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
					<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Rest while Nexai shows users the way around</Text>
					<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Let Nexai take over the task of guiding new users around yor site</Text>
				</Flex>
			</Flex>
			<Flex justifyContent={`center`} py={`20`}>
			<button className="cta" onClick={Auth}>Get Started</button>
			</Flex>
			</Container>
	);
}

export default Main;
