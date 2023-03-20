import * as React from "react";
import "./Main.css";

function Main() {
	return (
		<div className='App'>
			<header className='hero'>
				<h1>Nexai</h1>
				<p>
					The first fully decentralized, autonomous, integrateable chatbot and
					assistant that runs on blockchain and artificial intelligence.
				</p>
			</header>
			<section className='steps'>
				<h2>How it works</h2>
				<ol>
					<li>Tell us what your project is all about</li>
					<li>Set some default messages or behavior you want from Nexai</li>
					<li>
						Drink a cup of coffee while we finish up your personal assistant
					</li>
					<li>Integrate Nexai to your app with the detailed guide</li>
					<li>Rest while Nexai shows new users the way around your new site</li>
					<li>Check detailed analytics on your personalized dashboard</li>
				</ol>
				<button className='cta'>Get Started</button>
			</section>
			{/* <footer>
        <p>Powered by Internet identity</p>
        <img src="internet-identity-logo.png" alt="Internet identity logo" />
      </footer> */}
		</div>
	);
}

export default Main;
