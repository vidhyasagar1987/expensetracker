import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";

export const getAuthDetails = createAsyncThunk(
  "auth",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }
      return session;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    authlLoading: true,
    authError: null,
  },
  reducers: {
    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authlLoading = true;
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthDetails.pending, (state) => {
        state.authlLoading = true;
        state.user = null;
        state.authError = null;
      })
      .addCase(getAuthDetails.fulfilled, (state, action) => {
        const { payload } = action;

        state.authlLoading = false;
        state.isAuthenticated = !!payload;
        state.user = payload?.user;
        state.authError = null;
      })
      .addCase(getAuthDetails.rejected, (state, action) => {
        state.authlLoading = false;
        state.isAuthenticated = false;
        state.authError = action.payload;
        state.user = null;
      });
  },
});

export const { removeAuth } = authSlice.actions;

export default authSlice.reducer;
