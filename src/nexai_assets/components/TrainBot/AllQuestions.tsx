import React, { useContext, useState, useEffect } from "react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Button,
  Heading,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";
import Navbar from "../shared/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useAppSelector } from "../../redux-toolkit/hooks";
import ClipLoader from "react-spinners/ClipLoader";
import {
  BarLoader,
  ClimbingBoxLoader,
  PacmanLoader,
} from "react-spinners";

type ArrayT = {
  answer: string;
  vdbId: number;
  question: string;
};

const AllQuestions = () => {
  const { actor } = useContext(AuthContext);
  const [arr, setArr] = useState<ArrayT[]>();
  // const profile = useAppSelector((state) => state.profile);
  const vdbId = localStorage.getItem("vdbId");

  //firstly make a call to get the email,

  // then pass the email into the function]
  // then fitlter the result and display it

  useEffect(() => {
    const callMe = () => {
      actor
        ?.getAllQCards(Number(vdbId))
        .then((v) => {
          console.log(v);
          setArr(v[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    callMe();
  }, []);
  return (
    <Box color="white">
      <Box>
        <Flex justify="center" direction="column" align="center">
          <Flex
            align="center"
            justify="center"
            direction="column"
            w="full"
          >
            <Text
              mb={4}
              fontSize={{ base: "24px", md: "40px" }}
              fontWeight="700"
              fontFamily="Poppins"
            >
              Train Your Bot
            </Text>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
            >
              <Text
                fontSize={{ base: "12px", md: "18px" }}
                fontWeight="400"
                fontFamily="Public Sans"
              >
                Set and provide answers to questions you would like to
                train{" "}
              </Text>
              <Text
                fontSize={{ base: "12px", md: "18px" }}
                fontWeight="400"
                fontFamily="Public Sans"
              >
                your bot on
              </Text>
            </Box>
          </Flex>
        </Flex>
        {/* card */}
        <Box>
          {!arr ? (
            <Flex
              color="green"
              justify="center"
              align="center"
              mt={8}
            >
              <BarLoader
                color={`white`}
                loading={true}
                height={4}
                width={150}
                speedMultiplier={1}
              />
            </Flex>
          ) : (
            <>
              <SimpleGrid m={8} spacing="20px" minChildWidth="290px">
                {arr.map((entry: ArrayT, index: number) => (
                  <Card
                    key={index}
                    variant="outline"
                    border="1px solid #FFFFFF"
                    h="280px"
                    color="#fff"
                    bgColor="#341A41"
                    maxW="sm"
                  >
                    <CardHeader>
                      <Heading size="md" fontFamily="Poppins">
                        {entry.question}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text fontFamily="Public Sans">
                        {entry.answer.slice(0, 150)}
                      </Text>
                    </CardBody>
                  </Card>
                ))}
                <NavLink to="/train-bot">
                  <Card
                    cursor="pointer"
                    variant="outline"
                    border="1px solid #FFFFFF"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    h="280px"
                    bgColor="white"
                    maxW="sm"
                  >
                    <AddIcon
                      boxSize={16}
                      color="#341A41"
                      bgColor="white"
                    />
                    <Text
                      color="#341A41"
                      fontSize="18px"
                      bgColor="white"
                    >
                      Add Question
                    </Text>
                  </Card>
                </NavLink>
              </SimpleGrid>
            </>
          )}
        </Box>
        <Box m={8} display="flex" justifyContent="end">
          <NavLink to="/dashboard">
            <Button
              bg="white"
              color={`#341A41`}
              border={`1px white solid`}
              _hover={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              Continue To Dashboard
            </Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default AllQuestions;
