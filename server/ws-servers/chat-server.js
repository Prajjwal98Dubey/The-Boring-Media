const app = require("express")();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const redisClient = require("../helpers/redis-client");

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("user connected"); 
  socket.on("message", async (payload) => {
    let flag = 1;
    if (JSON.parse(payload).client) {
      const { client, roomId } = JSON.parse(payload);
      wss.clients.forEach(async function each(sClient) {
        if (
          sClient !== socket &&
          sClient.readyState === WebSocket.OPEN &&
          sClient.clientName === client
        ) {
          flag = 0;
          // console.log('client name',sClient)
        }
      });
      if (flag) {
        console.log("expected here.");
        Object.defineProperty(socket, "clientName", { value: client });
        Object.defineProperty(socket, "room_id", { value: roomId });
        let isRoomIdPresent = await redisClient.get(`roomId-${roomId}`);
        if (isRoomIdPresent) {
          await redisClient.set(`roomId-${roomId}`, isRoomIdPresent + 1);
        } else {
          await redisClient.set(`roomId-${roomId}`, 1);
        }
      }
    } else {
      const { message, sender, reciever, roomId } = JSON.parse(payload);
      wss.clients.forEach(async function each(client) {
        if (
          client !== socket &&
          client.readyState === WebSocket.OPEN &&
          client.clientName === reciever &&
          client.room_id === roomId &&
          (await redisClient.get(`roomId-${roomId}`)) >= 2
        ) {
          client.send(JSON.stringify({ message, sender }));
        }
      });
    }
  });
});

server.listen(8081, () => console.log("ws server listening at 8081 🚀"));
