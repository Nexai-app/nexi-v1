import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import Lest from "../pages/Lest";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import TrainBot from "../pages/TrainBot";
import AllQuestion from "../pages/AllQuestions";
import IntegrationPage from "../pages/IntegrationPage";
import Chat from "../pages/ChatPage";
import { useAppSelector } from "../redux-toolkit/hooks";
import { useUpdateProfile } from "../functions";
import { useInitTransformers } from "../functions/ml";
import { useInitLLM } from "../functions/webLlm";
import LoadingScreen from "../components/TrainBot/LoadingScreen";
import WalletPage from "../pages/WalletPage";
import { Assistant } from "nexai-assistant";
// import { Assistant, AssistantProps } from "nexai-assistant";
import AssistantWrapper from "../components/AssistantWrapper";

const App = () => {
  const { handleAuthenticated, setIIAuth, actor, vdbActor } =
    useContext(AuthContext);
  const [actorRestated, setActorRestated] = useState<boolean>(false);
  const profile = useAppSelector((state) => state.profile);
  const { updateProfile } = useUpdateProfile();
  const { init } = useInitTransformers();
  const { initLLM } = useInitLLM();
  // const { updateProfile } = useUpdateProfile();

  const toast = useToast({
    containerStyle: {
      color: "green",
    },
  });

  const navigate = useNavigate();

  // const param: AssistantProps = {
  //   actor: vdbActor,
  //   color: "red",
  //   companyId: 1,
  //   companyName: "nexai",
  // };
  useEffect(() => {
    // initializes the ml
    //initialize llm
    const call = async () => {
      // await initLLM();
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
          <Route path="/we" element={<Lest />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="signup" element={<Signup />} />
          <Route path="train-bot" element={<TrainBot />} />
          <Route path="my-questions" element={<AllQuestion />} />
          <Route path="integration" element={<IntegrationPage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route
            path="loading"
            element={<LoadingScreen isLoading={false} />}
          />
        </Routes>
        <Assistant
          actor={vdbActor}
          color="green"
          companyName="Nexai Help"
          companyId={1}
          companyPrincipal={
            // "qtlty-wkc6r-gvr2k-qejje-y2alj-wvhxi-4xnwh-ar5ie-7257j-knhvx-xae"
            "wkamz-d24me-lajzj-c6hp4-l2c4r-nwcwj-kuvqj-lrwcu-es4w5-k6jbe-bae"
          }
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {/* <Assistant
          actor={vdbActor}
          color="purple"
          companyName="Nexai Help"
          companyId={0}
          companyPrincipal={
            "wkamz-d24me-lajzj-c6hp4-l2c4r-nwcwj-kuvqj-lrwcu-es4w5-k6jbe-bae"
          }
        /> */}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/we" element={<Lest />} />
        </Routes>
      </React.Fragment>
    );
  }
};

export default App;
