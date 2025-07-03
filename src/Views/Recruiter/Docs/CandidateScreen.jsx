import React from 'react'

const CandidateScreen = () => {
    const tableHeadings = ["S.no","Planing ID","Req Id","Client Name","Job Title","Hiring Manager","Job Posting","Start Date","Due Date","Hiring Status","Age(Days)","Action"]
    return (
      <div className="h-100">
        <div className="row">
          <div class="card rounded-3 border-0 shadow-sm p-2">
            <div class="card-body p-0 card ">
              <table class="table mb-0">
                <thead class="table-light p-2">
                  <tr>
                    {tableHeadings.map((heading)=>(<th>{heading}</th>))}
                  </tr>
                </thead>
                <tbody className="p-2">
                  <tr>
                    <th scope="row">01</th>
                    <td>123</td>
                    <td>678</td>
                    <td>CTS</td>
                    <td>
                      <a href="">Chief Technology Visionary</a>
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
  )
}

export default CandidateScreen
