const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors'); 
require('dotenv').config();
const { errorHandler } = require('./Middleware/errorMiddleware');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const port = process.env.PORT || 5000;

connectDB(); 

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));

// Handle OPTIONS requests
app.options('*', cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, 'frontend', 'public', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'build', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
