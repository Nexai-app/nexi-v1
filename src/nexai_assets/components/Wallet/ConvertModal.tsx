import React, { useState, useContext } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
// import { AuthContext } from "../../context/AuthContext";

function ConvertModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const [convert, setConvert] = useState({
    amount: "",
    cycle: "",
  });

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
          Convert
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody pt={5} color={`#271732`}>
          <Text fontSize={12}>ICP Amount</Text>
          <Input
            placeholder="0.00 ICP"
            value={convert.amount}
            onChange={(e) => {
              setConvert((prev) => ({
                ...prev,
                amount: e.target.value,
              }));
            }}
          />

          <Flex justify={`center`}>
            <Button
              bg={`#341A41`}
              fontSize={15}
              color={`white`}
              py={5}
              px={8}
              my={8}
              onClick={(e) => console.log(convert)}
            >
              Convert
            </Button>
          </Flex>

          <Text fontSize={12}>Cycle Amount</Text>
          <Input
            placeholder="0.00 Cycle"
            value={convert.cycle}
            onChange={(e) => {
              setConvert((prev) => ({
                ...prev,
                cycle: e.target.value,
              }));
            }}
            mb={3}
          />
        </ModalBody>
        {/* <ModalFooter>
                    <Button
                        bg={`#341A41`}
                        fontSize={15}
                        color={`white`}
                        py={5}
                        px={8}
                        onClick={(e) => console.log(withdraw)}
                    >
                        Send
                    </Button>
                </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}

export default ConvertModal;
