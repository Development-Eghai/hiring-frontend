import React from "react";
import { Link } from "react-router-dom";

const ClassroomCard = ({ params }) => {
  return (
    <div className="col" key={""}>
      <div className="card p-3 card-styling mb-3 me-3 shadow-sm">
        <div
          className="card-header bg-white d-flex justify-content-between overflow-auto"
          style={{ maxHeight: "12vh" }}
        >
          <div
            className="col-11 d-flex flex-column overflow-hidden"
            style={{ maxHeight: "7vh" }}
          >
            <h5>{"classroom_name"}</h5>
            <p className="m-0 p-0 textsmallheader">
              Created on: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn border-0 d-flex align-item-start justify-content-end"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {"burgermenu"}
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  to={`/classrooms/edit/${"edit"}`}
                  className="dropdown-item text-decoration-none"
                >
                  Edit
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item text-decoration-none"
                  onClick={"delete"}
                >
                  {" "}
                  Delete{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="d-flex col-12 mx-auto my-3 align-items-center">
              <div className="col-10 d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <span>{"bookIcon"}</span>
                  <h6 className="ms-3 mt-1 mb-0">Books Upload</h6>
                </div>
                <p className="mb-0 ms-3">:</p>
              </div>
              <div className="col-2">
                <h5 className="ms-3 mb-0">
                  {"number_of_books_uploaded count"}
                </h5>
              </div>
            </div>

            <div className="d-flex col-12 mx-auto my-3 align-items-center">
              <div className="col-10 d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <span>{"noOfstudentsIcon"}</span>
                  <h6 className="ms-3 mt-1 mb-0">No of Students</h6>
                </div>
                <p className="mb-0 ms-3">:</p>
              </div>
              <div className="col-2">
                <h5 className="ms-3 mb-0">{"number_of_students count"}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer p-0 bg-white border-0">
          <Link to={"/classrooms"} className="btn w-100 classroom-buttton">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCard;
