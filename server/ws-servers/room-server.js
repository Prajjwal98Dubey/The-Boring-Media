const app = require("express")();
const server = require("http").createServer(app);
const { WebSocketServer, WebSocket } = require("ws");
const rediClient = require("../helpers/redis-client");
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  socket.on("message", async (payload) => {
    if (JSON.parse(payload).userName) {
      const { userName, roomId } = JSON.parse(payload);
      Object.defineProperty(socket, "userName", { value: userName,enumerable:true });
      Object.defineProperty(socket, "room", { value: roomId,enumerable:true });
      // check if curr roomId exists in redis
      let roomDetials = await rediClient.get(`largeRoomId-${roomId}`);
      let isClientPresent = await rediClient.get(`clientSet-${roomId}`);
      if (roomDetials) {
        let roomClientList = JSON.parse(roomDetials);
        let clientSet = JSON.parse(isClientPresent);
        console.log(clientSet);
        if (!clientSet.includes(userName)) {
          roomClientList.push(socket);
          clientSet.push(userName);
          await rediClient.set(
            `largeRoomId-${roomId}`,
            JSON.stringify(roomClientList)
          );
          await rediClient.set(
            `clientSet-${roomId}`,
            JSON.stringify(clientSet)
          );
        }
      } else {
        let newClientSet = [];
        newClientSet.push(userName);
        await rediClient.set(`largeRoomId-${roomId}`, JSON.stringify([socket]));
        await rediClient.set(
          `clientSet-${roomId}`,
          JSON.stringify(newClientSet)
        );
      }
    } else {
      const { message, roomId, user } = JSON.parse(payload);
      let redisRoomDetails = await rediClient.get(`largeRoomId-${roomId}`);
      let parsedRoomDetails = JSON.parse(redisRoomDetails)
      console.log("expecting.");
      console.log("redis room", parsedRoomDetails.length);
      console.log("room clients wss",wss.clients)
      console.log("room clients parsed",parsedRoomDetails)

      parsedRoomDetails.forEach(function each(client) {
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
  socket.on("close", async () => {
    let roomDetails = await rediClient.get(`largeRoomId-${socket.room}`);
    let clientSet = await rediClient.get(`clientSet-${socket.room}`);
    let updatedRoomDetails = JSON.parse(roomDetails).filter(
      (s) => s.userName !== socket.userName
    );
    let updateClientSet = JSON.parse(clientSet).filter(
      (user) => user !== socket.userName
    );
    if(updatedRoomDetails.length===0){
      await rediClient.del(`largeRoomId-${socket.room}`)
      await rediClient.del(`clientSet-${socket.room}`)
    }
    else{
      await rediClient.set(
        `largeRoomId-${socket.room}`,
        JSON.stringify(updatedRoomDetails)
      );
      await rediClient.set(
        `clientSet-${socket.room}`,
        JSON.stringify(updateClientSet)
      );
    }
    console.log("connection close by", socket.userName);
  });
});
server.listen(8082, () => console.log("room server listening at 8082 🚀"));
