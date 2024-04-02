import React from "react";
import { Box } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import Questions from "../components/TrainBot/AllQuestions";

function AllQuestions() {
  return (
    <Box>
      <LayoutContainer>
        <Questions />
      </LayoutContainer>
    </Box>
  );
}

export default AllQuestions;
