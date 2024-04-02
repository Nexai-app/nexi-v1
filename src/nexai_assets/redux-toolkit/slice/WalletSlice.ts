import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WalletT } from "../types";

// Define the initial state using that type
const initialState: WalletT = {
  icpBalance: 0,
  accountIdentifier: "",
};

export const WalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addICPBalance: (state, { payload }: PayloadAction<number>) => {
      state.icpBalance = payload;
    },
    addAccIdentifier: (state, { payload }: PayloadAction<string>) => {
      state.accountIdentifier = payload;
    },

    clearWallet: () => {
      return initialState;
    },
  },
});

export const { addAccIdentifier, addICPBalance, clearWallet } =
  WalletSlice.actions;

export default WalletSlice.reducer;
