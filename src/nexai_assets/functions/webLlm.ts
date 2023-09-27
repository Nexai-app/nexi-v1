import { useState } from "react";
import * as webllm from "@mlc-ai/web-llm";
import toast from "react-hot-toast";

let model_name = "RedPajama-INCITE-Chat-3B-v1-q4f32_0";
let chatBot = new webllm.ChatModule();

export const useInitLLM = async () => {
  await chatBot.reload(model_name);
  useInitProgressCB();
};

const useInitProgressCB = () => {
  let val = "";

  chatBot.setInitProgressCallback(
    (report: webllm.InitProgressReport) => {
      val = report.text;
    }
  );
  console.log("progress", val);
};

const generateProgressCallback = (_step: number, message: string) => {
  const [label, setLabel] = useState("");
  setLabel(message);
  console.log("label", label);
};

export function useInteractBot() {
  const [res, setRes] = useState("");
  try {
    const getReply = async (msg: string) => {
      const reply = await chatBot.generate(
        msg,
        generateProgressCallback
      );
      console.log(reply);
      setRes(reply);
      return reply;
    };
    return { getReply, res };
  } catch (err) {
    toast.error("Error Decrypting Reply from LLM");
    console.log(err);

    return;
  }
}
