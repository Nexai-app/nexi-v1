import React from "react";
import { Box } from "@chakra-ui/react";
import MainDashboard from "../components/MainDashboard";
import LayoutContainer from "../components/shared/LayoutContainer";

const Dashboard = () => {
  return (
    <Box>
      <LayoutContainer>
        <MainDashboard />
      </LayoutContainer>
    </Box>
  );
};

export default Dashboard;
