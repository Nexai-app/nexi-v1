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
import PremiumModal from "./Wallet/PremiumModal";
import { AuthContext } from "../context/AuthContext";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux-toolkit/hooks";
import {
  addAccIdentifier,
  addICPBalance,
} from "../redux-toolkit/slice/WalletSlice";
import toast from "react-hot-toast";
import {
  GetAccountIdentifierTransactionsArgs,
  GetAccountIdentifierTransactionsResult,
} from "../../declarations/icp_index/icp_index.did";
import { TransactionT } from "../redux-toolkit/types";
import {
  addTransaction,
  clear,
} from "../redux-toolkit/slice/TransactionSlice";
import DateFormatter from "../utils/DateFormatter";

const Wallet = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] =
    useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] =
    useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [balance, setBalance] = useState(true);
  const profile = useAppSelector((state) => state.profile);
  const wallet = useAppSelector((state) => state.wallet);
  const transactions = useAppSelector((state) => state.transactions);
  const [loading, setLoading] = useState(false);

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

  const onOpenPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };
  const onClosePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  const { actor, ICPIndexActor } = React.useContext(AuthContext);

  const getTransactions = () => {
    try {
      setLoading(true);
      actor.getMyAccountIdentifier().then((d) => {
        var args: GetAccountIdentifierTransactionsArgs = {
          max_results: BigInt(5),
          start: [],
          account_identifier: d,
        };

        ICPIndexActor.get_account_identifier_transactions(args).then(
          (val: GetAccountIdentifierTransactionsResult) => {
            if ("Ok" in val) {
              console.log("transactions", val?.Ok.transactions);
              dispatch(clear());
              var data = val?.Ok.transactions;
              data.map((t: any) => {
                var arg: TransactionT = {
                  id: Number(t.id),
                  createdAt: Number(
                    t.transaction.created_at_time[0].timestamp_nanos
                  ),
                  amount: Number(
                    t.transaction.operation?.Transfer.amount.e8s
                  ),
                  fee: Number(
                    t.transaction.operation?.Transfer?.fee.e8s
                  ),
                  to: t.transaction.operation?.Transfer.to,
                };
                dispatch(addTransaction(arg));
              });
              setLoading(false);
            } else if ("Err" in val) {
              toast.error(val.Err.message);
              setLoading(false);
              return;
            }
          }
        );
      });
    } catch (err) {
      setLoading(false);
      toast.error("souldn't get transaction history at this time");
      console.error("[nexai]", err);
    }
  };

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
        dispatch(addICPBalance(Number(d) / 100000000));
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
  };
  React.useEffect(() => {
    getTheseThings();

    getTransactions();
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
        <Flex gap={3} align="center" flexDirection={"column"}>
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
          {!profile.premium && (
            <Button
              bg="white"
              color={`#341A41`}
              border={`1px white solid`}
              _hover={{
                backgroundColor: "transparent",
                color: "white",
              }}
              w="100%"
              onClick={onOpenPremiumModal}
            >
              Subscribe for Premium
            </Button>
          )}
        </Flex>

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
        <PremiumModal
          isOpen={isPremiumModalOpen}
          onClose={onClosePremiumModal}
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
              <Th>Transaction Id</Th>
              <Th>Amount</Th>
              <Th>Date/Time</Th>
              <Th>fee</Th>
            </Tr>
          </Thead>
          <Tbody overflow={`scroll`}>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.id}</Td>
                <Td>
                  {(transaction.amount / 100000000).toLocaleString()}
                </Td>
                <Td>{DateFormatter(transaction.createdAt)}</Td>
                <Td>
                  {(transaction.fee / 100000000).toLocaleString()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Wallet;
