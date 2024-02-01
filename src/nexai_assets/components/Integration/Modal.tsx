import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

type IntegrationModalT = {
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  status: "loading" | "true" | "false";
};

function IntegrationModal(props: IntegrationModalT) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent justifyContent={"center"} color={"black"}>
          <ModalHeader>
            {props.status === "true" && "Integration Successful"}
            {props.status === "false" && "Integration Unsuccessful"}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {props.status === "true" &&
              "You have successfully integrated your assistant library to dApp"}
            {props.status === "false" &&
              "Your assistant library couldn't establsh a connection to Nexai"}
            {props.status === "loading" &&
              "testing integration. hold on..."}
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              colorScheme="purple"
              mr={3}
              isDisabled={props.status === "loading"}
              onClick={props.onClose}
            >
              {props.status === "true" ? "Done" : "Close"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default IntegrationModal;
