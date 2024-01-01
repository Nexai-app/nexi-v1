import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EnquiryT } from "../types";

// Define the initial state using that type
const initialState: EnquiryT[] = [];

export const EnquiresSlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    addEnquiry: (state, { payload }: PayloadAction<EnquiryT>) => {
      state.push(payload);
    },
    clearEnqury: () => {
      return initialState;
    },
  },
});

export const { addEnquiry, clearEnqury } = EnquiresSlice.actions;

export default EnquiresSlice.reducer;
