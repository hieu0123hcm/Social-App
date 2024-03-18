import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux-store/store";

interface systemState {
  error: string | undefined;
}

const initialState: systemState = {
  error: undefined,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setSystemError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setSystemError } = systemSlice.actions;

export const selectSystem = (state: RootState) => state.system.error;

export default systemSlice.reducer;
