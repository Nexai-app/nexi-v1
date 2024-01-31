import React, { useState } from "react";
import { Actor, Identity, ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../declarations/nexai";
import {
  // canisterId as vdbCanisterId,
  createActor as vdbCreateActor,
} from "../../vector-database-icp/src/declarations/vector_database_backend";
import { _SERVICE as _vdbSERVICE } from "../../vector-database-icp/src/declarations/vector_database_backend/vector_database_backend.did";
// import {
//   // canisterId as vdbCanisterId,
//   createActor as vdbCreateActor,
// } from "../../vector_database_backend";
// import { _SERVICE as _vdbSERVICE } from "../../vector_database_backend/vector_database_backend.did";
import { useLocation, useNavigate } from "react-router-dom";
import { _SERVICE } from "../../declarations/nexai/nexai.did";

/* 
ERROR WITH GETTING CANISTER ID FROM DECLARATION SO WE DO IT MANUALLY
Canister ID is required, but received undefined instead. 
If you are using automatically generated declarations, 
this may be because your 
application is not setting the canister ID in process.env correctly. */
const vdbCanisterId = "asrmz-lmaaa-aaaaa-qaaeq-cai";
const canisterId = "bd3sg-teaaa-aaaaa-qaaba-cai";

export const AuthContext = React.createContext<{
  Auth: any;
  actor: ActorSubclass<_SERVICE> | undefined;
  vdbActor: ActorSubclass<_vdbSERVICE> | undefined;
  setActor: any;
  iiAuth: boolean;
  setIIAuth: any;
  changeAuthStatus: any;
  handleAuthenticated: (arg0: any) => any;
  loggedIn: boolean;
  setLoggedIn: any;
  pipelineInit: boolean;
  setPipelineInit: any;
  llmStatus: string;
  setLlmStatus: any;
  llmBoolStatus: boolean;
  setLlmBoolStatus: any;
  llmReply: string;
  setLlmReply: any;
  useLLM: boolean;
  setUseLLM: any;
  customerPrincipal: string;
  setCustomerPrincipal: any;
  openChat: boolean;
  setOpenChat: any;
  trainMode: boolean;
  setTrainMode: any;
  handleChangeTrainMode: any;
}>({
  Auth: undefined,
  actor: undefined,
  vdbActor: undefined,
  setActor: undefined,
  iiAuth: false,
  setIIAuth: false,
  changeAuthStatus: undefined,
  handleAuthenticated: undefined,
  loggedIn: false,
  setLoggedIn: undefined,
  pipelineInit: false,
  setPipelineInit: undefined,
  llmStatus: undefined,
  setLlmStatus: undefined,
  llmBoolStatus: undefined,
  setLlmBoolStatus: undefined,
  llmReply: "",
  setLlmReply: undefined,
  useLLM: false,
  setUseLLM: undefined,
  customerPrincipal: "",
  setCustomerPrincipal: undefined,
  openChat: false,
  setOpenChat: undefined,
  trainMode: true,
  setTrainMode: undefined,
  handleChangeTrainMode: undefined,
});

export const AuthProvider = ({ children }) => {
  // const tour_ = useContext(ShepherdTourContext);
  const [actor, setActor] = useState<ActorSubclass<_SERVICE>>();
  const [vdbActor, setVdbActor] =
    useState<ActorSubclass<_vdbSERVICE>>();
  const [iiAuth, setIIAuth] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pipelineInit, setPipelineInit] = useState(false);
  const [llmStatus, setLlmStatus] = useState(
    "Initializinig web language model and webGPU, this might take a while, if webGPU is not enabled on your browser, please enable it to allow this feature work..."
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [llmBoolStatus, setLlmBoolStatus] = useState(false);
  const [llmReply, setLlmReply] = useState("");
  const [useLLM, setUseLLM] = useState(false);
  const [customerPrincipal, setCustomerPrincipal] =
    React.useState("");
  const [openChat, setOpenChat] = React.useState(false)
  const [trainMode, setTrainMode] = React.useState(true);

  // const { trackEvent } = useMatomo();

  async function Auth(e) {
    e.preventDefault();
    console.log("You clicked me.");
    // trackEvent({ category: "Authentication", action: "sign-in/sign-up" });
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
      // setTour(tour_);
      if (location.pathname === "/") {
        navigate("/");
      }
      setIIAuth(true);
    }

    const loginButton = document.getElementById(
      "loginButton"
    ) as HTMLButtonElement;

    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    const APPLICATION_NAME = "Nexai";
    const APPLICATION_LOGO_URL =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJR6SAoiTMNdmt6tabURYYwvSp9XcA9IgMjw&usqp=CAU";

    const AUTH_PATH =
      "/authenticate/?applicationName=" +
      APPLICATION_NAME +
      "&applicationLogo=" +
      APPLICATION_LOGO_URL +
      "#authorize";

    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
        navigate("/");
        setIIAuth(true);
      },
      windowOpenerFeatures:
        `left=${window.screen.width / 2 - 525 / 2}, ` +
        `top=${window.screen.height / 2 - 705 / 2},` +
        `toolbar=0,location=0,menubar=0,width=525,height=705`,
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://nfid.one" + AUTH_PATH
          : process.env.LOCAL_II_CANISTER,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    });
  }

  async function handleAuthenticated(authClient: AuthClient) {
    const identity =
      (await authClient.getIdentity()) as unknown as Identity;

    const whoami_actor = createActor(canisterId as string, {
      agentOptions: {
        identity,
      },
    });

    const vdb_actor = vdbCreateActor(vdbCanisterId as string, {
      agentOptions: {
        identity,
      },
    });
    setActor(whoami_actor);
    setVdbActor(vdb_actor);

    // Invalidate identity then render login when user goes idle
    authClient.idleManager?.registerCallback(() => {
      Actor.agentOf(whoami_actor)?.invalidateIdentity?.();
    });
  }

  const changeAuthStatus = () => {
    setIIAuth((prevState) => prevState !== prevState);
  };

  const handleChangeTrainMode = (e: any) => {
    setTrainMode(e.target.checked);
  };

  return (
    <AuthContext.Provider
      value={{
        Auth,
        actor,
        setActor,
        iiAuth,
        setIIAuth,
        handleAuthenticated,
        changeAuthStatus,
        loggedIn,
        setLoggedIn,
        pipelineInit,
        setPipelineInit,
        llmStatus,
        setLlmStatus,
        llmBoolStatus,
        setLlmBoolStatus,
        llmReply,
        setLlmReply,
        useLLM,
        setUseLLM,
        customerPrincipal,
        setCustomerPrincipal,
        vdbActor,
        openChat,
        setOpenChat,
        trainMode,
        setTrainMode,
        handleChangeTrainMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
