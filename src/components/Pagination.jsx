import React from "react";
import "../css/pagination.css";

const Pagination = ({
  setCurrentPage,
  totalNoRecords,
  recordsPerPage,
  indexOfFirstPost,
  filteredData,
  currentPage,
  setRecordsPerPage,
}) => {
  //   let pageNum = [];
  //   for (let i = 1; i <= Math.ceil(totalNoRecords / recordsPerPage); i++) {
  //     pageNum.push(i);
  //   }

  const handlePerPageChange = (event) => {
    setRecordsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Showing: {indexOfFirstPost + 1} to{" "}
          {indexOfFirstPost + filteredData?.length} of {totalNoRecords}
        </span>
        <div className="pagination-per-page">
         <span> Per Page:</span>
          <select value={recordsPerPage} onChange={handlePerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Prev
        </button>

        <span className="pagination-current-page">{currentPage}</span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfFirstPost + filteredData?.length === totalNoRecords}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
