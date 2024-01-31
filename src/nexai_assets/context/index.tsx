import React from "react";
import { AuthProvider } from "./AuthContext";
import { TrainBotProvider } from "./TrainBotContext";

function index({ children }) {
  return (
    <AuthProvider>
      <TrainBotProvider>{[children]}</TrainBotProvider>
    </AuthProvider>
  );
}

export default index;
