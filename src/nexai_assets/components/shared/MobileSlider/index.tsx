import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Show,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuNavigation } from "../Sidebar";

function index() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();

  return (
    <Show below="md">
      <Box bg="#341A41">
        <Box
          display={{ base: "flex", md: "none" }}
          dir="flex-end"
          m={8}
          onClick={onOpen}
          color="white"
        >
          <svg viewBox="0 0 100 80" width="30" height="30">
            <rect width="100" height="10" fill="white"></rect>
            <rect y="30" width="100" height="10" fill="white"></rect>
            <rect y="60" width="100" height="10" fill="white"></rect>
          </svg>
        </Box>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg="#341A41" color="white">
            <DrawerCloseButton />

            <DrawerBody pt="100px">
              {MenuNavigation.map(({ icon, title, route }) => (
                <Box
                  key={title}
                  h={`45px`}
                  my={5}
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
                  pb={8}
                  onClick={() => {
                    navigate(`${route}`);
                  }}
                >
                  <Flex alignItems="center">
                    <Box mr={3} my={0}>
                      {location.pathname.includes(route)
                        ? icon.active
                        : icon.inactive}
                    </Box>
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
                  </Flex>
                </Box>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Show>
  );
}

export default index;
