// 代码生成时间: 2025-09-20 01:02:11
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Define a data store for demonstration purposes
let todos = [];

// POST endpoint to create a new todo
app.post('/todos', (req, res) => {
  try {
    const todo = {
      id: todos.length + 1,
      text: req.body.text,
      completed: false,
    };
    todos.push(todo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// GET endpoint to retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET endpoint to retrieve a single todo by id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    res.json(todo);
  }
});

// PUT endpoint to update a todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    todo.text = req.body.text;
    todo.completed = req.body.completed;
    res.json(todo);
  }
});

// DELETE endpoint to delete a todo
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).json({ error: 'Todo not found' });
  } else {
    todos.splice(todoIndex, 1);
    res.status(204).end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Todo RESTful API server running at http://localhost:${port}`);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

// Middleware to handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});