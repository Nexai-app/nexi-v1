import React, { useState, useContext } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  ModalContent,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import SecondModal from "./SecondModal";
import { AuthContext } from "../../context/AuthContext";

function FirstModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const { setUseLLM } = useContext(AuthContext);

  const onCloseSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const onOpenSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent mx={2}>
        <ModalHeader
          borderTopRadius="md"
          bg={`#341A41`}
          color={"white"}
        >
          Test Bot
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody pt={5}>
          <Select
            title="test"
            color="#341A41"
            onChange={(e) => {
              if (e.target.value === "option2") {
                setUseLLM(true);
                return;
              } else if (e.target.value === "option1") {
                setUseLLM(false);
                return;
              }
            }}
            // placeholder="Select option"
            variant="outline"
            w={`100%`}
            bg={`transparent`}
            border={`1px #dccae3 solid`}
          >
            <option value="option1">Default Feature</option>
            <option value="option2">Premium Feature</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={`#341A41`}
            fontSize={15}
            color={`white`}
            py={5}
            px={8}
            onClick={onOpenSecondModal}
          >
            Start Chat
          </Button>
          <SecondModal
            isOpen={isSecondModalOpen}
            onClose={onCloseSecondModal}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FirstModal;
