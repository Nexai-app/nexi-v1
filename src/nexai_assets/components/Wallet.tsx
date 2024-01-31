import React, { useEffect, useState } from "react";
import {
    Link as ReactRouterLink,
    useNavigate,
} from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    useMediaQuery,
    Icon,
    Link as Chakralink,
    ModalOverlay,
    IconButton,
    useDisclosure,
    Container,
    Text,
    Divider,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { BiLogOut } from "react-icons/bi";
import { ChatIcon } from "@chakra-ui/icons";
import { AiOutlineBook } from "react-icons/ai";
import FirstModal from "./TestBot/FirstModal";
import DepositModal from "./Wallet/DepositModal";
import WithdrawModal from "./Wallet/WithdrawModal";
import ConvertModal from "./Wallet/ConvertModal";
import TransferModal from "./Wallet/TransferModal";
// import Banner from "./Banner";

const Wallet = () => {

    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [balance, setBalance] = useState(true)

    const onCloseDepositModal = () => {
        setIsDepositModalOpen(false);
    };

    const onOpenDepositModal = () => {
        setIsDepositModalOpen(true);
    };

    const onCloseWithdrawModal = () => {
        setIsWithdrawModalOpen(false);
    };

    const onOpenWithdrawModal = () => {
        setIsWithdrawModalOpen(true);
    };

    const onCloseConvertModal = () => {
        setIsConvertModalOpen(false);
    };

    const onOpenConvertModal = () => {
        setIsConvertModalOpen(true);
    };

    const onCloseTransferModal = () => {
        setIsTransferModalOpen(false);
    };

    const onOpenTransferModal = () => {
        setIsTransferModalOpen(true);
    };



    return (
        <Box
            p={7}
        >
            <Heading>Wallet</Heading>
            <Flex
                justify={`space-between`}
                mb={10}
            >
                <Box
                    w={`350px`}
                    h={`200px`}
                    bg={`#271732`}
                    p={2}
                    borderRadius={8}
                    textAlign={`center`}
                    justifyContent={`center`}
                >
                    <Heading>0000</Heading>
                    <Text>
                        ICP Balance
                    </Text>

                    <Divider />

                    {balance
                        ?
                        (<Flex>
                            <Text>Address: </Text>
                            <Text
                                textOverflow="ellipsis"
                                overflow={`hidden`}
                            >0xAbCdEf1234567890123456789aBCDeF98765432</Text>
                        </Flex>)
                        :
                        <HStack
                            spacing={8}
                            align={`center`}
                            justify={`center`}
                        >
                            <Button
                                colorScheme="white"
                                variant="outline"
                                _hover={{
                                    backgroundColor: "white",
                                    color: "#341A41",
                                }}
                                onClick={onOpenConvertModal}
                            >
                                Convert
                            </Button>
                            <Button
                                bg="white"
                                color={`#341A41`}
                                border={`1px white solid`}
                                _hover={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                }}
                                onClick={onOpenTransferModal}
                            >
                                Transfer
                            </Button>
                        </HStack>
                    }

                    <Text
                        onClick={(e) => setBalance(prev => !prev)}
                        textDecor={`underline`}
                        fontSize={12}
                        cursor={`pointer`}
                    >
                        {balance ? "Convert?" : "Balance?"}
                    </Text>
                </Box>

                <HStack
                    spacing={8}
                    align={`start`}
                >
                    <Button
                        colorScheme="white"
                        variant="outline"
                        _hover={{
                            backgroundColor: "white",
                            color: "#341A41",
                        }}
                        onClick={onOpenDepositModal}
                    >
                        Deposit
                    </Button>
                    <Button
                        bg="white"
                        color={`#341A41`}
                        border={`1px white solid`}
                        _hover={{
                            backgroundColor: "transparent",
                            color: "white",
                        }}
                        onClick={onOpenWithdrawModal}
                    >
                        Withdraw
                    </Button>
                </HStack>
                <DepositModal isOpen={isDepositModalOpen} onClose={onCloseDepositModal} />
                <WithdrawModal isOpen={isWithdrawModalOpen} onClose={onCloseWithdrawModal} />
                <ConvertModal isOpen={isConvertModalOpen} onClose={onCloseConvertModal} />
                <TransferModal isOpen={isTransferModalOpen} onClose={onCloseTransferModal} />
            </Flex>

            <TableContainer
                bg={`#271732`}
                borderRadius={10}
            >
                <Table variant='simple'>
                    <TableCaption>Transactions</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Transaction Type</Th>
                            <Th isNumeric>ICP</Th>
                            <Th>Date/Time</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td rowSpan={5}>Olatokunbo</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                            <Td>12/07123.12:21 pm</Td>
                            <Td>Failed</Td>
                        </Tr>
                        <Tr>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                            <Td>12/07123.12:21 pm</Td>
                            <Td>Failed</Td>
                        </Tr>
                        <Tr>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                            <Td>12/07123.12:21 pm</Td>
                            <Td>Failed</Td>
                        </Tr>
                        <Tr>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                            <Td>12/07123.12:21 pm</Td>
                            <Td>Completed</Td>
                        </Tr>
                        <Tr>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                            <Td>12/07123.12:21 pm</Td>
                            <Td>Failed</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Wallet;
