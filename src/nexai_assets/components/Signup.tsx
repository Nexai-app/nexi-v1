import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

function SignUpForm() {
	const [showModal, setShowModal] = useState(false);
	const [founderName, setFounderName] = useState("");
	const [appName, setAppName] = useState("");
	const [aboutApp, setAboutApp] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// do something with the form data, like sending it to a server
		setShowModal(true);
	};

	return (
		<div className='signup-form-container'>
			<Form onSubmit={handleSubmit} className='signup-form'>
				<Form.Group className='field' controlId='formFounderName'>
					<Form.Control
						type='text'
						placeholder="Enter founder's name"
						value={founderName}
						onChange={(e) => setFounderName(e.target.value)}
						className='form-input'
					/>
				</Form.Group>

				<Form.Group className='field' controlId='formAppName'>
					<Form.Control
						type='text'
						placeholder='Enter app name'
						value={appName}
						onChange={(e) => setAppName(e.target.value)}
						className='form-input'
					/>
				</Form.Group>

				<Form.Group className='field text-area' controlId='formAboutApp'>
					<Form.Control
						as='textarea'
						// rows={3}
						placeholder='Enter a short description about the app'
						value={aboutApp}
						onChange={(e) => setAboutApp(e.target.value)}
						className='form-input'
					/>
				</Form.Group>

				<Button variant='primary' type='submit' className='submit-button'>
					Submit
				</Button>
			</Form>

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				className='modal'
				centered
			>
				<Modal.Header closeButton className='modal-header'>
					<Modal.Title className='modal-title'>
						Thank you for signing up!
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className='modal-body'>
					<p>Founder's Name: {founderName}</p>
					<p>App Name: {appName}</p>
					<p>About the App: {aboutApp}</p>
				</Modal.Body>
				<Modal.Footer className='modal-footer'>
					<Button
						variant='secondary'
						onClick={() => setShowModal(false)}
						className='close-button'
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SignUpForm;
