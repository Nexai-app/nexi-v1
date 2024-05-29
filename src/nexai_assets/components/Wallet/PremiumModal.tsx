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

function PremiumModal({ isOpen, onClose }) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const wallet = useAppSelector((state) => state.wallet);
  const { ICPLedgerActor, ICPIndexActor, actor } =
    useContext(AuthContext);
  const [withdrawing, setWithdrawing] = useState(false);

  const [withdraw, setwithdraw] = useState({
    address: "",
    amount: 0,
  });

  const handleWithdrawICP = () => {
    if (wallet.icpBalance < 0.2) {
      return toast.error("Insufficient Fund");
    }
    try {
      var send_arg: SendArgs = {
        to: "f5d47c3e3dae4193a85c69bfe53faf0aec39effded62d30f8f8b2f0e738628ec",
        fee: { e8s: BigInt(10000) },
        memo: BigInt(1),
        from_subaccount: [],
        created_at_time: [],
        amount: { e8s: BigInt(0.2 * 100000000) },
      };
      setWithdrawing(true);
      ICPLedgerActor.send_dfx(send_arg).then((d) => {
        actor.set_premium(true).then((p) => {
          toast.success("Premium Purchase Successful");
          setWithdrawing(false);
          onClose();
        });
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
          Subscribe to Premium
        </ModalHeader>
        <ModalCloseButton color={`white`} />
        <ModalBody pt={5} color={`#271732`}>
          <Text fontSize={12}>Receiving Address</Text>
          <Input
            value={
              "f5d47c3e3dae4193a85c69bfe53faf0aec39effded62d30f8f8b2f0e738628ec"
            }
            isReadOnly
            mb={4}
          />
          <Text my={3}>
            Nexai is excited to introduce a premium feature that
            unlocks exclusive benefits for our users. For just 0.2
            ICP, users gain access to a host of premium features,
            enhancing their Nexai experience. From advanced analytics
            to personalized assistance, the premium subscription
            offers unparalleled value. Upgrade today and elevate your
            Nexai experience
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
            disabled={true}
          >
            Subscribe
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PremiumModal;
