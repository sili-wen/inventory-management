import dotenv from "dotenv";
import Fastify from "fastify";
import { ulid } from "ulid";
import app from "./app";
import logger from "./lib/logger";

dotenv.config();

const port = Number(process.env.PORT) || 8080;

const fastify = Fastify({
  bodyLimit: 100 * 1024 * 1024,
  requestIdLogLabel: "requestId",
  logger,
  genReqId(): string {
    return `req-${ulid()}`;
  },
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/ping", async (request, reply) => {
  return "pong\n";
});

fastify.register(app);

fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
