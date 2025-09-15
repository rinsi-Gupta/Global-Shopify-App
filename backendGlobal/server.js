const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const startCron = require("./config/cron");

const PORT = process.env.PORT || 3000;

// Connect to database and start cron job
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    startCron(); // Initialize cron job
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();