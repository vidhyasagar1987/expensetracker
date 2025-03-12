import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartLine, FaHome, FaListAlt, FaSignOutAlt } from "react-icons/fa";

import supabase from "../supabase/client";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/slices/authSlice";
import { removeUser } from "../redux/slices/loginslice";
import { resetExpenses } from "../redux/slices/expensesSlice";
import { resetincome } from "../redux/slices/incomeSlice";
import "../css/layout.css";
import GlobalButton from "./GlobalButton";
import { LoginOut } from "../utils/icons";

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
        dispatch(resetincome());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="navigation-menu">
      <ul>
        <li>
          <Link to="/dashboard">
            <FaHome className="menu-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expenses">
            <FaListAlt className="menu-icon" /> Expenses
          </Link>
        </li>
        <li>
          <Link to="/income">
            <FaChartLine className="menu-icon" /> Income
          </Link>
        </li>
        <li>
          <GlobalButton
            onClick={() => {
              logout();
            }}
            buttonType="primary"
            icon={LoginOut}
          >
            Sign Out
          </GlobalButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
