import { Principal } from "@dfinity/principal";

export type ProfileT = {
  vdbId: number | undefined;
  email: string;
  name: string;
  description: string;
  qA?: QuestionAnswerT[];
  principal?: string;
  premium: boolean;
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
  completed: boolean;
};

export type ConversationT = {
  id: number;
  connectionId: number;
  sender: string;
  body: string;
  createdAt: number;
};

export type WalletT = {
  icpBalance: number;
  accountIdentifier: string;
};

export type TransactionT = {
  id: number;
  createdAt: number;
  amount: number;
  fee: number;
  to: string;
};
