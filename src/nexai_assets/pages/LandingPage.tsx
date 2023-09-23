import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/shared/Navbar";
import Main from "../components/Main";
import "../src/App.css"

function LandingPage() {
	return (
		<div className='landing'>
			<Navbar />
			<Main />
			<Footer />
		</div>
	);
}

export default LandingPage;
