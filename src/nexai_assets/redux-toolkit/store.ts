import { configureStore } from "@reduxjs/toolkit";
import Profile from "./slice/ProfileSlice";
import llm from "./slice/llmSlice";
import Enquiry from "./slice/EnquirySlice";
import Convo from "./slice/ConversationSlice";
import Wallet from "./slice/WalletSlice";
import Transctions from "./slice/TransactionSlice";

export const store = configureStore({
  reducer: {
    profile: Profile,
    llm,
    enquiry: Enquiry,
    conversation: Convo,
    wallet: Wallet,
    transactions: Transctions,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
