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

// Serve static files from the 'dist' directory (for frontend)
const staticPath = path.join(__dirname, "frontend", "build");
app.use(express.static(staticPath));

// Serve the 'index.html' file for all other requests (for SPA routing)
const indexPath = path.resolve(__dirname, "frontend", "build", "index.html");
app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
