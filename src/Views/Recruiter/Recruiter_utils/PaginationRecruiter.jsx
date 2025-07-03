import React, { useState } from "react";
import { Form } from "react-bootstrap";

const PaginationWithLimit = ({
  totalItems = 50,
  options = [10, 25, 50, 100],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChangeLimit = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center my-3 flex-wrap">
      <div className="d-flex align-items-center gap-2">
        <span className="text-muted fw-semibold">Showing</span>
        <Form.Select
          size="sm"
          style={{ width: "70px" }}
          value={itemsPerPage}
          onChange={handleChangeLimit}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </Form.Select>
        <span className="text-muted fw-semibold">of {totalItems}</span>
      </div>

      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => goToPage(currentPage - 1)}
          >
            &lt;
          </button>
        </li>

        {[...Array(totalPages).keys()].slice(0, 5).map((num) => (
          <li
            key={num}
            className={`page-item ${currentPage === num + 1 ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => goToPage(num + 1)}>
              {num + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => goToPage(currentPage + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationWithLimit;
