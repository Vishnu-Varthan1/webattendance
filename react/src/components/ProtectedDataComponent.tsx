import React, { useEffect, useState } from 'react';

const ProtectedDataComponent: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      return res.json();
    })
    .then(json => {
      setData(json.message);
      setError(null);
    })
    .catch(err => {
      setError(err.message);
      setData(null);
    });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading protected data...</div>;

  return <div>{data}</div>;
};

export default ProtectedDataComponent;
