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
import { AuthContext } from "../../context/AuthContext";
import { useAppSelector } from "../../redux-toolkit/hooks";
import toast from "react-hot-toast";
import { SendArgs } from "../../../declarations/icp_ledger/icp_ledger.did";

function WithdrawModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const wallet = useAppSelector((state) => state.wallet);
  const { ICPLedgerActor, ICPIndexActor } = useContext(AuthContext);
  const [withdrawing, setWithdrawing] = useState(false);

  const [withdraw, setwithdraw] = useState({
    address: "",
    amount: 0,
  });

  const handleWithdrawICP = () => {
    if (withdraw.address.length < 10) {
      return toast.error("Enter a valid address");
    }
    if (withdraw.amount > wallet.icpBalance) {
      return toast.error("Insufficient Fund");
    }

    try {
      var send_arg: SendArgs = {
        to: withdraw.address,
        fee: { e8s: BigInt(10000) },
        memo: BigInt(1),
        from_subaccount: [],
        created_at_time: [],
        amount: { e8s: BigInt(withdraw.amount * 100000000) },
      };
      setWithdrawing(true);
      ICPLedgerActor.send_dfx(send_arg).then((d) => {
        toast.success("Withdrawal Successful");
        setWithdrawing(false);
        onClose();
      });
    } catch (err) {
      console.error("[nexai]", err);
      setWithdrawing(false);
      toast.error("something went wrong while withdrawing the ICP");
    }
  };

  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const parse = (val) => val.replace(/^\$/, "");
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
                amount: parse(value),
              }));
            }}
          >
            <NumberInputField />
          </NumberInput>
          <Text fontSize={12}>
            There is a transaction fee of 0.0001 ICP on every
            transaction
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={`#341A41`}
            fontSize={15}
            color={`white`}
            py={5}
            px={8}
            isLoading={withdrawing}
            onClick={handleWithdrawICP}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default WithdrawModal;
