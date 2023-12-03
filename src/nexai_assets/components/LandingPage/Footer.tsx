import { Box, Button, Flex, Heading, Input, Text, HStack, Stack, useMediaQuery, Image } from "@chakra-ui/react";
import { ReactComponent as Twitter } from "../../Assets/twitter.svg"
import { ReactComponent as Insta } from "../../Assets/instagram.svg"
import { ReactComponent as Linkedin } from "../../Assets/linkedin.svg"
import React from "react";

function Footer() {

    const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)')

    return (
        <Stack
            color={`primary.50`}
            mx={isLargerThan1000 ? 20 : 10}
            py={isLargerThan1000 ? 20 : 10}
            // h={`25vh`}
            spacing={10}
        >
            {isLargerThan1000 ?
                <Flex
                    justify={`space-between`}
                    align={`flex-start`}
                >
                    <Box
                        w={`20vw`}
                    >
                        <Heading
                            size={`md`}
                        >
                            Join our newsletter
                        </Heading>
                        <Text>
                            Get all the latest Nexai news delivered to your inbox.
                        </Text>
                    </Box>
                    <HStack
                        spacing={2}
                    >
                        <Input></Input>
                        <Button
                            fontSize={`xs`}
                            size={`md`}
                            bg={`primary.50`}
                            color={`white`}
                        >
                            Subscribe
                        </Button>
                    </HStack>
                </Flex>
                :
                <Box
                >
                    <Box
                    >
                        <Heading
                            size={`md`}
                        >
                            Join our newsletter
                        </Heading>
                        <Text>
                            Get all the latest Nexai news delivered to your inbox.
                        </Text>
                    </Box>
                    <HStack
                        spacing={2}
                    >
                        <Input></Input>
                        <Button
                            fontSize={`xs`}
                            size={`md`}
                            bg={`primary.50`}
                            color={`white`}
                        >
                            Subscribe
                        </Button>
                    </HStack>
                </Box>
            }
            {isLargerThan1000 ? <Flex
                justify={`space-between`}
                align={`flex-start`}
            >
                <Stack
                    w={`25vw`}
                    spacing={7}
                >
                    <Text>© 2023 Nexai. All rights reserved.</Text>
                    <Text>All trademarks, logos and brand names are the property of their respective owners.</Text>
                    <HStack
                        justify={`space-between`}
                    >
                        <Text>Terms of Service</Text>
                        <Text>Privacy Policy</Text>
                        <Text>Security</Text>
                    </HStack>
                </Stack>
                <HStack
                    spacing={2}
                >
                    <Flex
                        w={10}
                        h={10}
                        borderRadius={`full`}
                        bg={`primary.50`}
                        justify={`center`}
                        align={`center`}
                    >
                        {/* <Twitter /> */}
                        <Image src={`twitter.svg`} />
                    </Flex>
                    <Flex
                        w={10}
                        h={10}
                        borderRadius={`full`}
                        bg={`primary.50`}
                        justify={`center`}
                        align={`center`}
                    >
                        {/* <Insta /> */}
                        <Image src={`instagram.svg`} />
                    </Flex>
                    <Flex
                        w={10}
                        h={10}
                        borderRadius={`full`}
                        bg={`primary.50`}
                        justify={`center`}
                        align={`center`}
                    >
                        {/* <Linkedin /> */}
                        <Image src={`linkedin.svg`} />
                    </Flex>
                </HStack>
            </Flex>
                :
                <Box
                >

                    <HStack
                        spacing={2}
                        pb={3}
                    >
                        <Flex
                            w={10}
                            h={10}
                            borderRadius={`full`}
                            bg={`primary.50`}
                            justify={`center`}
                            align={`center`}
                        >
                            {/* <Twitter /> */}
                            <Image src={`twitter.svg`} />
                        </Flex>
                        <Flex
                            w={10}
                            h={10}
                            borderRadius={`full`}
                            bg={`primary.50`}
                            justify={`center`}
                            align={`center`}
                        >
                            {/* <Insta /> */}
                            <Image src={`instagram.svg`} />
                        </Flex>
                        <Flex
                            w={10}
                            h={10}
                            borderRadius={`full`}
                            bg={`primary.50`}
                            justify={`center`}
                            align={`center`}
                        >
                            {/* <Linkedin /> */}
                            <Image src={`linkedin.svg`} />
                        </Flex>
                    </HStack>
                    <Stack
                        // w={``}
                        spacing={7}
                    >
                        <Text>© 2023 Nexai. All rights reserved.</Text>
                        <Text>All trademarks, logos and brand names are the property of their respective owners.</Text>
                        <HStack
                            justify={`space-between`}
                        >
                            <Text>Terms of Service</Text>
                            <Text>Privacy Policy</Text>
                            <Text>Security</Text>
                        </HStack>
                    </Stack>
                </Box>
            }
        </Stack>
    );
}

export default Footer