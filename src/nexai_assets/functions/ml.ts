import { useState } from "react";
import { pipeline, Tensor, Pipeline } from "@xenova/transformers";
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
  return { init };
};
