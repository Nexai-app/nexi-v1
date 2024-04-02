import React from "react";
import { Box } from "@chakra-ui/react";
import LayoutContainer from "../components/shared/LayoutContainer";
import Wallet from "../components/Wallet";

function WalletPage() {
    return (
        <Box>
            <LayoutContainer>
                <Wallet />
            </LayoutContainer>
        </Box>
    );
}

export default WalletPage;
