import React from "react";
import { Box, Flex, Text, Button, Textarea, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { useEmbeddQ } from "../../functions/ml";

function TrainWithDocs() {
  const profile = useAppSelector((state) => state.profile);
  const { vdbActor } = React.useContext(AuthContext);
  const { call, embeddedQ } = useEmbeddQ();
  const [docs, setDocs] = React.useState("");
  const [train, setTrain] = React.useState({
    question: "",
    answer: ""
  });
  const newDocs = docs.split(".", 500);
  const [docId, setDocId] = React.useState();

  // save document in vdb
  // save each question and answer directly to the vector database into the vector database with docuemt id as the vlaue
  // research on how to save something even while page is closed
  // show a very detailed screen to show the progress (that's when ther is ui) for now, just use console.log
  //

  const save = () => {
    vdbActor
      .store_one_document(profile.vdbId, docs)
      .then((data) => {
        setDocId(data["Ok"]);
        console.log("data", data);
        exec();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const exec = async () => {
    newDocs.forEach(async (doc) => {
      try {
        await call(doc);
        if (embeddedQ[0].length == 384) {
          await vdbActor.append_keys_values(
            profile.vdbId,
            [embeddedQ],
            [BigInt(0)]
          );
          await vdbActor.build_index(1);
          console.log("saved and built pair", doc);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  // const get = async () => {
  //   newDocs.forEach(async (doc) => {
  //     await call(doc);
  //     if (embeddedQ[0].length == 384) {
  //       const val = await vdbActor.get_similar(
  //         profile.vdbId,
  //         embeddedQ,
  //         1
  //       );
  //       console.log("answer to", doc, "IS", val);
  //     }
  //   });
  // };

  console.log(docs.split("." || ",", 500));
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
            Train Your Assistant
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
              upload a well detailed document about your company, all
              of it.
            </Text>
            <Text
              fontSize={{ base: "12px", md: "18px" }}
              fontWeight="400"
              fontFamily="Public Sans"
            >
              Let your AI answer your custoomers while you sleep
            </Text>
          </Box>
        </Flex>
        <Box
          w={`60%`}
        >
          <Box>
            <FormControl mb={`40px`}>
              <FormLabel>Question</FormLabel>
              <Input
                name="name"
                value={train.question}
                onChange={(e) => {
                  setTrain((previous) => ({
                    ...previous,
                    question: e.target.value
                  }))
                }}
                placeholder="Input your question here"
                height="60px"
                px={`5`}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl mb={`40px`}>
              <FormLabel>Answer</FormLabel>
              <Textarea
                name="name"
                value={train.answer}
                onChange={(e) => {
                  setTrain((previous) => ({
                    ...previous,
                    answer: e.target.value
                  }))
                }}
                placeholder="Type your answer here"
                height="60px"
                px={`5`}
              />
            </FormControl>
          </Box>
          <Button
            onClick={() => {
              save();
            }}
          >
            Save
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default TrainWithDocs;
