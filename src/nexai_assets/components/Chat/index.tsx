import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
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
  const { customerPrincipal } = React.useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const conversation = useAppSelector((state) => state.conversation);

  const { handleGetConversation } = useGetConversation();

  React.useEffect(() => {
    if (customerPrincipal.length < 63) {
      console.debug("[nexai] - get conv func not called");

      return;
    } else {
      console.debug("[nexai] - get conv func called");
      handleGetConversation(Principal.fromText(customerPrincipal));
    }
  }, [customerPrincipal]);

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
        h={"60vh"}
        maxH={"60vh"}
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
        }}
      >
        {conversation?.map((c, index) => (
          <Flex
            mb={3}
            key={index}
            justifyContent={
              c.sender != user.principal ? "flex-start" : "flex-end"
            }
          >
            <MessageCard
              sender={c.sender}
              body={c.body}
              time={c.createdAt}
            />
          </Flex>
        ))}
      </Box>
      {/* input area */}

      <InputGroup h={"70px"} mt={2} size="lg" bg="#271732">
        <Textarea
          focusBorderColor="none"
          _placeholder={{ paddingTop: "15px", color: "white" }}
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

function EnquiryList() {
  const enquiry = useAppSelector((state) => state.enquiry);
  const { setCustomerPrincipal } = React.useContext(AuthContext);

  const handleSetActveConversation = (
    id: number,
    principal: string
  ) => {
    setCustomerPrincipal(principal);
  };
  return (
    <Box w="30%">
      <Text fontSize="20px" fontWeight={"700"} mb={8}>
        Enquires
      </Text>
      <Box
        h={"60vh"}
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
        }}
      >
        {enquiry?.map((d: EnquiryT) => (
          <Box
            px={8}
            key={d.id}
            mb={6}
            py={6}
            h="154px"
            w="348px"
            bg="#271732"
            onClick={(e) =>
              handleSetActveConversation(d.id, d.account2)
            }
          >
            {/* top part */}
            <Flex justifyContent={"space-between"}>
              <Flex gap={3}>
                <Avatar size="sm" />
                <Text>Anonymous</Text>
              </Flex>
              <Text>{d.id}</Text>
            </Flex>
            {/* break */}
            <Box h="1px" w="full" bg="white" />
            {/* down part */}
            <Text mt={2} fontSize="10px">
              {d.createdAt}
            </Text>

            <Text fontSize="14px">{d.account2}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
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
      borderRadius={5}
      justifyContent={
        props.sender !== user.principal ? "flex-start" : "flex-end"
      }
    >
      <Text fontSize="14">{props.body}</Text>
      <Text fontSize="10" display="flex" justifyContent="flex-end">
        {props.time}
      </Text>
    </Box>
  );
}
