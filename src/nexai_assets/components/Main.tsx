import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faComments,
	faMugHot,
	faListCheck,
	faMapLocationDot,
	faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Main.css";

library.add(
	faComments,
	faPenToSquare,
	faMugHot,
	faListCheck,
	faMapLocationDot,
	faChartLine
);

function Main() {
	const data = [
		{
			icon: faPenToSquare,
			title: "Tell us what your project is all about",
			description:
				"Let Nexai know what your project is about so it can assist you better.",
			image: "image1.jpg",
		},
		{
			icon: faComments,
			title: "Set some default messages or behavior you want from Nexai",
			description:
				"Customize Nexai to suit your needs by setting default messages and behavior.",
			image: "image2.jpg",
		},
		{
			icon: faMugHot,
			title: "Drink a cup of coffee while we finish up your personal assistant",
			description:
				"Relax and let Nexai do the work. Grab a cup of coffee and enjoy.",
			image: "image3.jpg",
		},
		{
			icon: faListCheck,
			title: "Integrate Nexai to your app with the detailed guide",
			description:
				"Follow our detailed guide to easily integrate Nexai to your app.",
			image: "image4.jpg",
		},
		{
			icon: faMapLocationDot,
			title: "Rest while Nexai shows new users the way around your new site",
			description:
				"Let Nexai take over the task of guiding new users around your site.",
			image: "image5.jpg",
		},
		{
			icon: faChartLine,
			title: "Check detailed analytics on your personalized dashboard",
			description:
				"Monitor and analyze the performance of Nexai with our personalized dashboard.",
			image: "image6.jpg",
		},
	];

	return (
		<div className="App">
			<header className="hero">
				<h1>Nexai</h1>
				<p>
					The first fully decentralized, autonomous, integrateable chatbot and
					assistant that runs on blockchain and artificial intelligence.
				</p>
			</header>
			<section className="steps">
				<h2>How it works</h2>
				<Row xs={1} md={3} className="g-4">
					{data.map((card, idx) => (
						<Col key={idx}>
							<Card className="card-bg">
								<FontAwesomeIcon
									icon={card.icon}
									style={{ color: "#ffffff" }}
									size="5x"
									className="icon"
								/>
								<Card.Body>
									<Card.Title className="title">{card.title}</Card.Title>
									<Card.Text className="desc">{card.description}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				<button className="cta">Get Started</button>
			</section>
		</div>
	);
}

export default Main;
