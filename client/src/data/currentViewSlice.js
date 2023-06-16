import { createSlice } from "@reduxjs/toolkit";

export const currentViewSlice = createSlice({
  name: "currentView",
  initialState: {
    value: "Feed",
  },
  reducers: {
    changeView: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeView } = currentViewSlice.actions;

export const selectCurrentView = (state) => state.currentView.value;

export default currentViewSlice.reducer;
