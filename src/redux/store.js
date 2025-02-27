import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/loginslice";
import authReducer from "../redux/slices/authSlice";
import expenseReducer from "../redux/slices/expensesSlice";
import incomeReducer from "../redux/slices/incomeSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
    expenses: expenseReducer,
    income: incomeReducer,
  },
});

export default store;
