import React from "react";
import { Box, Flex, Text, Switch } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
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
              <Flex gap={3} align="center">
                <Switch
                  size={"lg"}
                  id={"toggle"}
                  colorScheme={"purple"}
                  onChange={(e: any) => handleChangeTrainMode(e)}
                  defaultChecked
                  isChecked={trainMode}
                />
                <Text mt={3}>
                  {trainMode ? options[0] : options[1]}
                </Text>
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
