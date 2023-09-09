import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Center,
  Spacer,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import Logo from "../Logo";
import { MdSettings } from "react-icons/md";
import { LayoutContext } from "../LayoutContainer";
import { icon } from "@fortawesome/fontawesome-svg-core";
import _chakra_ui_system from "@chakra-ui/system";

const MenuNavigation = [
  {
    icon: {
      inactive: <Icon as={MdSettings} />,
      active: <Icon as={MdSettings} />,
    },
    title: "Home",
    route: "/dashboard",
  },
  {
    icon: {
      inactive: <Icon as={MdSettings} />,
      active: <Icon as={MdSettings} />,
    },
    title: "Integration",
    route: "/integration",
  },
  {
    icon: {
      inactive: <Icon as={MdSettings} />,
      active: <Icon as={MdSettings} />,
    },
    title: "Train Assistant",
    route: "/train-bot",
  },
];

type NavType = {
  title: string;
  route: string;
  icon: {
    inactive: _chakra_ui_system.ComponentWithAs<"svg", IconProps>;
    active: _chakra_ui_system.ComponentWithAs<"svg", IconProps>;
  };
};

function index() {
  const location = useLocation();
  const { showSidebar, setShowSidebar } = React.useContext(LayoutContext);

  return (
    <Box
      pos="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex="sticky"
      background="341A41"
      w="15%"
      transform="auto"
      transition="transform 0.2s ease"
      py={8}
      translateX={{
        base: showSidebar ? 0 : "-100%",
        mdx2: "-100%",
      }}
      onClick={() => setShowSidebar(false)}
    >
      <Center>
        <Logo />
      </Center>
      <Spacer h="60px" />

      <Box>
        {MenuNavigation.map(({ icon, title, route }) => (
          <Box
            key={title}
            //   onClick={() => Router.push(route)}
            mt="20px"
            py={2.5}
            borderRadius="8px"
            __css={{
              background: location.pathname.includes(route)
                ? "primary.5"
                : "transparent",
              color: location.pathname.includes(route)
                ? "navyBlue.700"
                : "gray.400",
            }}
            cursor="pointer"
          >
            <Flex pl={8} display="flex" alignItems="center">
              <Box mr={3} my={0}>
                {location.pathname.includes(route)
                  ? icon.active
                  : icon.inactive}
              </Box>
              <Text my={0} py={0} position="relative" top="3px">
                {title}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default index;
