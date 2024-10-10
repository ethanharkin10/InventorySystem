import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc'})

  useEffect(() => {
    axios.get('http://localhost:5000/staff')  // API endpoint from the Express server
      .then(response => {
        setStaff(response.data);  // Set the staff data in the state
      })
      .catch(error => {
        console.error('Error fetching staff:', error);
      });
  }, []);

  // Sort the data based on the key and direction
  const sortedStaff = [...staff].sort((a, b) => {
    if (sortConfig.key) {
      // Special case for sorting shoe sizes numerically
      if (sortConfig.key === 'shoeSize') {
        const aValue = parseFloat(a[sortConfig.key]);
        const bValue = parseFloat(b[sortConfig.key]);
  
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      } else {
        // Default sorting for string values (name, gender, department, upper body size and lower body size)
        const aValue = a[sortConfig.key].toString().toLowerCase();
        const bValue = b[sortConfig.key].toString().toLowerCase();
  
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h2>Staff</h2>
      <p>Here is the list of staff members for the Vancouver Whitecaps.</p>
      <table style={{ width: '90%', borderCollapse: 'collapse', margin: 'auto', tableLayout: 'fixed', marginBottom: '100px'}}>
        <thead>
        <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px', width: '20%' }}>
              NAME {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('gender')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              GENDER {sortConfig.key === 'gender' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('department')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px', width: '18%' }}>
              DEPARTMENT {sortConfig.key === 'department' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('upperBodySize')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              UPPER BODY SIZE {sortConfig.key === 'upperBodySize' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('lowerBodySize')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              LOWER BODY SIZE {sortConfig.key === 'lowerBodySize' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('shoeSize')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              SHOE SIZE {sortConfig.key === 'shoeSize' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStaff.map((staffMember) => (
            <tr key={staffMember._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staffMember.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staffMember.gender}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staffMember.department}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staffMember.upperBodySize}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staffMember.lowerBodySize}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{staffMember.shoeSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff;