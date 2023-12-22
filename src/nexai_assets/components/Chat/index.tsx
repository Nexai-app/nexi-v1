import {
  Avatar,
  Box,
  Button,
  Flex,
  Hide,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

type ChatType = {
  sender: SenderType;
  message: string;
};

enum SenderType {
  "me",
  "anonymous",
}

const dummyChat: ChatType[] = [
  {
    sender: SenderType["anonymous"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["me"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["anonymous"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["anonymous"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["anonymous"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["anonymous"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["anonymous"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
];

function index() {
  return (
    <Flex justify="space-between" w="100%">
      <ChatArea />
      <Hide below="md">
        <Box w="1px" mx={8} bg={"#929191B2"} h={"100vh"} />
        <MessageList />
      </Hide>
    </Flex>
  );
}

export default index;

function ChatArea() {
  return (
    <Box w="70%">
      {/* Header */}
      <Box>
        <Flex justify="space-between" gap={2} align="center" mb={4}>
          <Flex gap={2} align="center">
            <Avatar />
            <Text mt={3}>Anonymous</Text>
          </Flex>
          <Box display="flex">
            <Text>NX0001</Text>
          </Box>
        </Flex>
      </Box>
      {/* chat body */}
      <Box
        h={"70vh"}
        maxH={"70vh"}
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
        }}
      >
        {dummyChat.map((c, index) => (
          <Flex
            mb={3}
            key={index}
            justifyContent={
              c.sender == SenderType["anonymous"]
                ? "flex-start"
                : "flex-end"
            }
          >
            <MessageCard sender={c.sender} />
          </Flex>
        ))}
      </Box>
      {/* input area */}

      <InputGroup h={"70px"} mt={2} size="lg" bg="#271732">
        <Textarea
          focusBorderColor="none"
          _placeholder={{ marginY: "30px", color: "white" }}
          borderColor={"none"}
          pr="200px"
          h={"70px"}
          placeholder="Enter Message"
          resize="none"
        />
        <InputRightElement w="150px" h={"70px"} mr="1.5rem">
          <Button size="md" px={6} py={6}>
            Send Message
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

function MessageList() {
  return <Box w="30%">message list</Box>;
}

type MessageProp = {
  sender: SenderType;
};
function MessageCard(props: MessageProp) {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      bg="#271732"
      color="white"
      maxW="70%"
      px={7}
      py={4}
      borderRadius={5}
      justifyContent={
        props.sender === SenderType["anonymous"]
          ? "flex-start"
          : "flex-end"
      }
    >
      <Text fontSize="14">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
        consequatur.
      </Text>
      <Text fontSize="10" display="flex" justifyContent="flex-end">
        12.32pm
      </Text>
    </Box>
  );
}
