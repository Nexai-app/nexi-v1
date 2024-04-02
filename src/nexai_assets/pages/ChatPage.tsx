import React from "react";
import { Box } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import Chat from "../components/Chat";

function ChatPage() {
  return (
    <Box>
      <LayoutContainer>
        <Chat />
      </LayoutContainer>
    </Box>
  );
}

export default ChatPage;
