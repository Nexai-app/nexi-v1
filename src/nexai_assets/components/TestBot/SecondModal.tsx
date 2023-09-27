import React, { useContext, useState, useEffect } from "react";
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
import { useAppSelector } from "../../redux-toolkit/hooks";
import { BeatLoader } from "react-spinners";
import { useInitLLM, useInteractBot } from "../../functions/webLlm";

type ChatType = {
  sender: "you" | "nexai";
  text: string;
};

function SecondModal({ isOpen, onClose }) {
  const { actor } = useContext(AuthContext);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatType[]>([]); // State variable for chat messages
  const profile = useAppSelector((state) => state.profile);
  const { init } = useInitTransformers();
  const { getReply, res } = useInteractBot();
  const { initLLM } = useInitLLM();

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
      await initLLM();
    };
    call();
  }, []);

  const handleSendChat = async () => {
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
          let template = `Please answer users' questions base on the company description:
          ${profile?.description}.
         Here we have a set of existing similar questions:
         ${d.Ok[0][1]}
         Please answer question ${inputMessage}
         `;
          await getReply(template);
          if (res.length > 4) {
            let message: ChatType = {
              sender: "nexai",
              text: res,
            };
            if (d.Ok[0][0] < 0.5) {
              message = {
                sender: "nexai",
                text: "I apologize for not being able to assist with your question. If you need further help, please contact our support team.",
              };
            } else {
              message = {
                sender: "nexai",
                text: res,
              };
            }

            chat.push(message);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
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
              placeholder="ask a pre-made question"
            />
            <InputRightElement width="5p">
              <Button
                h="100%"
                size="sm"
                bg={`#341A41`}
                color={`white`}
                onClick={handleSendChat}
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
