import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginThunk = createAsyncThunk("auth/loginThunk", async () => {
  const response = await axios.post("");
  return response?.data;
});

const registerThunk = createAsyncThunk("auth/registerThunk", async () => {
  const response = await axios.post("");
  return response?.data;
});

const initialState = {
  loginisLoading: false,
  logindata: [],
  loginiserror: "",
  registerisLoading: false,
  registerData: [],
  registerError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // post login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginisLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loginisLoading = false;
        state.logindata = action?.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.iserror = action.error.message;
      });

    // post registration
    builder
      .addCase(registerThunk.pending, (state) => {
        state.registerisLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.registerisLoading = false;
        state.registerData = action?.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.registerError = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const authSelector = (state) => state.auth;
