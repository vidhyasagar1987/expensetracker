import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";
import { month, year } from "../../utils/cuurentDate";


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

export const getIncomeById = createAsyncThunk(
  "getIncomeById",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Income")
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

export const updateIncome = createAsyncThunk(
  "updateIncome",
  async ({ payload, recordId }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("Income")
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

export const deleteIncome = createAsyncThunk(
  "deleteIncome",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { error } = await supabase
        .from("Income")
        .delete()
        .eq("id", payload);

      if (error) {
        return rejectWithValue(error.message);
      }

      await dispatch(getincome({ month, year }));
      return { success: true };
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
    openModal: false,
    editMode: false,
    recordId: null,
    editData: {},
    getIncomeByIdLoading: false,
    getIncomeByIdError: null,
    updateIncomeLoading: false,
    updateIncomeError: null,
    deleteModal: false,
    deleteIncomeLoading: false,
    deleteIncomeError: null,
  },
  reducers: {
    resetincome: (state) => {
      state.incomeData = [];
    },
    setIncomeOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
    setIncomeEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setIncomeRecordId: (state, action) => {
      state.recordId = action.payload;
    },
    setIncomeDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
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
        state.addIncomeLoading = false;
        state.addIncomeError = null;
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.addIncomeLoading = false;
        state.addIncomeError = action.payload;
      })
      .addCase(updateIncome.pending, (state) => {
        state.updateIncomeLoading = true;
        state.updateIncomeError = null;
      })
      .addCase(updateIncome.fulfilled, (state) => {
        state.updateIncomeLoading = false;
        state.updateIncomeError = null;
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.updateIncomeLoading = false;
        state.updateIncomeError = action.payload;
      })
      .addCase(getIncomeById.pending, (state) => {
        state.getIncomeByIdLoading = true;
        state.getIncomeByIdError = null;
        state.editData = {};
      })
      .addCase(getIncomeById.fulfilled, (state, action) => {
        state.getIncomeByIdLoading = false;
        state.getIncomeByIdError = null;
        state.editData = action.payload;
      })
      .addCase(getIncomeById.rejected, (state, action) => {
        state.getIncomeByIdLoading = false;
        state.getIncomeByIdError = action.payload;
      })
      .addCase(deleteIncome.pending, (state) => {
        state.deleteIncomeLoading = true;
        state.deleteIncomeError = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.deleteIncomeLoading = false;
        state.deleteIncomeError = null;
        state.deleteModal = false;
        state.recordId = null;
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.deleteIncomeLoading = false;
        state.deleteIncomeError = action.payload;
      });
  },
});

export const {
  resetincome,
  setIncomeOpenModal,
  setIncomeDeleteModal,
  setIncomeEditMode,
  setIncomeRecordId,
} = incomeSlice.actions;

export default incomeSlice.reducer;
