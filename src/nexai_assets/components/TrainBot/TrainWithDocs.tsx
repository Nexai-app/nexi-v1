import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { useEmbeddQ, useEmbeddQuestion } from "../../functions/ml";
import { TrainBotContext } from "../../context/TrainBotContext";

function TrainWithDocs() {
  const profile = useAppSelector((state) => state.profile);
  const { vdbActor } = React.useContext(AuthContext);
  const { setDocUploaded, uploading, setUploading, setUploadError } =
    React.useContext(TrainBotContext);
  const [docs, setDocs] = React.useState("");
  console.log(docs);
  const { embedd, embeddedText } = useEmbeddQuestion();
  const { embeddedQ, call } = useEmbeddQ();
  const newDocs = docs.split(".", 1000);
  const toast = useToast();

  // save document in vdb
  // save each question and answer directly to the vector database into the vector database with docuemt id as the vlaue
  // research on how to save something even while page is closed
  // show a very detailed screen to show the progress (that's when ther is ui) for now, just use console.log
  //

  const handleSubmit = async () => {
    newDocs.forEach(async (doc) => {
      setUploading(true);
      try {
        await embedd(doc, docs);
        if (embeddedText[0].length == 384) {
          await vdbActor.append_keys_values(
            profile?.vdbId,
            [embeddedText[0]],
            // answer_arr
            [docs]
          );
          await vdbActor.build_index(profile?.vdbId);
          console.log("saved and built pair", doc);
        }
        setUploading(false);
        setDocUploaded(true);
      } catch (err) {
        toast({
          status: "error",
          title:
            "Error saving document, please try again or contact support.",
        });
        setUploading(false);
        setUploadError(true);
        console.log(err);
      }
    });
  };
  // const get = async () => {
  //   newDocs.forEach(async (doc) => {
  //     await call(doc);
  //     if (embeddedQ[0].length == 384) {
  //       const val = await vdbActor
  //         .get_similar(profile.vdbId, doc, embeddedQ[0], 1)
  //         .then((val) => {
  //           console.debug("[Nexai]", val);
  //         })
  //         .catch((err) => {
  //           console.debug("[Nexai]", err);
  //         });
  //     }
  //   });
  // };

  return (
    <Box mt={8} color="white">
      <Flex justify="center" direction="column" align="center">
        <Flex
          align="center"
          justify="center"
          direction="column"
          w="full"
          textAlign="center"
        >
          <Text
            mb={4}
            fontSize={{ base: "24px", md: "40px" }}
            fontWeight="700"
            fontFamily="Poppins"
          >
            Train With Company's Docs
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
              simply upload a document containing all about your
              product, the services you offer, frequently asked
              questions and so on and let Nexai do the Miracle.
            </Text>

            <Text
              fontSize={{ base: "12px", md: "18px" }}
              fontWeight="400"
              fontFamily="Public Sans"
            >
              your personal assistant learns from any relevant
              information you provide here to answer potential
              questions.
            </Text>
          </Box>
        </Flex>
        <Box w={{ base: "80%", md: `60%` }}>
          <Box>
            <FormControl my={`40px`}>
              <Badge>PREMIUM</Badge>
              <FormLabel pt={2}>let's have it...</FormLabel>
              <Textarea
                name="name"
                value={docs}
                onChange={(e) => {
                  setDocs(e.target.value);
                }}
                placeholder="Type your company's info here..."
                height="200px"
                px={`5`}
              />
            </FormControl>
          </Box>
          <Flex justify={"flex-end"}>
            <Button
              isDisabled={docs.length < 1000}
              onClick={handleSubmit}
            >
              Train
            </Button>
            {/* <Button onClick={get}>Get</Button> */}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default TrainWithDocs;
