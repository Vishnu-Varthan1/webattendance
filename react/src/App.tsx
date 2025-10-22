import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ManualAttendance from './components/ManualAttendance';
import AttendanceHistory from './components/AttendanceHistory';
import AttendanceChart from './components/AttendanceChart';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Logout from './components/Logout';

// Navigation expects isLogged and setIsLogged as props
const Navigation: React.FC<{ isLogged: boolean; setIsLogged: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isLogged, setIsLogged }) => {
  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      {!isLogged && <Link to="/login">Login</Link>}
      {isLogged && (
        <>
          <Link to="/attendance">Manual Attendance</Link> |{' '}
          <Link to="/history">Attendance History</Link> |{' '}
          <Link to="/chart">Attendance Chart</Link> |{' '}
          <Logout setIsLogged={setIsLogged} />
        </>
      )}
    </nav>
  );
};

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogged(!!token);

    const syncLoginStatus = () => {
      setIsLogged(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', syncLoginStatus);
    return () => window.removeEventListener('storage', syncLoginStatus);
  }, []);

  return (
    <Router>
      <Navigation isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<h1>Welcome to Attendance System</h1>} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="/attendance" element={
          <PrivateRoute isLogged={isLogged}>
            <ManualAttendance />
          </PrivateRoute>
        } />
        <Route path="/history" element={
          <PrivateRoute isLogged={isLogged}>
            <AttendanceHistory />
          </PrivateRoute>
        } />
        <Route path="/chart" element={
          <PrivateRoute isLogged={isLogged}>
            <AttendanceChart />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
