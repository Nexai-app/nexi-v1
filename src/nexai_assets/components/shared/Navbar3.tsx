import React from "react";
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { BiLogOut } from "react-icons/bi";
import Navbar from "./Navbar";

const DashNavbar = () => {
  const [isLargerThan750] = useMediaQuery("(max-width: 750px)");

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box>
      {isLargerThan750 ? (
        <Flex
          minWidth="max-content"
          py="50px"
          px="30px"
          alignItems="center"
          gap="2"
        >
          <Box>
            <Navbar />
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <IconButton
              aria-label="Search database"
              icon={<SearchIcon />}
              bg="transparent"
              color="white"
              fontWeight="bold"
            />
            <IconButton
              aria-label="logout"
              icon={<BiLogOut />}
              bg="transparent"
              color="white"
              fontSize="20px"
              fontWeight="bold"
              onClick={handleLogOut}
            />
          </ButtonGroup>
        </Flex>
      ) : (
        <Flex
          minWidth="max-content"
          py="50px"
          // px="80px"
          alignItems="space-between"
          // gap="2"
        >
          <Navbar w="10px" h="10px" />
          <ButtonGroup gap="2">
            <IconButton
              aria-label="Search database"
              icon={<SearchIcon />}
              bg="transparent"
              color="white"
              fontWeight="bold"
            />
            <IconButton
              aria-label="logout"
              icon={<BiLogOut />}
              bg="transparent"
              color="white"
              fontSize="20px"
              fontWeight="bold"
              onClick={handleLogOut}
            />
          </ButtonGroup>
        </Flex>
      )}
    </Box>
  );
};

export default DashNavbar;
