import { useState, useContext } from "react";
import * as webllm from "@mlc-ai/web-llm";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { addReply } from "../redux-toolkit/slice/llmSlice";

let model_name = "RedPajama-INCITE-Chat-3B-v1-q4f32_0";
let chatBot = new webllm.ChatModule();

export const useInitLLM = () => {
  const { setLlmStatus, setLlmBoolStatus } = useContext(AuthContext);
  try {
    const initLLM = async () => {
      const c_ = await chatBot.reload(model_name);
      console.log("c_", c_);
      useInitProgressCB();
      setLlmBoolStatus(true);
      setLlmStatus("LLM is Initaialized Successfully");
    };

    // if ()
    return { initLLM };
  } catch (err) {
    console.log(err);
    setLlmBoolStatus(false);
    setLlmStatus(
      "WebGPU is not enabled or supported on your browser, assistant will default back to responding without it"
    );
    return;
  }
};

const useInitProgressCB = () => {
  // let val = "";

  chatBot.setInitProgressCallback(
    (report: webllm.InitProgressReport) => {
      console.log("progress call back", report);

      // val = report.text;
    }
  );
  // console.log("progress", val);
};

const generateProgressCallback = (_step: number, message: string) => {
  // console.log(_step, message);
};

export function useInteractBot() {
  const dispatch = useAppDispatch();
  try {
    const getReply = async (msg: string) => {
      const reply = await chatBot.generate(
        msg,
        generateProgressCallback
      );
      if (reply) {
        // console.log("reply from bot",reply);
        dispatch(addReply(reply));
        return reply;
      }
    };
    return { getReply };
  } catch (err) {
    toast.error("Error Decrypting Reply from LLM");
    console.log(err);

    return;
  }
}
