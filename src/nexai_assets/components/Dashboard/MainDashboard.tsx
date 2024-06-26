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
  Grid,
} from "@chakra-ui/react";
import LineChart from "../LineChart";
import BarChart from "../BarChart";
import { BiLogOut } from "react-icons/bi";
import { ChatIcon } from "@chakra-ui/icons";
import { AiOutlineBook } from "react-icons/ai";
import FirstModal from "../TestBot/FirstModal";
import Card from "./Card";
import { useGetAllConnections } from "../../functions/index";
import { useAppSelector } from "../../redux-toolkit/hooks";
// import Banner from "./Banner";

const MainDashboard = () => {
  const [isLargerThan991] = useMediaQuery("(max-width: 991px)");
  const navigate = useNavigate();

  const OverlayOne = () => (
    <ModalOverlay
      bg="#341A41.300"
      backdropFilter="blur(1px) hue-rotate(0deg)"
    />
  );

  const { getEnquires } = useGetAllConnections();

  React.useEffect(() => {
    getEnquires();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

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
  const enquiry = useAppSelector((state) => state.enquiry);

  const completedEnq = enquiry?.filter(
    (enq) => enq.completed === true
  );
  const uncompletedEnq = enquiry?.filter(
    (enq) => enq.completed === false
  );

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };
  return (
    <Flex>
      <Box bg="#341A41" w={`100%`} minH={`100vh`}>
        {isLargerThan991 ? (
          <>
            {/* <Banner /> */}
            <Heading>Dashboard</Heading>

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
            <Flex justify={"center"} align="center" my={8}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Card
                  name={"Number of Disputes"}
                  value={enquiry.length}
                />
                <Card
                  name={"Settled Disputes"}
                  value={completedEnq.length}
                />
                <Card
                  name={"Pending Disputes"}
                  value={uncompletedEnq.length}
                />
              </Grid>
            </Flex>
            <Box>
              <LineChart />
              <BarChart />
            </Box>
          </>
        ) : (
          <>
            {/* <Banner /> */}
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
                <IconButton
                  onClick={logOut}
                  aria-label="logout"
                  icon={<BiLogOut />}
                  color="#b44e4e"
                  border={`#b44e4e`}
                  fontSize="20px"
                  fontWeight="bold"
                  variant="outline"
                  _hover={{
                    backgroundColor: "#b44e4e",
                    color: "#341A41",
                  }}
                />
                <FirstModal
                  isOpen={isFirstModalOpen}
                  onClose={onCloseFirstModal}
                />
              </Box>
            </Flex>
            <Flex justify={"space-evenly"} align={"Center"} my={6}>
              <Grid templateColumns="repeat(4, 1fr)" gap={8}>
                <Card
                  name={"Number of Disputes"}
                  value={enquiry.length}
                />
                <Card
                  name={"Settled Disputes"}
                  value={completedEnq.length}
                />
                <Card
                  name={"Pending Disputes"}
                  value={uncompletedEnq.length}
                />
              </Grid>
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
