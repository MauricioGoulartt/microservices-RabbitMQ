// [producer/app.js]
const amqp = require('amqplib');

async function sendToQueue(message) {
  const connection = await amqp.connect('amqp://rabbitmq:5672');
  const channel = await connection.createChannel();
  const queue = 'transacoes';

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(message));

  console.log(`Mensagem enviada: ${message}`);
}

module.exports = { sendToQueue };
