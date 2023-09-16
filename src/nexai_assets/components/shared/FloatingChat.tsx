import React from "react";
import "../../src/App.css"
import { Box, Button, Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Icon } from '@chakra-ui/react'
import { BsChatSquareText } from 'react-icons/bs'

function floatingChat() {
	return (
		<Box>
			<Flex className="spot" alignItems={'center'} >
				<Icon as={BsChatSquareText} boxSize={7} m={`auto`} color={`white`} />
			</Flex>
			<Box className="chat" >
				<Box h={`25%`} bg={'#331A41'} className="chat-header" borderTopRadius={5}>

				</Box>
				<Box h={`60%`} bg={'white'} className="chat-header">

				</Box>
				<Flex h={`15%`} bg={'white'} className="chat-header" borderBottomRadius={5} alignItems={'center'}>
					<InputGroup size='md' px={4}>
						<Input
							pr='4.5rem'
							type="text"
							placeholder='Ask Your Question'
							variant='flushed'
						/>
						<InputRightElement width='5p' pe={3}>
							<Button h='100%' size='sm' bg={`#341A41`} color={`white`}>
								Send
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			</Box>
		</Box>
	)
}

export default floatingChat