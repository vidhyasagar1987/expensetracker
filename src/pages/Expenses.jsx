import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddExpense from "../components/AddExpense";

const Expenses = () => {
  const { data, expenseError, expenseLoading } = useSelector(
    (state) => state.expenses
  );
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Add a Expense</button>
      {openModal && <AddExpense setOpenModal={setOpenModal}/>}
      {expenseLoading ? (
        <p>Loading...</p>
      ) : (
        data?.map((item) => <p key={item.id}> {item.expenseAmount}</p>)
      )}
    </div>
  );
};

export default Expenses;
