import React from "react";
import PaginationWithLimit from "../Recruiter_utils/PaginationRecruiter";

export const RecruiterDashboard = () => {
  const tableData = [
    {
      sno: 1,
      planningId: "PLN-001",
      reqId: "REQ-101",
      clientName: "Acme Corp",
      jobTitle: "Frontend Developer",
      hiringManager: "John Doe",
      jobPosting: "LinkedIn",
      startDate: "2025-06-01",
      dueDate: "2025-06-15",
      hiringStatus: "Open",
      ageDays: 2,
      action: "View",
    },
    {
      sno: 2,
      planningId: "PLN-002",
      reqId: "REQ-102",
      clientName: "Beta Solutions",
      jobTitle: "Backend Developer",
      hiringManager: "Jane Smith",
      jobPosting: "Indeed",
      startDate: "2025-06-05",
      dueDate: "2025-06-20",
      hiringStatus: "In Progress",
      ageDays: 5,
      action: "Edit",
    },
    {
      sno: 3,
      planningId: "PLN-003",
      reqId: "REQ-103",
      clientName: "Gamma LLC",
      jobTitle: "Full Stack Engineer",
      hiringManager: "Robert White",
      jobPosting: "Company Site",
      startDate: "2025-06-10",
      dueDate: "2025-06-25",
      hiringStatus: "Closed",
      ageDays: 10,
      action: "Archive",
    },
    {
      sno: 4,
      planningId: "PLN-004",
      reqId: "REQ-104",
      clientName: "Delta Inc.",
      jobTitle: "UI/UX Designer",
      hiringManager: "Emily Clark",
      jobPosting: "Glassdoor",
      startDate: "2025-06-12",
      dueDate: "2025-06-28",
      hiringStatus: "Open",
      ageDays: 3,
      action: "View",
    },
    {
      sno: 5,
      planningId: "PLN-005",
      reqId: "REQ-105",
      clientName: "Zeta Tech",
      jobTitle: "QA Engineer",
      hiringManager: "Michael Scott",
      jobPosting: "Referral",
      startDate: "2025-06-15",
      dueDate: "2025-07-01",
      hiringStatus: "Pending",
      ageDays: 1,
      action: "Follow Up",
    },
  ];
  const dummyCandidates = [
    {
      "Req ID": "REQ001",
      "Candidate Id": "CAND1001",
      "Candidate Name": "John Doe",
      "Applied Postion": "Frontend Developer",
      "Time in Stage": "2 days",
      "JD From applied Position": "Build UI components using React",
      "CV/Resume": "johndoe_resume.pdf",
      "Cover Letter": "johndoe_cover.pdf",
      "Candidate current stage": "Technical Interview",
      "Candidate Next Stage": "HR Round",
      "Overall Stage": "In Progress",
      "final stage": "Pending",
      Source: "LinkedIn",
      action: "View",
    },
    {
      "Req ID": "REQ002",
      "Candidate Id": "CAND1002",
      "Candidate Name": "Jane Smith",
      "Applied Postion": "Backend Developer",
      "Time in Stage": "1 week",
      "JD From applied Position": "Develop APIs with Node.js",
      "CV/Resume": "janesmith_resume.pdf",
      "Cover Letter": "janesmith_cover.pdf",
      "Candidate current stage": "HR Round",
      "Candidate Next Stage": "Offer",
      "Overall Stage": "In Progress",
      "final stage": "Pending",
      Source: "Naukri",
      action: "View",
    },
    {
      "Req ID": "REQ003",
      "Candidate Id": "CAND1003",
      "Candidate Name": "Arjun Patel",
      "Applied Postion": "Full Stack Developer",
      "Time in Stage": "3 days",
      "JD From applied Position": "React and Express-based apps",
      "CV/Resume": "arjunpatel_resume.pdf",
      "Cover Letter": "arjunpatel_cover.pdf",
      "Candidate current stage": "Resume Screening",
      "Candidate Next Stage": "Technical Interview",
      "Overall Stage": "Screening",
      "final stage": "Pending",
      Source: "Referral",
      action: "View",
    },
    {
      "Req ID": "REQ004",
      "Candidate Id": "CAND1004",
      "Candidate Name": "Sara Lee",
      "Applied Postion": "UI/UX Designer",
      "Time in Stage": "5 days",
      "JD From applied Position": "Design wireframes and prototypes",
      "CV/Resume": "saralee_resume.pdf",
      "Cover Letter": "saralee_cover.pdf",
      "Candidate current stage": "Design Task",
      "Candidate Next Stage": "Design Review",
      "Overall Stage": "In Progress",
      "final stage": "Pending",
      Source: "Company Website",
      action: "View",
    },
    {
      "Req ID": "REQ005",
      "Candidate Id": "CAND1005",
      "Candidate Name": "Mohit Kumar",
      "Applied Postion": "DevOps Engineer",
      "Time in Stage": "6 days",
      "JD From applied Position": "CI/CD pipeline setup",
      "CV/Resume": "mohitkumar_resume.pdf",
      "Cover Letter": "mohitkumar_cover.pdf",
      "Candidate current stage": "Initial Screening",
      "Candidate Next Stage": "Technical Interview",
      "Overall Stage": "In Progress",
      "final stage": "Pending",
      Source: "Indeed",
      action: "View",
    },
  ];

  const RecuiterTableHeadings = [
    "S.no",
    "Planing ID",
    "Req Id",
    "Client Name",
    "Job Title",
    "Hiring Manager",
    "Job Posting",
    "Start Date",
    "Due Date",
    "Hiring Status",
    "Age(Days)",
    "Action",
  ];
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
  ];
  return (
    <div className="h-100">
      <div className="row">
        <div class="card rounded-3 border-0 shadow-sm p-2 mt-5">
          <div class="card-body p-0 card ">
            <table class="table mb-0">
              <thead class="table-light p-2">
                <tr>
                  {RecuiterTableHeadings.length > 0 &&
                    RecuiterTableHeadings.map((heading) => <th>{heading}</th>)}
                </tr>
              </thead>
              <tbody className="p-2">
                {tableData.length > 0 ? (
                  tableData.map((data) => (
                    <tr>
                      <th scope="row">{data?.sno}</th>
                      <td>{data?.planningId}</td>
                      <td>{data?.reqId}</td>
                      <td>{data?.clientName}</td>
                      <td>
                        <a href="">{data?.jobTitle}</a>
                      </td>
                      <td>{data?.hiringManager}</td>
                      <td>{data?.jobPosting}</td>
                      <td>{data?.startDate}</td>
                      <td>{data?.dueDate}</td>
                      <td>{data?.hiringStatus}</td>
                      <td>{data?.ageDays}</td>
                      <td>Action</td>
                    </tr>
                  ))
                ) : (
                  <p>No data found</p>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card rounded-3 border-0 shadow-sm p-2 mt-5">
          <div class="card-body p-0 card ">
            <table class="table mb-0">
              <thead class="table-light p-2">
                <tr>
                  {CandidateTableHeading.length > 0 &&
                    CandidateTableHeading.map((heading) => <th>{heading}</th>)}
                </tr>
              </thead>
              <tbody className="p-2">
                {tableData.length > 0 ? (
                  tableData.map((data) => (
                    <tr>
                      <th scope="row">{data?.sno}</th>
                      <td>{data?.planningId}</td>
                      <td>{data?.reqId}</td>
                      <td>{data?.clientName}</td>
                      <td>
                        <a href="">{data?.jobTitle}</a>
                      </td>
                      <td>{data?.hiringManager}</td>
                      <td>{data?.jobPosting}</td>
                      <td>{data?.startDate}</td>
                      <td>{data?.dueDate}</td>
                      <td>{data?.hiringStatus}</td>
                      <td>{data?.ageDays}</td>
                      <td>Action</td>
                    </tr>
                  ))
                ) : (
                  <p>No data found</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row ">
        <PaginationWithLimit totalItems={50} options={[10, 25, 50]} />
      </div>
    </div>
  );
};
