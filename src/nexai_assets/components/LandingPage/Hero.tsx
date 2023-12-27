import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  Flex,
  HStack,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Hero: React.FC = () => {
  const [isLargerThan650] = useMediaQuery("(min-width: 650px)");

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
      style={{
        width: "auto",
        height: "100vh",
        backgroundColor: `#341A41`,
      }}
    >
      <Box
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${"background.png"})`,
        }}
      >
        <Flex
          justifyContent={`space-between`}
          color={`white`}
          w={`90%`}
          h={`100px`}
          margin={`auto`}
          align={`center`}
        >
          <Text
            fontFamily={`optima`}
            fontSize={`xl`}
            fontWeight={`bold`}
          >
            Nexai
          </Text>
          {isLargerThan650 ? (
            <HStack spacing={8}>
              <Button
                variant={`ghost`}
                color={`white`}
                onClick={Auth}
              >
                Sign In
              </Button>
              <Button
                variant={`outline`}
                color={`white`}
                onClick={Auth}
              >
                Sign Up
              </Button>
            </HStack>
          ) : (
            <>
              <Box onClick={handleDrawerToggle} color="white">
                <svg viewBox="0 0 100 80" width="30" height="30">
                  <rect width="100" height="10" fill="white"></rect>
                  <rect
                    y="30"
                    width="100"
                    height="10"
                    fill="white"
                  ></rect>
                  <rect
                    y="60"
                    width="100"
                    height="10"
                    fill="white"
                  ></rect>
                </svg>
              </Box>
              <Drawer
                isOpen={isDrawerOpen}
                placement="right"
                onClose={handleDrawerToggle}
              >
                <DrawerOverlay />
                <DrawerContent bgColor="#341A41">
                  <DrawerHeader color={`white`} fontFamily="Poppins">
                    <TypeAnimation
                      preRenderFirstString={true}
                      sequence={["Nexai", 1500, ""]}
                      wrapper="span"
                      speed={{
                        type: "keyStrokeDelayInMs",
                        value: 250,
                      }}
                      style={{ display: "inline-block" }}
                      repeat={Infinity}
                    />
                  </DrawerHeader>
                  <DrawerBody>
                    <Box>
                      <Button
                        variant={`ghost`}
                        color={`white`}
                        onClick={Auth}
                      >
                        Sign In
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        variant={`outline`}
                        color={`white`}
                        onClick={Auth}
                      >
                        Sign Up
                      </Button>
                    </Box>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
        <Box w={`90%`} margin={`auto`} mt={`22vh`}>
          <Box w={isLargerThan650 ? `600px` : `90%`} color={`#fff`}>
            <Stack spacing={6}>
              <Heading
                fontSize={isLargerThan650 ? `50px` : `25px`}
                fontWeight={`bold`}
              >
                Revolutionize Customer Service for Your DAO
              </Heading>
              <Text>
                Unleash Nexai's Powerful Assistance to Prioritize
                Customer Needs, Empowering You to Build the Next
                Unicorn while Providing Top-notch Support.
              </Text>
              <Button color={`primary.50`} width={32} onClick={Auth}>
                Get Started
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
