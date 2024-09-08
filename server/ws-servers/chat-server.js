const app = require("express")();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (payload) => {
    if (JSON.parse(payload).client) {
      const { client } = JSON.parse(payload);
      Object.defineProperty(socket, "clientName", { value: client });
    } else {
      const { message, sender, reciever } = JSON.parse(payload);
      wss.clients.forEach(function each(client) {
        if (
          client !== socket &&
          client.readyState === WebSocket.OPEN &&
          client.clientName === reciever
        ) {
          client.send(JSON.stringify({message,sender}));
        }
      });
    }
  });
});

server.listen(8081, () => console.log("ws server listening at 8081 🚀"));
