const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory API key store (in production, use a database)
const validApiKeys = [
  'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6' // Pre-generated API key
];
let todos = [];
let idCounter = 1;

// Middleware to verify API key
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
};

// Root route (public, no authentication required)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API! Use /api/todos to access the API with a valid API key.' });
});

// Protected routes (require API key)
app.get('/api/todos', authenticateApiKey, (req, res) => {
  res.json(todos);
});

app.post('/api/todos', authenticateApiKey, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const todo = { id: idCounter++, text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', authenticateApiKey, (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  if (text !== undefined) todo.text = text;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

app.delete('/api/todos/:id', authenticateApiKey, (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});