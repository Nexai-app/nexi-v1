import {
  Avatar,
  Box,
  Button,
  Flex,
<<<<<<< HEAD
  Heading,
=======
>>>>>>> bd5c0f7 ([fix/feat] - nav bar ui adjustemnt / initailized  chat section design)
  Hide,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import {
  useGetAllConnections,
  useGetConversation,
} from "../../functions/index";
import { Principal } from "@dfinity/principal";
import DateFormatter from "../../utils/DateFormatter";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { EnquiryT } from "../../redux-toolkit/types";
import { AuthContext } from "../../context/AuthContext";

type ChatType = {
  sender: SenderType;
  message: string;
};

type EnquiryType = {
  id: string;
  time: string;
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
    sender: SenderType["me"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["me"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["me"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
  {
    sender: SenderType["me"],
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto, impedit!",
  },
];

const dummyEnquires: EnquiryType[] = [
  {
    id: "NX001",
    message:
      "Lorem ipsum dolor sit /amet consectetur aoreet/ auctor aliquam tincidunt males",
    time: "12.32pm",
  },
  {
    id: "NX002",
    message:
      "Lorem ipsum dolor sit /amet consectetur aoreet/ auctor aliquam tincidunt males",
    time: "12.32pm",
  },
  {
    id: "NX003",
    message:
      "Lorem ipsum dolor sit /amet consectetur aoreet/ auctor aliquam tincidunt males",
    time: "12.32pm",
  },

  {
    id: "NX003",
    message:
      "Lorem ipsum dolor sit /amet consectetur aoreet/ auctor aliquam tincidunt males",
    time: "12.32pm",
  },

  {
    id: "NX003",
    message:
      "Lorem ipsum dolor sit /amet consectetur aoreet/ auctor aliquam tincidunt males",
    time: "12.32pm",
  },
];

function index() {
  const { getEnquires } = useGetAllConnections();
  const { handleGetConversation } = useGetConversation();

  React.useEffect(() => {
    getEnquires();
  }, []);

  //GET ENQUIRY EVERY 5 SECONDS

  // setInterval(() => {
  //   getEnquires();
  // }, 5000);

  return (
    <Box w="100%">
      <Flex justifyContent={"space-between"}>
        <Heading>Messages</Heading>
        <Hide below="md">
          <Box
            bg="#271732"
            h="56px"
            w="346px"
            borderRadius={"10px"}
          />
        </Hide>
      </Flex>
      <Box h="68px" />
      <Flex justify="space-between">
        <ChatArea />
        <Hide below="md">
          <Box w="1px" mx={8} bg={"#929191B2"} h={"100vh"} />
          <EnquiryList />
        </Hide>
      </Flex>
    </Box>
  );
}

export default index;

function ChatArea() {
  const { customerPrincipal, actor } = React.useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const conversation = useAppSelector((state) => state.conversation);
  const [sending, setSending] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { handleGetConversation } = useGetConversation();

  const sortedConversation = conversation
    .slice()
    .sort((a, b) => a.id - b.id);

  React.useEffect(() => {
    if (customerPrincipal.length < 63) {
      return;
    } else {
      handleGetConversation(Principal.fromText(customerPrincipal));
    }
  }, [customerPrincipal]);

  //GETCONVERSATION EVERY 5 SECONDS
  // setInterval(() => {
  //   if (customerPrincipal.length === 63) {
  //     handleGetConversation(Principal.fromText(customerPrincipal));
  //   }
  // }, 5000);

  const handleSendMessage = () => {
    setSending(true);
    actor
      .sendMessage(Principal.fromText(customerPrincipal), message)
      .then(() => {
        setSending(false);
        setMessage("");
        //TODO: save the message with redux instead of calling get message
        handleGetConversation(Principal.fromText(customerPrincipal));
      })
      .catch((err) => {
        setSending(false);
        setMessage("");
        console.debug("nexai", err);
      });
  };

  return (
    <Box w="100%">
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
  sender: string;
  body: string;
  time: number;
};
function MessageCard(props: MessageProp) {
  const user = useAppSelector((state) => state.profile);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      bg="#271732"
      color="white"
      maxW="70%"
      px={7}
      py={4}
      cursor="pointer"
      borderRadius={5}
      justifyContent={
        props.sender !== user.principal ? "flex-start" : "flex-end"
      }
    >
      <Text fontSize="14">{props.body}</Text>
      <Text fontSize="10" display="flex" justifyContent="flex-end">
        {DateFormatter(props.time)}
      </Text>
    </Box>
  );
}
