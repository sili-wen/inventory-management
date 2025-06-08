import dotenv from "dotenv";
import fastify from "fastify";

dotenv.config();

const port = Number(process.env.PORT);

const server = fastify();

server.get("/", async (request, reply) => {
  return { hello: "world" };
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
