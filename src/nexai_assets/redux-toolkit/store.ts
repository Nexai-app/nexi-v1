import { configureStore } from "@reduxjs/toolkit";
import Profile from "./slice/ProfileSlice";

export const store = configureStore({
  reducer: {
    profile: Profile,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
