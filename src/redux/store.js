import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/loginslice";
import authReducer from "../redux/slices/authSlice";
import expenseReducer from "../redux/slices/expensesSlice";

const store = configureStore({
  reducer: { login: loginReducer, auth: authReducer, expenses: expenseReducer },
});

export default store;
