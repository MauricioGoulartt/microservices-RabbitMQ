// [producer/server.js]
const express = require('express');
const { sendToQueue } = require('./app');

const app = express();
app.use(express.json());

app.post('/nova-transacao', async (req, res) => {
  await sendToQueue(JSON.stringify(req.body));
  res.json({ status: 'OK' });
});

app.listen(3000, () => console.log('Producer rodando na porta 3000'));
