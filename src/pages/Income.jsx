import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIncome from "../components/AddIncome";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { formatAmount } from "../utils/formatAmount";
import GlobalButton from "../components/GlobalButton";
import { addIncome } from "../utils/constants";
import { AddIcon, DeleteIcon, EditIcon } from "../utils/icons";
import { currentDateDayJs } from "../utils/cuurentDate";
import {
  deleteIncome,
  setIncomeDeleteModal,
  setIncomeEditMode,
  setIncomeOpenModal,
  setIncomeRecordId,
} from "../redux/slices/incomeSlice";
import IconButton from "../components/IconButton";
import NewModal from "../components/NewModal";

const Income = () => {
  const {
    incomeData,
    incomeError,
    incomeLoading,
    openModal,
    deleteModal,
    deleteIncomeLoading,
    deleteIncomeError,
    recordId,
  } = useSelector((state) => state.income);

  const dispatch = useDispatch();
  useEffect(() => {
    if (incomeError) {
      toast.error(incomeError);
    }
  }, [incomeError]);

  useEffect(() => {
    if (deleteIncomeError) {
      toast.error(deleteIncomeError);
    }
  }, [deleteIncomeError]);

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
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
            {incomeData?.length ? (
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
                        <IconButton
                          className="icon-button"
                          icon={EditIcon}
                          onClick={() => {
                            dispatch(setIncomeOpenModal(true));
                            dispatch(setIncomeEditMode(true));
                            dispatch(setIncomeRecordId(transaction.id));
                          }}
                        />
                        <IconButton
                          className="icon-button"
                          icon={DeleteIcon}
                          onClick={() => {
                            dispatch(setIncomeDeleteModal(true));
                            dispatch(setIncomeRecordId(transaction.id));
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="noExpense">No Income Added</p>
            )}
          </div>
        </div>
      )}
      {deleteModal && (
        <NewModal
          deleteType
          title="Delete Income"
          buttonText="Delete"
          loading={deleteIncomeLoading}
          addButtonOnclick={() => {
            dispatch(deleteIncome(recordId));
          }}
          cancelButonOnclick={() => {
            dispatch(setIncomeDeleteModal(false));
            dispatch(setIncomeRecordId(null));
          }}
        >
          <p style={{ marginBottom: "20px" }}>
            Are you sure you want to delete the Income?
          </p>
        </NewModal>
      )}
    </>
  );
};

export default Income;
