import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProfileT } from "../types";

// Define the initial state using that type
const initialState: ProfileT = {
  vdbId: null,
  email: "",
  name: "",
  description: "",
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
  },
});

export const { addProfile } = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default profileSlice.reducer;
