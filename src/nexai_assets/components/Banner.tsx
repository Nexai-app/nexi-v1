/* eslint-disable react/require-default-props */
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import WarningLineIcon from "remixicon-react/ErrorWarningLineIcon";

type Props = {
  //   text: string;
  //   showIcon?: boolean;
  cta?: string;
  handleCtaClick?: () => void;
};

function Banner({
  //   text,
  cta,
  handleCtaClick,
}: //   showIcon = true,
Props) {
  const { llmStatus } = useContext(AuthContext);
  return (
    <Flex bg="red.100" py={2} px={2} gap={4} justify="center">
      {/* {showIcon && (
        <Box w="15px" color="warning.700">
          <WarningLineIcon />
        </Box>
      )} */}
      <Text color="red">{llmStatus}</Text>
      {cta && (
        <Text
          color="red.700"
          textDecoration="underline"
          cursor="pointer"
          onClick={handleCtaClick}
        >
          {cta}
        </Text>
      )}
    </Flex>
  );
}

export default Banner;
