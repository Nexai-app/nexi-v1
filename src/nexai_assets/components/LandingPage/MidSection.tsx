import { Stack, useMediaQuery } from "@chakra-ui/react";
import StandOut from "./StandOut";
import Benefits from "./Benefits";
import React from "react";

const MidSection: React.FC = () => {
  const [isLargerThan650] = useMediaQuery("(min-width: 650px)");

  return (
    <Stack
      mx={isLargerThan650 ? 14 : 5}
      my={32}
      spacing={`200px`}
      bg="white"
    >
      <StandOut />
      <Benefits />
    </Stack>
  );
};

export default MidSection;
