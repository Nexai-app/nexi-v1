import React from "react";
import { Box } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import AddQuestions from "../components/TrainBot/AddQuestion";

function TrainBot() {
  return (
    <Box>
      <LayoutContainer>
        <AddQuestions />
      </LayoutContainer>
    </Box>
  );
}

export default TrainBot;
