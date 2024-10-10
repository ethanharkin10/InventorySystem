import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc'});

  useEffect(() => {
    axios.get('http://localhost:5000/inventory')  // API endpoint from the Express server
      .then(response => {
        setInventory(response.data);  // Set the inventory data in the state
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  // Sort the data based on the key and direction
  const sortedInventory = [...inventory].sort((a, b) => {
    if (sortConfig.key) {
      // Special case for sorting quantity available numerically
      if (sortConfig.key === 'quantityAvailable' ) {
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
        // Default sorting for string values (item, category, size and color)
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
      <h2>Inventory</h2>
      <p>Here is the list of current inventory for the Vancouver Whitecaps.</p>
      <table style={{ width: '90%', borderCollapse: 'collapse', margin: 'auto', tableLayout: 'fixed', marginBottom: '100px' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('item')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px', width: '20%' }}>
              ITEM {sortConfig.key === 'item' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('category')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px', width: '15%' }}>
              CATEGORY {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('size')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              SIZE {sortConfig.key === 'size' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('color')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              COLOR {sortConfig.key === 'color' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('quantityAvailable')} style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '8px' }}>
              QUANTITY AVAILABLE {sortConfig.key === 'quantityAvailable' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedInventory.map((inventoryItem) => (
            <tr key={inventoryItem._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{inventoryItem.item}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{inventoryItem.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{inventoryItem.size}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{inventoryItem.color}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{inventoryItem.quantityAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;