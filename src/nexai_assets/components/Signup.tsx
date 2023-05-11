import React, { useEffect, useState, useContext } from "react";
import "./Signup.css";
import { useLogIn } from "../functions";
import { AuthContext } from "../context/AuthContext";
import { Box, Container, Center,useToast, FormControl, Heading, Input, FormLabel, Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate , NavLink} from "react-router-dom";


function SignUpForm() {
	const [appName, setAppName] = useState("");
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false)
	const navigate = useNavigate()
	const toast = useToast()


	//CHECK IS USER EXIST BEFORE
	const { actor} = useContext(AuthContext)





	const handleSubmit = (e) => {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		e.preventDefault();
		
		if(appName.length < 3) {
			toast({title: "Company Name too short"});
			return
		}
		if (!email.match(mailformat)) 
		{
			toast({title: "Email Invalid"});
			return
		}
		setSubmitting(true) 

		actor.createCompany(appName, email).then(() => {
			console.log("got here");
			setSubmitting(false);
			navigate("/dashboard");
		}).catch((err) => {
			setSubmitting(false)
			console.log(err);
		})

	};		


	return (
		<Flex height="75vh" alignItems="center">
			
		<Container maxW='container.sm' alignItems={`center`} color={`white`} >
			<Heading>Sign Up On Nexai</Heading>
			<Box>
				<FormControl isRequired mb={`40px`}>
					<FormLabel>Company Name</FormLabel>
					<Input name='name' value={appName} onChange={(e)=>{setAppName(e.target.value)} }  placeholder='Enter company name' height='60px' px={`5`} />
				</FormControl>
			</Box>
			<Box>
				<FormControl isRequired mb={`40px`}>
					<FormLabel>Email address</FormLabel>
					<Input name='email' value={email} onChange={(e)=>{setEmail(e.target.value)} } placeholder='Enter email address' height='60px' px={`5`} />
				</FormControl>
			</Box>
			<Button width="full" onClick={handleSubmit} isLoading={submitting} isDisabled={submitting} borderRadius="5px" py={4} bgColor="white" color="#341A41">Sign Up</Button>
			</Container>
			
		
			</Flex>
	);
}

export default SignUpForm;
