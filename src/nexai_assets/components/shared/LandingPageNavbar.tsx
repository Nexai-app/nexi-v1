import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TypeAnimation } from "react-type-animation";
import "./landingPageNavbar.css";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Spacer,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  ButtonGroup,
} from "@chakra-ui/react";

function Navbar() {
  const { Auth, iiAuth, changeAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { actor, setLoggedIn } = useContext(AuthContext);

  const handleLogIn = () => {
    actor
      .logIn()
      .then((data: boolean) => {
        setLoggedIn(data);
        if (data === true) {
          changeAuthStatus();
          navigate("/dashboard");
          window.location.reload();
          navigate(0);
          return;
        }
        changeAuthStatus();
        navigate("/signup");
        window.location.reload();
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (iiAuth) {
    handleLogIn();
  }

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box
      className="background"
      bg="#341A41"
      // h="100vh"
      color="white"
      mb={`80px`}
    >
      <Flex
        as="nav"
        py="50px"
        px="80px"
        alignItems="center"
        gap="30px"
        bg="transparent"
      >
        <NavLink to={`/`}>
          <Image w="80px" h="75px" src={`nexai-logo.jpg`} />
        </NavLink>
        <Spacer bg={`transparent`} />
        <Box
          display={{ base: "block", md: "none" }}
          onClick={handleDrawerToggle}
          color="white"
        >
          <svg viewBox="0 0 100 80" width="30" height="30">
            <rect width="100" height="10" fill="white"></rect>
            <rect y="30" width="100" height="10" fill="white"></rect>
            <rect y="60" width="100" height="10" fill="white"></rect>
          </svg>
        </Box>
        <List display={{ base: "none", md: "flex" }}>
          <ButtonGroup gap="2">
            <ListItem>
              <Button
                onClick={Auth}
                bg="white"
                color={`#341A41`}
                border={`1px white solid`}
                _hover={{ backgroundColor: "transparent", color: "white" }}
              >
                Sign In
              </Button>
            </ListItem>
            <ListItem>
              <Button
                onClick={Auth}
                colorScheme="white"
                variant="outline"
                _hover={{ backgroundColor: "white", color: "#341A41" }}
              >
                Try our Assistant
              </Button>
            </ListItem>
          </ButtonGroup>
        </List>
      </Flex>

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={handleDrawerToggle}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color={`white`} fontFamily="Poppins">
            <TypeAnimation
              preRenderFirstString={true}
              sequence={["Nexai", 1500, ""]}
              wrapper="span"
              speed={{ type: "keyStrokeDelayInMs", value: 250 }}
              style={{ display: "inline-block" }}
              repeat={Infinity}
            />
          </DrawerHeader>
          <DrawerBody>
            <List>
              <ListItem>
                <Button
                  onClick={Auth}
                  border={`1px white solid`}
                  color={`white`}
                  variant="outline"
                  _hover={{ backgroundColor: "white", color: "#341A41" }}
                >
                  Try our Assistant
                </Button>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Container centerContent my="300px" bg={`transparent`}>
        <Heading as="h1" size="4xl" fontFamily="Poppins" bg={`transparent`}>
          <TypeAnimation
            preRenderFirstString={true}
            sequence={["Nexai", 1500, ""]}
            wrapper="span"
            style={{ display: "inline-block" }}
            speed={{ type: "keyStrokeDelayInMs", value: 250 }}
            cursor={false}
            repeat={Infinity}
          />
        </Heading>
        <Text fontFamily="Public Sans" textAlign="center" bg={`transparent`}>
          The first fully decentralized, autonomous, integrateable chatbot and
          assistant that runs on blockchain and artificial intelligence.
        </Text>
        <Text
          fontSize={`md`}
          pt={`18px`}
          className="powered-by"
          bg={`transparent`}
        >
          Powered by:{" "}
          <Image className="logo" alt="" src={`logo.png`} bg={`transparent`} />
        </Text>
      </Container>
    </Box>
  );
}

export default Navbar;
