import React from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/slices/authSlice";
import { removeUser } from "../redux/slices/loginslice";
import { resetExpenses } from "../redux/slices/expensesSlice";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        navigate("/");
        dispatch(removeAuth());
        dispatch(removeUser());
        dispatch(resetExpenses());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <button onClick={logout}>SignOut</button>
    </div>
  );
};

export default Navigation;
