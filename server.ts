import { Server, Socket } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: Socket) => {
  socket.emit("when-connected", "Socket is Online");

  socket.on("join-room", (roomId) => {
    console.log(roomId, "This is from client");
    socket.join(roomId);
  });

  console.log(socket?.rooms, "Total Rooms");

  socket.on("send-chat-message", ({ message, name, roomId }) => {
    console.log(message, roomId, "getting Message");
    socket
      .to(roomId)
      .emit("receive-message", { room: roomId, name: name, message: message });
  });

  socket.on("send-broadcast-message", (message) => {
    socket.broadcast.emit("broadcast-message", message);
  });
});

io.listen(5000);
