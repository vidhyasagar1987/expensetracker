import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";

export const getExpenses = createAsyncThunk(
  "getExpenses",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const userId = auth.user?.id;

      if (!userId) {
        return rejectWithValue("User not authenticated");
      }

      const { data: Expenses, error } = await supabase
        .from("Expenses")
        .select("*")
        .eq("createdBy", userId);

      if (error) {
        return rejectWithValue(error.message);
      }

      return Expenses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addExpense = createAsyncThunk(
  "addExpense",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Expenses")
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

const expensesSlice = createSlice({
  name: "expense",
  initialState: {
    data: [],
    expenseLoading: false,
    expenseError: null,
    addExpenseLoading: false,
    addExpenseError: null,
  },
  reducers: {
    resetExpenses: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.expenseLoading = true;
        state.data = [];
        state.expenseError = null;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.expenseLoading = false;
        state.data = action.payload;
        state.expenseError = null;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.expenseLoading = false;
        state.data = [];
        state.expenseError = action.payload;
      })
      .addCase(addExpense.pending, (state) => {
        state.addExpenseLoading = true;
        state.addExpenseError = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        console.log(action);
        state.addExpenseLoading = false;
        state.addExpenseError = null;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.addExpenseLoading = false;
        state.addExpenseError = action.payload;
      });
  },
});

export const { resetExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
