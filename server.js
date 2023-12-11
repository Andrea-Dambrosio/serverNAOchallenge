// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const os = require('os');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(PORT, '0.0.0.0', (err) => {
        if (err) throw err;
        console.log(`> Ready on http://0.0.0.0:${PORT}`);
    });
});