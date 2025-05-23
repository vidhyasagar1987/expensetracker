import React, { useState } from "react";
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
import { toast } from "react-toastify";

const Navigation = ({ onItemClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) return; 
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      await dispatch(removeAuth());
      await dispatch(removeUser());
      await dispatch(resetExpenses());
      await dispatch(resetincome());
      navigate("/");
      // setTimeout(() => {
      //   navigate("/");
      // }, 100);
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }finally {
      setIsLoggingOut(false); 
    }
  };

  return (
    <nav className="navigation-menu">
      <ul>
        <li>
          <Link to="/dashboard" onClick={onItemClick}>
            <FaHome className="menu-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expenses" onClick={onItemClick}>
            <FaListAlt className="menu-icon" /> Expenses
          </Link>
        </li>
        <li>
          <Link to="/income" onClick={onItemClick}>
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
