import { Box, Flex, Grid, GridItem, Heading, Stack, Text, useMediaQuery, Image } from "@chakra-ui/react";
// import { ReactComponent as First } from "../../assets/01.svg";
// import { ReactComponent as Second } from "../../assets/02.svg";
// import { ReactComponent as Third } from "../../assets/03.svg";
// import { ReactComponent as Firstsmall } from "../../assets/01small.svg";
// import { ReactComponent as Secondsmall } from "../../assets/02small.svg";
// import { ReactComponent as Thirdsmall } from "../../assets/03small.svg";
import React from "react";

const StandOut: React.FC = () => {

    const [isLargerThan650] = useMediaQuery('(min-width: 650px)')

    return (
        <Box
            color={`primary.50`}
        >
            <Flex
                justify={`center`}
            >
                <Stack>
                    <Heading
                        size={isLargerThan650 ? `xl` : `lg`}
                        textAlign={`center`}
                    >
                        Why Nexai Stands Out
                    </Heading>
                    <Text
                        align={`center`}
                        fontSize={isLargerThan650 ? `base` : `14`}
                    >
                        A Revolutionary Approach to Comprehensive Customer Support
                    </Text>
                </Stack>
            </Flex>
            <Grid
                templateAreas={isLargerThan650 ?
                    `"one one"
                    "two three"`
                    :
                    `"one" "two" "three"`
                }
                templateColumns={isLargerThan650 ? `repeat(2, 1fr)` : `1fr`}
                templateRows={isLargerThan650 ? `repeat(2, 1fr)` : `repeat(3, 1fr)`}
                h={`90%`}
                gap={6}
                mt={14}
            >
                <GridItem
                    area={`one`}
                    bg={`primary.50`}
                    p={4}
                    pb={isLargerThan650 ? 16 : 5}
                    borderRadius={4}
                >
                    <Stack
                        color={`white`}
                        width={isLargerThan650 ? `50%` : ``}
                    >
                        {isLargerThan650
                            ?
                            <Flex>
                                <Image src={`01.svg`} />
                            </Flex>
                            :
                            <Flex>
                                <Image src={`01small.svg`} />
                            </Flex>
                        }
                        <Heading size={`lg`}>All-in-One Customer Support</Heading>
                        <Text
                            fontSize={`sm`}
                        >
                            Nexai offers an all-in-one customer support solution. Through self-learning from frequently asked questions, it intelligently suggests answers to users, ensuring efficiency and a seamless user experience.
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem
                    area={`two`}
                    bg={`primary.100`}
                    p={4}
                    pb={isLargerThan650 ? 16 : 5}
                    borderRadius={4}
                >
                    <Stack>
                        {isLargerThan650
                            ?
                            <Flex>
                                <Image src={`02.svg`} />
                            </Flex>
                            :
                            <Flex>
                                <Image src={`02small.svg`} />
                            </Flex>
                        }
                        <Heading size={`lg`}>Informed Responses from Company Documentation</Heading>
                        <Text
                            fontSize={`sm`}
                        >
                            There is an unparalleled knowledge base. Nexai goes beyond the ordinary by answering user questions directly from the company's documentation. It taps into the wealth of information, providing users with accurate and informed responses.
                        </Text>
                    </Stack>
                </GridItem>
                <GridItem
                    area={`three`}
                    bg={`primary.100`}
                    p={4}
                    pb={isLargerThan650 ? 16 : 5}
                    borderRadius={4}
                >
                    <Stack>
                        {isLargerThan650
                            ?
                            <Flex>
                                <Image src={`03.svg`} />
                            </Flex>
                            :
                            <Flex>
                                <Image src={`03small.svg`} />
                            </Flex>
                        }
                        <Heading size={`lg`}>Live Agent Direct Chat</Heading>
                        <Text
                            fontSize={`sm`}
                        >
                            Nexai transforms customer support with a direct live agent chat feature. Elevate your support game by facilitating real-time interactions, ensuring that users receive immediate assistance and personalized support.
                        </Text>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default StandOut;
