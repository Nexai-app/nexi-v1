import React from "react";
import "./Footer.css"; // import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="powered-by">
					Powered by: <img className="logo" alt="" src={`logo.png`} />
				</div>
				<div className="social-links">
					<a
						href="https://twitter.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faTwitter} />
					</a>
					<a
						href="https://discord.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FontAwesomeIcon icon={faDiscord} />
					</a>
				</div>
				<div className="copy">&copy; 2023 Nexai</div>
			</div>
		</footer>
	);
}

export default Footer;
