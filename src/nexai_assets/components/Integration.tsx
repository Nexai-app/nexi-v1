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
  Center,
} from "@chakra-ui/react";
import { AiOutlineCopy } from "react-icons/ai";
import { useAppSelector } from "../redux-toolkit/hooks";

const int = [
  {
    id: 1,
    desc: "Install the Nexai Client Library. We have a published version of this on npm. Presently, the package only works with libraries like ReactJs, VueJs. Support for other libraries are coming soon and you could develop one for the community and let us know :). You can easily install the client library by typing",
    code: [
      {
        id: 1,
        val: " $ npm install nexai-assistant",
      },
    ],
  },
  {
    id: 2,
    desc: "Set up the client library. Once installation is successful, navigate to index.ts or index.js file and import in the Assistant like so, and then add it into the root.render",
    code: [
      {
        id: 1,
        val: "import { Assistant } from 'nexai-assistant';",
      },
      {
        id: 2,
        val: "//----------------------",
      },
      {
        id: 3,
        val: "//other imports",
      },

      {
        id: 4,
        val: "//-----------------------",
      },
      {
        id: 5,
        val: "",
      },
      {
        id: 6,
        val: "const root = ReactDOM.createRoot(document.getElementById('app'));",
      },
      {
        id: 7,
        val: "root.render(",
      },
      {
        id: 8,
        val: "<React.StrictMode>",
      },
      {
        id: 9,
        val: "//other code",
      },
      {
        id: 10,
        val: "<Assistant/>",
      },
      {
        id: 11,
        val: "//other code",
      },
      {
        id: 12,
        val: "</React.StrictMode>",
      },
      {
        id: 13,
        val: ")",
      },
    ],
  },
  {
    id: 3,
    desc: "Yes, you should have an Error!. Don't worry, this error just means you have to pass in some details into the Assistant for it work well",
    code: [
      {
        id: 3,
        val: "<Assistant companyId={your_company_id_on_your_dashboard} color='color'  compnayName='your_company_name'/>",
      },
    ],
  },
  {
    id: 4,
    desc: " Locate your dfx.json File The dfx.json file is located in the root directory of your Internet Computer project. Navigate to your project directory using your terminal",
    code: [
      {
        id: 1,
        val: " cd /path/to/your/project",
      },
    ],
  },
  {
    id: 5,
    desc: "Now, let's move to our dfx.json file. Open dfx.json in an Editor pen the 'dfx.json' file in your preferred code editor. You will be adding configuration code to this file to enable communication with your canister",
    code: [
      {
        id: 1,
        val: "$ code . dfx.json",
      },
    ],
  },
  {
    id: 6,
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
        val: `"external" : {
          "type": "pull",
          "id" : "ouyx4-nyaaa-aaaag-qclkq-cai"
        },
    
        "nexai" : {
          "type": "pull",
          "id" : "aol7b-vqaaa-aaaak-aepsq-cai"
        },
    
        "vdb" : {
          "type" : "pull",
          "id" : "fnnlb-hqaaa-aaaao-a2igq-cai"
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
        
            "external" : {
              "type": "pull",
              "id" : "ouyx4-nyaaa-aaaag-qclkq-cai"
            },
        
            "nexai" : {
              "type": "pull",
              "id" : "aol7b-vqaaa-aaaak-aepsq-cai"
            },
        
            "vdb" : {
              "type" : "pull",
              "id" : "fnnlb-hqaaa-aaaao-a2igq-cai"
            }
          }
        },`,
      },
    ],
  },
  {
    id: 7,
    desc: " Save and Close dfx.json Save the changes to the dfx.json file and close your code editor.",
    code: [
      {
        id: 1,
        val: "$ CRTL + S",
      },
    ],
  },
  {
    id: 8,
    desc: "Build and Deploy To apply the changes, build and deploy your canister project using the DFX CLI. Run the following commands in your terminal:",
    code: [
      {
        id: 1,
        val: "$ dfx deps pull",
      },
      {
        id: 2,
        val: "$ dfx deps init",
      },
      {
        id: 3,
        val: "$ dfx deps deploy"
      }
    ],
  },
];

function Integration() {
  const profile = useAppSelector((state) => state.profile);
  return (
    <Box>
      <Heading>Integration</Heading>
      <Flex>
        {/* middle content */}
        <Box w={{ base: "full", md: "60%" }}>
          <Text py={8}>
            To get started on Nexai, you should have trained your
            assistant to your preference and tested it on your
            dashboard. Once this stage is done, then you are ready to
            integrate it to your dApp.
          </Text>

          <Box my={4}>
            {int.map((step) => (
              <Box mb={8} key={step.id}>
                <Heading pb={2}>Step {step.id}</Heading>
                <Text pb={2}>{step.desc}</Text>

                <Box
                  display="flex"
                  flexDirection="column"
                  // gap={3}
                  bg="#271732"
                  // py={4}
                  borderRadius="5px"
                  px={6}
                  // pb={2}
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
              {/*  <AspectRatio maxW="560px" ratio={1}>
                <iframe
                  title="Introverts for you"
                  src="https://www.youtube.com/embed/uDDeves6Crs?si=Rf4vgBydAH9P9g_w"
                  allowFullScreen
                />
              </AspectRatio> */}
              <Box dir="column">
                <Text>Company Id: {profile?.vdbId}</Text>
                <Text>Company Name: {profile?.name}</Text>
                <Text>
                  Company Description: {profile?.description}
                </Text>
                <Text>Company Email: {profile?.email}</Text>
              </Box>
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
            <Box dir="column">
              <Text>Company Id: {profile?.vdbId}</Text>
              <Text>Company Name: {profile?.name}</Text>
              <Text>Company Description: {profile?.description}</Text>
              <Text>Company Email: {profile?.email}</Text>
            </Box>
            {/*    <AspectRatio maxW="560px" ratio={1}>
              <iframe
                title="Introverts for you"
                src="https://www.youtube.com/embed/uDDeves6Crs?si=Rf4vgBydAH9P9g_w"
                allowFullScreen
              />
            </AspectRatio> */}
          </Box>
        </Hide>
      </Flex>
    </Box>
  );
}

export default Integration;
