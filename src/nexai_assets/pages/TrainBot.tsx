import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import AddQuestions from "../components/TrainBot/AddQuestion";
import TrainWithDocs from "../components/TrainBot/TrainWithDocs";
import { TrainBotContext } from "../context/TrainBotContext";
import LoadingScreen from "../components/TrainBot/LoadingScreen";

const options = ["Train with Docs", "Train Manually"];

function TrainBot() {
  const {
    trainMode,
    handleChangeTrainMode,
    uploading,
    uploadError,
    docUploaded,
  } = React.useContext(TrainBotContext);

  return (
    <Box>
      <LayoutContainer>
        <Box>
          {!uploadError && (uploading || docUploaded) ? (
            <Box>
              <LoadingScreen isLoading={uploading} />
            </Box>
          ) : (
            <Box>
              <Flex>
                <Toggle
                  onChange={(e: any) => handleChangeTrainMode(e)}
                  checked={trainMode}
                />
                <Text>{trainMode ? options[0] : options[1]}</Text>
              </Flex>
              {trainMode ? <TrainWithDocs /> : <AddQuestions />}
            </Box>
          )}
        </Box>
      </LayoutContainer>
    </Box>
  );
}

export default TrainBot;
