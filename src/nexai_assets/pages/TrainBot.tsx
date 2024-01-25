import React from "react";
import { Box } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import AddQuestions from "../components/TrainBot/AddQuestion";
import TrainWithDocs from "../components/TrainBot/TrainWithDocs";

function TrainBot() {
  return (
    <Box>
      <LayoutContainer>
        <TrainWithDocs />
        <AddQuestions />
      </LayoutContainer>
    </Box>
  );
}

export default TrainBot;
