const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory user store (in production, use a database)
const users = [
  { id: 1, username: 'admin', password: '$2b$10$2iX8G5xL8G8Y8J8K8M8N8O8P8Q8R8S8T8U8V8W8X8Y8Z8a8b8c8d8e8f8g8h8i8j' } // Password: "password123"
];
let todos = [];
let idCounter = 1;

// Secret key for JWT (in production, store in environment variables)
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint to generate JWT
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API! Use /api/todos to access the API.' });
});

// Protected routes (require JWT)
app.get('/api/todos', authenticateToken, (req, res) => {
  res.json(todos);
});

app.post('/api/todos', authenticateToken, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const todo = { id: idCounter++, text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', authenticateToken, (req, res) => {
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

app.delete('/api/todos/:id', authenticateToken, (req, res) => {
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