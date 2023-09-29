import React, { useContext, useState, useEffect, useRef } from "react";
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
import { useEmbeddQ, useInitTransformers } from "../../functions/ml";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { BeatLoader } from "react-spinners";
import { useInitLLM, useInteractBot } from "../../functions/webLlm";
import toast from "react-hot-toast";
import { removeReply } from "../../redux-toolkit/slice/llmSlice";

type ChatType = {
  sender: "you" | "nexai";
  text: string;
};

function SecondModal({ isOpen, onClose }) {
  const { actor, llmBoolStatus } = useContext(AuthContext);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatType[]>([]);
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const profile = useAppSelector((state) => state.profile);
  const { init } = useInitTransformers();
  const { getReply } = useInteractBot();
  const { initLLM } = useInitLLM();
  const reply = useAppSelector((state) => state.llm)
  const dispatch = useAppDispatch()


  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const { call, embeddedQ } = useEmbeddQ();

  // initializes the ml
  useEffect(() => {
    const call = async () => {
      await init();
      // await initLLM();
    };
    call();
  }, []);

  const handleSendChat = async () => {
    dispatch(removeReply())
    var myMess: ChatType = {
      sender: "you",
      text: inputMessage,
    };
    chat.push(myMess);
    setLoading(true);
    await call(inputMessage);

    if (embeddedQ[0].length == 384) {
      console.log("embedding", embeddedQ);
      actor
        ?.VDBGetSimilar(profile.vdbId, embeddedQ[0], 1)
        .then(async (d: any) => {
          console.log(d, llmBoolStatus)
          if (llmBoolStatus) {
            let message: ChatType = {
              sender: "nexai",
              text: ""
            }
            //if there is no set asnweer for the question
            if (d.Ok[0][0] < 0.5) {

              message = {
                sender: "nexai",
                text: "I apologize for not being able to assist with your question. If you need further help, please contact our support team.",
              };
            } else {
              message = {
                sender: "nexai",
                text: "",
              };
            }
            let template = `Please answer users' questions base on the company description:
              ${profile?.description} and the default answer the company gave as reply to the question which is ${d.Ok[0][1]}.modify it an answer the question like a human with the reply that the company already set
             Please answer question ${inputMessage}
             `;


            const res_ = await getReply(template);
            if (res_) {

              message = {
                sender: "nexai",
                text: res_,
              };

              chat.push(message);
              setLoading(false);
            }
            else if (!res_) {
              message = {
                sender: "nexai",
                text: "could not proess reply",
              };
              chat.push(message);
              setLoading(false);
            }

          } else {

            let newM = d.Ok[0][1].split("\n");
            let message: ChatType = {
              sender: "nexai",
              text: newM[1],
            };
            if (d.Ok[0][0] < 0.5) {
              message = {
                sender: "nexai",
                text: "I apologize for not being able to assist with your question. If you need further help, please contact our support team.",
              };
            } else {
              message = {
                sender: "nexai",
                text: newM[1],
              };
            }

            chat.push(message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // userInput = inputMessage
      // console.log(userInput)
      handleSendChat();
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
                onClick={handleSendChat}
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
