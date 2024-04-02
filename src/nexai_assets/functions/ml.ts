import { useContext, useState } from "react";
import {
  pipeline,
  Tensor,
  Pipeline,
  env,
} from "@xenova/transformers";
// import "./settings";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

// Disable the loading of remote models from the Hugging Face Hub:

// let extractor: null | Pipeline = null;

let extractor: any = null;

export const useEmbeddQuestion = () => {
  let embeddedText = [];
  let answer_arr = [];
  const [loading, setLoading]: any = useState(false);
  try {
    const embedd = async (
      question: string,
      answer: string
    ): Promise<void> => {
      const embedding = await useEmbedder(question);
      if (embedding == null) return;
      setLoading(true);

      const embedded = embedding.tolist()[0];
      console.log(embedded);

      if (embedded.length != 384) {
        console.log("Embedding size not correct");
        toast.error("Embedding size not correct");
        return;
      }
      embeddedText.push(embedded);
      answer_arr.push(question + "\n" + answer);
      setLoading(false);
      return embedded;
    };
    return { embedd, embeddedText, loading, answer_arr };
  } catch (err) {
    // toast.error("something went wrong");
    setLoading(false);
    console.log(err);
  }
};

export const useEmbeddQ = () => {
  let embeddedQ = [];
  try {
    const call = async (question: string) => {
      const embedding = await useEmbedder(question);
      if (embedding == null) {
        console.log("no embedding");
        toast.error("Error Embedding Text");
        return;
      }
      const e = embedding.tolist()[0];
      if (e.length != 384) {
        console.log("Embedding size not correct");
        toast.error("Embedding size not correct");

        return;
      }
      embeddedQ.push(e);
      // console.log("thier place", embeddedQ);
      return e;
    };
    return { call, embeddedQ };
  } catch (err) {
    console.log(err);
  }
};

const useEmbedder = async (text: string) => {
  if (extractor == null) {
    toast.error(
      "Downloading Embedding Model, this shouldn't take long"
    );
    return;
  }

  let res: Tensor = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return res;
};

export const useInitTransformers = () => {
  const { pipelineInit, setPipelineInit } = useContext(AuthContext);
  const init = async () => {
    // @ts-ignore
    env.allowLocalModels = false;
    //only run if pipeline hasn't been initialized
    if (!pipelineInit) {
      extractor = await pipeline(
        "feature-extraction"
        // "Xenova/all-mpnet-base-v2"
      );
      if (typeof extractor != "function") {
        toast.error(
          "Initialization of Encoder Model not complete, please don't train/test bot yet"
        );
        console.log("typeof", extractor, typeof extractor);
        return;
      } else {
        toast.success("Model Initialization Complete");
        setPipelineInit(true);
      }
    }
  };
  return { init };
};
