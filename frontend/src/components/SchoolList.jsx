import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/schools')
      .then((response) => {
        setSchools(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        setError(`Error fetching schools: ${error.message}`); 
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  else if (error) {
    return <div>{error}</div>;
  } else {

  return (
    <div>
      <h1>Schools List</h1>
      <ul>
        {schools.length === 0 ? (
          <li>No schools available.</li>
        ) : (
          schools.map((school, index) => (
            <li key={index}>{school}</li>  
          ))
        )}
      </ul>
    </div>
  );
}
};

export default SchoolList;
