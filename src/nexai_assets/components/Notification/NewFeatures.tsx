import React, { useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const features = [
  {
    id: 1,
    title: "Default Mode",
    desc: " Get responses based on saved question-answer",
  },
  {
    id: 2,
    title: "LLM Mode",
    desc: "Human-like paraphrased responses for a more natural feel.",
  },
  {
    id: 3,
    title: "Enhanced Status Updates:",
    desc: "Clearer communication of request status.",
  },
];
const bugs = [
  {
    id: 1,
    title: "Beta Stage",
    desc: "Nexai is in beta and not 100% recommended for a production use.",
  },
  {
    id: 2,
    title: "NPM Assistant",
    desc: "The npm assistant is currently buggy and under maintenance, so we urge users to integrate nexai manually and without the assistant for now.",
  },
  {
    id: 3,
    title: "No Local Testing",
    desc: "Integration testing with Nexai is only possible on the mainnet for now.",
  },
];
const NewFeatures = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!localStorage.getItem("newFeatures")) {
      onOpen();
      //   localStorage.setItem("newFeatures", "true");
    }
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#341A41" opacity={0.1} color="white">
          <ModalHeader color="white">New Features 🛠🚀 </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap={4}>
              {features.map(({ id, title, desc }) => (
                <Wrap key={id}>
                  <WrapItem>
                    <Text fontWeight={500}>
                      {title}
                      <span style={{ fontWeight: "lighter" }}>
                        {" "}
                        : {desc}
                      </span>{" "}
                    </Text>
                  </WrapItem>
                </Wrap>
              ))}
            </Flex>
          </ModalBody>

          <ModalHeader color="red.400">
            Limitations (Beta Stage)
          </ModalHeader>

          <ModalBody>
            <Flex direction="column" gap={4}>
              {bugs.map(({ id, title, desc }) => (
                <Wrap key={id}>
                  <WrapItem>
                    <Text fontWeight={500}>
                      {title}
                      <span style={{ fontWeight: "lighter" }}>
                        {" "}
                        : {desc}
                      </span>{" "}
                    </Text>
                  </WrapItem>
                </Wrap>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewFeatures;
