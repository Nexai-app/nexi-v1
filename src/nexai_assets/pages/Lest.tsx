import React from "react";
import Footer from "../components/LandingPage/Footer";
import LandingPageNavbar from "../components/shared/LandingPageNavbar";
import Main from "../components/Main";

function LandingPage() {
    return (
        <>
            <LandingPageNavbar />
            <Main />
            <Footer />
        </>
    );
}

export default LandingPage;