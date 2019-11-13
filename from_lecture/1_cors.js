let express = require('express');
let morgan = require('morgan');
let fetch = require('node-fetch');
let app = express();
const fs = require('fs');
const path = require('path');

const port = 3101;

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'fox2.html'));
});

app.get('/getFox', async function(req, res) {
  let resp = await fetch('https://randomfox.ca/floof/');
  let json = await resp.json();
  res.json(json);
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
