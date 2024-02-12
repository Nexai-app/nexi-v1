import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
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
import DepositModal from "./Wallet/DepositModal";
import WithdrawModal from "./Wallet/WithdrawModal";
import ConvertModal from "./Wallet/ConvertModal";
import TransferModal from "./Wallet/TransferModal";
import { AuthContext } from "../context/AuthContext";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux-toolkit/hooks";
import {
  addAccIdentifier,
  addICPBalance,
} from "../redux-toolkit/slice/WalletSlice";

const Wallet = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState(false);
  const [balance, setBalance] = useState(true);
  const profile = useAppSelector((state) => state.profile);
  const wallet = useAppSelector((state) => state.wallet);

  const dispatch = useAppDispatch();

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
        dispatch(addICPBalance(Number(d)));
        console.debug("[icp_balance]", d);
      })
      .catch((err) => {
        console.error("[icp_balance_err]", err);
      });

    actor
      .getMyAccountIdentifier()
      .then((d) => {
        dispatch(addAccIdentifier(d));
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
            <Heading>{wallet?.icpBalance}</Heading>
            <Text>ICP Balance</Text>

            <Divider />

            {balance ? (
              <Box>
                <Flex>
                  <Text pe={2}>Address:</Text>
                  <Text textOverflow="ellipsis" overflow={`hidden`}>
                    {wallet?.accountIdentifier}
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
