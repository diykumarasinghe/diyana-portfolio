const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// CORS options setup
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://diyana-portfolio-phi.vercel.app"
    ];

    // Allow any Vercel preview or branch deployment URL for this project
    const isVercelPreview = origin && /^https:\/\/diyana-portfolio(-.*)?\.vercel\.app$/.test(origin);

    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

// Manual OPTIONS handler (AFTER cors(corsOptions) and BEFORE routes)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  next();
});

// Import Routes
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cmsRoutes = require('./routes/cmsRoutes');

// Mount Routes
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/cms", cmsRoutes);

// Health check route
app.get("/", (req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    message: "Diyana Portfolio Backend API is running",
    dbState: mongoose.connection.readyState,
    hasMongoUri: !!process.env.MONGO_URI
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
