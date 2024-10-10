import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')  // API endpoint from the Express server
      .then(response => {
        setOrder(response.data);  // Set the orders data in the state
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <p>Here is the list of current inventory orders for the Vancouver Whitecaps.</p>
      <table style={{ width: '90%', borderCollapse: 'collapse', margin: 'auto', tableLayout: 'fixed', marginBottom: '100px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ORDER NAME</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ORDER DATE</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>VENDOR</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ITEMS ORDERED</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ITEMS RECEIVED</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>PERCENTAGE ORDERED</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ORDER STATUS</th>
          </tr>
        </thead>
        <tbody>
          {order.map(order => (
            <tr key={order._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.vendor}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.itemsOrdered}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.itemsReceived}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.percentageReceived}%</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;