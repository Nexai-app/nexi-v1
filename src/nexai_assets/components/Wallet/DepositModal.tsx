import React, { useState, useContext } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
// import { AuthContext } from "../../context/AuthContext";

function DepositModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [addy, setAddy] = useState("");

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
          Deposit
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody pt={5} color={`#271732`}>
          <Text fontSize={12}>Send ICP to this address</Text>
          <Input
            placeholder="OxAbCdEf1234567890123456789aBCDeF98765432"
            value={addy}
            onChange={(e) => setAddy(e.target.value)}
            isReadOnly
          />
          <Text fontSize={12}>
            Please copy your ICP address here and paste where
            necessary
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={`#341A41`}
            fontSize={15}
            color={`white`}
            py={5}
            px={8}
            onClick={(e) => console.log(addy)}
          >
            Copy Address
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DepositModal;
