import { configureStore } from "@reduxjs/toolkit";
import Profile from "./slice/ProfileSlice";
import llm from "./slice/llmSlice";
import Enquiry from "./slice/EnquirySlice";

export const store = configureStore({
  reducer: {
    profile: Profile,
    llm,
    enquiry: Enquiry,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
