import { useState } from "react";
import { pipeline, Tensor, Pipeline } from "@xenova/transformers";
import "./settings";
import toast from "react-hot-toast";

// Disable the loading of remote models from the Hugging Face Hub:

let extractor: null | Pipeline = null;

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

      if (embedded.length != 768) {
        console.log("Embedding size not correct");
        setLoading(false);
        return;
      }
      embeddedText.push(embedded);
      answer_arr.push(question + "\n" + answer);
      setLoading(false);
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
        return;
      }
      const e = embedding.tolist()[0];
      if (e.length != 768) {
        console.log("Embedding size not correct");
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
    toast.error("Error Embedding Text");
    return;
  }

  let res: Tensor = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return res;
};

export const useInitTransformers = () => {
  const init = async () => {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-mpnet-base-v2"
    );
    console.log(extractor);
    console.log("also");
  };
  return { init };
};
