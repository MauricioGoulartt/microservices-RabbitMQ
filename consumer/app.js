// [consumer/app.js]
const amqp = require('amqplib');

async function consumeQueue() {
  try {
  const connection = await amqp.connect('amqp://rabbitmq:5672');
  const channel = await connection.createChannel();
  const queue = 'transacoes';

  await channel.assertQueue(queue);
  channel.consume(queue, (msg) => {
    if (msg) {
      const conteudo = msg.content.toString();
      console.log(`Mensagem recebida: ${conteudo}`);
      // Processar a transação aqui...
      channel.ack(msg);
    }
  });
} catch(e) {
  console.error('Erro de conexão, tentando novamente em 5s', e);
  setTimeout(connectRabbit, 5000);
}
}

module.exports = { consumeQueue };
