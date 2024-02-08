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

function TransferModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const [transfer, setTransfer] = useState({
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
          Transfer Between Wallet
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody pt={5} color={`#271732`}>
          <Text fontSize={12}>ICP amount</Text>
          <Input
            placeholder="0.00 ICP"
            value={transfer.amount}
            onChange={(e) => {
              setTransfer((prev) => ({
                ...prev,
                amount: e.target.value,
              }));
            }}
            mb={4}
          />
          <Text fontSize={12}>Estimated Cycle amount</Text>
          <Input
            placeholder="0.00 Cycle"
            value={transfer.cycle}
            onChange={(e) => {
              setTransfer((prev) => ({
                ...prev,
                cycle: e.target.value,
              }));
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bg={`#341A41`}
            fontSize={15}
            color={`white`}
            py={5}
            px={8}
            onClick={(e) => console.log(transfer)}
          >
            Transfer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TransferModal;
