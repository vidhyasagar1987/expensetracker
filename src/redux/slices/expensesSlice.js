import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";
import { month, year } from "../../utils/cuurentDate";

export const getExpenseById = createAsyncThunk(
  "getExpenseById",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Expenses")
        .select("*")
        .eq("id", payload);
      if (error) {
        return rejectWithValue(error.message);
      }
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getExpenses = createAsyncThunk(
  "getExpenses",
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

      const { data: Expenses, error } = await supabase
        .from("Expenses")
        .select("*")
        .eq("createdBy", userId)
        .gte("expenseDate", startDate)
        .lte("expenseDate", endDate);

      if (error) {
        return rejectWithValue(error.message);
      }

      return Expenses?.sort((a, b) => b.id - a.id);
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

export const updateExpense = createAsyncThunk(
  "updateExpense",
  async ({ payload, recordId }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Expenses")
        .update([payload])
        .eq("id", recordId)
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

export const deleteExpense = createAsyncThunk(
  "deleteExpense",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { error } = await supabase
        .from("Expenses")
        .delete()
        .eq("id", payload);

      if (error) {
        return rejectWithValue(error.message);
      }

      await dispatch(getExpenses({ month, year }));
      return { success: true };
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
    openModal: false,
    editMode: false,
    recordId: null,
    editData: {},
    getExpenseByIdLoading: false,
    getExpenseByIdError: null,
    updateExpenseLoading: false,
    updateExpenseError: null,
    deleteModal: false,
    deleteExpenseLoading: false,
    deleteExpenseError: null,
  },
  reducers: {
    resetExpenses: (state) => {
      state.data = [];
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
      state.editData = {};
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setRecordId: (state, action) => {
      state.recordId = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
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
      .addCase(addExpense.fulfilled, (state) => {
        state.addExpenseLoading = false;
        state.addExpenseError = null;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.addExpenseLoading = false;
        state.addExpenseError = action.payload;
      })
      .addCase(updateExpense.pending, (state) => {
        state.updateExpenseLoading = true;
        state.updateExpenseError = null;
      })
      .addCase(updateExpense.fulfilled, (state) => {
        state.updateExpenseLoading = false;
        state.updateExpenseError = null;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.updateExpenseLoading = false;
        state.updateExpenseError = action.payload;
      })
      .addCase(getExpenseById.pending, (state) => {
        state.getExpenseByIdLoading = true;
        state.getExpenseByIdError = null;
        state.editData = {};
      })
      .addCase(getExpenseById.fulfilled, (state, action) => {
        state.getExpenseByIdLoading = false;
        state.getExpenseByIdError = null;
        state.editData = action.payload;
      })
      .addCase(getExpenseById.rejected, (state, action) => {
        state.getExpenseByIdLoading = false;
        state.getExpenseByIdError = action.payload;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.deleteExpenseLoading = true;
        state.deleteExpenseError = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.deleteExpenseLoading = false;
        state.deleteExpenseError = null;
        state.deleteModal = false;
        state.recordId = null;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.deleteExpenseLoading = false;
        state.deleteExpenseError = action.payload;
      });
  },
});

export const {
  resetExpenses,
  setOpenModal,
  setDeleteModal,
  setEditMode,
  setRecordId,
} = expensesSlice.actions;

export default expensesSlice.reducer;
