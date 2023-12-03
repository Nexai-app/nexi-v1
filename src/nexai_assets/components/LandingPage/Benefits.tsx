import { Box, Flex, HStack, Heading, Stack, Text, VStack, useMediaQuery, Image } from "@chakra-ui/react";
// import { ReactComponent as User } from "../../Assets/User.svg"
// import { ReactComponent as Hotspot } from "../../Assets/Hotspot.svg"
// import { ReactComponent as Data } from "../../Assets/Data.svg"
// import { ReactComponent as Money } from "../../Assets/Money.svg"
// import { ReactComponent as Security } from "../../Assets/Security.svg"
import React from "react";


const Benefits: React.FC = () => {

    const [isLargerThan1200, isLargerThan900, isLargerThan650] = useMediaQuery(['(min-width: 1200px)', '(min-width: 900px)', '(min-width: 650px)'])

    return (
        <Box
        >
            {isLargerThan1200 ? <Box
                w={`42%`}
            >
                <Stack>
                    <Heading
                        size={`xl`}
                    >
                        Benefits of Nexai
                    </Heading>
                    <Text

                    >
                        Our Holistic Approach Ensures Effortless Customer Support, Data Autonomy, and Unrivaled Security for Your Business.
                    </Text>
                </Stack>
            </Box>
                :
                <Flex>
                    <Stack
                        align={`center`}
                        w={`90vw`}
                        m={`auto`}
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
                        {/* <Button>
                        Start Exploring
                    </Button> */}
                    </Stack>
                </Flex>
            }
            {
                isLargerThan650
                    ?
                    <Stack
                        spacing={14}
                        p={4}
                        mt={14}
                    >
                        <HStack
                            justify={`space-between`}
                            align={`start`}
                        >
                            <Flex
                                w={`30%`}
                            >
                                <Stack
                                    spacing={8}
                                >
                                    <Flex
                                        borderRadius={`full`}
                                        w={`70px`}
                                        h={`70px`}
                                        bg={`primary.100`}
                                        justify={`center`}
                                        align={`center`}
                                    >
                                        <Image src={`User.svg`} />
                                    </Flex>
                                    <Heading
                                        size={`md`}
                                    >
                                        Comprehensive Integration for Ultimate User Experience
                                    </Heading>
                                    <Text>
                                        Nexai pioneers the integration of self-learning, live agent direct chat, and documentation-based responses. Redefining user experience by ensuring all questions find resolution, providing unparalleled satisfaction.
                                    </Text>
                                </Stack>
                            </Flex>
                            <Flex
                                w={`30%`}
                            >
                                <Stack
                                    spacing={8}
                                >
                                    <Flex
                                        borderRadius={`full`}
                                        w={`70px`}
                                        h={`70px`}
                                        bg={`primary.100`}
                                        justify={`center`}
                                        align={`center`}
                                    >
                                        <Image src={`Hotspot.svg`} />
                                    </Flex>
                                    <Heading
                                        size={`md`}
                                    >
                                        Relatively Free Access with 100 Tokens for Every User
                                    </Heading>
                                    <Text>
                                        Enjoy the benefits at no cost! Nexai offers a generous 100 free tokens to each user, making it a truly accessible and free-to-use platform.They enable  users to explore without any financial commitment.
                                    </Text>
                                </Stack>
                            </Flex>
                            <Flex
                                w={`30%`}
                            >
                                <Stack
                                    spacing={8}
                                >
                                    <Flex
                                        borderRadius={`full`}
                                        w={`70px`}
                                        h={`70px`}
                                        bg={`primary.100`}
                                        justify={`center`}
                                        align={`center`}
                                    >
                                        <Image src={`Data.svg`} />
                                    </Flex>
                                    <Heading
                                        size={`md`}
                                    >
                                        Data Autonomy
                                    </Heading>
                                    <Text>
                                        Nexai empowers companies with individual canisters, granting complete control over their data. Security and confidentiality are paramount, ensuring a secure environment for your company's information.
                                    </Text>
                                </Stack>
                            </Flex>
                        </HStack>
                        <HStack
                            justify={`center`}
                            gap={14}
                            align={`start`}
                        >
                            <Flex
                                w={`30%`}
                            >
                                <Stack
                                    spacing={8}
                                >
                                    <Flex
                                        borderRadius={`full`}
                                        w={`70px`}
                                        h={`70px`}
                                        bg={`primary.100`}
                                        justify={`center`}
                                        align={`center`}
                                    >
                                        <Image src={`Money.svg`} />
                                    </Flex>
                                    <Heading
                                        size={`md`}
                                    >
                                        Seamless Account Top-Up with ckBTC or ckETH
                                    </Heading>
                                    <Text>
                                        Once your free tokens are exhausted, easily top up your canister with ckBTC or ckETH. Nexai ensures a seamless and hassle-free method to keep your account fully functional.
                                    </Text>
                                </Stack>
                            </Flex>
                            <Flex
                                w={`30%`}
                            >
                                <Stack
                                    spacing={8}
                                >
                                    <Flex
                                        borderRadius={`full`}
                                        w={`70px`}
                                        h={`70px`}
                                        bg={`primary.100`}
                                        justify={`center`}
                                        align={`center`}
                                    >
                                        <Image src={`Security.svg`} />
                                    </Flex>
                                    <Heading
                                        size={`md`}
                                    >
                                        End-to-End Data Security and Decentralization
                                    </Heading>
                                    <Text>
                                        Nexai is fully decentralized, ensuring end-to-end data security. Your information is safeguarded, and the decentralization guarantees a robust and resilient platform for all your needs.
                                    </Text>
                                </Stack>
                            </Flex>
                        </HStack>
                    </Stack>
                    :
                    <VStack
                        spacing={10}
                        mt={10}
                    >
                        <Stack
                            spacing={8}
                        >
                            <Flex
                                borderRadius={`full`}
                                w={`70px`}
                                h={`70px`}
                                bg={`primary.100`}
                                justify={`center`}
                                align={`center`}
                            >
                                <Image src={`User.svg`} />
                            </Flex>
                            <Heading
                                size={`md`}
                            >
                                Comprehensive Integration for Ultimate User Experience
                            </Heading>
                            <Text>
                                Nexai pioneers the integration of self-learning, live agent direct chat, and documentation-based responses. Redefining user experience by ensuring all questions find resolution, providing unparalleled satisfaction.
                            </Text>
                        </Stack>
                        <Stack
                            spacing={8}
                        >
                            <Flex
                                borderRadius={`full`}
                                w={`70px`}
                                h={`70px`}
                                bg={`primary.100`}
                                justify={`center`}
                                align={`center`}
                            >
                                <Image src={`Hotspot.svg`} />
                            </Flex>
                            <Heading
                                size={`md`}
                            >
                                Relatively Free Access with 100 Tokens for Every User
                            </Heading>
                            <Text>
                                Enjoy the benefits at no cost! Nexai offers a generous 100 free tokens to each user, making it a truly accessible and free-to-use platform.They enable  users to explore without any financial commitment.
                            </Text>
                        </Stack>
                        <Stack
                            spacing={8}
                        >
                            <Flex
                                borderRadius={`full`}
                                w={`70px`}
                                h={`70px`}
                                bg={`primary.100`}
                                justify={`center`}
                                align={`center`}
                            >
                                <Image src={`Data.svg`} />
                            </Flex>
                            <Heading
                                size={`md`}
                            >
                                Data Autonomy
                            </Heading>
                            <Text>
                                Nexai empowers companies with individual canisters, granting complete control over their data. Security and confidentiality are paramount, ensuring a secure environment for your company's information.
                            </Text>
                        </Stack>
                        <Stack
                            spacing={8}
                        >
                            <Flex
                                borderRadius={`full`}
                                w={`70px`}
                                h={`70px`}
                                bg={`primary.100`}
                                justify={`center`}
                                align={`center`}
                            >
                                <Image src={`Money.svg`} />
                            </Flex>
                            <Heading
                                size={`md`}
                            >
                                Seamless Account Top-Up with ckBTC or ckETH
                            </Heading>
                            <Text>
                                Once your free tokens are exhausted, easily top up your canister with ckBTC or ckETH. Nexai ensures a seamless and hassle-free method to keep your account fully functional.
                            </Text>
                        </Stack>
                        <Stack
                            spacing={8}
                        >
                            <Flex
                                borderRadius={`full`}
                                w={`70px`}
                                h={`70px`}
                                bg={`primary.100`}
                                justify={`center`}
                                align={`center`}
                            >
                                <Image src={`Security.svg`} />
                            </Flex>
                            <Heading
                                size={`md`}
                            >
                                End-to-End Data Security and Decentralization
                            </Heading>
                            <Text>
                                Nexai is fully decentralized, ensuring end-to-end data security. Your information is safeguarded, and the decentralization guarantees a robust and resilient platform for all your needs.
                            </Text>
                        </Stack>
                    </VStack>
            }
        </Box>
    );
};

export default Benefits;
