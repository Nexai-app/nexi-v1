import React, { useState, useContext, useEffect } from "react";
import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  useInitTransformers,
  useEmbeddQuestion,
} from "../../functions/ml";

const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { init } = useInitTransformers();
  const {
    embedd,
    embeddedText,
    loading: mlLoading,
    answer_arr,
  } = useEmbeddQuestion();

  //ML functions
  // initializes the ml
  useEffect(() => {
    const call = async () => {
      await init();
    };
    call();
  }, []);

  const { actor } = useContext(AuthContext);
  const handleSubmit = async () => {
    if (question.length < 10) {
      toast({
        title: "Your question must be more than 5 characters",
        status: "error",
      });
      return;
    }
    if (ans.length < 2) {
      toast({
        title: "Your answer must me more then 10 characters",
        status: "error",
      });
      return;
    }

    await embedd(question, ans);
    if (embeddedText[0].length == 384) {
      setSubmitting(true);
      actor
        ?.createQCard(question, ans, embeddedText, answer_arr)
        .then(() => {
          setSubmitting(false);
          navigate("/my-questions");
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err);
          toast({ title: err });
        });
    }
  };

  const handleClear = () => {
    setQuestion("");
    setAns("");
  };
  return (
    <Box mt={8} color="white">
      <Flex justify="center" direction="column" align="center">
        <Flex
          align="center"
          justify="center"
          direction="column"
          w="full"
        >
          <Text
            mb={4}
            fontSize={{ base: "24px", md: "40px" }}
            fontWeight="700"
            fontFamily="Poppins"
          >
            Train Manually
          </Text>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <Text
              fontSize={{ base: "12px", md: "18px" }}
              fontWeight="400"
              fontFamily="Public Sans"
            >
              Set and provide answers to questions you would like to
              train{" "}
            </Text>
            <Text
              fontSize={{ base: "12px", md: "18px" }}
              fontWeight="400"
              fontFamily="Public Sans"
            >
              your bot on
            </Text>
          </Box>
        </Flex>
        <Box>
          <FormControl>
            <FormLabel>Question</FormLabel>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              mb={2}
            />
            <FormLabel>Answer</FormLabel>
            <Textarea
              value={ans}
              onChange={(e) => {
                setAns(e.target.value);
              }}
              placeholder="Type your answer here"
              width={{ base: "350px", md: "600px" }}
              height={{ base: "350px", md: "200px" }}
            />
            <Stack my={5} direction="row" justify="end">
              <Button
                onClick={handleClear}
                colorScheme="white"
                variant="outline"
                _hover={{
                  backgroundColor: "white",
                  color: "#341A41",
                }}
              >
                Clear
              </Button>
              <Button
                onClick={handleSubmit}
                bg="white"
                color={`#341A41`}
                border={`1px white solid`}
                _hover={{
                  backgroundColor: "transparent",
                  color: "white",
                }}
                isLoading={submitting}
                isDisabled={submitting}
              >
                Save
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddQuestions;
