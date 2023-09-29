import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


// Define the initial state using that type
const initialState: string = "";

export const llmSlice = createSlice({
  name: "llm",
  initialState,
  reducers: {
    addReply: (state, { payload }: PayloadAction<string>) => {
          state = payload
          return state
      },
        removeReply: (state, { payload }: PayloadAction<string>) => {
            state = "";
              return state
    },
  },
});

export const { addReply, removeReply } = llmSlice.actions;


export default llmSlice.reducer;
