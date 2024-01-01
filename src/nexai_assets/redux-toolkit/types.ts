import { Principal } from "@dfinity/principal";

export type ProfileT = {
  vdbId: number | undefined;
  email: string;
  name: string;
  description: string;
  qA?: QuestionAnswerT[];
  principal?: string;
};

export type QuestionAnswerT = {
  id: number;
  qa: string;
};

export type EnquiryT = {
  id: number;
  account1: string;
  account2: string;
  createdAt: number;
};
