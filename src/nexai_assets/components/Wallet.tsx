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
  Image,
} from "@chakra-ui/react";
// import LineChart from "./LineChart";
// import BarChart from "./BarChart";
// import { BiLogOut } from "react-icons/bi";
// import { ChatIcon } from "@chakra-ui/icons";
// import { AiOutlineBook } from "react-icons/ai";
// import FirstModal from "./TestBot/FirstModal";
import DepositModal from "./Wallet/DepositModal";
import WithdrawModal from "./Wallet/WithdrawModal";
import ConvertModal from "./Wallet/ConvertModal";
import TransferModal from "./Wallet/TransferModal";
import { AuthContext } from "../context/AuthContext";
import { useAppSelector } from "../redux-toolkit/hooks";
// import {AppContext} from "../context/"
// import copy from "./assets/copy.svg";
// import right from "./assets/chevron-right.svg";
// import left from "./assets/chevron-left.svg";
// import Banner from "./Banner";

const Wallet = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState(false);
  const [balance, setBalance] = useState(true);
  const profile = useAppSelector((state) => state.profile);

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

  const { actor } = React.useContext(AuthContext);

  const getTheseThings = () => {
    actor
      .icp_balance_dfx()
      .then((d) => {
        console.debug("[icp_balance_dfx]", d);
      })
      .catch((err) => {
        console.error("[icp_balance_dfx_err]", err);
      });

    actor
      .icp_balance()
      .then((d) => {
        console.debug("[icp_balance]", d);
      })
      .catch((err) => {
        console.error("[icp_balance_err]", err);
      });

    actor
      .getMyAccountIdentifier()
      .then((d) => {
        console.debug("[getMyAccountIdentifier]", d);
      })
      .catch((err) => {
        console.error("[getMyAccountIdentifier]", err);
      });

    //   actor
    //   .transferICP( ,1,1)
    //   .then((d) => {
    //     console.debug("[transferICP]", d);
    //   })
    //   .catch((err) => {
    //     console.error("[transferICP]", err);
    //   });
  };
  React.useEffect(() => {
    getTheseThings();
  }, []);

  return (
    <Box p={7} bg={`#341A41`} color={`white`}>
      <Heading>Wallet</Heading>
      <Flex justify={`space-between`} mb={10}>
        <Flex align={`center`}>
          {!balance && (
            <Flex
              borderRadius={`full`}
              w={`40px`}
              h={`40px`}
              bg={`white`}
              justify={`center`}
              align={`center`}
              onClick={(e) => setBalance((prev) => !prev)}
            >
              <img src={`chevron-left.svg`} />
            </Flex>
          )}
          <Box
            minW={`500px`}
            minH={`250px`}
            bg={`#271732`}
            p={5}
            borderRadius={8}
            textAlign={`center`}
            justifyContent={`center`}
            position={`relative`}
            mx={4}
          >
            <Heading>0000</Heading>
            <Text>ICP Balance</Text>

            <Divider />

            {balance ? (
              <Box>
                <Flex>
                  <Text pe={2}>Address:</Text>
                  <Text textOverflow="ellipsis" overflow={`hidden`}>
                    0xAbCdEf1234567890123456789aBCDeF98765432
                  </Text>
                </Flex>
                <Flex>
                  <Text pe={2}>Principal ID:</Text>
                  <Text>{profile?.principal}</Text>
                </Flex>
              </Box>
            ) : (
              <HStack spacing={8} align={`center`} justify={`center`}>
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
            )}

            {/* <Text
                            onClick={(e) => setBalance(prev => !prev)}
                            textDecor={`underline`}
                            fontSize={12}
                            cursor={`pointer`}
                        >
                            {balance ? "Convert?" : "Balance?"}
                        </Text> */}

            {/* <Image
                            pos={`absolute`}
                            bottom={0} 
                            right={0} 
                            src={`copy.svg`}
                        /> */}
            {balance && (
              <Box pos={`absolute`} bottom={4} right={4}>
                <img src={`copy.svg`} />
              </Box>
            )}
          </Box>
          {balance && (
            <Flex
              borderRadius={`full`}
              w={`40px`}
              h={`40px`}
              bg={`white`}
              justify={`center`}
              align={`center`}
              onClick={(e) => setBalance((prev) => !prev)}
            >
              <img src={`chevron-right.svg`} />
            </Flex>
          )}
        </Flex>

        <HStack spacing={8} align={`start`}>
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
        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={onCloseDepositModal}
        />
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={onCloseWithdrawModal}
        />
        <ConvertModal
          isOpen={isConvertModalOpen}
          onClose={onCloseConvertModal}
        />
        <TransferModal
          isOpen={isTransferModalOpen}
          onClose={onCloseTransferModal}
        />
      </Flex>

      <TableContainer
        color={`white`}
        borderRadius={10}
        bg={"primary.50"}
        // h={`56vh`}
      >
        <Table variant="simple" borderColor={`white`}>
          <TableCaption>Transactions</TableCaption>
          <Thead bg={`#271732`}>
            <Tr>
              <Th>Name</Th>
              <Th>Transaction Type</Th>
              <Th isNumeric>ICP</Th>
              <Th>Date/Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody overflow={`scroll`}>
            <Tr>
              <Td rowSpan={10}>Olatokunbo</Td>
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
              <Td>Failed</Td>
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
