import React from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Text,
  Hide,
  Show,
  AspectRatio,
} from "@chakra-ui/react";
import { AiOutlineCopy } from "react-icons/ai";

const int = [
  {
    id: 1,
    desc: "Lorem ipsum dolor sit amet consectetur. Laoreet auctor aliqua tincidunt malesuada sed nullam. Sit facilisis erat mattis placerat libero in dui. Massa laoreet sed est nunc non",
    code: [
      {
        id: 1,
        val: " $ npm install nexai-assistant",
      },
      {
        id: 2,
        val: " import {Assistant} from 'nexai-assistant';",
      },
      {
        id: 3,
        val: "<Assistant .../>",
      },
    ],
  },
  {
    id: 2,
    desc: "Lorem ipsum dolor sit amet consectetur. Laoreet auctor aliqua tincidunt malesuada sed nullam. Sit facilisis erat mattis placerat libero in dui. Massa laoreet sed est nunc non",
    code: [
      {
        id: 1,
        val: " $ Lorem ipsum dolor sit amet consectetur aoreet auctor aliquam tincidunt males uadarp",
      },
      {
        id: 2,
        val: " $ Lorem ipsum dolor sit amet consectetur aoreet auctor aliquam tincidunt males uadarp",
      },
      {
        id: 3,
        val: " $ Lorem ipsum dolor sit amet consectetur aoreet auctor aliquam tincidunt males uadarp",
      },
    ],
  },
  {
    id: 3,
    desc: " Locate your dfx.json File The dfx.json file is located in the root directory of your Internet Computer project. Navigate to your project directory using your terminal",
    code: [
      {
        id: 1,
        val: " cd /path/to/your/project",
      },
    ],
  },
  {
    id: 4,
    desc: " Open dfx.json in an Editor pen the 'dfx.json' file in your preferred code editor. You will be adding configuration code to this file to enable communication with your canister",
    code: [
      {
        id: 1,
        val: "$ code . dfx.json",
      },
    ],
  },
  {
    id: 5,
    desc: "Add Nexai Canister Configuration In the dfx.json file, add a 'canisters' section if it doesn't already exist. This section defines the configuration for your canister",
    code: [
      {
        id: 1,
        val: `{
          "canisters": {
            "your_canister_name": {
              "main": "src/main.mo",
              "type": "motoko",
              "module": "your_canister_module"
            },
              // ... nexai configuration ...
          }
        
        }`,
      },
      {
        id: 2,
        val: `"nexai" : {
          "type" : "custom",
          "candid" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.did",
          "wasm" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.wasm",
          "remote" : {
              "id" : {
                  "ic" : "CANISTER_ID HERE"
              }
          }
      }`,
      },
      {
        id: 3,
        val: `{
          "canisters": {
            "your_canister_name": {
              "main": "src/main.mo",
              "type": "motoko",
              "module": "your_canister_module"
            },
        
        
          "nexai" : {
            "type" : "custom",
            "candid" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.did",
            "wasm" : "https://github.com/Nexai-app/nexi-v1/releases/download/latest/external.wasm",
            "remote" : {
                "id" : {
                    "ic" : "CANISTER_ID HERE"
                }
            }
          }
         },
        }`,
      },
    ],
  },
  {
    id: 6,
    desc: " Save and Close dfx.json Save the changes to the dfx.json file and close your code editor.",
    code: [
      {
        id: 1,
        val: "$ CRTL + S",
      },
    ],
  },
  {
    id: 7,
    desc: "Build and Deploy To apply the changes, build and deploy your canister project using the DFX CLI. Run the following commands in your terminal:",
    code: [
      {
        id: 1,
        val: "$ dfx build nexai",
      },
      {
        id: 2,
        val: "$ dfx deploy nexai",
      },
    ],
  },
];

function Integration() {
  return (
    <Box>
      <Heading>Integration</Heading>
      <Flex>
        {/* middle content */}
        <Box w={{ base: "full", md: "60%" }}>
          <Text py={8}>
            To get started on Nexai, you have to make sure you meet
            all requirements and follow all the integration steps
            required.
          </Text>

          <Box my={4}>
            {int.map((step) => (
              <Box mb={8} key={step.id}>
                <Heading pb={2}>Step {step.id}</Heading>
                <Text pb={2}>{step.desc}</Text>

                <Box
                  display="flex"
                  flexDirection="column"
                  gap={3}
                  bg="#271732"
                  py={4}
                  borderRadius="5px"
                  px={6}
                  pb={2}
                >
                  <Flex alignSelf="flex-end">
                    <Icon
                      as={AiOutlineCopy}
                      boxSize={6}
                      alignSelf={`center`}
                      mr={`15px`}
                    />
                  </Flex>
                  {step.code.map((code: any) => (
                    <Text key={code.id}>{code.val}</Text>
                  ))}
                </Box>
              </Box>
            ))}
            <Show below="md">
              <AspectRatio maxW="560px" ratio={1}>
                <iframe
                  title="Introverts for you"
                  src="https://www.youtube.com/embed/uDDeves6Crs?si=Rf4vgBydAH9P9g_w"
                  allowFullScreen
                />
              </AspectRatio>
            </Show>
          </Box>
        </Box>
        {/*  Demacator */}
        <Hide below="md">
          <Box mx={8} w="1px" bgColor="#929191B2" h="inherit" />
        </Hide>
        {/* Video */}
        <Hide below="md">
          <Box px={8} w="30%">
            <Text fontSize="20px" fontWeight="700">
              Watch Video
            </Text>
            <AspectRatio maxW="560px" ratio={1}>
              <iframe
                title="Introverts for you"
                src="https://www.youtube.com/embed/uDDeves6Crs?si=Rf4vgBydAH9P9g_w"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </Hide>
      </Flex>
    </Box>
  );
}

export default Integration;
