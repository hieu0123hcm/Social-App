import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/user.model";
import { RootState } from "../store";
import { AxiosError, AxiosResponse } from "axios";
import { APIResponse } from "../../model/response.model";
import AuthService from "../../services/auth.service";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  authError: boolean;
  authLoading: {
    login: boolean;
  };
  message: string | undefined;
}

const initialState: AuthState = {
  user: null,
  token: null,
  authError: false,
  authLoading: {
    login: false,
  },
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (value: { username: string; password: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<
        APIResponse<{ user: User; token: string }>
      > = await AuthService.login(value);
      const { data, success, message } = response.data;
      return { data, success, message };
    } catch (error) {
      const formattedError = error as AxiosError;
      return thunkAPI.rejectWithValue(formattedError.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authLoading.login = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authLoading.login = false;
        if (action.payload.success) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          Cookies.set("token", state.token as string);
          Cookies.set("user", JSON.stringify(state.user));
        } else {
          state.authError = true;
          state.message = action.payload.message;
        }
      })
      .addCase(login.rejected, (state) => {
        state.authLoading.login = false;
        state.authError = true;
        state.user = null;
        state.token = null;
      });
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
