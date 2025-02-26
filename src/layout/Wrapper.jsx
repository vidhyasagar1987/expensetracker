import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { getAuthDetails } from "../redux/slices/authSlice.js";
import { getExpenses } from "../redux/slices/expensesSlice.js";

const Wrapper = ({ children }) => {
  const { user, isAuthenticated, authlLoading, authError } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getExpenses());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getAuthDetails());
  }, [dispatch]);

  if (authlLoading) {
    return <div>"Loading..."</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navigation />
      {user && <p>{user.email} </p>}
      {children || <Outlet />}
    </div>
  );
};

export default Wrapper;
