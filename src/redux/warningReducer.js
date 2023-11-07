import { createSlice } from "@reduxjs/toolkit";

const warningSlice = createSlice({
  name: "warningbar",
  initialState: {
    toggle: false,
    warning: "",
  },
  reducers: {
    toggleWarningBar: (state, action) => {
      state.toggle = !state.toggle;
      state.warning = action.payload;
    },
  },
});

export const { toggleWarningBar } = warningSlice.actions;

export default warningSlice.reducer;
