const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount Routes
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Diyana Portfolio Backend API is running"
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
