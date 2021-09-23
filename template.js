import { createServer } from 'http';
import fs from 'fs';
import path from 'path';

const MIME = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
};

const fileMiddleware = (req, res, next) => {
  if (req.url === '/') {
    req.url = '/index.html';
  }
  const filePath = path.resolve(`public${req.url}`);

  fs.promises
    .access(filePath)
    .then(() => {
      const extName = path.extname(filePath);

      res.writeHead(200, { 'Content-Type': MIME[extName] });
      fs.createReadStream(path.resolve(filePath)).pipe(res);
    })
    .catch(() => {
      next();
    });
};

const server = createServer((req, res) => {
  fileMiddleware(req, res, () => {
    if (req.url === '/hello') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify('Hello'));
    } else if (req.url === '/buy') {
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify({ name: 'Andrew' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify('Page Not Found'));
    }
  });
});

server.listen(3000);
