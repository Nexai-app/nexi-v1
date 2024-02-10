import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WalletT } from "../types";

// Define the initial state using that type
const initialState: WalletT = null;

export const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addEnquiry: (state, { payload }: PayloadAction<WalletT>) => {
      // state.push(payload);
    },
    clearEnqury: () => {
      return initialState;
    },
  },
});

export const { addEnquiry, clearEnqury } = WalletSlice.actions;

export default WalletSlice.reducer;
