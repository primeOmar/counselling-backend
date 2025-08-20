// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

// Initialize App
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

// ✅ CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://theonlineconfidant.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB Connection (direct URI)
const mongoURI = "mongodb+srv://omarbusolo:uQDq3gPfOzcbGHne@confidant.h75mpi8.mongodb.net/counsellingdb?retryWrites=true&w=majority&appName=confidant";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes (all commented out to avoid errors)
// const counsellorRoutes = require("./routes/counsellorRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// app.use("/api/counsellors", counsellorRoutes);
// app.use("/api/chat", chatRoutes);

// ✅ Socket.io for Chat (can still run without routes)
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://theonlineconfidant.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Start Server (Render uses its own PORT)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
