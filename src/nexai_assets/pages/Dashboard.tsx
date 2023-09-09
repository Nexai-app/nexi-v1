import React from "react";
import { Box } from "@chakra-ui/react";
import DashNavbar from "../components/shared/Navbar3";
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
