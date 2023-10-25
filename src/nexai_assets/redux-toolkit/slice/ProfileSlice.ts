import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProfileT , QuestionAnswerT } from "../types";



// Define the initial state using that type
const initialState: ProfileT = {
  vdbId: null,
  email: "",
  name: "",
  description: "",
  qA:[]
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, { payload }: PayloadAction<ProfileT>) => {
      state.vdbId = payload.vdbId;
      state.email = payload.email;
      state.name = payload.name;
      state.description = payload.description;
    },
    addQAPair: (state, { payload }: PayloadAction<QuestionAnswerT>) => {
      state.qA.push(payload);
    }
  },
});

export const { addProfile, addQAPair } = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default profileSlice.reducer;
