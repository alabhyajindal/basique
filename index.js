const showdown = require('showdown');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/main', (req, res) => {
  const converter = new showdown.Converter();
  const text = fs.readFileSync('./posts/sound/index.md', 'utf-8');
  const html = converter.makeHtml(text);
  const css = fs.readFileSync('./index.css', 'utf-8');

  const src = `${html}
  <style> 
    ${css}
  </style>
  `;
  res.send(src);
});

app.listen(port, () => {
  console.log(`SSG listening on port ${port}`);
});
