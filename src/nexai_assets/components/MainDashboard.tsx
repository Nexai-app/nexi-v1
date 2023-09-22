import React, { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
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
  useDisclosure,
} from "@chakra-ui/react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { ChatIcon } from "@chakra-ui/icons";
import { AiOutlineBook } from "react-icons/ai";
import FirstModal from "./TestBot/FirstModal";
import { useUpdateProfile } from "../functions";
import { useInitTransformers } from "../functions/ml";

const MainDashboard = () => {
  const [isLargerThan991] = useMediaQuery("(max-width: 991px)");

  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const { updateProfile } = useUpdateProfile();
  const { init } = useInitTransformers();

  const onCloseFirstModal = () => {
    setIsFirstModalOpen(false);
  };

  const onOpenFirstModal = () => {
    setIsFirstModalOpen(true);
  };

  const onCloseSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const onOpenSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  // useEffect(() => {

  //   init();
  // });

  // initializes the ml
  useEffect(() => {
    updateProfile();
    const call = async () => {
      await init();
    };
    call();
  }, []);

  return (
    <Flex>
      <Box bg="#341A41" w={`100%`} minH={`100vh`}>
        {isLargerThan991 ? (
          <>
            <Heading>Home</Heading>

            <Flex alignItems="center" py="10px">
              <Box fontSize="14px">
                Get access to your bot analytics and information here
              </Box>
              <Spacer />
              <Box display="flex" flexDirection="column" gap={4}>
                <Chakralink as={ReactRouterLink} to="/train-bot">
                  <Button
                    colorScheme="white"
                    variant="outline"
                    _hover={{
                      backgroundColor: "white",
                      color: "#341A41",
                    }}
                    leftIcon={<ChatIcon />}
                  >
                    Train Bot
                  </Button>
                </Chakralink>
                <Button
                  bg="white"
                  color={`#341A41`}
                  border={`1px white solid`}
                  _hover={{
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  rightIcon={<Icon as={AiOutlineBook} boxSize={4} />}
                  onClick={onOpenFirstModal}
                >
                  Test Bot
                </Button>
                <FirstModal
                  isOpen={isFirstModalOpen}
                  onClose={onCloseFirstModal}
                />
              </Box>
            </Flex>
            <Box>
              <LineChart />
              <BarChart />
            </Box>
          </>
        ) : (
          <>
            <Heading>Home</Heading>

            <Flex alignItems="center" py="10px">
              <Box>
                Get access to your bot analytics and information here
              </Box>
              <Spacer />
              <Box display="flex" flexDirection="row" gap={4}>
                <Chakralink as={ReactRouterLink} to="/train-bot">
                  <Button
                    colorScheme="white"
                    variant="outline"
                    _hover={{
                      backgroundColor: "white",
                      color: "#341A41",
                    }}
                    leftIcon={<ChatIcon />}
                  >
                    Train Bot
                  </Button>
                </Chakralink>
                <Button
                  bg="white"
                  color={`#341A41`}
                  border={`1px white solid`}
                  _hover={{
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                  rightIcon={<Icon as={AiOutlineBook} boxSize={4} />}
                  onClick={onOpenFirstModal}
                >
                  Test Bot
                </Button>
                <FirstModal
                  isOpen={isFirstModalOpen}
                  onClose={onCloseFirstModal}
                />
              </Box>
            </Flex>
            <Box>
              <LineChart />
              <BarChart />
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default MainDashboard;
