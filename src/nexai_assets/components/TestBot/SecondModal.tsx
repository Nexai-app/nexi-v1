import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ModalContent, ModalCloseButton, Menu, MenuButton, MenuList, MenuItem, ModalOverlay, useDisclosure, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "@chakra-ui/react";




function SecondModal({ isOpen, onClose }) {

    const OverlayOne = () => (
        <ModalOverlay
            bg='#341A41.300'
            backdropFilter='blur(1px) hue-rotate(0deg)'
        />
    )

    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    // const onCloseSecondModal = () => {
    //     setIsSecondModalOpen(false);
    // };

    // const onOpenSecondModal = () => {
    //     setIsSecondModalOpen(true);
    // };

    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent h={`320px`} mx={2}>
                <ModalHeader borderTopRadius="md" bg={`#341A41`} color={'white'}>Test Bot</ModalHeader>
                <ModalCloseButton color={`white`} />
                <ModalBody pt={5} px={3}>

                </ModalBody>
                <ModalFooter p={2}>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type="text"
                            placeholder='Enter comment'
                        />
                        <InputRightElement width='5p'>
                            <Button h='100%' size='sm' bg={`#341A41`} color={`white`}>
                                Send
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SecondModal
