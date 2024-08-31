const { createClient } = require("redis");

const client = createClient();
const startRedisClient = async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  console.log("redis client connected.");
};

startRedisClient();

module.exports = client;
