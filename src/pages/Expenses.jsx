import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import "../css/layout.css";
import { formatAmount } from "../utils/formatAmount";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import {
  deleteExpense,
  setDeleteModal,
  setEditMode,
  setOpenModal,
  setRecordId,
} from "../redux/slices/expensesSlice";
import { DeleteIcon, DownloadIcon, EditIcon } from "../utils/icons";
import IconButton from "../components/IconButton";
import NewModal from "../components/NewModal";
import { currentDateDayJs } from "../utils/cuurentDate";
import GlobalButton from "../components/GlobalButton";

const Expenses = () => {
  const {
    data,
    expenseError,
    expenseLoading,
    deleteModal,
    deleteExpenseLoading,
    deleteExpenseError,
    recordId,
  } = useSelector((state) => state.expenses);

  const dispatch = useDispatch();
  useEffect(() => {
    if (expenseError) {
      toast.error(expenseError);
    }
  }, [expenseError]);

  useEffect(() => {
    if (deleteExpenseError) {
      toast.error(deleteExpenseError);
    }
  }, [deleteExpenseError]);

  const currentDate = currentDateDayJs;

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const totalNoRecords = data?.length ? data?.length : 0;

  const indexofLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexofLastPost - recordsPerPage;

  const filteredData = data?.length
    ? data?.slice(indexOfFirstPost, indexofLastPost)
    : [];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, `expenses_${currentDate}.xlsx`);
  };
  return (
    <>
      {expenseLoading ? (
        <Spinner />
      ) : (
        <div className="transactions-section">
          <div className="expenses-header">
            <h3>All Expenses for {currentDate}</h3>
            <GlobalButton buttonType="secondary" onClick={exportToExcel} icon={DownloadIcon}>
              Export to Excel
            </GlobalButton>
          </div>
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Comment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td data-label="Date">{transaction.expenseDate}</td>
                    <td data-label="Category">{transaction.expenseCategory}</td>
                    <td data-label="Amount">
                      ₹ {formatAmount(transaction.expenseAmount)}
                    </td>
                    <td data-label="Comment">{transaction.expenseComment}</td>
                    <td data-label="Action">
                      <IconButton
                        className="icon-button"
                        icon={EditIcon}
                        onClick={() => {
                          dispatch(setOpenModal(true));
                          dispatch(setEditMode(true));
                          dispatch(setRecordId(transaction.id));
                        }}
                      />
                      <IconButton
                        className="icon-button"
                        icon={DeleteIcon}
                        onClick={() => {
                          dispatch(setDeleteModal(true));
                          dispatch(setRecordId(transaction.id));
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            setCurrentPage={setCurrentPage}
            totalNoRecords={totalNoRecords}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            filteredData={filteredData}
            indexOfFirstPost={indexOfFirstPost}
            setRecordsPerPage={setRecordsPerPage}
          />
        </div>
      )}
      {deleteModal && (
        <NewModal
          deleteType
          title="Delete Expense"
          buttonText="Delete"
          loading={deleteExpenseLoading}
          addButtonOnclick={() => {
            dispatch(deleteExpense(recordId));
          }}
          cancelButonOnclick={() => {
            dispatch(setDeleteModal(false));
            dispatch(setRecordId(null));
          }}
        >
          <p style={{ marginBottom: "20px" }}>
            Are you sure you want to delete the Expense?
          </p>
        </NewModal>
      )}
    </>
  );
};

export default Expenses;
