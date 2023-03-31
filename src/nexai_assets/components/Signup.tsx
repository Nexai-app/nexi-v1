import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { useLogIn } from "../functions";
import { AuthContext } from "../context/AuthContext";

function SignUpForm() {
	const [showModal, setShowModal] = useState(false);
	const [founderName, setFounderName] = useState("");
	const [appName, setAppName] = useState("");
	const [aboutApp, setAboutApp] = useState("");
	const [username, setUsername] = useState("");
	const [submitting, setSubmitting] = useState(false)



	//CHECK IS USER EXIST BEFORE
	const { actor, loggedIn } = useContext(AuthContext)

	const { loading, handleLogIn } = useLogIn()

	useEffect(() => {
		handleLogIn()
	}, [])


	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitting(true)

		actor.createCompany(appName, username, founderName, aboutApp).then((data) => {
			setSubmitting(false);
			setShowModal(true);
		}).catch((err) => {
			setSubmitting(false)
			console.log(err);
		})
		// do something with the form data, like sending it to a server

	};

	return (
		<div className="signup-form-container">
			{loading ? (
				<Spinner />
			) : (
				<>
					{loggedIn ? (
						<Button variant="primary" style={{ width: "10%" }} type="submit" className="submit-button">
							Log In
						</Button>
					) : (<>
						<Form onSubmit={handleSubmit} className="signup-form">
							<Form.Group className="field" controlId="formAppName">
								<Form.Control
									type="text"
									placeholder="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="form-input"
								/>
							</Form.Group>
							<Form.Group className="field" controlId="formFounderName">
								<Form.Control
									type="text"
									placeholder="Enter founder's name"
									value={founderName}
									onChange={(e) => setFounderName(e.target.value)}
									className="form-input"
								/>
							</Form.Group>

							<Form.Group className="field" controlId="formAppName">
								<Form.Control
									type="text"
									placeholder="Enter app name"
									value={appName}
									onChange={(e) => setAppName(e.target.value)}
									className="form-input"
								/>
							</Form.Group>


							<Form.Group className="field text-area" controlId="formAboutApp">
								<Form.Control
									as="textarea"
									// rows={3}
									placeholder="Describe your dApp in few words"
									value={aboutApp}
									onChange={(e) => setAboutApp(e.target.value)}
									className="form-input"
								/>
							</Form.Group>

							<Button variant="primary" type="submit" className="submit-button" disabled={submitting}>
								Submit
							</Button>
						</Form>

						<Modal
							show={showModal}
							onHide={() => setShowModal(false)}
							className="modal"
							centered
						>
							<Modal.Header closeButton className="modal-header">
								<Modal.Title className="modal-title">
									Thank you for signing up!
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="modal-body">
								<p>Founder's Name: {username}</p>
								<p>Founder's Name: {founderName}</p>
								<p>App Name: {appName}</p>
								<p>About the App: {aboutApp}</p>
							</Modal.Body>
							<Modal.Footer className="modal-footer">
								<Button
									variant="secondary"
									onClick={() => setShowModal(false)}
									className="close-button"
								>
									Close
								</Button>
							</Modal.Footer>
						</Modal>
					</>
					)}
				</>
			)}
		</div>
	);
}

export default SignUpForm;
