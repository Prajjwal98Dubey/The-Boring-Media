const app = require("express")();
const server = require("http").createServer(app);
const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  socket.on("message", (payload) => {
    if (JSON.parse(payload).userName) {
      const { userName, roomId } = JSON.parse(payload);
      Object.defineProperty(socket, "userName", { value: userName });
      Object.defineProperty(socket, "room", { value: roomId });
    } else {
      const { message, roomId, user } = JSON.parse(payload);
      let activeMembers = 0;
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && client.room === roomId) {
          activeMembers += 1;
        }
      });
      socket.send(JSON.stringify({ active: activeMembers }));
      wss.clients.forEach(function each(client) {
        if (
          client !== socket &&
          client.readyState === WebSocket.OPEN &&
          client.room === roomId
        ) {
          client.send(JSON.stringify({ message, roomId, user }));
        }
      });
    }
  });
  socket.on("close", () => {
    console.log("connection close by", socket.userName);
  });
});

server.listen(8082, () => console.log("room server listening at 8082 🚀"));
