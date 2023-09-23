import React, { useState } from "react";
import "../../src/App.css"
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, Icon, Spacer } from "@chakra-ui/react";
import { BsChatSquareText } from 'react-icons/bs'

export interface AssistantProp {
	color: string,
	companyName: string
}

type ChatType = {
	sender: "you" | "nexai",
	text: string
}

function FloatingChat(prop: AssistantProp) {
	const [isChatVisible, setIsChatVisible] = useState(false);
	const [inputMessage, setInputMessage] = useState(""); // State variable for input message
	const [chat, setChat] = useState<ChatType[]>([]); // State variable for chat messages

	const toggleChatVisibility = () => {
		setIsChatVisible(!isChatVisible);
	};

	// Handle changes to the input field
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputMessage(event.target.value);
	};

	// Handle sending a message
	const handleSendMessageFromUser = () => {
		if (inputMessage.trim() !== "") {
			// Create a new message and append it to the chat array
			const newMessage: ChatType = {
				sender: "you",
				text: inputMessage,
			};

			setChat([...chat, newMessage]);

			// Clear the input field
			setInputMessage("");
		}
	};

	return (
		<Box>
			{isChatVisible && (
				<Box className={`chat`}>
					<Flex h={`25%`} p={`10px`} bg={`${prop.color}`} className="chat-header" borderTopRadius={5} alignItems={`center`}>
						<Text as='b' color={`white`} fontSize={`20px`}>{prop.companyName}</Text>
					</Flex>
					<Box h={`60%`} bg={'white'} className="chat-header" p={3} overflow={`scroll`}>
						{chat.map((message, index) => (
							<Flex mb={2} key={index}>
								{message.sender === "you" ? (
									<>
										<Spacer />
										<Box minH={`100px`} maxW={`60%`} bg={`${prop.color}30`} borderRadius={5} overflow={`visible`}>
											<Text px={3} as={`b`}>{message.sender}</Text>
											<Text p={3}>{message.text}</Text>
										</Box>
									</>
								) : (
									<>
										<Box h={`100px`} minW={`60%`} bg={`${prop.color}30`} borderRadius={5}>
											<Text px={3} as={`b`}>{message.sender}</Text>
											<Text p={3}>{message.text}</Text>
										</Box>
										<Spacer />
									</>
								)}
							</Flex>
						))}
					</Box>

					<Flex h={`15%`} bg={'white'} className="chat-box" borderBottomRadius={5} alignItems={'center'}>
						<InputGroup size='md' px={4}>
							<Input
								pr='4.5rem'
								type="text"
								value={inputMessage}
								onChange={handleInputChange}
								placeholder='Ask Your Question'
								variant='flushed'
							/>
							<InputRightElement width='5p' pe={3}>
								<Button h='100%' size='sm' bg={`${prop.color}`} color={`white`} _hover={{ backgroundColor: "transparent", border: `${prop.color}`, color: `${prop.color}` }} onClick={handleSendMessageFromUser}>
									Send
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
				</Box>
			)}
			<Flex className={`spot ${isChatVisible ? "spot-visible" : ""}`} alignItems={'center'} onClick={toggleChatVisibility} bg={`${!isChatVisible ? `${prop.color}` : "#FFF"}`} >
				<Icon as={BsChatSquareText} boxSize={7} m={`auto`} color={`${isChatVisible ? `${prop.color}` : "#FFF"}`} />
			</Flex>
		</Box>
	)
}

export default FloatingChat;