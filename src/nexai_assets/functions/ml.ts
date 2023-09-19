import { pipeline, Tensor, Pipeline } from "@xenova/transformers";
import { useState } from "react";
let extractor: null | Pipeline = null;

export const useEmbeddQuestion = async () => {
  let embeddedText = [];
  let answer_arr = [];
  const [loading, setLoading] = useState(false);

  const embedd = async (question: string, answer: string) => {
    let embedding = await useEmbedder(question);
    if (embedding == null) return;
    setLoading(true);

    let embedded = embedding.tolist()[0];

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
};

const useEmbedder = async (text: string) => {
  if (extractor == null) return;

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
  };
  return init;
};
