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
import DateFormatter from "../../utils/DateFormatter";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { EnquiryT } from "../../redux-toolkit/types";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function index() {
  const { getEnquires } = useGetAllConnections();

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
    <Box w="100%">
      <Box h={"14vh"}>
        <Heading>Messages</Heading>
        <Flex justify={`end`} align={`center`}>
          <Show below="md">
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
          </Show>
        </Flex>
      </Box>
      <Flex justify="space-between" overflow={`scroll`}>
        <Hide below="md">
          <Box w={`150vw`}>
            <ChatArea />
          </Box>
          <Box w="1px" mx={8} bg={"#929191B2"} h={"85vh"} />
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
  const {
    customerPrincipal,
    // actor,
    vdbActor,
    setOpenChat,
    connectionId,
    conversationClosed,
    setConversationClosed,
  } = React.useContext(AuthContext);
  const user = useAppSelector((state) => state.profile);
  const conversation = useAppSelector((state) => state.conversation);
  const [sending, setSending] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [closing, setClosing] = React.useState(false);
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
        console.debug("[nexai]", err);
      });
  };

  const handleCloseConvo = async () => {
    try {
      setClosing(true);
      vdbActor
        .set_connection_completed(BigInt(connectionId))
        .then(() => {
          setClosing(false);
          toast.success("Conversation Closed");
          setConversationClosed(true);
        });
    } catch (err: any) {
      setClosing(false);
      setMessage("");
      console.debug("[nexai]", err);
    }
  };

  return (
    <Box w="100%">
      {/* Header ON MOBILE */}
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
              <Box display="flex" flexDirection="column">
                <Text>{customerPrincipal}</Text>
                {!conversationClosed && (
                  <Button
                    isLoading={closing}
                    onClick={handleCloseConvo}
                    py={4}
                    px={4}
                  >
                    Close Conversation
                  </Button>
                )}
              </Box>
            </Flex>
          </Box>
          {/* chat body */}
          <Flex
            direction="column"
            // flex="1" // This will make it take the remaining vertical height
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
          {conversationClosed ? (
            <Flex justify={"center"}>
              <Text fontSize={"24px"}>
                You closed this conversation already
              </Text>
            </Flex>
          ) : (
            <InputGroup /* h={"70px"} mt={2} size="lg" bg="#271732" */
            >
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  position: "sticky",
                  bottom: 0,
                  background: "#271732",
                  padding: "10px",
                }}
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
          )}
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
  const {
    setCustomerPrincipal,
    setOpenChat,
    setConnectionId,
    setConversationClosed,
  } = React.useContext(AuthContext);

  const handleSetActveConversation = (
    id: number,
    principal: string,
    completed: boolean
  ) => {
    setConnectionId(id);
    setConversationClosed(completed);
    setCustomerPrincipal(principal);
    setOpenChat(true);
  };
  return (
    <Box w={`100%`}>
      <Flex>
        <Text fontSize="20px" fontWeight={"700"} mb={8}>
          Enquiries
        </Text>
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
            bg="#271732"
            cursor="pointer"
            transform="auto"
            _hover={{
              transform: `scale(1.05)`,
              transition: "transform 0.3s ease",
            }}
            _active={{
              transform: `scale(1.09)`,
              transition: "transform 0.3s ease",
            }}
            onClick={(e) =>
              handleSetActveConversation(
                d.id,
                d.account2,
                d.completed
              )
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
