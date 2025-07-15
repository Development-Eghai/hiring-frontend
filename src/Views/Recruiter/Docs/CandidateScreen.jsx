import React from 'react'
import Card from 'react-bootstrap/Card';
import { FaSearch } from 'react-icons/fa';
import RecruiterHeader from "../Recruiter_utils/Navbar";

const CandidateScreen = () => {
 const CandidateTableHeading = [
    "Req ID",
    "Candidate Id",
    "Candidate Name",
    "Applied Postion",
    "Time in Stage",
    "JD From applied Position",
    "CV/Resume",
    "Cover Letter",
    "Candidate current stage",
    "Candidate Next Stage",
    "Overall Stage",
    "final stage",
    "Source",
    "action",
  ];    return (
    <>
      <RecruiterHeader />
<div className="h-100 mt-5">
  <div className="row">
    <div className="card rounded-3 border-0 shadow-sm p-2">
      <div className="card-body p-0">
        {/* Filter Controls */}
        <div className="row mb-3">
          <div className="col-7"></div>
          <div className="col-md-5 d-flex align-items-center justify-content-end gap-3 flex-wrap">

            {/* Dropdown */}
            <select className="form-select form-select-sm w-auto">
              <option value="" disabled>Status</option>
                            <option value="">all</option>
              <option value="inprograss">In-Progress</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

              <select className="form-select form-select-sm w-auto">
              <option value="" >Stage</option>
              <option value="1">stage 1</option>
              <option value="2">stage 2</option>
              <option value="3">stage 3</option>
              <option value="4">stage 4</option>
            </select>

            {/* Search Bar */}
            <div className="input-group input-group-sm w-50">
              <input
                type="text"
                className="form-control"
                placeholder="Search .."
              />
              <span className="input-group-text bg-white border-start-0">
                <FaSearch />
              </span>
            </div>
          </div>
        </div>


        {/* Table Section */}
        <div className="row">
          <div className="table-responsive">
            <table className="table table-bordered mb-0">
              <thead className="table-light">
                <tr>
                  {CandidateTableHeading &&
                    CandidateTableHeading.map((heading, idx) => (
                      <th key={idx}>{heading}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">01</th>
                  <td>123</td>
                  <td>678</td>
                  <td>CTS</td>
                  <td>
                    <a href="#">Chief Technology Visionary</a>
                  </td>
                  <td>DEVTEAM2024</td>
                  <td>Naukri</td>
                  <td>30/11/2025</td>
                  <td>30/11/2025</td>
                  <td>200</td>
                  <td>4</td>
                  <td>Action</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>User</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



    </>
  );
}

export default CandidateScreen
