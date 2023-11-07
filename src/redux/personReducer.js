import { createSlice } from "@reduxjs/toolkit";

const sideSlice = createSlice({
  name: "personbar",
  initialState: {
    toggle: false,
  },
  reducers: {
    togglePersonBar: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { togglePersonBar } = sideSlice.actions;

export default sideSlice.reducer;
