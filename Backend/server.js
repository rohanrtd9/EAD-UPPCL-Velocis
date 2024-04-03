const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// Configuration
require("dotenv").config();
const port = process.env.PORT || 80;

// DB
const connectDb = require("./db/dbConnect"); // Import the database connection function
connectDb(); // Connect to MongoDB Atlas instance

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(cors());

// Serve static files for the built React app
app.use(express.static("dist"));

// Set appropriate headers to curb CORS error
// Add your CORS handling logic here

// Apply ValidateToken middleware to all routes
// Add your token validation middleware here

// Custom routes
// Add your API routes here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.json({
    status: STATUS_INTERNAL_SERVER_ERROR,
    message: "Internal Server Error.",
  });
});

// Download file route
// Add your file download route here

// Default route to serve the React app
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "/dist") });
});

// Start the server
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
