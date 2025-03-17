import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { getAuthDetails } from "../redux/slices/authSlice.js";
import { getExpenses, setOpenModal } from "../redux/slices/expensesSlice.js";
import { getincome } from "../redux/slices/incomeSlice.js";
import "../css/layout.css";
import { PiHandWavingBold } from "react-icons/pi";
import { addExpense, logo } from "../utils/constants.jsx";
import AddExpense from "../components/AddExpense.jsx";
import GlobalButton from "../components/GlobalButton.jsx";
import { AddIcon } from "../utils/icons.jsx";
import Spinner from "../components/Spinner.jsx";
import { toast } from "react-toastify";

const Wrapper = ({ children }) => {
  const { user, isAuthenticated, authlLoading, authError } = useSelector(
    (state) => state.auth
  );

  const { openModal } = useSelector((state) => state.expenses);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (isAuthenticated) {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      dispatch(getExpenses({ month, year }));
      dispatch(getincome({ month, year }));
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getAuthDetails());
  }, [dispatch]);

  if (authlLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const userName = user?.email?.split("@")[0];

  return (
    <main className="main-bg">
      <header>
        <button
          className="hamburger-icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          &#9776;
        </button>
        <div className="logo">{logo}</div>
        <div className="helloText">
          <PiHandWavingBold
            style={{ color: "#7C52F4", fontSize: "2rem", paddingRight: "5px" }}
          />
          {user ? <p>Hello, {userName} </p> : <p>Not Found</p>}
        </div>

        <GlobalButton
          onClick={() => dispatch(setOpenModal(true))}
          buttonType="primary"
          icon={AddIcon}
        >
          {addExpense}
        </GlobalButton>
      </header>

      <aside className={`navigation ${isMobileMenuOpen ? "open" : ""}`}>
        <Navigation />
      </aside>

      {openModal && <AddExpense />}

      <div className={`content ${isMobileMenuOpen ? "shifted" : ""}`}>
        <div className="helloTextMobile">
          <PiHandWavingBold
            style={{
              color: "#7C52F4",
              fontSize: "1.5rem",
              paddingRight: "5px",
            }}
          />
          {user ? <p>Hello, {userName} </p> : <p>Not Found</p>}
        </div>
        <div className="dashboard-container"> {children || <Outlet />}</div>
      </div>
    </main>
  );
};

export default Wrapper;
