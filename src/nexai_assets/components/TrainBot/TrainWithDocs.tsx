import React from "react";
import { Box, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useAppSelector } from "../../redux-toolkit/hooks";
import { useEmbeddQ } from "../../functions/ml";

function TrainWithDocs() {
  const profile = useAppSelector((state) => state.profile);
  const { vdbActor } = React.useContext(AuthContext);
  const { call, embeddedQ } = useEmbeddQ();
  const [docs, setDocs] = React.useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
  const newDocs = docs.split(".", 500);

  // save document in vdb
  // save each question and answer directly to the vector database into the vector database with docuemt id as the vlaue
  // research on how to save something even while page is closed
  // show a very detailed screen to show the progress (that's when ther is ui) for now, just use console.log
  //

  const save = () => {
    vdbActor
      .store_one_document(profile.vdbId, docs)
      .then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    exec();
    console.log("saving each question");
  };

  const exec = async () => {
    newDocs.forEach(async (doc) => {
      try {
        await call(doc);
        if (embeddedQ[0].length == 384) {
          await vdbActor.append_keys_values(
            profile.vdbId,
            [embeddedQ],
            [doc]
          );
          await vdbActor.build_index(1);
          console.log("saved and built pair", doc);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  const get = async () => {
    newDocs.forEach(async (doc) => {
      await call(doc);
      if (embeddedQ[0].length == 384) {
        const val = await vdbActor.get_similar(
          profile.vdbId,
          embeddedQ,
          1
        );
        console.log("answer to", doc, "IS", val);
      }
    });
  };

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
        <Box>
          <Textarea
            value={docs}
            onChange={(e) => {
              setDocs(e.target.value);
            }}
            placeholder="your docs"
            // width={{ base: "350px", md: "600px" }}
            // height="full"
          />
          <Button
            onClick={() => {
              save();
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              save();
            }}
          >
            GEt
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default TrainWithDocs;