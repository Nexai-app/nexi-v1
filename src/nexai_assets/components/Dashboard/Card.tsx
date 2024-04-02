import React from "react";
import { Box, Text } from "@chakra-ui/react";

type CardT = {
  name: string;
  value: number;
};
function Card(props: CardT) {
  return (
    <Box
      display="flex"
      w={{ base: "180px", md: "320px" }}
      h={{ base: "150px", md: "180px" }}
      justifyContent="center"
      flexDirection={"column"}
      alignItems={"center"}
      borderColor="white"
      border={`1px white solid`}
      borderRadius={"5px"}
      // bg="white"
    >
      <Text fontSize={{ base: "30px", md: "40px" }}>
        {props.value}
      </Text>
      <Text fontSize={{ base: "12px", md: "18px" }}>
        {props.name}
      </Text>
    </Box>
  );
}

export default Card;
