import { config } from "dotenv";

config();

export default {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || "3000",
    redis_host: process.env.REDIS_HOST || "redisCache",
    redis_port: process.env.REDIS_PORT || "6379",
    rabbitMqHost: process.env.RABBITMQ_HOST || "amqp://localhost:5672",
    tenantId: process.env.TENENTID || "34adcf3e-896a-4368-af8b-65eb20af256e",
    clientId: process.env.CLIENTID || "17933b7e-f140-42a5-a699-57ea2bab1725",
    authority: "login.microsoftonline.com",
    discovery: ".well-known/openid-configuration",
    version: "v2.0",
    validateIssuer: true,
    passReqToCallback: false,
    loggingLevel: "info",
    loggingNoPII: false,
    facultyServiceUrl:
      process.env.FACULTY_SERVICE_API_ENDPOINT || "http://localhost:3001",
  },
};
