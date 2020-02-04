require('babel-polyfill');
const debug = require('debug');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const log = debug('picken:sever');

const app = express();
const html = path.join(__dirname, 'index.html');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname));
app.use('*/js', express.static(__dirname));
app.enable('trust proxy', true);


app.all('*', sendHtml);
app.all('/', sendHtml);

app.post('/log-visit', (req, res) => {
  const now = new Date();
  log('connection', req.ip, `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  res.send({ success: true });
});


app.listen(3000, () => {
  log('listening on port 3000');
});


function sendHtml(req, res) {
  res.sendFile(html);
  // next();
}
