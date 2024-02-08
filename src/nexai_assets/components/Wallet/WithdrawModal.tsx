import React, { useState, useContext } from "react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Input,
  Text,
  NumberInputField,
  NumberInput,
} from "@chakra-ui/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
// import { AuthContext } from "../../context/AuthContext";

function WithdrawModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const [withdraw, setwithdraw] = useState({
    address: "",
    amount: "",
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
          Withdraw
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody pt={5} color={`#271732`}>
          <Text fontSize={12}>Receive Address</Text>
          <Input
            placeholder="OxAbC..."
            value={withdraw.address}
            onChange={(e) => {
              setwithdraw((prev) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
            mb={4}
          />
          <Text fontSize={12}>Quantity</Text>
          <NumberInput
            min={0.01}
            // placeholder='Min quantity: 0.01C.P'
            value={withdraw.amount}
            onChange={(value) => {
              setwithdraw((prev) => ({
                ...prev,
                amount: value,
              }));
            }}
          >
            <NumberInputField />
          </NumberInput>
          <Text fontSize={12}>
            Please enter the account address of the receiver
          </Text>
        </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawModal;
