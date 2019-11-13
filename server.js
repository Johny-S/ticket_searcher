let express = require('express');
let morgan = require('morgan');
let fetch = require('node-fetch');
let app = express();
const fs = require('fs');
const path = require('path');

// const stations = require('./stations');

const port = 3101;

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './tickets.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getTicket', async function(req, res) {
  const apikey = `&apikey=4acaf704-9bc1-4932-9425-dcc1e6310776`;
  const from = `&from=${req.query.from}`;
  const to = `&to=${req.query.to}`;
  const date = `&date=${req.query.date.slice(0, 10)}`;
  const transport_types = `&transport_types=train`;
  const limit = `&limit=100`;
  console.log(req.query);

  let dStr = `https://api.rasp.yandex.net/v3.0/search/?system=esr&format=json&lang=ru_RU&page=1${apikey}${from}${to}${date}${transport_types}${limit}`;
  let resp = await fetch(dStr);
  let json = await resp.json();

  res.json(json);
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
