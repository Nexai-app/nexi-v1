import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import TrainBot from "../pages/TrainBot";
import AllQuestion from "../components/TrainBot/AllQuestions";
import IntegrationPage from "../pages/IntegrationPage";
import { useAppSelector } from "../redux-toolkit/hooks";
import { useUpdateProfile } from "../functions";
import { useInitTransformers } from "../functions/ml";
import { useInitLLM } from "../functions/webLlm";

const App = () => {
  const { handleAuthenticated, setIIAuth, actor } =
    useContext(AuthContext);
  const [actorRestated, setActorRestated] = useState<boolean>(false);
  const profile = useAppSelector((state) => state.profile);
  const { updateProfile } = useUpdateProfile();
  const { init } = useInitTransformers();
  const { initLLM } = useInitLLM();

  const toast = useToast({
    containerStyle: {
      color: "green",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // initializes the ml
    //initialize llm
    const call = async () => {
      await initLLM();
      await init();
    };
    const runOnMounth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        console.log("IS AUTHENTICATED");
        console.log(location.hash);
        await handleAuthenticated(authClient);
        // if (location.hash === "#/signup") {
        actor
          ?.logIn()
          .then((d) => {
            console.log(d);
            if (d === true) {
              updateProfile();
              navigate("/dashboard");
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log("eerrr", err);
          });
        // }
        setIIAuth(true);
        setActorRestated(true);
        return;
      } else {
        console.log("NOT AUTHENTICATED");
        navigate("/");
        return;
      }
    };

    runOnMounth();
    call();
  }, []);

  if (actorRestated) {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signup" element={<Signup />} />
          <Route path="train-bot" element={<TrainBot />} />
          <Route path="my-questions" element={<AllQuestion />} />
          <Route path="integration" element={<IntegrationPage />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path='/signup' element={<Signup />} /> */}
        </Routes>
      </React.Fragment>
    );
  }
};

export default App;
