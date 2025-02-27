import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { getAuthDetails } from "../redux/slices/authSlice.js";
import { getExpenses } from "../redux/slices/expensesSlice.js";
import { getincome } from "../redux/slices/incomeSlice.js";
import "../css/layout.css";
import { PiHandWavingBold } from "react-icons/pi";
import { logo } from "../utils/constants.jsx";
import AddExpense from "../components/AddExpense.jsx";

const Wrapper = ({ children }) => {
  const { user, isAuthenticated, authlLoading, authError } = useSelector(
    (state) => state.auth
  );

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getExpenses());
      dispatch(getincome());
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

  const userName = user?.email?.split("@")[0];

  return (
    <main className="main-bg">
      <header>
        <div className="logo">{logo}</div>
        <div className="helloText">
          <PiHandWavingBold
            style={{ color: "#7C52F4", fontSize: "2rem", paddingRight: "5px" }}
          />
          {user ? <p>Hello, {userName} </p> : <p>Not Found</p>}
        </div>
        <button className="button" onClick={() => setOpenModal(true)}>
          Add a Expense
        </button>
      </header>
      {openModal && <AddExpense setOpenModal={setOpenModal} />}

      <Navigation />
      <div className="helloTextMobile">
        <PiHandWavingBold
          style={{ color: "#7C52F4", fontSize: "1.5rem", paddingRight: "5px" }}
        />
        {user ? <p>Hello, {userName} </p> : <p>Not Found</p>}
      </div>
      {children || <Outlet />}
    </main>
  );
};

export default Wrapper;
