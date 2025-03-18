import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaMoneyBillWave,
  FaPiggyBank,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";
import "../css/layout.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "react-toastify";
import { formatAmount } from "../utils/formatAmount";
import Spinner from "../components/Spinner";
import { currentDateDayJs } from "../utils/cuurentDate";

const Dashboard = () => {
  const { data, expenseError, expenseLoading } = useSelector(
    (state) => state.expenses
  );

  const { incomeData, incomeError, incomeLoading } = useSelector(
    (state) => state.income
  );

  useEffect(() => {
    if (expenseError) {
      toast.error(expenseError);
    }
  }, [expenseError]);

  useEffect(() => {
    if (incomeError) {
      toast.error(incomeError);
    }
  }, [incomeError]);

  const renderTotalExpenses = () => {
    if (data?.length) {
      const total = data
        .filter((item) => item.expenseCategory !== "Savings")
        .reduce((sum, item) => sum + (item.expenseAmount || 0), 0);
      return formatAmount(total);
    }
    return formatAmount(0);
  };

  const renderTotalSavings = () => {
    if (data?.length) {
      const total = data
        .filter((item) => item.expenseCategory === "Savings")
        .reduce((sum, item) => sum + (item.expenseAmount || 0), 0);
      return formatAmount(total);
    }
    return formatAmount(0);
  };

  const renderTotalIncome = () => {
    if (incomeData?.length) {
      const total = incomeData.reduce(
        (sum, item) => sum + (item.incomeAmt || 0),
        0
      );
      return formatAmount(total);
    }
    return formatAmount(0);
  };

  const renderBalance = () => {
    const totalIncome = parseFloat(renderTotalIncome().replace(/,/g, ""));
    const totalExpenses = parseFloat(renderTotalExpenses().replace(/,/g, ""));
    const totalSavings = parseFloat(renderTotalSavings().replace(/,/g, ""));

    const overAllExpenses = totalExpenses + totalSavings;
    const balance = totalIncome - overAllExpenses;
    return formatAmount(balance);
  };

  const boxStyles = {
    balance: { bgColor: "#E3F2FD", iconColor: "#2196F3" },
    expenses: { bgColor: "#FFEBEE", iconColor: "#F44336" },
    income: { bgColor: "#E8F5E9", iconColor: "#4CAF50" },
    savings: { bgColor: "#FFF3E0", iconColor: "#FF9800" },
  };

  const recentTransactions = data?.length ? data?.slice(0, 5) : [];

  const pieChartData = data?.reduce((acc, item) => {
    const category = item.expenseCategory || "Other";
    acc[category] = (acc[category] || 0) + (item.expenseAmount || 0);
    return acc;
  }, {});

  const pieData = Object.entries(pieChartData || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const barData = data?.filter(
    (item) => new Date(item.expenseDate).getMonth() === new Date().getMonth()
  );

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  const [chartWidth, setChartWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? 300 : 500);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(chartWidth);

  return (
    <div>
      {expenseLoading || incomeLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="dashboard-header">
            <h3>Dashboard</h3>
            <p> Overview for {currentDateDayJs}</p>
          </div>
          <div className="dashboard-summary">
            <div
              className="summary-box"
              style={{ backgroundColor: boxStyles.income.bgColor }}
            >
              <FaChartLine
                className="summary-icon"
                style={{ color: boxStyles.income.iconColor }}
              />
              <div>
                <h3>Total Income</h3>
                <p>₹ {renderTotalIncome()}</p>
              </div>
            </div>

            <div
              className="summary-box"
              style={{ backgroundColor: boxStyles.expenses.bgColor }}
            >
              <FaMoneyBillWave
                className="summary-icon"
                style={{ color: boxStyles.expenses.iconColor }}
              />
              <div>
                <h3>Total Expenses</h3>
                <p>₹ {renderTotalExpenses()}</p>
              </div>
            </div>

            <div
              className="summary-box"
              style={{ backgroundColor: boxStyles.savings.bgColor }}
            >
              <FaPiggyBank
                className="summary-icon"
                style={{ color: boxStyles.savings.iconColor }}
              />
              <div>
                <h3>Total Savings</h3>
                <p>₹ {renderTotalSavings()}</p>
              </div>
            </div>
            <div
              className="summary-box"
              style={{ backgroundColor: boxStyles.balance.bgColor }}
            >
              <FaWallet
                className="summary-icon"
                style={{ color: boxStyles.balance.iconColor }}
              />
              <div>
                <h3>Total Balance</h3>
                <p>₹ {renderBalance()}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-details">
            <div className="transactions-section">
              <h3>Recent Transactions</h3>
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td data-label="Date">{transaction.expenseDate}</td>
                      <td data-label="Category">
                        {transaction.expenseCategory}
                      </td>
                      <td data-label="Amount">
                        ₹ {formatAmount(transaction.expenseAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="chart-section">
              <div>
                <h3>Expenses by Category</h3>

                <PieChart width={chartWidth} height={300}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, value }) =>
                      `₹${formatAmount(value)}`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${formatAmount(value)}`} />
                </PieChart>
              </div>
            </div>
          </div>

          <div className="monthly-expenses">
            <h3>Current Month Expenses</h3>
            <BarChart
              width={600}
              height={300}
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="expenseDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expenseAmount" fill="#8884d8" />
            </BarChart>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
