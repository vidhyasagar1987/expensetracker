import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIncome from "../components/AddIncome";
import { setOpenModal } from "../redux/slices/expensesSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { formatAmount } from "../utils/formatAmount";
import GlobalButton from "../components/GlobalButton";
import { addIncome } from "../utils/constants";
import { AddIcon } from "../utils/icons";
import { currentDateDayJs } from "../utils/cuurentDate";
import { setIncomeOpenModal } from "../redux/slices/incomeSlice";

const Income = () => {
  const { incomeData, incomeError, incomeLoading, openModal } = useSelector(
    (state) => state.income
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (incomeError) {
      toast.error(incomeError);
    }
  }, [incomeError]);

  return (
    <>
      <div style={{marginBottom: "20px"}}>
        <GlobalButton
          onClick={() => dispatch(setIncomeOpenModal(true))}
          buttonType="primary"
          icon={AddIcon}
        >
          {addIncome}
        </GlobalButton>
      </div>
      {openModal && <AddIncome />}

      {incomeLoading ? (
        <Spinner />
      ) : (
        <div className="transactions-section">
          <h3>All Income for {currentDateDayJs}</h3>
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {incomeData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td data-label="Date">{transaction.incomeDate}</td>
                    <td data-label="Source">{transaction.incomeSouce}</td>
                    <td data-label="Amount">
                      ₹ {formatAmount(transaction.incomeAmt)}
                    </td>
                    <td data-label="Action">
                      <button
                        onClick={() => {
                          // dispatch(setOpenModal(true));
                          // dispatch(setEditMode(true));
                          // dispatch(setRecordId(transaction.id));
                        }}
                      >
                        edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Income;
