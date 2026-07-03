const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.send("Meeting App Server Running");
});

io.on("connection", (socket) => {

    console.log("A user connected:", socket.id);

    socket.on("hello-server", (data) => {

        console.log("Message from client:", data);

        socket.emit(
            "hello-client",
            "Hello Vaishu! Server received your message."
        );

    });
    socket.on("join-room", (room) => {

    socket.join(room);

    console.log(`${socket.id} joined room ${room}`);

});

    socket.on("send-message", (data) => {

    console.log(data);

    io.to(data.room).emit(
        "receive-message",
        data.message
    );

});

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);

    });

});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});