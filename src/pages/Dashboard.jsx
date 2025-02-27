import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { data, expenseError, expenseLoading } = useSelector(
    (state) => state.expenses
  );

  const { incomeData, incomeError, incomeLoading } = useSelector(
    (state) => state.income
  );

  const renderTotalExpenses = () => {
    if (data?.length) {
      const total = data
      .filter((item) => item.expenseCategory !== "Savings").reduce(
        (sum, item) => sum + (item.expenseAmount || 0),
        0
      );
      return total.toFixed(2);
    }
    return 0;
  };

  const renderTotalSavings = () => {
    if (data?.length) {
      const total = data
        .filter((item) => item.expenseCategory === "Savings")
        .reduce((sum, item) => sum + (item.expenseAmount || 0), 0);
      return total.toFixed(2);
    }
    return 0;
  };

  const renderTotalIncome = () => {
    if (incomeData?.length) {
      const total = incomeData.reduce(
        (sum, item) => sum + (item.incomeAmt || 0),
        0
      );
      return total.toFixed(2);
    }
    return 0;
  };

  const renderBalance = () => {
    const totalIncome = parseFloat(renderTotalIncome());
    const totalExpenses = parseFloat(renderTotalExpenses());
    const balance = totalIncome - totalExpenses;
    return balance.toFixed(2);
  };

  return (
    <div>
      Dashboard
      {expenseLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Total Expenses : ₹ {renderTotalExpenses()}</p>
      )}
      {incomeLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Total Income : ₹ {renderTotalIncome()}</p>
      )}
      {<p>Total Balance : ₹ {renderBalance()}</p>}
      {expenseLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Total Savings : ₹ {renderTotalSavings()}</p>
      )}
    </div>
  );
};

export default Dashboard;
