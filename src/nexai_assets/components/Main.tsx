import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../context/AuthContext";

import "./Main.css";
import { Container, Flex, Heading, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { Image } from "react-bootstrap";

function Main() {

	const [isLargerThan991] = useMediaQuery('(min-width: 991px)');

	return (
			<Container as='section' className="steps" maxW='100vw' color='white' bg={`#341A41`} pt={`10`}>
				<Heading fontFamily='Poppins'>How it works</Heading>
			<Flex m={`50px`} pos="relative" >
					<Flex w={isLargerThan991 ? '40%' : '100%'} zIndex={`3`} bg='#271732' p={5} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
						<Text mb={`5px`} bg={`transparent`} fontWeight={`medium`} fontSize={{ lg: "16.5px", md: "md" }}>Tell us what your project is all about</Text>
						<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Let Nexai know what your project is about so it can assist you better.</Text>
					</Flex>
					{isLargerThan991 ?
						<Flex pos="absolute" left={`40%`} top={`47%`} bg={`transparent`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
							<Image src={`gt.svg`} />
						</Flex>
						:
						<Flex className="divider" zIndex={`2`} />
					}

				</Flex>
				<Flex m={`50px`} pos="relative" >
					<Spacer />
					<Flex w={isLargerThan991 ? '40%' : '100%'} zIndex={`3`} bg='#271732' p={5} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
						<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Set default messages and behaviours</Text>
						<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Customize Nexai to suit your needs by setting default messages and behavior.</Text>
					</Flex>
					{isLargerThan991 ?
						<Flex pos="absolute" left={`70%`} top={`47%`} bg={`transparent`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
							<Image src={`gt.svg`}/>
						</Flex>
						:
						<Flex className="divider" zIndex={`2`} />
					}
					<Spacer />
				</Flex>
				<Flex m={`50px`} pos='relative'>
					<Spacer />
					<Flex w={isLargerThan991 ? '40%' : '100%'} zIndex={`3`} bg='#271732' p={5} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
						<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Setting up your personal assistant</Text>
						<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Relax while we set up you personal assistant and your personalized dashboard.</Text>
					</Flex>
					{isLargerThan991 ?
						<Flex pos="absolute" right={`40%`} top={`47%`} bg={`transparent`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
							<Image src={`lt.svg`}/>
						</Flex>
						:
						<Flex className="divider" zIndex={`2`} />
					}
				</Flex>
				<Flex m={`50px`} pos='relative'>
					<Spacer />
					<Flex w={isLargerThan991 ? '40%' : '100%'} zIndex={`3`} bg='#271732' p={5} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
						<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Integrate Nexai to your app</Text>
						<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Follow a detailed documentation on how to easily integrate Nexai to your app.</Text>
					</Flex>
					{isLargerThan991 ?
						<Flex pos="absolute" right={`70%`} top={`47%`} bg={`transparent`} zIndex={`2`} display={{ base: 'none', lg: 'flex' }}>
							<Image src={`lt.svg`}/>
						</Flex>
						:
						<Flex className="divider" zIndex={`2`} />
					}
					<Spacer />
				</Flex>
				<Flex m={`50px`} mb={`0px`} pos='relative'>
					<Flex w={isLargerThan991 ? '40%' : '100%'} zIndex={`3`} bg='#271732' p={5} flexDirection='column' justifyContent={`center`} borderRadius='6px'>
						<Text fontSize={{ lg: "16.5px", md: "md" }} mb={`5px`} bg={`transparent`} fontWeight={`medium`}>Rest while Nexai shows users the way around</Text>
						<Text bg={`transparent`} fontSize={{ lg: "14.5px", md: "md" }}>Let Nexai take over the task of guiding new users around your site</Text>
					</Flex>
				</Flex>
			</Container>
	);
}

export default Main;
