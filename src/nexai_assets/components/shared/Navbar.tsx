import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../src/App.css";

function Navbar() {
	const { Auth, iiAuth, changeAuthStatus } = useContext(AuthContext);
	const navigate = useNavigate();

	if (iiAuth) {
		changeAuthStatus();
		navigate("/signup");
		window.location.reload();
	}

	return (
		<header className='App-header'>
			<div className='navbar'>
				{/* <Link to='/'>
					Nexai
				 <img src={logo} className='App-logo' alt='logo' /> 
				</Link> */}
				<div onClick={Auth} className='sign-up-button'>
					Sign up
				</div>
			</div>
		</header>
	);
}

export default Navbar;
