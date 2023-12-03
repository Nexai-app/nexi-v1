import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import theme from "../theme/index";
import store from "../redux-toolkit/store";
import "@fontsource/public-sans/100.css";
import "@fontsource/public-sans/200.css";
import "@fontsource/public-sans/300.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";

import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
// import { Assistant } from "nexai-assistant";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Toaster />
        <ChakraProvider
          theme={theme}
          toastOptions={{ defaultOptions: { position: "top" } }}
        >
          <AuthProvider>
            <App />
            {/* <Assistant color="blue" companyName="Gift Coin" companyId={1} loading={true} newMessage={{ sender: "nexai", text: "never give up" }} /> */}
          </AuthProvider>
        </ChakraProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
