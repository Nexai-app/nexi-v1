import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Center,
  Spacer,
  Icon,
  IconProps,
  Hide,
  Container,
} from "@chakra-ui/react";
import Logo from "../Logo";
import { LayoutContext } from "../LayoutContainer";
import _chakra_ui_system from "@chakra-ui/system";
import { AiFillHome } from "react-icons/ai";
import { BsJournalCode, BsPeopleFill } from "react-icons/bs";
import { RiChat2Fill } from "react-icons/ri";

export const MenuNavigation = [
  {
    icon: {
      inactive: (
        <Icon
          as={AiFillHome}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
      active: (
        <Icon
          as={AiFillHome}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
    },
    title: "Home",
    route: "/dashboard",
  },
  {
    icon: {
      inactive: (
        <Icon
          as={BsJournalCode}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
      active: (
        <Icon
          as={BsJournalCode}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
    },
    title: "Integration",
    route: "/integration",
  },
  {
    icon: {
      inactive: (
        <Icon
          as={BsPeopleFill}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
      active: (
        <Icon
          as={BsPeopleFill}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
    },
    title: "Customer",
    route: "/chat",
  },
  {
    icon: {
      inactive: (
        <Icon
          as={RiChat2Fill}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
      active: (
        <Icon
          as={RiChat2Fill}
          boxSize={6}
          alignSelf={`center`}
          mr={`15px`}
        />
      ),
    },
    title: "Trainings",
    route: "/my-questions",
  },
];

type NavType = {
  title: string;
  route: string;
  icon: {
    inactive: _chakra_ui_system.ComponentWithAs<"svg", IconProps>;
    active: _chakra_ui_system.ComponentWithAs<"svg", IconProps>;
  };
};

function index() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSidebar, setShowSidebar } =
    React.useContext(LayoutContext);

  return (
    <Hide below="md">
      <Box
        display="flex"
        justifyContent={"space-between"}
        pos="fixed"
        top={0}
        right={0}
        bottom={0}
        left={0}
        zIndex="sticky"
        background="#341A41"
        maxW="15%"
        transform="auto"
        transition="transform 0.2s ease"
        onClick={() => setShowSidebar(false)}
        translateX={{ base: showSidebar ? 0 : "-100%", mdx2: 0 }}
      >
        <Box py={8} w="full" mx="auto">
          <Box display={"flex"} justifyContent={"center"}>
            <Logo />
          </Box>
          <Spacer h="40px" />

          <Box pos="relative">
            {MenuNavigation.map(({ icon, title, route }) => (
              <Box
                key={title}
                h={`45px`}
                my={8}
                // py="auto"
                ml={5}
                borderLeftRadius="5"
                pl={`15px`}
                __css={{
                  background: location.pathname.includes(route)
                    ? "white"
                    : "#341A41",
                  color: location.pathname.includes(route)
                    ? "#341A41"
                    : "white",
                }}
                _hover={{
                  backgroundColor: "white",
                  color: "#341A41",
                }}
                cursor="pointer"
                onClick={() => {
                  navigate(`${route}`);
                }}
              >
                <Flex gap={2} alignItems={"center"}>
                  <Box my={0}>
                    {location.pathname.includes(route)
                      ? icon.active
                      : icon.inactive}
                  </Box>
                  <Hide below="lg">
                    <Text
                      my={0}
                      py={0}
                      position="relative"
                      top="3px"
                      fontSize="18px"
                      fontWeight="500"
                    >
                      {title}
                    </Text>
                  </Hide>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
        <Box pos="relative" w="1px" bg={"#929191B2"} h={"100vh"} />
      </Box>
    </Hide>
  );
}

export default index;
