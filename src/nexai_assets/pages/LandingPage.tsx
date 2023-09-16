import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/shared/Navbar";
import Main from "../components/Main";
import FloatingChat from "../components/shared/FloatingChat"
import "../src/App.css"

function LandingPage() {
	return (
		<div className='landing'>
			<Navbar />
			<Main />
			<Footer />
			<FloatingChat />
		</div>
	);
}

export default LandingPage;
