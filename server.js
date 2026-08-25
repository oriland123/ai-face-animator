const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Create directories if they don't exist
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const outputDir = process.env.OUTPUT_DIR || 'output';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static(uploadDir));
app.use('/output', express.static(outputDir));

// Routes
const uploadRoutes = require('./routes/upload');
const animationRoutes = require('./routes/animation');
const videoRoutes = require('./routes/video');

app.use('/api/upload', uploadRoutes);
app.use('/api/animation', animationRoutes);
app.use('/api/video', videoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'An error occurred',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
