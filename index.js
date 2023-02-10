const showdown = require('showdown');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/data', (req, res) => {
  console.log(req);
  const converter = new showdown.Converter();
  const text = fs.readFileSync('./posts/sound/index.md', 'utf-8');
  const html = converter.makeHtml(text);
  res.send(html);
});

app.listen(port, () => {
  console.log(`SSG listening on port ${port}`);
});
