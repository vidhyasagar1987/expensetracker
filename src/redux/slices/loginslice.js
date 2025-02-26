import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";

export const getLoginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    loginLoading: false,
    loginError: null,
    isLoggedin: false,
  },
  reducers: {
    addUser: (state, action) => {
      const { payload } = action;
      state.email = payload.email;
      state.password = payload.password;
    },
    removeUser: (state) => {
      state.email = "";
      state.password = "";
      state.loginLoading = false;
      state.loginError = null;
      state.isLoggedin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUser.pending, (state) => {
        state.loginLoading = true;
        state.isLoggedin = false;
        state.loginError = null;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.isLoggedin = !!action.payload;
        state.loginError = null;
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLoggedin = false;
        state.loginError = action.payload;
      });
  },
});

export const { addUser, removeUser } = loginSlice.actions;

export default loginSlice.reducer;
