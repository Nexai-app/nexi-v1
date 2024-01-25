import React, { useContext } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import AddQuestions from "../components/TrainBot/AddQuestion";
import TrainWithDocs from "../components/TrainBot/TrainWithDocs";
import { AuthContext } from "../context/AuthContext";

const options = ["Train with Docs", "Train Manually"];

function TrainBot() {
  const { trainMode, handleChangeTrainMode } =
    React.useContext(AuthContext);

  return (
    <Box>
      <LayoutContainer>
        <Box>
          <Flex>
            <Toggle
              onChange={(e) => handleChangeTrainMode(e)}
              // defaultChecked={trainMode}
              checked={trainMode}
            />
            <Text>{trainMode ? options[0] : options[1]}</Text>
          </Flex>
          {trainMode ? <TrainWithDocs /> : <AddQuestions />}
        </Box>
      </LayoutContainer>
    </Box>
  );
}

export default TrainBot;
