const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const ip = require('ip');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Ottieni l'indirizzo IP locale di localhost
const localhostAddress = ip.address();

// Salva l'indirizzo IP in una variabile ambientale
process.env.LOCALHOST_IP = localhostAddress;

const PORT = process.env.PORT || 8000;

app.prepare().then(async () => {

    // Utilizza localtunnel per ottenere un URL pubblico e costante

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(PORT, '0.0.0.0', (err) => {
        if (err) throw err;
        console.log("\x1b[32m", `ASSICURATI CHE l'IP NON SIA GIa' IN USO DA UN ALTRO SERVER, E CHE IL SUBSET MASK SIA CORRETTO`);
        console.log("\x1b[32m", `Web server ready on ${localhostAddress}:${PORT} `);
    });
});

require("./socket.js")
// require("./tunnel.js")
