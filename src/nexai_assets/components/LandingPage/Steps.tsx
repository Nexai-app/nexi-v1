import { Flex, Box, Heading, Text, Stack, VStack, Button, useMediaQuery } from "@chakra-ui/react"
import React from "react";

const Steps: React.FC = () => {

    const [isLargerThan1200, isLargerThan900, isLargerThan650] = useMediaQuery(['(min-width: 1200px)', '(min-width: 900px)', '(min-width: 650px)'])

    return (
        <Box
            bg={`primary.50`}
            color={`white`}
        >
            {
                isLargerThan650
                    ?
                    <Flex
                        mx={24}
                        py={24}
                    >
                        <Box
                            w={`50%`}
                            m={`auto`}
                        >
                            <Box
                                wordBreak={`normal`}
                            >
                                <Heading
                                    size={isLargerThan1200 ? `3xl` : isLargerThan900 ? `2xl` : `xl`}
                                    pb={8}
                                >
                                    A Comprehensive Guide on How Nexai Works
                                </Heading>
                            </Box>
                            <Flex
                                w={`36%`}
                                h={1.5}
                                bg={"white"}
                                borderRadius={`full`}
                            ></Flex>
                        </Box>
                        <Stack
                            w={`50%`}
                        >
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        01
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Share Your Project Details
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Briefly describe your project to Nexai, empowering it to better understand your needs and provide tailored assistance.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        02
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Customize Default Messages and Behaviors
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Personalize Nexai to align with your preferences by setting default messages and behaviors. Tailor its responses to match the tone and style of your project.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        03
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Sit Back and Relax During Setup
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Take a break! While you enjoy a cup of coffee, Nexai will efficiently set up your personalized assistant and craft a customized dashboard just for you.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        04
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Seamless Integration into Your App
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Follow our comprehensive guide to effortlessly integrate Nexai into your application. We provide step-by-step instructions for a smooth integration process.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                // _before={{
                                //     content: '""',
                                //     position: 'absolute',
                                //     left: `2%`,
                                //     top: 0,
                                //     bottom: 0,
                                //     width: '1px',
                                //     backgroundColor: 'white',
                                //     display: 'block',
                                // }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        05
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Let Nexai Guide New Users
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Delegate the task of onboarding new users to Nexai. It will proficiently guide them through your site, ensuring a user-friendly experience and reducing your workload.
                                    </Text>
                                </VStack>
                            </Flex>
                        </Stack>
                    </Flex>
                    :
                    <Box
                        mx={isLargerThan650 ? 24 : 12}
                        py={24}
                    >
                        <Box
                            w={`100%`}
                            m={`auto`}
                            pb={isLargerThan650 ? `` : 5}
                        >
                            <Box
                                wordBreak={`normal`}
                            >
                                <Heading
                                    size={isLargerThan1200 ? `3xl` : isLargerThan900 ? `2xl` : `xl`}
                                    pb={isLargerThan650 ? 8 : 4}
                                >
                                    A Comprehensive Guide on How Nexai Works
                                </Heading>
                            </Box>
                            <Flex
                                w={`36%`}
                                h={1.5}
                                bg={"white"}
                                borderRadius={`full`}
                            ></Flex>
                        </Box>
                        <Stack
                            w={`100%`}
                        >
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        01
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Share Your Project Details
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Briefly describe your project to Nexai, empowering it to better understand your needs and provide tailored assistance.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        02
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Customize Default Messages and Behaviors
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Personalize Nexai to align with your preferences by setting default messages and behaviors. Tailor its responses to match the tone and style of your project.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        03
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Sit Back and Relax During Setup
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Take a break! While you enjoy a cup of coffee, Nexai will efficiently set up your personalized assistant and craft a customized dashboard just for you.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    left: `2%`,
                                    top: 0,
                                    bottom: 0,
                                    width: '1px',
                                    backgroundColor: 'white',
                                    display: 'block',
                                }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        04
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Seamless Integration into Your App
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Follow our comprehensive guide to effortlessly integrate Nexai into your application. We provide step-by-step instructions for a smooth integration process.
                                    </Text>
                                </VStack>
                            </Flex>
                            <Flex
                                justify={`space-between`}
                                pos={`relative`}
                                // _before={{
                                //     content: '""',
                                //     position: 'absolute',
                                //     left: `2%`,
                                //     top: 0,
                                //     bottom: 0,
                                //     width: '1px',
                                //     backgroundColor: 'white',
                                //     display: 'block',
                                // }}
                                h={`20%`}
                            >
                                <Box
                                    h={`50px`}
                                    w={`50px`}
                                    bg={`primary.50`}
                                    pos={`relative`}
                                >
                                    <Heading
                                        fontSize={`21px`}
                                    >
                                        05
                                    </Heading>
                                </Box>
                                <VStack
                                    spacing={5}
                                    align={`start`}
                                    w={`90%`}
                                    style={{
                                    }}
                                >
                                    <Heading
                                        // size={`sm`}
                                        fontSize={`19px`}
                                    >
                                        Let Nexai Guide New Users
                                    </Heading>
                                    <Text
                                        fontSize={isLargerThan1200 ? `base` : `14px`}
                                        pb={3}
                                    >
                                        Delegate the task of onboarding new users to Nexai. It will proficiently guide them through your site, ensuring a user-friendly experience and reducing your workload.
                                    </Text>
                                </VStack>
                            </Flex>
                        </Stack>
                    </Box>
            }
            <Stack
                align={`center`}
                w={isLargerThan900 ? `51vw` : `90vw`}
                m={`auto`}
                py={isLargerThan900 ? 16 : 10}
                px={isLargerThan900 ? 16 : 5}
                spacing={7}
            >
                <Heading
                    size={`xl`}
                >
                    Get Started Today
                </Heading>
                <Text
                    align={`center`}
                    fontSize={isLargerThan900 ? `base` : `14px`}
                    pb={3}
                >
                    Interact with our decentralized AI chat-box and witness the power of autonomous responses.Also, explore how easy it is to integrate our chat-box into your applications.
                </Text>
                <Button>
                    Start Exploring
                </Button>
            </Stack>
        </Box >
    );
}

export default Steps