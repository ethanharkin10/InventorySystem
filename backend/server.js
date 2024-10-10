const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/VancouverWhitecapsInventorySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
// Inventory
const InventorySchema = new mongoose.Schema({
    item: String,
    category: String,
    size: String,
    color: String,
    quantityAvailable: Number,
  }, {collection: 'inventory'});
    
const Inventory = mongoose.model('Inventory', InventorySchema);

//Orders
const OrdersSchema = new mongoose.Schema({
    name: String,
    orderDate: Date,
    vendor: String,
    itemsOrdered: Number,
    itemsReceived: Number,
    percentageReceived: Number,
    status: String,
  }, {collection: 'orders'});
    
const Orders = mongoose.model('Orders', OrdersSchema);

// Players
const PlayerSchema = new mongoose.Schema({
  name: String,
  jerseyNumber: Number,
  position: String,
  upperBodySize: String,
  lowerBodySize: String,
  shoeSize: Number
}, {collection: 'players'});

const Player = mongoose.model('Player', PlayerSchema);

// Staff
const StaffSchema = new mongoose.Schema({
  name: String,
  gender: String,
  department: String,
  upperBodySize: String,
  lowerBodySize: String,
  shoeSize: Number
}, {collection: 'staff'});
  
const Staff = mongoose.model('Staff', StaffSchema);

// Route to fetch data
// Fetch Inventory
app.get('/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ category: 1 }); 
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Orders
app.get('/orders', async (req, res) => {
    try {
      const orders = await Orders.find(); 
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Fetch Players
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find().sort({ jerseyNumber: 1 }); 
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Staff
app.get('/staff', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ department: 1 }); 
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});