import React, { useEffect } from "react";
import { getExpenses } from "../redux/slices/expensesSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
 

  const { data, expenseError } = useSelector((state) => state.expenses);

  const renderTotalExpenses = () => {
    if (data?.length) {
      const total = data.reduce((sum, item) => sum + (item.expenseAmount || 0), 0);
      return total.toFixed(2);
    }
    return 0;
  };

  return (
    <div>
      Dashboard
      {expenseError ? (
        <p>Loading...</p>
      ) : (
        <p>Total Expenses : ₹ {renderTotalExpenses()}</p>
      )}
    </div>
  );
};

export default Dashboard;
