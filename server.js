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
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://theonlineconfidant.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB connection
const mongoURI =
  "mongodb+srv://omarbusolo:uQDq3gPfOzcbGHne@confidant.h75mpi8.mongodb.net/counsellingdb?retryWrites=true&w=majority&appName=confidant";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Message Schema with TTL
const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

// TTL index: messages expire after 3 hours (10800 seconds)
messageSchema.index({ timestamp: 1 }, { expireAfterSeconds: 3 * 60 * 60 });

const Message = mongoose.model("Message", messageSchema);

// Socket.IO
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

io.on("connection", async (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // Send last 20 messages
  const lastMessages = await Message.find({})
    .sort({ timestamp: -1 })
    .limit(20)
    .sort({ timestamp: 1 }); // Re-sort ascending
  socket.emit("chat_history", lastMessages);

  socket.on("sendMessage", async (data) => {
    const newMsg = new Message(data);
    await newMsg.save();
    io.emit("receiveMessage", data); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
