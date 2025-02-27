import React, { useState } from "react";
import { useSelector } from "react-redux";

const Expenses = () => {
  const { data, expenseError, expenseLoading } = useSelector(
    (state) => state.expenses
  );
  return (
    <div>
      {expenseLoading ? (
        <p>Loading...</p>
      ) : (
        data?.map((item) => <p key={item.id}> {item.expenseAmount}</p>)
      )}
    </div>
  );
};

export default Expenses;
