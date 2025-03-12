import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";

export const getincome = createAsyncThunk(
  "getincome",
  async ({ month, year }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.id;

      if (!userId) {
        return rejectWithValue("User not authenticated");
      }
      const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
      const endDate = `${year}-${String(month).padStart(2, "0")}-${new Date(
        year,
        month,
        0
      ).getDate()}`;
      const { data: Income, error } = await supabase
        .from("Income")
        .select("*")
        .eq("createdBy", userId)
        .gte("incomeDate", startDate)
        .lte("incomeDate", endDate);

      if (error) {
        return rejectWithValue(error.message);
      }

      return Income;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addIncome = createAsyncThunk(
  "addIncome",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Income")
        .insert([payload])
        .select();
      if (error) {
        return rejectWithValue(error.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomeData: [],
    incomeLoading: false,
    incomeError: null,
    addIncomeLoading: false,
    addIncomeError: null,
  },
  reducers: {
    resetincome: (state) => {
      state.incomeData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getincome.pending, (state) => {
        state.incomeLoading = true;
        state.incomeData = [];
        state.incomeError = null;
      })
      .addCase(getincome.fulfilled, (state, action) => {
        state.incomeLoading = false;
        state.incomeData = action.payload;
        state.incomeError = null;
      })
      .addCase(getincome.rejected, (state, action) => {
        state.incomeLoading = false;
        state.incomeData = [];
        state.incomeError = action.payload;
      })
      .addCase(addIncome.pending, (state) => {
        state.addIncomeLoading = true;
        state.addIncomeError = null;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        console.log(action);
        state.addIncomeLoading = false;
        state.addIncomeError = null;
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.addIncomeLoading = false;
        state.addIncomeError = action.payload;
      });
  },
});

export const { resetincome } = incomeSlice.actions;

export default incomeSlice.reducer;
