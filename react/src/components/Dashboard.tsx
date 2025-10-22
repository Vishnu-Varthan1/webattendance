import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  // State to store attendance summary data and error messages
  const [summary, setSummary] = useState<{totalPresent: number, totalAbsent: number, date: string} | null>(null);
  const [error, setError] = useState('');

  // Fetch attendance summary data from backend once component mounts
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/api/attendance/summary');
        setSummary(response.data);
      } catch {
        setError('Failed to load attendance summary');
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Show error message if fetch failed */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Show loading message until summary is fetched */}
      {!summary ? (
        <p>Loading attendance summary...</p>
      ) : (
        /* Once data is loaded, show the attendance summary */
        <div>
          <p><strong>Date:</strong> {summary.date}</p>
          <p><strong>Total Present:</strong> {summary.totalPresent}</p>
          <p><strong>Total Absent:</strong> {summary.totalAbsent}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
