import React from "react";
import { Box } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import Integration from "../components/Integration";

function IntegrationPage() {
  return (
    <Box>
      <LayoutContainer>
        <Integration />
      </LayoutContainer>
    </Box>
  );
}

export default IntegrationPage;
