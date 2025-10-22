import React, { useState } from "react";
import "./AttendanceHistory.css";

const AttendanceHistory: React.FC = () => {
  const [searchRoll, setSearchRoll] = useState("");
  const [studentHistory, setStudentHistory] = useState<any>(null);

  // Mock data - replace with API call
  const mockHistory = [
    { date: "2024-03-27", status: "Present" },
    { date: "2024-03-26", status: "Absent" },
    { date: "2024-03-25", status: "Present" },
    { date: "2024-03-24", status: "Present" },
    { date: "2024-03-23", status: "Absent" },
  ];

  const handleSearch = () => {
    if (!searchRoll) return;
    
    // Mock student data - replace with API call
    setStudentHistory({
      name: "John Doe",
      roll: searchRoll,
      attendance: mockHistory,
      stats: {
        totalDays: 5,
        presentDays: 3,
        absentDays: 2,
        attendancePercentage: "60%"
      }
    });
  };

  return (
    <div className="attendance-history">
      <h2>Attendance History</h2>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={searchRoll}
          onChange={(e) => setSearchRoll(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {studentHistory && (
        <div className="history-content">
          <div className="student-details">
            <h3>{studentHistory.name}</h3>
            <p>Roll Number: {studentHistory.roll}</p>
          </div>

          <div className="attendance-stats">
            <div className="stat-box">
              <h4>Total Days</h4>
              <p>{studentHistory.stats.totalDays}</p>
            </div>
            <div className="stat-box">
              <h4>Present Days</h4>
              <p>{studentHistory.stats.presentDays}</p>
            </div>
            <div className="stat-box">
              <h4>Absent Days</h4>
              <p>{studentHistory.stats.absentDays}</p>
            </div>
            <div className="stat-box">
              <h4>Attendance</h4>
              <p>{studentHistory.stats.attendancePercentage}</p>
            </div>
          </div>

          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentHistory.attendance.map((record: any, index: number) => (
                <tr key={index} className={record.status.toLowerCase()}>
                  <td>{record.date}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;
