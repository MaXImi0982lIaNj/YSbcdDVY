// 代码生成时间: 2025-08-20 15:29:09
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to get all items
app.get('/api/items', (req, res) => {
  // Simulate a database with an array
  const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  
  // Send the items as JSON
  res.status(200).json(items);
});

// Define a route to get an item by ID
app.get('/api/items/:id', (req, res) => {
  // Simulate a database with an array
  const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  const itemId = parseInt(req.params.id);
  
  // Find the item by ID
  const item = items.find(i => i.id === itemId);
  
  // Check if the item exists
  if (!item) return res.status(404).json({ error: 'Item not found' });
  
  // Send the item as JSON
  res.status(200).json(item);
});

// Define a route to create a new item
app.post('/api/items', (req, res) => {
  // Destructure the name from the request body
  const { name } = req.body;
  
  // Check if the name is provided
  if (!name) return res.status(400).json({ error: 'Name is required' });
  
  // Simulate a database with an array and add a new item with an incremented ID
  const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  
  // Send the new item as JSON
  res.status(201).json(newItem);
});

// Define a route to update an item by ID
app.put('/api/items/:id', (req, res) => {
  // Destructure the name from the request body
  const { name } = req.body;
  const itemId = parseInt(req.params.id);
  
  // Simulate a database with an array
  const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  
  // Find the item by ID
  const itemIndex = items.findIndex(i => i.id === itemId);
  
  // Check if the item exists
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });
  
  // Update the item
  if (name) items[itemIndex].name = name;
  
  // Send the updated item as JSON
  res.status(200).json(items[itemIndex]);
});

// Define a route to delete an item by ID
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  
  // Simulate a database with an array
  const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
  
  // Find the item index by ID
  const itemIndex = items.findIndex(i => i.id === itemId);
  
  // Check if the item exists
  if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });
  
  // Delete the item
  items.splice(itemIndex, 1);
  
  // Send a success message
  res.status(200).json({ message: 'Item deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});