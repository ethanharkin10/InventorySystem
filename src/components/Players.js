import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Players() {
  const [players, setPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc'});

  useEffect(() => {
    axios.get('http://localhost:5000/players')  // API endpoint from the Express server
      .then(response => {
        setPlayers(response.data);  // Set the player data in the state
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  }, []);

  // Sort the data based on the key and direction
  const sortedPlayers = [...players].sort((a, b) => {
    if (sortConfig.key) {
      // Special case for sorting shoe sizes and jersey numbers numerically
      if (sortConfig.key === 'shoeSize' || sortConfig.key === 'jerseyNumber') {
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
        // Default sorting for string values (name, position, upper body size and lower body size)
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
      <h2>Players</h2>
      <p>Here is the list of players for the Vancouver Whitecaps.</p>
      <table style={{ width: '90%', borderCollapse: 'collapse', margin: 'auto', tableLayout: 'fixed', marginBottom: '100px' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px', width: '21%' }}>
              NAME {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('jerseyNumber')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px', width: '18%' }}>
              JERSEY NUMBER {sortConfig.key === 'jerseyNumber' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('position')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              POSITION {sortConfig.key === 'position' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
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
          {sortedPlayers.map((player) => (
            <tr key={player._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.jerseyNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.position}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.upperBodySize}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.lowerBodySize}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{player.shoeSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Players;