import amqp from "amqplib";
import logger from "./logger";
import settings from "../settings";

const { rabbit_mq_host, rabbit_mq_username, rabbit_mq_password } = settings.app;

let channel;
let connection;

const connectToMessageBroker = async (channelName) => {
  const amqpServer = `amqp://${rabbit_mq_username}:${rabbit_mq_password}@${rabbit_mq_host}:5672`;
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue(channelName);
};

const consumeFromMessageBroker = async (callback, channelName) => {
  channel.consume(channelName, (message) => {
    logger.log(
      "debug",
      `messageBroker consumeFromMessageBroker | channel : ${channelName}`,
      message
    );
    channel.ack(message);

    const data = JSON.parse(message.content.toString());
    logger.log("debug", "messageBroker consumeFromMessageBroker | data", data);
    callback(data);
  });
};

const sendToQueue = async (channelName, data) => {
  logger.log("debug", `messageBroker sendToQueue channel ${channelName}`, data);
  channel.sendToQueue(channelName, Buffer.from(JSON.stringify(data)));
};

export { connectToMessageBroker, consumeFromMessageBroker, sendToQueue };
