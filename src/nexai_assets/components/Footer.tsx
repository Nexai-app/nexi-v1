import React from "react";
import "./Footer.css"; // import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
		<footer className="footer">
			<div className="copy">Copyright &#169; 2023 Nexai. All right reserved</div>
			<div className="footer-container">
				<div className="social-links">
					<a
						href="https://twitter.com/nexaifoundation"
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
			</div>
		</footer>
	);
}

export default Footer;
