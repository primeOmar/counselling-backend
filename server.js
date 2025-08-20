// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",            // local dev
      "https://theonlineconfidant.com",   // your live frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://theonlineconfidant.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // fallback if WebSocket fails
});

io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // Join a default room for anonymous chat
  const room = "anonymous";
  socket.join(room);

  socket.on("sendMessage", (data) => {
    console.log("📨 Message received:", data);
    // Broadcast to all clients in the room
    io.to(room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
