import React, { useState } from "react";
import "./ManualAttendance.css";

const ManualAttendance: React.FC = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [studentData, setStudentData] = useState<any>(null);

  const handleMarkAttendance = async () => {
    if (!rollNumber) {
      setMessage("Please enter a roll number");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with real endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStudentData({
        name: "John Doe", // Replace with actual student data
        roll: rollNumber,
        present: true,
        date: new Date().toLocaleDateString()
      });
      setMessage("Attendance marked successfully!");
    } catch (error) {
      setMessage("Failed to mark attendance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manual-attendance">
      <h2>Mark Attendance</h2>
      <div className="attendance-form">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button onClick={handleMarkAttendance} disabled={loading}>
          {loading ? "Processing..." : "Mark Present"}
        </button>
      </div>
      
      {message && (
        <p className={message.includes("success") ? "success" : "error"}>
          {message}
        </p>
      )}

      {studentData && (
        <div className="student-info">
          <h3>Student Information</h3>
          <p>Name: {studentData.name}</p>
          <p>Roll Number: {studentData.roll}</p>
          <p>Status: {studentData.present ? "Present" : "Absent"}</p>
          <p>Date: {studentData.date}</p>
        </div>
      )}
    </div>
  );
};

export default ManualAttendance;
