import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  Box,
  Flex,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux-toolkit/hooks";
import { BeatLoader } from "react-spinners";
import { useInteractBot } from "../../functions/webLlm";
import toast from "react-hot-toast";
import { removeReply } from "../../redux-toolkit/slice/llmSlice";

type ChatType = {
  sender: "you" | "nexai";
  text: string;
};

function SecondModal({ isOpen, onClose }) {
  const { actor, llmBoolStatus, useLLM } = useContext(AuthContext);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatType[]>([]);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const profile = useAppSelector((state) => state.profile);
  const { getReply } = useInteractBot();
  const reply = useAppSelector((state) => state.llm);
  const user = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  // const { call, embeddedQ } = useEmbeddQ();

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // userInput = inputMessage
      // console.log(userInput)
      // handleSendChat();
    }
  };

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent h={`320px`} mx={2}>
        <ModalHeader
          borderTopRadius="md"
          bg={`#341A41`}
          color={"white"}
        >
          Test Bot
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody
          bgColor="gray.300"
          pt={5}
          px={3}
          overflow={`scroll`}
          overflowX="hidden"
          ref={scrollableRef}
        >
          {chat?.map((aChat) => (
            <Flex
              key={aChat.text}
              justifyContent={
                aChat.sender == "nexai" ? "flex-start" : "flex-end"
              }
            >
              <Box
                display="flex"
                py={1}
                px={3}
                bgColor={
                  aChat.sender == "nexai" ? "#341A41" : "green"
                }
                borderRadius="10px"
                maxW="40%"
                mb={2}
              >
                <Text>{aChat.text}</Text>
              </Box>
            </Flex>
          ))}
          {loading && (
            <Flex justifyContent="flex-start">
              <BeatLoader size={8} color="#341A41" />
            </Flex>
          )}
        </ModalBody>
        <ModalFooter p={2}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type="text"
              color="#341A41"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
              onKeyDown={handleInputKeyPress}
              placeholder="ask a pre-made question"
            />
            <InputRightElement width="5p">
              <Button
                h="100%"
                size="sm"
                bg={`#341A41`}
                color={`white`}
                // onClick={handleSendChat}
                isLoading={loading} // Use isLoading to handle loading state
                isDisabled={loading} // Disable the button when loading
                colorScheme="gray" // Change the color scheme to gray for the disabled state
                variant="solid" // Use the solid variant for consistency
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SecondModal;
