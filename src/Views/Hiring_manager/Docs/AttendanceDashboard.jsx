import React, { useState } from "react";

// Dummy data for demonstration
const initialClasses = ["Class A", "Class B"];
const initialStudents = {
  "Class A": [
    { name: "Alice", roll: "1" },
    { name: "Bob", roll: "2" },
  ],
  "Class B": [
    { name: "Charlie", roll: "1" },
    { name: "David", roll: "2" },
  ],
};

const attendanceStatuses = ["Present", "Absent", "Leave"];

function AttendanceDashboard() {
  const [classes] = useState(initialClasses);
  const [students] = useState(initialStudents);
  const [selectedClass, setSelectedClass] = useState(initialClasses[0]);
  const [attendance, setAttendance] = useState({});

  // Handler for marking attendance
  const markAttendance = (roll, status) => {
    setAttendance((prev) => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        [roll]: status,
      },
    }));
  };

  // Calculate summary
  const summary = students[selectedClass].reduce(
    (acc, student) => {
      const status = attendance[selectedClass]?.[student.roll] || "";
      if (status === "Present") acc.present += 1;
      else if (status === "Absent") acc.absent += 1;
      else if (status === "Leave") acc.leave += 1;
      return acc;
    },
    { present: 0, absent: 0, leave: 0 }
  );

  return (
    <div style={{ maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h2>School Attendance Dashboard</h2>
      <div>
        <label>
          Select Class:{" "}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>
        </label>
      </div>

      <h3>Students</h3>
      <table border={1} cellPadding={8} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students[selectedClass].map((student) => (
            <tr key={student.roll}>
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>
                {attendanceStatuses.map((status) => (
                  <button
                    key={status}
                    style={{
                      marginRight: 6,
                      background:
                        attendance[selectedClass]?.[student.roll] === status
                          ? "#2ecc71"
                          : "#ecf0f1",
                    }}
                    onClick={() => markAttendance(student.roll, status)}
                  >
                    {status}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 24, background: "#f5f5f5", padding: 12 }}>
        <h4>Summary</h4>
        <p>
          <strong>Total Students:</strong> {students[selectedClass].length}{" "}
          <br />
          <strong>Present:</strong> {summary.present} <br />
          <strong>Absent:</strong> {summary.absent} <br />
          <strong>Leave:</strong> {summary.leave}
        </p>
      </div>
    </div>
  );
}

export default AttendanceDashboard;
