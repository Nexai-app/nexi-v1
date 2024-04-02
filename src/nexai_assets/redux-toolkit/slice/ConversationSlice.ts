import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ConversationT } from "../types";

// Define the initial state using that type
const initialState: ConversationT[] = [];

export const ConversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConvo: (state, { payload }: PayloadAction<ConversationT>) => {
      state.push(payload);
    },
    clearConvo: () => {
      return initialState;
    },
  },
});

export const { addConvo, clearConvo } = ConversationSlice.actions;

export default ConversationSlice.reducer;
