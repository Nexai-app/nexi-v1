/* eslint-disable react/require-default-props */
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useState,
} from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
//   import LayoutHeader from "@components/shared/layout/LayoutHeader";
import MobileSlider from "../MobileSlider";
import { useUpdateProfile } from "../../../functions";

type Props = {
  children: ReactNode;
  px?: any;
};

type LayoutContextProps = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<boolean>;
};

export const LayoutContext = createContext<LayoutContextProps>({
  showSidebar: true,
  setShowSidebar: () => {},
});
//  const base = ['/home']
const LayoutContainer: FC<Props> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { updateProfile } = useUpdateProfile();

  React.useEffect(() => {
    const fetchProfile = async () => {
      await updateProfile();
      console.debug("[update profile fnc] - i was called");
    };
    fetchProfile();
  }, []);

  return (
    <LayoutContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        showSidebar,
        setShowSidebar,
      }}
    >
      <Box pos="relative" bg="#341A41" h="100%">
        <Sidebar />
        <MobileSlider />
        <Box
          mt={12}
          ml={{ md: "15%" }}
          w={{ md: "85%" }}
          px={{ base: "10px", md: "11px" }}
          bg="#341A41"
          h={{ base: "500px", sm: "100%" }}
          py="5px"
          pos="relative"
        >
          {children}
        </Box>
      </Box>
    </LayoutContext.Provider>
  );
};

export default LayoutContainer;
