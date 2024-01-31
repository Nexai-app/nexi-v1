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
  Show,
  Text,
  Textarea,
  Image,
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

function index() {
  const { getEnquires } = useGetAllConnections();
  const { handleGetConversation } = useGetConversation();

  React.useEffect(() => {
    getEnquires();
  }, []);

  const { openChat } = React.useContext(AuthContext);
  const enquiry = useAppSelector((state) => state.enquiry);

  //GET ENQUIRY EVERY 5 SECONDS

  // setInterval(() => {
  //   getEnquires();
  // }, 5000);

  return (
    <Box w="100%" minH={`95vh`}>
      <Box h={`14vh`}>
        <Flex
          justifyContent={"space-between"}
          // pb={3}
        >
          <Heading>Messages</Heading>
          {/* <Hide below="md">
            <Box
              bg="#271732"
              h="56px"
              w="346px"
              borderRadius={"10px"}
            />
          </Hide> */}
        </Flex>
        <Flex
          justify={`end`}
          align={`center`}
          // pb={3}
        >
          <Heading size={`lg`} mb={0}>
            Enquiries
          </Heading>
          <Flex
            borderRadius={`full`}
            w={`25px`}
            h={`25px`}
            bg={`#fff`}
            justify={`center`}
            align={`center`}
            ms={3}
          >
            <Text color={`#341A41`} mb={0} fontWeight={700}>
              {enquiry.length}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex justify="space-between" h={`80vh`} overflow={`scroll`}>
        <Hide below="md">
          <ChatArea />
          <Box w="1px" mx={8} bg={"#929191B2"} />
          <EnquiryList />
        </Hide>
        <Show below="md">
          {!openChat && <EnquiryList />}
          {openChat && <ChatArea />}
        </Show>
      </Flex>
    </Box>
  );
}

export default index;

function ChatArea() {
  const { customerPrincipal, actor, vdbActor, setOpenChat } =
    React.useContext(AuthContext);
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
      handleGetConversation(customerPrincipal);
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
    vdbActor
      .send_message(customerPrincipal, message, BigInt(50))
      .then(() => {
        setSending(false);
        setMessage("");
        //TODO: save the message with redux instead of calling get message
        handleGetConversation(customerPrincipal);
      })
      .catch((err) => {
        setSending(false);
        setMessage("");
        console.debug("nexai", err);
      });
  };

  return (
    <Box w="100%" h={`70vh`} overflow={`scroll`}>
      {/* Header */}
      <Show below="md">
        <Flex
          bg={`#fff`}
          borderRadius={5}
          w={`100px`}
          h={`40px`}
          align={`center`}
          justify={`space-between`}
          mb={3}
          p={2}
          onClick={(e) => {
            setOpenChat(false);
          }}
        >
          <Image src={`BackArrow.svg`} />
          <Text color={`#314A41`} mb={0}>
            Go Back
          </Text>
        </Flex>
      </Show>
      {customerPrincipal.length === 63 ? (
        <Box>
          <Box>
            <Flex
              justify="space-between"
              gap={2}
              align="center"
              mb={4}
            >
              <Flex gap={2} align="center">
                <Avatar />
                <Text mt={3}>Anonymous</Text>
              </Flex>
              <Box display="flex">
                <Text>{customerPrincipal}</Text>
              </Box>
            </Flex>
          </Box>
          {/* chat body */}
          <Flex
            direction="column"
            flex="1" // This will make it take the remaining vertical height
            // overflowY="scroll"
            // h={"calc(60vh - 50px"}
            // css={{
            //   "&::-webkit-scrollbar": {
            //     display: "none", // Hide scrollbar for Chrome, Safari, and Opera
            //   },
            //   scrollbarWidth: "none", // Hide scrollbar for Firefox
            //   msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
            // }}
          >
            {sortedConversation?.map((c, index) => (
              <Flex
                mb={3}
                key={index}
                justifyContent={
                  c.sender != user.principal
                    ? "flex-start"
                    : "flex-end"
                }
              >
                <MessageCard
                  sender={c.sender}
                  body={c.body}
                  time={c.createdAt}
                />
              </Flex>
            ))}
          </Flex>
          {/* input area */}
          <Box
            position="fixed"
            bottom={0}
            // left={0}
            right={0}
            p={4}
            w={`85vw`}
            maxH={`12vh`}
            h={`150px`}
          >
            <Hide below="md">
              <InputGroup h={"100%"} mt={2} size="lg" bg="#271732">
                <Textarea
                  focusBorderColor="none"
                  _placeholder={{
                    paddingTop: "15px",
                    color: "white",
                  }}
                  borderColor={"none"}
                  // p={5}
                  pe="200px"
                  alignItems={`center`}
                  justifyItems={`center`}
                  minH={`100%`}
                  // maxH={`10vh`}
                  placeholder="Enter Message"
                  resize="none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <InputRightElement
                  w="150px"
                  h={"100%"}
                  alignItems={`center`}
                  mr="1.5rem"
                >
                  <Button
                    size="md"
                    px={6}
                    py={6}
                    onClick={handleSendMessage}
                    isLoading={sending}
                    isDisabled={sending || message.length === 0}
                  >
                    Send Message
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Hide>
          </Box>
          <Box
            position="fixed"
            bottom={0}
            // left={0}
            right={0}
            p={2}
            w={`100%`}
            maxH={`12vh`}
            h={`180px`}
          >
            <Show below="md">
              <InputGroup h={"100%"} size="lg" bg="#271732">
                <Textarea
                  focusBorderColor="none"
                  _placeholder={{
                    paddingTop: "15px",
                    color: "white",
                  }}
                  borderColor={"none"}
                  // p={5}
                  pe="70px"
                  alignItems={`center`}
                  justifyItems={`center`}
                  minH={`100%`}
                  // maxH={`10vh`}
                  placeholder="Enter Message"
                  resize="none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <InputRightElement
                  w="14%"
                  mr="1.5rem"
                  h={"100%"}
                  alignItems={`center`}
                >
                  <Button
                    size="sm"
                    px={1.5}
                    py={1}
                    onClick={handleSendMessage}
                    isLoading={sending}
                    isDisabled={sending || message.length === 0}
                  >
                    Send
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Show>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <Text fontSize="38px" fontWeight="700" textAlign={"center"}>
            Start a conversation by clicking on one of the Disputes :)
          </Text>
        </Box>
      )}
    </Box>
  );
}

function EnquiryList() {
  const enquiry = useAppSelector((state) => state.enquiry);
  const { setCustomerPrincipal, setOpenChat } =
    React.useContext(AuthContext);

  const handleSetActveConversation = (
    id: number,
    principal: string
  ) => {
    setCustomerPrincipal(principal);
    setOpenChat(true);
    console.log("open");
  };
  return (
    <Box w={`100%`}>
      {/* <Text fontSize="20px" fontWeight={"700"} mb={8}>
        Enquiry list
      </Text> */}
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
            // w="348px"
            bg="#271732"
            cursor="pointer"
            transform="auto"
            _hover={{
              transform: `scale(1.09)`,
              transition: "transform 0.3s ease",
            }}
            _active={{
              transform: `scale(1.45)`,
              transition: "transform 0.3s ease",
            }}
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
              {DateFormatter(d.createdAt)}
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
