import { useState } from "react";
import * as webllm from "@mlc-ai/web-llm";

let model_name = "RedPajama-INCITE-Chat-3B-v1-q4f32_0";

let chatBot = new webllm.ChatModule();

export const useInitLLM = async () => {
  let val = "";

  await chatBot.reload(model_name);

  chatBot.setInitProgressCallback(
    (report: webllm.InitProgressReport) => {
      val = report.text;
    }
  );
};

const generateProgressCallback = (_step: number, message: string) => {
  // setLabel("generate-label", message);
};

export async function useInteractBot(msg: string) {
  const reply = await chatBot.generate(msg, generateProgressCallback);
  console.log(reply);
  // pushMessage('ChatBot', reply);
}
