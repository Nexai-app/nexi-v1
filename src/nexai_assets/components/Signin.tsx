import React, { useEffect, useState, useContext } from "react";
import "./Signup.css";
import { useLogIn } from "../functions";
import { AuthContext } from "../context/AuthContext";
import { Box, Container, FormControl, Heading, Input, FormLabel, InputGroup, Button, InputRightElement, Flex } from "@chakra-ui/react";

function SignUpForm() {
	// const [showModal, setShowModal] = useState(false);
	// const [founderName, setFounderName] = useState("");
	// const [appName, setAppName] = useState("");
	// const [aboutApp, setAboutApp] = useState("");
	// const [username, setUsername] = useState("");
	// const [submitting, setSubmitting] = useState(false)



	// //CHECK IS USER EXIST BEFORE
	// const { actor, loggedIn } = useContext(AuthContext)

	// const { loading, handleLogIn } = useLogIn()

	// useEffect(() => {
	// 	handleLogIn()
	// }, [])


	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	setSubmitting(true)

	// 	actor.createCompany(appName, username, founderName, aboutApp).then((data) => {
	// 		setSubmitting(false);
	// 		setShowModal(true);
	// 	}).catch((err) => {
	// 		setSubmitting(false)
	// 		console.log(err);
	// 	})
	// 	// do something with the form data, like sending it to a server

	// };
  		const [show, setShow] = React.useState(false)
		const handleClick = () => setShow(!show)


	return (
		<Flex height="75vh" alignItems="center">
		<Container maxW='container.sm' alignItems={`center`} color={`white`} >
			<Heading>Sign In To Nexai</Heading>
			<Box>
				<FormControl isRequired mb={`40px`}>
					<FormLabel>Email address</FormLabel>
					<Input name='name' placeholder='Enter email address' height='60px' px={`5`} />
				</FormControl>
			</Box>
			<Box >
				<FormControl isRequired mb={`40px`}>
					<FormLabel>Password</FormLabel>
					<InputGroup>
					<Input type={show ? 'text' : 'password'} name='name' placeholder='Enter password'  height='60px' px={`5`}/>
					<InputRightElement width='4.5rem'h='100%' bg={`transparent`}>
						<Button h='1.75rem' size='sm' colorScheme={`341A41`} onClick={handleClick}>
						{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
					</InputGroup>
				</FormControl>
			</Box>
			<button className="ctb">Sign In</button>
			</Container>
			</Flex>
	);
}

export default SignUpForm;
