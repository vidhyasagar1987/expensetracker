import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddIncome from "../components/AddIncome";

const Income = () => {
  const { incomeData, incomeError, incomeLoading } = useSelector(
    (state) => state.income
  );
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Add a Expense</button>
      {openModal && <AddIncome setOpenModal={setOpenModal} />}
      {incomeLoading ? (
        <p>Loading...</p>
      ) : (
        incomeData?.map((item) => <p key={item.id}> {item.incomeAmt}</p>)
      )}
    </div>
  );
};

export default Income;
