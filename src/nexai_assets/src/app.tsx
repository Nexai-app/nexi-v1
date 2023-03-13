import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Greetings from "../components/Greetings";

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Greetings />} />
		</Routes>
	);
};

export default App;
