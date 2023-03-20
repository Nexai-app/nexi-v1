import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";

const App = () => {
	const { Auth, iiAuth, handleAuthenticated, setIIAuth } =
		useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		const runOnMounth = async () => {
			const authClient = await AuthClient.create();
			if (await authClient.isAuthenticated()) {
				// setTour(tour_);
				handleAuthenticated(authClient);
				if (location.pathname === "/") {
					navigate("/signup");
				}
				setIIAuth(true);
				setActorRestated(true);
			} else {
				toast.error("you must log in");
				navigate("/");
			}
		};

		runOnMounth();
	}, []);

	const [actorRestated, setActorRestated] = useState<boolean>(false);

	if (actorRestated) {
		return (
			<Routes>
				<Route path='/signup' element={<Signup />} />
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path='/' element={<LandingPage />} />
			</Routes>
		);
	}
};

export default App;
