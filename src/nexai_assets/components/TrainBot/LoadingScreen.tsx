import React from "react";
import "../Signup.css";
import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface loadingProps {
  isLoading: boolean;
}

function LoadingScreen(props: loadingProps) {
  const navigate = useNavigate();
  return (
    <Box>
      <Flex
        alignItems="center"
        justify={`center`}
        textAlign={`center`}
        h={`70vh`}
      >
        <Box>
          <Image src={props.isLoading ? `Rolling.svg` : `Done.svg`} />
          <Text>
            {props.isLoading
              ? "Thank you for submitting your document."
              : "Processing Completed"}
          </Text>
          <Text>
            {props.isLoading
              ? "Please be patient as we process your upload. This may take a few moments. Sit back, relax !"
              : "Congratulations! Your uploaded document has been successfully processed."}
          </Text>
          {!props.isLoading && (
            <Button
              //   width="100px"
              onClick={() => navigate("/dashboard")}
              py={4}
              px={4}
              bg={"white"}
              color={`#341A41`}
              border={`1px white solid`}
              _hover={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              Test out your Assistant
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default LoadingScreen;
