import React, { useState } from "react";
import "./AttendanceChart.css";

const AttendanceChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Mock data - replace with API call
  const mockData = {
    totalStudents: 50,
    monthlyStats: {
      present: 42,
      absent: 8,
      attendance_rate: "84%"
    },
    dailyData: [
      { day: 1, present: 45, absent: 5 },
      { day: 2, present: 43, absent: 7 },
      { day: 3, present: 48, absent: 2 },
      // ... more days
    ]
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="attendance-chart">
      <div className="chart-controls">
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{mockData.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Present</h3>
          <p>{mockData.monthlyStats.present}</p>
        </div>
        <div className="stat-card">
          <h3>Absent</h3>
          <p>{mockData.monthlyStats.absent}</p>
        </div>
        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <p>{mockData.monthlyStats.attendance_rate}</p>
        </div>
      </div>

      <div className="daily-chart">
        <h3>Daily Attendance - {months[selectedMonth]} {selectedYear}</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {mockData.dailyData.map((day) => (
              <tr key={day.day}>
                <td>{day.day}</td>
                <td>{day.present}</td>
                <td>{day.absent}</td>
                <td>{((day.present / mockData.totalStudents) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceChart;
