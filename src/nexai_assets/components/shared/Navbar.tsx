import React from "react";
import { NavLink } from "react-router-dom";
import "../../src/App.css";
import { Box, Flex, Heading, Spacer, Image } from "@chakra-ui/react";

type Params = {
  w?: string;
  h?: string;
};

function Navbar({ w, h }: Params) {
  return (
    <Box className="App-header2">
      <Flex as="nav" px="80px" alignItems="center" gap="30px" bg="transparent">
        <NavLink to={`/dashboard`}>
          <Image w={w ? w : "80px"} h={h ? h : "75px"} src={`nexai-logo.jpg`} />
        </NavLink>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default Navbar;
