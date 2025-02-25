// [consumer/server.js]
const { consumeQueue } = require('./app');

consumeQueue().then(() => {
  console.log('Consumer conectado e aguardando mensagens...');
});
