import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import {useToast} from "@chakra-ui/react"
import { AuthContext } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Dashboard from "../pages/Dashboard";
import TrainBot from "../pages/TrainBot";
import AddQuestion from "../components/TrainBot/AddQuestion";
import AllQuestion from "../components/TrainBot/AllQuestions";

const App = () => {
	const { handleAuthenticated, setIIAuth } = useContext(AuthContext);
	const [actorRestated, setActorRestated] = useState<boolean>(false);
	const toast = useToast({
		containerStyle: {
			color: "green",
		},
	  })

	const navigate = useNavigate();

	useEffect(() => {
		const runOnMounth = async () => {
			const authClient = await AuthClient.create();
			if (await authClient.isAuthenticated()) {
				// setTour(tour_);
				handleAuthenticated(authClient);
				if (location.pathname === "/") {
					navigate("/dashboard");
				}
				setIIAuth(true);
				setActorRestated(true);
				return;
			} else {
				// toast({title:"you must log in",});
				// setActorRestated(true);
				// navigate("/dashboard");
				navigate("/");
				return;

			}
		};

		runOnMounth();
	}, []);


	if (actorRestated) {
		return (
			<React.Fragment>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='dashboard' element={<Dashboard />} />
				<Route path='signup' element={<Signup />} />
				<Route path='train-bot' element={<AddQuestion />} />
				<Route path='my-questions' element={<AllQuestion />} />

			</Routes>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
			<Routes>
				<Route path='/' element={<LandingPage />} />
						{/* <Route path='/signup' element={<Signup />} /> */}

			</Routes>
			</React.Fragment>
		);
	}
};

export default App;
