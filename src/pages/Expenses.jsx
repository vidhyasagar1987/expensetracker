import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/layout.css";
import { formatAmount } from "../utils/formatAmount";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import {
  setEditMode,
  setOpenModal,
  setRecordId,
} from "../redux/slices/expensesSlice";

const Expenses = () => {
  const { data, expenseError, expenseLoading } = useSelector(
    (state) => state.expenses
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (expenseError) {
      toast.error(expenseError);
    }
  }, [expenseError]);

  const currentDate = dayjs().format("MMMM, YYYY");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const totalNoRecords = data?.length ? data?.length : 0;

  const indexofLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexofLastPost - recordsPerPage;

  const filteredData = data?.length
    ? data?.slice(indexOfFirstPost, indexofLastPost)
    : [];

  return (
    <div>
      {expenseLoading ? (
        <Spinner />
      ) : (
        <div className="transactions-section">
          <h3>All Expenses for {currentDate}</h3>
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
                      <button
                        onClick={() => {
                          dispatch(setOpenModal(true));
                          dispatch(setEditMode(true));
                          dispatch(setRecordId(transaction.id));
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
    </div>
  );
};

export default Expenses;
