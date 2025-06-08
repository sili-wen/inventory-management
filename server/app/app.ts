import Cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import apiReference from "@scalar/fastify-api-reference";
import { FastifyInstance } from "fastify";
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransform,
  fastifyZodOpenApiTransformObject,
  serializerCompiler,
  validatorCompiler,
} from "fastify-zod-openapi";

export const app = async (fastify: FastifyInstance) => {
  await fastify.register(fastifyZodOpenApiPlugin);
  await fastify.register(Cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  });

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
  fastify.register(swagger, {
    openapi: {
      info: {
        title: "Inventory Management API Documentation",
        description: "REST API for Inventory Management application",
        version: "1.0.0",
      },
    },
    transform: fastifyZodOpenApiTransform,
    transformObject: fastifyZodOpenApiTransformObject,
  });

  fastify.register(apiReference, {
    routePrefix: "/reference",
    configuration: {
      pageTitle: "Inventory Management",
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "fetch",
      },
      theme: "deepSpace",
    },
  });
};

export default app;
