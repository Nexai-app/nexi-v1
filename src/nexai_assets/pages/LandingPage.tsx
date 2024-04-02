import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";
import MidSection from "../components/LandingPage/MidSection";
import Steps from "../components/LandingPage/Steps";
import landingPageTheme from "../theme/landingPage";

function LandingPage() {
  return (
    <>
      <ChakraProvider theme={landingPageTheme}>
        <Hero />
        <MidSection />
        <Steps />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default LandingPage;
